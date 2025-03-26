import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { 
    type: String, 
    unique: true, 
  },
  mobileNumber: { 
    type: String, 
  },
  gender: { type: String},
  documents: [
    {
      name: { type: String},
      url: { type: String}
    }
  ]
}, { timestamps: true });

export default mongoose.model("User", userSchema);
