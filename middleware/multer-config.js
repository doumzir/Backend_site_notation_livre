const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');


const storage = multer.memoryStorage();
const upload = multer({ storage });
const compressImg = async (req) => {
  fs.access('../images', (error) => {
    if (error) {
      fs.mkdirSync('../images');
    }
  });

  const { buffer, filename } = req;
  console.log(req);
  const timestamp = new Date().toISOString();
  const ref = `${timestamp}-${filename}.webp`;

  await sharp(buffer)
    .webp({ quality: 20 })
    .toFile(`../images/${ref}`);
  const link = `${ref}`;
  console.log(link);
  return link;
};
module.exports = { upload, compressImg };
