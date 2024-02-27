import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const MainContext = createContext();

const Context = (props) => {


  // get Notes state
  const [allNotes, setAllNotes] = useState([]);

  const [isUpdate,setIsUpdate] = useState(false)

  // navigate
  // const navigate = useNavigate()

  // loading state
  const [loading, setLoading] = useState(false);

  //react toastify
  const openToast = (msg, status) => {
    toast(msg, { type: status });
  };

  // getAllNotes function
  const getAllNotes = () => {
    setLoading(true);
    try {
      axios
        .get("http://localhost:5001/api/notes/fetchallnotes")
        .then((success) => {
          setLoading(false);
          setAllNotes(success.data.data);
        })
        .catch((err) => {
          console.log(err);
        });

     
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


   // Delete Note
      
   const deleteNotes = (id) => {
    // console.log(id)
    axios
      .delete(`http://localhost:5001/api/notes/deletenote/` + id)
      .then((success) => {
        openToast(success.data.msg);
        getAllNotes();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const submitHandler = (note) =>{

  //   console.log(note)

   

  //   if(isUpdate){

  //     const noteId = note._id

  //     setTitle(note.title)
  //     setDescription(note.description)
  //     setTag(note.tag)
  //     axios.put('http://localhost:5001/api/notes/updatenote/'+noteId).then(
  //       (success)=>{
  //         openToast(success.data.msg,'success')
  //       }
  //     ).catch(
  //       (err)=>{
  //         openToast(err.message)
  //       }
  //     )
  //   }else{
  //     if ((title != "", tag != "", description != "")) {
  //       axios.post("http://localhost:5001/api/notes/addnote", {
  //           title,
  //           tag,
  //           description
  //         })
  //         .then((success) => {
  //           openToast(success.data.msg, 'success');
  //           getAllNotes()
  //           setTitle('')
  //           setTag('')
  //           setDescription('')
  //           // navigate('/')
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   }
    
  // }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNotes();
    }
  }, []);
  return (
    <MainContext.Provider
      value={{ allNotes,setIsUpdate, loading, getAllNotes, openToast, deleteNotes,getAllNotes}}
    >
      <ToastContainer />
      {props.children}
    </MainContext.Provider>
  );
};

export default Context;

export { MainContext };
