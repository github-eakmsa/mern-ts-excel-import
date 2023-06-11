
const  { config } = require('../config/config');
const WorksService = require('../services/work.service');
const service = new WorksService();

const readXlsxFile = require("read-excel-file/node");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path = config.uploadDir + req.file.filename;

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();
      rows.shift();
      rows.shift();
      rows.shift();

      let works = [];

      rows.forEach((row) => {
        let work = {
          item_no: row[0],
          desc: row[1],
          unit: row[2],
          qty: row[3],
          rate: row[4],
          amt: row[5],
        };

        works.push(work);
      });

     service.bulkCreate(works)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
      
};

module.exports = { upload }