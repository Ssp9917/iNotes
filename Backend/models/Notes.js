import mongoose, { model } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

import { Schema } from "mongoose";

const NotesSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "user",
  },

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = model("notes", NotesSchema);

export default User;
