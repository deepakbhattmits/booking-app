import {Document,Schema,model} from "mongoose";


// 1. Create an interface representing a document in MongoDB.

interface IBooking extends Document {
  eventId: string;
  userId: string;
}
  
// 2. Create a Schema corresponding to the document interface.

const bookingSchema=new Schema<IBooking>({
    eventId: String,
    userId: String,
  },{timestamps:true});


  // 3. Create a Model.
const BookingModel=model<IBooking>('Booking',bookingSchema);


module.exports= BookingModel