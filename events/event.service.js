const db = require("_helpers/db");
module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.Event.findAll();
}

async function getById(id) {
  return await getEvent(id);
}

async function create(params) {
  const { Op } = require("sequelize");

  // validate
  const startDatecheck = new Date(params.startTime).getHours();
  const endDatecheck = new Date(params.endTime).getHours();
  //check for time 8am-8pm)
  if (!(startDatecheck >= 8 && startDatecheck <= 20)) {
    throw "start time must be on 8am to 8pm only";
  }
  if (!(endDatecheck >= 8 && endDatecheck <= 20)) {
    throw "end time must be on 8am to 8pm only";
  }
  //check for start time less than end time
  if (startDatecheck > endDatecheck) {
    throw "invalid time";
  }
  //check if any date is overlapping
  // if (
  //   await db.Event.findOne({
  //     where: {
  //       startTime: {
  //         [Op.between]: [new Date(params.startTime), new Date(params.endTime)],
  //       },
  //       endTime: {
  //         [Op.between]: [new Date(params.startTime), new Date(params.endTime)],
  //       },
  //     },
  //   })
  // ) {
  //   throw "Already an event set for this time";
  // }
  const event = new db.Event(params);
  // save event
  const response = await event.save();

  for (const element of params.users) {
    var userdata = {
      firstName: element.firstName,
      lastName: element.lastName,
      eventgoing: response.getDataValue('id'),
    };
    var user = new db.User(userdata);
    await user.save();
  }
 
}

async function update(id, params) {
  const event = await getEvent(id);
  // copy params to event and save
  Object.assign(event, params);
  await event.save();
}

async function _delete(id) {
  const event = await getEvent(id);
  await event.destroy();
}

// helper functions

async function getEvent(id) {
  const event = await db.Event.findByPk(id);
  if (!event) throw "Event not found";
  return event;
}
