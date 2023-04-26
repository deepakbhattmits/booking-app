// this is the tool that helps you with batching your requests
const DataLoader=require('dataloader');
const EventModal = require('../models/event');
const UserModal = require('../models/user');
const { dateToString } = require('../helpers/dateToISOString');
interface IDocument {
    [key: string]: any;
}
//this now takes a function a batchcing fucntion that it can execute for all kinds of in this case events 
const eventLoader = new DataLoader((eventIds:string[]) => {
  return events(eventIds);
});

const userLoader = new DataLoader((userIds:string[]) => {
  return UserModal.find({_id: {$in: userIds}});
});

const events = async (eventIds:string[]) => {
  try {
    const events = await EventModal.find({ _id: { $in: eventIds } });
    return events.map((event:IDocument) => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async (eventId:string) => {
  try {
    const event = await eventLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
};

const user = async (userId:string) => {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
    };
  } catch (err) {
    throw err;
  }
};

const transformEvent = (event:IDocument) => {
  return {
    ...event._doc,
    date: dateToString(event._doc.date)
  };
};

const transformBooking = (booking:IDocument) => {
  return {
    ...booking._doc,
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;

// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;