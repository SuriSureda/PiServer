const https = require('https');

/**
* @param {string} url - url to make request
* @param {number} interval - interval time in minutes
*
*/
const wakeHeroku = (url, interval) => {
    const milliseconds = interval * 60000;
    setTimeout(() => { 

        try {
            console.log("Waking up ( GET ) to url : "+ url +" "+ new Date(Date.now()));
            https.get(process.env.HERO_URL, (res)=> {
                console.log("Response received :");
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    let data = JSON.parse(chunk);
                    console.log("Heroku server : "+data.MESSAGE +" "+ new Date(Date.now()));
                });
            })
        }
        catch (err) {
            console.log(`Error fetching ${url}`);
        }
        finally {
            wakeHeroku(url, interval);
        }

    }, milliseconds);
};

module.exports = wakeHeroku;