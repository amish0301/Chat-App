const { getBase64 } = require("../lib/helper");
const cloudinary = require("cloudinary").v2;
const { v4: uuid_v4 } = require("uuid");

const emitEvent = (req, event, users, data) => {
  console.log("Emitting Event", event);
};

const deleteFilesFromCloudnary = async (pIds) => {};

const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid_v4(),
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromises);

    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));

    return formattedResults;
  } catch (err) {
    throw new Error("Error uploading files to cloudinary", err);
  }
};

module.exports = {
  emitEvent,
  deleteFilesFromCloudnary,
  uploadFilesToCloudinary,
};
