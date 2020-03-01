'use strict'
const _ = require("lodash");

module.exports.validatePin = (pin) => {
    let isValid = false
    const pattern = "/^[0-9]+$/";
    if (!_.isUndefined(pin)) {
        if (pin.length === 4) {
            isValid = true;
        }
    }
    return isValid;
}