'use strict'
const __DB__ = require('../models').sequelize;
let $model;
module.exports = (modelName, model) => {
    $model = __DB__.import(modelName, model);
    return {
        CREATE: create,
        UPDATE: update,
        FINDALL: findAll,
        FINDONE: findOneById,
        DELETE: destroy,
        FINDONEBYPARAMETER: findOneByParameter,
        DELETEBYPARAMETER: deleteByParameter
    }

}

const destroy = async (identifier) => {
    return new Promise((resolve, reject) => {
        $model.destroy({ where: { id: identifier } }).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        });
    });
}

const findOneById = async (identifier) => {
    return new Promise((resolve, reject) => {
        $model.findOne({ where: { id: identifier } }).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        })
    })
}

const deleteByParameter = async (parameterName, parameterValue) => {
    let query = null;
    if (parameterName === "eventId") {
        query = { eventId: parameterValue }
    }
    return new Promise((resolve, reject) => {
        $model.destroy({ where: query }).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        });
    });
}

const findOneByParameter = async (parameterName, parameterValue) => {
    let query = null;
    if (parameterName === "eventId") {
        query = { eventId: parameterValue }
    }
    return new Promise((resolve, reject) => {
        $model.findAll({
            where: query, order: [['createdAt', 'ASC']]
        }).then(data => {
            resolve(data);
        }).catch(err => {
            reject(err);
        })
    })
}

const findAll = async () => {
    return new Promise((resolve, reject) => {
        $model.findAll().then((data) => {
            resolve(data);
        }).catch(err => {
            reject(err);
        })
    });
}

const create = async (payload) => {
    return new Promise((resolve, reject) => {
        $model.create(payload).then((data) => {
            resolve(data);
        }).catch(err => {
            reject(err);
        })
    });
}

const update = async (payload, identifier) => {
    return new Promise((resove, reject) => {
        $model.update(payload, { where: { id: identifier } })
            .then(result =>
                resove(result)
            )
            .catch(err =>
                reject(err)
            )
    })
}