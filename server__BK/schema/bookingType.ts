import {GraphQLObjectType,GraphQLString,GraphQLID} from 'graphql';
const EventType=require('./eventType');
const UserType=require('./userType');
const UserModal=require('../models/user');
const EventModal=require('../models/event');
// interface IDocument {
//     [key: string]: any;
//   }
const BookingType=new GraphQLObjectType({
    name: 'Booking',
    fields: { 
        _id: {type: GraphQLID}, // this will display in the graphqli
        createdAt: {type: GraphQLString}, // this will display in the graphqli
        updatedAt: {type: GraphQLString}, // this will display in the graphqli
        event: {
            type:EventType,
            resolve: async (parent,_) =>
            {
                // return EventModal.findById(parent.eventId)
                const event = await EventModal.findById(parent.eventId)
                return{...event._doc,date:new Date(event._doc.date).toISOString()} 
            }
        },
        user: {
            type:UserType,
            resolve: async (parent,_) =>
            {
                return UserModal.findById(parent.userId)
                //  const user = await UserModal.findById(parent.userId)
                // return{...user._doc,date:new Date(user._doc.date).toISOString(),}
            }
        }
    }
});
module.exports=BookingType;
