
const  { config } = require('../config/config');
const multer = require("multer");

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};

// Multer Upload Storage
const storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(null, config.uploadDir)
},
filename: (req, file, cb) => {
cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
}
});

const upload = multer({ storage: storage, fileFilter: excelFilter });
module.exports = upload;