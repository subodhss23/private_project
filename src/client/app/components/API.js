// HACK: Just to force webpack to copy all images into `dist` directory
const imageContext = require.context('../airtable/companies', true, /\.(png|jpg)$/);

// Load all page jsons
const pageContext = require.context('../airtable/companies', true, /\.json$/);
const data = [];
const topApps = [];
pageContext.keys().forEach((key) => {
  data.push(pageContext(key));
  if (pageContext(key)['top_app']) {
  	if (topApps.length < 9) {
  		topApps.push(pageContext(key));
  	}
  }
});


function getSearchSuggestions(input) {
	if (input.length > 0) {
		const startsWith = p => p.name.toLowerCase().startsWith(input.toLowerCase())
		let results = data.filter(startsWith)
		// return only the title
		return results.map(x => ({'name': x.name.toLowerCase(), 'link': x.instructions[0].link}));
	}

	return []
}

function getArticle(name) {
	const isApp = p => p.name.toLowerCase() === name.toLowerCase()
  return data.find(isApp);
}

export { getSearchSuggestions, getArticle, topApps };