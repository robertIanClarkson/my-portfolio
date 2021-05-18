const fs = require('fs');

function getPorfolioItems() {
  return new Promise((resolve, reject) => {
    fs.readFile('api/portfolio.json', 'utf8', (err, jsonString) => {
      if (err) {
          reject(err);
      } else {
        resolve(JSON.parse(jsonString));
      }
    })
  }); 
}

module.exports= {
  getPorfolioItems
}