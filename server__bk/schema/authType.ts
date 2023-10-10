import {GraphQLObjectType,GraphQLString,GraphQLID,GraphQLNonNull,GraphQLList, GraphQLInt} from 'graphql';
const EventModal=require('../models/event')
// const EventType=require('./eventType');
// interface IDocument {
//     [key: string]: any;
//   }
const AuthType=new GraphQLObjectType({
    name: 'Auth',
    fields: () => ({
        userId: {type: GraphQLID},
        token: {type: new GraphQLNonNull(GraphQLString)},
        tokenExpiration: {type: GraphQLInt},
        
    }),
});
module.exports=AuthType;
