'use strict'

const errorTemplate = (err) => {
    const error = {
        error: {
            code: err.code || 5000,
            message: err.message
        }
    };
    return error;
};
module.exports = errorTemplate;