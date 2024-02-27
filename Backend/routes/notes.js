import express from "express";
import NotesController from "../controller/notes.js";
const router = express.Router();

// Route 1: Get All Notes using GET '/api/notes/fetchallnotes'. Login required
router.get("/fetchallnotes",(req, res) => {
   new NotesController().read().then(
    (success)=>{
      res.send(success)
    }
   ).catch(
    (err)=>{
     res.send(err)
    }
   )
});

// Route 2: Add new Note using POST '/api/notes/addnote'  Login required
router.post("/addnote", (req, res) => {
  new NotesController().create(req.body).then(
    (success)=>{
      res.send(success)
    }
   ).catch(
    (err)=>{
     res.send(err)
    }
   )
});



// Route 3: Updating an existing Note using PUT '/api/notes/updatenote:id'. Login required

// router.put('/updatenote/:id',fetchuser,async(req,res)=>{

//     // Data coming from body
//     const {title,description,tag}=req.body;
//     const {id} = req.params

//     // console.log(id)

//     try {
//         // Find the note to be ubdated and update it
//         let note = await Notes.findById({_id:id})

//         if(!note){
//             return res.status(404).send("Not Found")
//         }
        
//         if(note.user.toString() !== req.userId){
//             return res.status(401).send("Not Allowed")
//         }



        
//         // console.log(note)


//         const notes = await Notes.findByIdAndUpdate({_id : id},{$set:{title,description,tag}},{new:true})

//         res.json({notes, success : "Notes Updated Successfully"});

//     } catch (error) {
//         console.log(error)
//         res.status(500).send("Internal Server Error")
//     }
// })

router.put('/updateNote/:id',(req,res)=>{
  new NotesController().update(req.params.id,req.body).then(
    (success)=>{
      res.send(success)
    }
  ).catch(
    (err)=>{
      res.send(err)
    }
  )
})


// Route 4: Deleting an existing Note using delete '/api/notes/deletenote:id'. Login required
router.delete('/deleteNote/:id',(req,res)=>{
  new NotesController().delete(req.params.id).then(
    (success)=>{
      res.send(success)
    }
   ).catch(
    (err)=>{
     res.send(err)
    }
   )
})

export default router;
