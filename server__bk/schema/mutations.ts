import {GraphQLObjectType,GraphQLString,GraphQLNonNull,GraphQLFloat, GraphQLID} from 'graphql';
import * as bcrypt from 'bcryptjs'
const EventType=require('./eventType');
const UserType=require('./userType');
const BookingType=require('./bookingType');
const EventModal=require('../models/event');
const UserModal=require('../models/user');
const BookingModal=require('../models/booking');

const {dateToString}=require('../helpers/dateToISOString');

const { transformBooking, transformEvent } = require('./merge');
interface IDocument {
    [key: string]: any;
}
const createEventFunc=async (eventSave: any) =>
{
    try{
        const event=await eventSave.save();
        return transformEvent(event)

}catch(err: any){
                    throw err;
    }
}
const bookEventFunc=async (bookingSave:any) =>
{
    try{
        const booking=await bookingSave.save();
        return transformBooking(booking)
}catch(err: any){
                    throw err;
    }
}

const cancelBookingFunc=async (bookingId:string) =>{
    try {
        const booking=await BookingModal.findById(bookingId)
        await BookingModal.deleteOne({_id: bookingId});
        return transformBooking(booking)
        } catch(err: any) {
        throw err;
    }
  }
const mutation=new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createEvent: {
            type: EventType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
                price: {type: new GraphQLNonNull(GraphQLFloat)},
                date: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve:(_: any,{title,description,price,date}: {title: string,description: string,price: number,date: string,},req:any)=>
            {
              if(!req?.isAuth) {
                    throw new Error("Unauthenticated")
                }
                const event:any=new EventModal({
                    title,
                    description,
                    price,
                    date: new Date(date),
                    creatorId:req?.userId
                });
                // console.log('event : ', event,req?.userId)
                return createEventFunc(event);
            }
        },
        createUser: {
            type: UserType,
            args: {
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve:(_: any,{email,password}: {email: string,password: string;})=>{
                return UserModal.findOne({email}).then((user:IDocument) => {
                    if(user) {
                        throw new Error('User exists with this email');
                    }
                    return bcrypt.hash(password?.trim(),12)
                }).then((hashedPwd:string) =>{
                    const user=new UserModal({
                        email,
                        password: hashedPwd
                    });
                    return user.save();

                }).then((res: IDocument) =>{
                    return {...res._doc,password: null};
                }).catch((err: any) =>{
                    console.log(err); throw err;
                })
            }
        },
        bookEvent: {
            type: BookingType,
            args: {
                eventId: {type: GraphQLID},
            },
            resolve:(_: any,{eventId}: {eventId: string},req:any)=>            {
                if(!req?.isAuth) {
                    throw new Error("Unauthenticated")
                }
                const booking:any=new BookingModal({
                    eventId,
                    userId:req?.userId,
                });
                return bookEventFunc(booking);
            }
        },
        cancelBooking: {
            type: BookingType,
            args: {bookingId: {type: GraphQLID}},
            resolve: (_: any,{bookingId}: {bookingId: string;},req:any) =>
            {
                 if(!req?.isAuth) {
                    throw new Error("Unauthenticated")
                }
                return cancelBookingFunc(bookingId);
            }
         }
    }
});
module.exports= mutation

 