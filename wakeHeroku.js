const http = require('http');

const wakeHeroku = (url, interval) => {
    const milliseconds = interval * 60000;
    setTimeout(() => { 

        try { 
            http.request(process.env.HERO_URL, (res)=> {
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