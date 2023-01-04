
const fs = require('fs');
const path = require('path');

module.exports = function logOriginalUrl(req, res, next) {
    const url = req.originalUrl;
    const basePath = path.join('src/logs/log.txt');
    fs.writeFile(basePath, url + '\n', { flag: 'a+' }, function (err) {
        if (err) {
            throw err;
        }
    }
    );
    next();
};