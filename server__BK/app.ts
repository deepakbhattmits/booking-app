const express = require('express')
const bodyParser=require('body-parser')
const {graphqlHTTP,graphqlExpress}=require('express-graphql')
const mongoose=require('mongoose');
const schema=require('./schema/schema.ts');
const isAuth=require('./middleware/is-auth');
const MONGO_URI=`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0.geais.mongodb.net/${process.env.MONGO_DB}`;
const connectionOptions={
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const app = express()

app.use(bodyParser.json());

app.use((req:any, res:any, next:any) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use('/graphql',graphqlHTTP({
  schema,
  graphiql: true
}))

mongoose.connect(MONGO_URI,connectionOptions).then((res: any) =>
{
  console.log('connect with mongodb')
  app.listen(4000)
}).catch((err: any) =>{
  console.log(err)
});

