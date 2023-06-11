
const { Work, WorkSchema } = require('./work.model');

function setupModels(sequelize) {
    Work.init(WorkSchema, Work.config(sequelize));
}

module.exports = setupModels;

 