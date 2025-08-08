const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tenant = req.user.tenant;
    const companyId = req.user.companyId;

    if (!tenant || !companyId) throw new Error("Missing tenant or companyId");

    const folderPath = path.join(
      'assets',
      `${tenant}_${companyId}`,
      'employees'
    );

    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const { id } = req.params;
    cb(null, `employee_${id}.jpeg`);
  }
});

const upload = multer({ storage });

module.exports = upload;