var crypto = require('crypto');
var password = 'secret';
var input = 'vandana kumari';

var encrypt = function (input, password, callback) {
    var m = crypto.createHash('md5');
    m.update(password)
    var key = m.digest('hex');
    m = crypto.createHash('md5');
    m.update(password + key)
    var iv = m.digest('hex');
    var data = new Buffer(input, 'utf8').toString('binary');
    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv.slice(0,16));
    var encrypted = cipher.update(data, 'binary') + cipher.final('binary');
    var encoded = new Buffer(encrypted, 'binary').toString('base64');
    callback(encoded);
};

var decrypt = function (input, password, callback) {
// Convert urlsafe base64 to normal base64
    var input = input.replace(/\-/g, '+').replace(/_/g, '/');
// Convert from base64 to binary string
    var edata = new Buffer(input, 'base64').toString('binary')

// Create key from password
    var m = crypto.createHash('md5');
    m.update(password)
    var key = m.digest('hex');

// Create iv from password and key
    m = crypto.createHash('md5');
    m.update(password + key)
    var iv = m.digest('hex');

// Decipher encrypted data
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv.slice(0,16));
    var decrypted = decipher.update(edata, 'binary') + decipher.final('binary');
    var plaintext = new Buffer(decrypted, 'binary').toString('utf8');

    callback(plaintext);
};

encrypt(input, password, function (encoded) {
    console.log('encoded Data');
    console.log(encoded);
    console.log('decoded Data');
    decrypt(encoded, password, function (output) {
        console.log(output);
    });
});


