var fs = require('fs');
var request = require('request');
var moment = require('moment');
var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keybSbM8CVDWe6Uzj'}).base('appJzt8bugNlKZyT1');
const path = require('path');
const DEST_DIR = path.resolve(__dirname, '../src/client/app/airtable/companies');
const DIST_DIR = path.resolve(__dirname, '../dist');

//********* Private Functions ***********
var mkdirSyncRecursive = function (directory) {
  var path = directory.replace(/\/$/, '').split('/');
  // console.log('path - ', path);

  for (var i = 1; i <= path.length; i++) {
    var segment = path.slice(0, i).join('/');
    if (segment.length > 0) {
      !fs.existsSync(segment) ? fs.mkdirSync(segment) : null ;
    }
  }
}

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

var addSupport = function(record) {
  var support = [];

  if (record.get('Help Center')) {
    support.push({
      'link': record.get('Help Center'),
      'text': 'Help Center'
    });
  }

  if (record.get('Contact Us')) {
    support.push({
      'link': record.get('Contact Us'),
      'text': 'Contact'
    });
  }

  if (record.get('Email')) {
    support.push({
      'email': record.get('Email')
    });
  }

  if (record.get('Phone')) {
    support.push({
      'phone': record.get('Phone')
    });
  }

  return support;
};

var howTo = function(srcFolder, id, appName, destination, callback) {
  base('HowTo').find(id, function(err, record) {
    if (err) { console.error(err); return; }
    
    let Slides = record.get('Slide'); 
    let T2Rs = record.get('T2R');   
    let QnAnswers = record.get('QnAns');   
    var isSlidesDone = (Slides.length == 0) ? true : false;
    var isT2RDone = (T2Rs != undefined) ? (T2Rs.length == 0) ? true : false : true;
    var isQnAnswersDone = (QnAnswers != undefined) ? (QnAnswers.length == 0) ? true : false : true;

    var howTo = {};
    howTo['header'] = record.get('Header');
    howTo['title'] = record.get('Title');
    howTo['id'] = howTo['header'].replace(/\s+/g, '-').toLowerCase();
    howTo['link'] = destination + '/' + howTo['id'];
    howTo['before'] = record.get('Before');
    howTo['after'] = record.get('After');
    howTo['intro'] = record.get('Intro');

    if (record.get('Action')) {
      howTo['action'] = {
        'text' : howTo['header'].split(" ")[0],
        'link' : record.get('Action')
      }
    }  

    var questionAnswers = [];
    if (QnAnswers != undefined) {
      QnAnswers.forEach(function(QnAnsId) {
        qnAns(QnAnsId, function(object) {
          questionAnswers.splice(QnAnswers.indexOf(QnAnsId), 0, object);

          if (questionAnswers.length == QnAnswers.length) {
            howTo['qnAnswers'] = questionAnswers;
            isQnAnswersDone = true;  

            if (isSlidesDone && isT2RDone && isQnAnswersDone) {
              callback(howTo);
            }     
          }
        });
      });
    }  

    var thingsToRemember = [];
    if (T2Rs != undefined) {
      T2Rs.forEach(function(T2RRecId) {
        t2R(T2RRecId, function(note) {
          thingsToRemember.splice(T2Rs.indexOf(T2RRecId), 0, note);

          if (thingsToRemember.length == T2Rs.length) {
            howTo['thingsToRemember'] = thingsToRemember;
            isT2RDone = true;  

            if (isSlidesDone && isT2RDone && isQnAnswersDone) {
              callback(howTo);
            }      
          }
        });
      });
    }

    var perPlatform = {};    
    var slides = 0;
    Slides.forEach(function(SlideRecId) {
      slide(SlideRecId, function(s) {
        var key = s.get('Platform').toLowerCase();
        var stepNumber = s.get('Step Number') - 1;

        if (perPlatform[key] == undefined) {
          perPlatform[key] = {'steps': [], 'slides': []};
        }      

        var platform = perPlatform[key];

        if (s.get('Step')) {
          platform['steps'][stepNumber] = s.get('Step');
        }

        var slideJSON = {
          'alt': s.get('Alt'),
          'title': s.get('Title')
        }

        const images = s.get('Image');

        images.forEach(function(img) {
          const url = img['url'];
          const filename = img['filename'];
          const slidesDir = path.resolve(srcFolder, 'slides');
          mkdirSyncRecursive(slidesDir);          
          const filePath = path.resolve(slidesDir, filename);
          download(url, filePath, function() {
            // console.log("Finished downloading ", filename);
            slideJSON['url'] = destination + '/slides/' + filename;
            platform['slides'][stepNumber] = slideJSON;
            slides++;
            if (Slides.length == slides) {     
              for(var key in perPlatform) {
                howTo[key] = perPlatform[key];
              }   
              isSlidesDone = true;

              if (isSlidesDone && isT2RDone && isQnAnswersDone) {
                callback(howTo);
              }  
            }
          });
        });
      });
    });
  });
};

var slide = function(id, callback) {
  base('Slide').find(id, function(err, record) {
    if (err) { console.error(err); return; }  
    callback(record);
  });
};

var t2R = function(id, callback) {
  base('T2R').find(id, function(err, record) {
    if (err) { console.error(err); return; }
    callback(record.get('Note'));
  });
};

var qnAns = function(id, callback) {
  base('QnAns').find(id, function(err, record) {
    if (err) { console.error(err); return; }
    callback({
      'question': record.get('Question'),
      'answer': record.get('Answer'),
      'createdAt': moment(record.get('CreatedAt')).format('MMMM Do YYYY')
    });
  });
};

//***********Public Functions*****************

return module.exports = {
  data: function() {
    base('Company /  Product / App').select({
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
          console.log('Retrieved', record.get('Name'));

          var page = {};

          page['name'] = record.get('Name');

          if (!['Linkedin', 'Ikea', 'Meetup', 'Espn', 'Life 360', 'Living Social', 'Blizzard', 'Etsy', 'My Fitness Pal', 'Under Armour Record Account'].includes(page['name']) || record.get('Complete') == 0) {
            return;
          }

          let destination = page['name'].split(' ').join('-').toLowerCase();

          page['top_app'] = record.get('Top App') == 1 ? true : false;
          page['breaches'] = record.get('Breaches');
          page['delete'] = record.get('Delete');
          page['social_image'] = record.get('Social Image');

          const srcFolder = path.resolve(DEST_DIR, destination);
          mkdirSyncRecursive(srcFolder);

          const logos = record.get('Logo');
          logos.forEach(function(logo) {
            const url = logo['url'];
            const filename = logo['filename'];
            const filePath = path.resolve(srcFolder, filename);
            download(url, filePath, function() {
              console.log("Finished downloading ", filename);
              page['logo'] = destination + '/' + filename;
            });
          });

          page['support'] = addSupport(record);

          var instructions = [];
          let HowTos = record.get('HowTo');   
          HowTos.reverse().forEach(function(howToRecId) {
            console.log('Sending howToRecId: ' + howToRecId);
            howTo(srcFolder, howToRecId, page['name'], destination, function(json) {
              // console.log('Returning howToRecId: ' + howToRecId);
              // console.log('Inserting at: ' + HowTos.indexOf(howToRecId));
              // console.log('JSON: ' + JSON.stringify(json));

              instructions.splice(HowTos.indexOf(howToRecId), 0, json);
              // console.log('instructions: ' + JSON.stringify(instructions));

              if (HowTos.length == instructions.length) {
                page['instructions'] = instructions;
                const filePath = path.resolve(srcFolder, 'page.json');
                fs.writeFile(filePath, JSON.stringify(page, null, 2), 'utf8', function() {
                  console.log("Finished writing page.json");
                });                     
              }
            });
          });        
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    }); 
  },

  sitemap: function() {
    let siteMapPath = path.resolve(DIST_DIR, 'sitemap.txt');

    fs.unlink(siteMapPath, (err) => {
      if (err) throw err;
      console.log(siteMapPath + ' was deleted first.');
    });

    var stream = fs.createWriteStream(siteMapPath, {flags:'a'});
    stream.write('https://deletemydata.io/?_escaped_fragment_=');
    stream.write('\n');  

    var total = 1;  
    var files = fs.readdirSync(DEST_DIR);
    files.forEach(function(file) {
      let pagePath = path.resolve(DEST_DIR, file, 'page.json');
      if (fs.existsSync(pagePath)) {
        var page = JSON.parse(fs.readFileSync(pagePath));
        page.instructions.forEach(function(ins) {
          stream.write('https://deletemydata.io/' + ins.link + '/?_escaped_fragment_=');
          stream.write('\n');
          total++;
        })                
      }
    });
    stream.end(); 
    console.log('Sites added: ' + total);
  },

  images_to_annotate: function() {
    base('Slide').select({
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        var limit = 60;
        // This function (`page`) will get called for each page of records.
        records.forEach(function(record) {
          if (record.get('Image') == null || record.get('Image') == undefined) {
            if (record.get('Original Image') != undefined) {
              limit--;
              if (  limit == 0) {
                console.log("Limit of " + limit + " reached");
              }
              else {
                let img = record.get('Original Image')[0];            
                const url = img['url'];
                const filename = record.get('Id').toString()+ "_" + img['filename'];
                const slidesDir = path.resolve(__dirname, '../images_to_annotate');
                mkdirSyncRecursive(slidesDir);
                const filePath = path.resolve(slidesDir, filename);
                download(url, filePath, function() {
                  // no-op                  
                }); 
              }
            }
          }
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
    }); 
  }
};
