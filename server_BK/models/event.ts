import {Schema,model} from "mongoose";


// 1. Create an interface representing a document in MongoDB.

interface IEvent {
    title: string;
    description: string;
    price: number;
  date: Date;
  creatorId: string;
}
  
// 2. Create a Schema corresponding to the document interface.

const eventSchema = new Schema<IEvent>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }, 
    date: {type: Date,required: true},
    creatorId: {type: String}
  });

  // 3. Create a Model.
const EventModel=model<IEvent>('Event',eventSchema);


module.exports= EventModel