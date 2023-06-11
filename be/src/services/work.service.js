const { models } = require('../config/database');

class WorksService { 
  
    constructor() {}

    async find() {
      const res = await models.Work.findAll();
      return res;
    }

    async findOne(id) {
      const res = await models.Work.findByPk(id);
      return res;
    }

    async create(data) {
      const res = await models.Work.create(data);
      return res;
    }

    async bulkCreate(data) {
      const model = await models.Work.destroy({
                                  truncate: true
                                });
      const res = await models.Work.bulkCreate(data);
      return res;
    }

    async update(id, data) {
      const model = await this.findOne(id);
      const res = await model.update(data);
      return res;
    }

    async delete(id) {
      const model = await this.findOne(id);
      await model.destroy();
      return { deleted: true };
    }
  
  }
  
  module.exports = WorksService;