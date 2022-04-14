import {GraphQLSchema} from 'graphql';
const query = require('./root_query_type')
const mutation = require('./mutations')
module.exports=new GraphQLSchema({
    query,
    mutation
})