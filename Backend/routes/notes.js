import express from "express";
import Notes from "../models/Notes.js";
import fetchuser from "../middleware/fetchUser.js";
const router = express.Router();

// Route 1: Get All Notes using GET '/api/notes/fetchallnotes'. Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    // Find Notes of the correspondig User
    console.log("hii");
    const notes = await Notes.find({ user: req.userId });
    // console.log(notes)
    // send notes as a response
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Route 2: Add new Note using POST '/api/notes/addnote'  Login required

router.post("/addnote", fetchuser, async (req, res) => {
  try {
    // Data coming from body(frontend)
    const { title, description, tag } = req.body;

    // validation
    if (!title || !description || !tag) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Notes
    const notes = new Notes({ title, description, tag, user: req.userId });

    // saving notes
    const saveNote = await notes.save();
    res.json(saveNote);



  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});



// Route 3: Updating an existing Note using PUT '/api/notes/updatenote:id'. Login required

router.put('/updatenote/:id',fetchuser,async(req,res)=>{

    // Data coming from body
    const {title,description,tag}=req.body;
    const {id} = req.params

    // console.log(id)

    try {
        // Find the note to be ubdated and update it
        let note = await Notes.findById({_id:id})

        if(!note){
            return res.status(404).send("Not Found")
        }
        
        if(note.user.toString() !== req.userId){
            return res.status(401).send("Not Allowed")
        }



        
        // console.log(note)


        const notes = await Notes.findByIdAndUpdate({_id : id},{$set:{title,description,tag}},{new:true})

        res.json({notes, success : "Notes Updated Successfully"});

    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

// Route 4: Delete an existing Note using DELETE '/api/notes/deletenote' . Login required

router.delete('/deletenote/:id',fetchuser, async (req,res)=>{
    try {
        // find the note to be delete
        let note = await Notes.findById(req.params.id)

        if(!note){ return res.status(404).send("Not Found")}


        // Allow deleting only if user owns this Note
        if(note.user.toString() !== req.userId){
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)

        res.json({"success": "Note has been deleted", note:note} )

    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

//* Get Notes By id using GET "/api/notes/notes/:id" . Login required

router.get('/notes/:id',fetchuser, async (req,res)=>{
    try {
        const {id} = req.params

        const notes = await Notes.find({_id:id})

        if(notes){
            res.status(200).json(notes)
        }else{
            res.status(404).json({success: "Note Not Found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})
export default router;
