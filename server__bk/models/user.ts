import {Schema,model} from "mongoose";


// 1. Create an interface representing a document in MongoDB.

interface IUser {
    email: string;
    password: string;
}
  
// 2. Create a Schema corresponding to the document interface.

const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
    password: { type: String, required: true },
});


  // 3. Create a Model.
const UserModel=model<IUser>('User',userSchema);


module.exports= UserModel