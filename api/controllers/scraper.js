const https = require('https');

function filterIPs(line){
  const IPRegex = new RegExp('(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])', 'g');
  return IPRegex.test(line)
}

function findIPs(line){
    const IPRegex = new RegExp('^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])', 'g');

    return line.match(IPRegex)[0] 
}


function scraper(req, res, next) {

    https.get('https://raw.githubusercontent.com/linuxacademy/content-elastic-log-samples/master/access.log', (resp) => {
      let data = '';
    
      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });
    
      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        const split = data.split('\n')
        console.log('Parsing: ' + split.length + ' IP addresses.');
        const filtered = split.filter(filterIPs);
        console.log('Filtering...');
        const matched = filtered.map(findIPs);
        console.log('Mapping...');
        const uniqueValues = [...new Set(matched)];
        console.log(uniqueValues.length);
        res.send(uniqueValues);
      });
    
    
    }).on("error", (err) => {
      console.log("Error: " + err.message); 
    });
};

exports.scraper = scraper;
