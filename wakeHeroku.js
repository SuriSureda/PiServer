const http = require('http');

/**
* @param {string} url - url to make request
* @param {number} interval - interval time in minutes
*
*/
const wakeHeroku = (url, interval) => {
    const milliseconds = interval * 60000;
    setTimeout(() => { 

        try { 
            http.get(process.env.HERO_URL, (res)=> {
                console.log(res);
            })
        }
        catch (err) {
            console.log(`Error fetching ${url}`);
        }
        finally {
            wakeUpDyno(url, interval);
        }

    }, milliseconds);
};

module.exports = wakeHeroku;