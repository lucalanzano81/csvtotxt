var fs = require('fs');
var _ = require('underscore');

var fileReadStream = fs.createReadStream('file.csv');

fileReadStream.on('data', function(chunk) {
    // lowercase, replace, and return an array
    var list = chunk.toString()
        .toLowerCase()
        .replace(/['";]+/g, '')
        .split('\n');

    // remove duplicates using underscore module
    list = _.uniq(list);

    // save into list.txt
    var fileWriteStream = fs.createWriteStream('file.txt', { encoding: 'utf8', flag: 'w' });

    for (var i = 0, len = list.length; i < len; i++) {
        fileWriteStream.write(list[i] + '\n');
    }
    fileWriteStream.end();

    // listener
    fileWriteStream.on('close', function() {
        console.log('File created. Wrote ' + list.length + ' rows.');
    });
});

// listener
fileReadStream.on('error', function() {
    console.log('File read failed!');
});