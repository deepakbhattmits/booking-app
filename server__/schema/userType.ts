import {GraphQLObjectType,GraphQLString,GraphQLID,GraphQLNonNull,GraphQLList} from 'graphql';
const EventModal=require('../models/event')
// const EventType=require('./eventType');
// interface IDocument {
//     [key: string]: any;
//   }
interface Event {
    title: string;
    description: string;
    price: number;
    date: Date;
    creatorId: string;
}
const UserType=new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: {type: GraphQLID},
        email: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLString},
        createdEvents: {
            // type: new GraphQLList(EventType), 
             type: new GraphQLList(require('./eventType')),// solution for cyclic dependency error 
            resolve: (parent,_) =>
            {
                return EventModal.find({ creatorId: parent._id });
            }
        }
    }),
});
module.exports=UserType;
