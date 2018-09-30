const fs = require('fs')
fs.writeFileSync('./.env', `REACT_APP_ENV=${process.env.REACT_APP_ENV}\n`)