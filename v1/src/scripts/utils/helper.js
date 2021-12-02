const CryptoJS = require("crypto-js");

const passwordToHash = (password) => {
    return CryptoJS.HmacSHA256(password, CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH).toString()).toString();
};

module.exports = {
    passwordToHash,
}