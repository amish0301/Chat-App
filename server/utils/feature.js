const emitEvent = (req, event, users, data) => {
  console.log("Emitting Event", event);
};

const deleteFilesFromCloudnary = async (pIds) => {};

module.exports = { emitEvent, deleteFilesFromCloudnary };