import {GraphQLObjectType,GraphQLString,GraphQLID,GraphQLNonNull,GraphQLFloat,GraphQLList} from 'graphql';
const UserType=require('./userType');
const UserModal=require('../models/user');
// interface IDocument {
//     [key: string]: any;
//   }
const EventType=new GraphQLObjectType({
    name: 'Event',
    fields: {
        _id: {type: GraphQLID},
        title: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        price: {type: new GraphQLNonNull(GraphQLFloat)},
        date: {type: new GraphQLNonNull(GraphQLString)},
        creator: {
            type:UserType,
            resolve:(parent,_)=>{
                return UserModal.findById(parent.creatorId)
            }
        }
    }
});
module.exports=EventType;
