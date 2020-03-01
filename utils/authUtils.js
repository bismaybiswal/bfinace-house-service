'use strict'
const crypto = require('crypto');
const _ = require("lodash");
const errorCodes = require("./errorCodes")();

let tokenStore = [];
module.exports.generateAccessToken = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(48, function (err, buffer) {
            if (err) {
                reject(err);
            }
            let token = buffer.toString('hex');
            tokenStore.push(token);
            resolve(token);
        });
    });
}

const verifyToken = (token) => {
    let flag = false;
    tokenStore.forEach(obj => {
        if (obj === token) {
            flag = true;
        }
    });
    return flag;
};

module.exports.authChecker = (req, res , next) => {
    const token = req.headers["token"];
    if (!verifyToken(token)) {
        let err = new Error(`Not Authorized`);
        err.status = 401;
        err.code = errorCodes.NOT_AUTHORIZED;
        next(err);
    } else {
        return true;
    }

}


