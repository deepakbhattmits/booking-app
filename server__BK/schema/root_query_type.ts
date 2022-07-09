import {GraphQLObjectType,GraphQLList,GraphQLNonNull,GraphQLString} from 'graphql';
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken';
const EventType=require('./eventType');
const UserType=require('./userType');
const AuthType=require('./authType');
const BookingType=require('./bookingType');
const EventModal=require('../models/event');
const UserModal=require('../models/user');
const BookingModal=require('../models/booking');
const { transformBooking, transformEvent } = require('./merge');
interface IDocument {
    [key: string]: any;
}
const fetchEvents=async () =>{
    try {
        const events=await EventModal.find({});
    return events?.map((event:IDocument) =>{
  
        return transformEvent(event)
    });
    }catch(err:any){
        throw err;
    }
}
const fetchEvent=async (eventId:string) =>{
    try {
         if (eventId?.match(/^[0-9a-fA-F]{24}$/)) {
  // Yes, it's a valid ObjectId, proceed with `findById` call.
        const event=await EventModal.findById(eventId);
        return transformEvent(event);
}
    }catch(err:any){
        throw err;
    }
}
const fetchUsers=async () =>{
    try {
        const users=await UserModal.find({});
        return users;
        } catch(err: any) {
        throw err;
    }
}
const fetchUser=async (userId:string) =>{
    try {
            if(userId?.match(/^[0-9a-fA-F]{24}$/)) {
                const user=await UserModal.findById(userId);
                return user;
            }
        } catch(err: any) {
        throw err;
    }
}
const fetchBookings=async (userId:string) =>{
    try {
        if(userId?.match(/^[0-9a-fA-F]{24}$/)) {
            const bookings=await BookingModal.find({userId});
            return bookings?.map((booking: IDocument) =>
            {
                return transformBooking(booking)
            });
        }
        } catch(err: any) {
            throw err;
        }
}
const fetchBooking=async (bookingId:string) =>{
    try {
        if(bookingId?.match(/^[0-9a-fA-F]{24}$/)) {
            const booking=await BookingModal.findById(bookingId);
            return  transformBooking(booking);
        }
        } catch(err: any) {
            throw err;
        }
}
const userLogin=async (email: string,password: string) =>{
    const user=await UserModal.findOne({email});
    if(!user) {
        throw new Error('User does not exist with this email, please try again');
    }
    const isEqual=await bcrypt?.compare(password?.trim(),user?.password)
    if(!isEqual) {
         throw new Error('Password incorrect, please try again');
    }
    const token=jwt?.sign({userId: user?.id,email: user?.email},'somesupersecretkey',{expiresIn: '1h'});
    return {userId:user?.id, token,
        tokenExpiration: 1}
}

const query=new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        events: {
            // GraphQLList will instruct to Graphql give us that type (EventType) array of object
            type: new GraphQLList(EventType),
            // the purpose of resolve function is to actually go reach out and grab that real data
            resolve:()=>{
                return fetchEvents();
            }
        },
        event: {
           
            type:  EventType,
            // the purpose of resolve function is to actually go reach out and grab that real data
            args: {eventId: {type: new GraphQLNonNull(GraphQLString)}},
            resolve:(_:any,{eventId}:{eventId:string})=>{
                return fetchEvent(eventId);
            }
        },
        users: {
              type: new GraphQLList(UserType),
            // the purpose of resolve function is to actually go reach out and grab that real data
            resolve:()=>{
                return fetchUsers();
            }
        },
          user: {
              type:UserType,
              // the purpose of resolve function is to actually go reach out and grab that real data
              args: {userId: {type: new GraphQLNonNull(GraphQLString)}},
            resolve:(_:any,{userId}:{userId:string})=>{
                return fetchUser(userId);
            }
        },
          login: {
              type:AuthType,
              args: {
                  email: {type: new GraphQLNonNull(GraphQLString)},
              password: {type: new GraphQLNonNull(GraphQLString)}},
              // the purpose of resolve function is to actually go reach out and grab that real data
            resolve:(_:any,{email,password}:{email:string,password:string})=>{
                return userLogin(email,password);
            }
        },
        bookings: {
              type: new GraphQLList(BookingType),
            // the purpose of resolve function is to actually go reach out and grab that real data
            resolve: (_: any,__:any,req: any) =>{
                if(!req?.isAuth) {
                    throw new Error("Unauthenticated")
                }
                return fetchBookings(req?.userId);
            }
        },
        booking: {
             //purpose of this we instuct to GraphQl what will the outPut
            type: BookingType,
             args: {bookingId: {type: new GraphQLNonNull(GraphQLString)}},
            // the purpose of resolve function is to actually go reach out and grab that real data
            resolve: (_: any,{bookingId}: {bookingId: string;},req: any) =>
            {
                 if(!req?.isAuth) {
                    throw new Error("Unauthenticated")
                }
                return fetchBooking(bookingId);
            }
        },
      
    }
});
module.exports= query