const emitEvent = (req,event,users,data) => {
    console.log('Emitting Event', event);
};

module.exports = { emitEvent };
