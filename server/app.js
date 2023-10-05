const urlParser = require('url');
const data      = require('./data');
const http      = require('http');
const hostname  = 'localhost';
const port      = 3035;

http.createServer(function (req, res) {
    const query = urlParser.parse(req.url, true).query;
    const searchTerm = query?.filter;
    const limit = query?.limit;

    // Only searching against tags. Could also search name/description/etc...
    const athletes = data.filter((product) => 
        product.tags.filter((tag) => 
            tag.includes(searchTerm)
        ).length
    ).slice(0, limit);
    
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3030'); // this is a lil hacky but i was facing cors issues...
    res.write(JSON.stringify(athletes)); // Write out the default response
    res.end(); //end the response
}).listen( port );


console.log(`[Server running on ${hostname}:${port}]`);