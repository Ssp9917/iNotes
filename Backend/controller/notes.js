import NotesModel from "../models/Notes.js";

class NotesController {
  constructor() {
    this.model = NotesModel;
  }

  //* get api logic
  read() {
    return new Promise(async (res, rej) => {
      try {
        let data = "";
        data = await this.model.find();
        res({
          msg: "All Data ",
          status: 1,
          data,
        });
      } catch (error) {
        rej({
          msg: "Data Not Found ",
          status: 0,
        });
      }
    });
  }

  //* create api logic
  create(data) {
    return new Promise((res, rej) => {
      try {
        // Data coming from body(frontend)
        const { title, description, tag } = data;

        // validation
        if (!title || !description || !tag) {
          return res.status(400).json({ error: "All fields are required" });
        }

        // Notes
        const notes = new this.model({ title, description, tag });

        notes
          .save()
          .then(() => {
            res({
              msg: "data added successfully",
              status: 1,
            });
          })
          .catch(() => {
            rej({
              msg: "data not added",
              status: 0,
            });
          });
      } catch (error) {
        console.log(error);
        rej({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }

  //* delete api logic
  delete(id) {
    return new Promise((res, rej) => {
      try {
        this.model
          .deleteOne({ _id: id })
          .then(() => {
            res({
              msg: "Data deleted successfully",
              status: 1,
            });
          })
          .catch((err) => {
            console.log(err);
            rej({
              msg: "Unable to delete data",
              status: 0,
            });
          });
      } catch (error) {
        console.log(error);
        rej({
          msg: "Internal Server Error",
          status: 0,
        });
      }
    });
  }

  //* update api logic
  update(id, data) {
    return new Promise((res, rej) => {
      try {
        this.model
          .updateOne(
            { _id: id },
            { title: data.title, description: data.description, tag: data.tag }
          )
          .then(() => {
            res({
              msg: "Data updated",
              status: 1,
            });
          })
          .catch(() => {
            rej({
              msg: "Unable to update the data",
              status: 0,
            });
          });
      } catch {}
    });
  }
}

export default NotesController;
