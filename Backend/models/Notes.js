import mongoose, {model} from "mongoose";
const NotesSchema = new mongoose.Schema(
  {
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
    }
  },
  {
    timestamps: true,
  } 
);

const NotesModel = model("notes", NotesSchema);
export default NotesModel
