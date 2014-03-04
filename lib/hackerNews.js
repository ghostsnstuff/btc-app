var fs = require('fs')
  , request = require('request')
  , cheerio = require('cheerio')
  , base_url = 'https://hn.algolia.com/api/v1/search_by_date?query=bitcoin&tags=story'
  , RAM = []
  , file;

// command line --options arg
if(process.argv[2] === '--options') {
  console.log('node program.js <path/to/file> -- c\'mon brah')
} else {
  request(base_url, function(err, res, body) {
    if(err) throw err;
    $ = cheerio.load(body);
    var articles = JSON.parse(body)['hits'];
    for(var i in articles) {
      var article = {};
      article.timestamp = articles[i].created_at;
      article.title = articles[i].title;
      article.author = articles[i].author;
      article.url = articles[i].url;
      article.points = articles[i].points;
      RAM.push(article);
    }
    if(process.argv[2]) file = process.argv[2];
    else file = '../db/media.json';
    fs.writeFile(file, JSON.stringify(RAM), function(err) {
      if(err) throw err;
    })
  })
}
