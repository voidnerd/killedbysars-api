var cloudinary = require("cloudinary").v2;

const Storage = {};

/*
 * enable await on this callback hell
 *
 */
Storage.upload = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, { folder: "victims" }, (err, url) => {
      if (err) return reject(null);
      const path = `${url.public_id}.${url.format}`;
      return resolve(path);
    });
  });
};

Storage.url = (public_id) => {
  return cloudinary.url(public_id);
};

module.exports = Storage;
