import React, { createContext, useEffect, useState } from "react";
import { json } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainContext = createContext();

const Context = (props) => {
  // get Notes state
  const [allNotes, setAllNotes] = useState([]);

  // loading state
  const [loading,setLoading] = useState(false);

  //react toastify
  const success = (msg) => toast.success(msg);
  const error = (msg) => toast.error(msg);

  // getAllNotes function
  const getAllNotes = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5001/api/notes/fetchallnotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const notesData = await res.json();

      // console.log(notesData);

      // insert Data inside the state
      setAllNotes(notesData)
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNotes();
    }
  }, []);
  return (
    <MainContext.Provider value={{ success, error, allNotes,loading }}>
      <ToastContainer />
      {props.children}
    </MainContext.Provider>
  );
};

export default Context;

export { MainContext };
