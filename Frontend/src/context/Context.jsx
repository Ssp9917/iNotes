import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainContext = createContext();

const Context = (props) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
  const NOTES_BASE_URL = process.env.REACT_APP_NOTES_BASE_URL

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
        .get(API_BASE_URL+NOTES_BASE_URL+"/fetchallnotes")
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
      .delete(API_BASE_URL+NOTES_BASE_URL+'/deletenote/' + id).then((success) => {
        openToast(success.data.msg);
        getAllNotes();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNotes();
    }
  }, []);
  return (
    <MainContext.Provider
      value={{ allNotes,setIsUpdate, loading, getAllNotes, openToast, deleteNotes,getAllNotes,API_BASE_URL,NOTES_BASE_URL}}
    >
      <ToastContainer />
      {props.children}
    </MainContext.Provider>
  );
};

export default Context;

export { MainContext };
