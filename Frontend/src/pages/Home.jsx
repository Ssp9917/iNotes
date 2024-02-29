import React, { useContext, useRef, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MainContext } from "../context/Context";
import axios from "axios";
 
const Home = () => {
  const [togle, setTogle] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  // add note state
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [noteId,setNoteId]=useState('')

 

  // get value from context
  const {
    allNotes,
    loading,
    deleteNotes,
    openToast,
    getAllNotes,
    NOTES_BASE_URL,
    API_BASE_URL  
  } = useContext(MainContext);

  const addNote = () => {
    // console.log(note);

    if (isUpdate) {
      
      axios
        .put(API_BASE_URL+NOTES_BASE_URL+"/updatenote/" + noteId, {
          title,
          tag,
          description,
        })
        .then((success) => {
          openToast(success.data.msg, "success");
          setIsUpdate(false)
          setTogle(false)
          getAllNotes()
          setTitle('')
          setTogle('')
          setDescription('')
        })
        .catch((err) => {
          openToast(err.message,'err');
        });
    } else {
      if ((title != "", tag != "", description != "")) {
        axios
          .post(API_BASE_URL+NOTES_BASE_URL+"/addnote", {
            title,
            tag,
            description,
          })
          .then((success) => {
            openToast(success.data.msg, "success");
            getAllNotes();
            setTitle("");
            setTag("");
            setDescription("");
            setTogle(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const editHandler = (note) => {
    console.log(note);

    setTitle(note.title);
    setDescription(note.description);
    setTag(note.tag);
    setNoteId(note._id)
    setTogle(true);
  };

  return (
    <div>
      <section className=" body-font">
        {/* add notes model */}
        <div
          className={`${
            togle ? "flex" : "hidden"
          } w-full h-screen z-[9999] fixed top-0 left-0 bg-[rgba(0,0,0,0.8)]  justify-center items-center`}
        >
          <div className=" lg:mx-[6em] mt-16 lg:mt-0 flex justify-center items-center h-screen">
            <div className=" bg-[#d2cbbf] lg:w-[60em] lg:h-[35em]  rounded-xl p-10   ">
              <div className="">
                {/* Top Heading  */}
                <div className=" mb-5 flex justify-between items-center">
                  <h1 className="text-center text-black text-xl  font-bold">
                    Add Note
                  </h1>
                  <div onClick={() => setTogle(false)}>
                    <IoClose size={25} />
                  </div>
                </div>
                {/* Input 1  */}
                <div>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="inputShadow
                   mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-black outline-none"
                    placeholder="Title"
                  />
                </div>
                {/* Input 2  */}
                <div>
                  <input
                    type="text"
                    name="tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="inputShadow
                    mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-black outline-none"
                    placeholder="Tag"
                  />
                </div>
                <input type="hidden"  name="note_id" value={noteId}/>
                {/* TextArea 3  */}
                <div>
                  <textarea
                    name="desc"
                    id=""
                    cols="30"
                    rows="10"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="inputShadow
                    mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-black outline-none"
                    placeholder="Description"
                  ></textarea>
                </div>
                {/* Button  */}
                <div className=" flex justify-center mb-3">
                  <button
                    className=" bg-[#000000] w-full text-white font-bold  px-2 
                  py-2.5 rounded-md"
                    onClick={() => addNote()}
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container px-5 py-10 mx-auto ">
          <div className="flex gap-10 items-center h-20">
            {/* Top Heading  */}
            <h2 className="w-96 text-center font-bold underline text-3xl ">
              All Notes
            </h2>

            {/* add note button code */}
            <div className="w-full flex justify-end mt-5">
              <button
                type="button"
                className="focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                onClick={() => setTogle(true)}
              >
                <div className="flex gap-2 items-center">
                  Add Note <FaCartPlus size={20} />
                </div>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-5">
            {/* Card 1 */}

            {loading ? (
              <>
                <div className="">
                  <img
                    className="w-14 py-20"
                    src="https://i.gifer.com/ZZ5H.gif"
                    alt=""
                  />
                </div>
              </>
            ) : (
              <>
                {allNotes.map((d, i) => {
                  return (
                    <div className="mb-3">
                      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-[#f9f9f964]">
                        <div className="p-6">
                          {/* title  */}
                          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                            {d.title}
                          </h1>
                          {/* description  */}
                          <p className="leading-relaxed mb-3 text-black">
                            {d.description}
                          </p>
                          {/* bottom item  */}
                          <div className="flex items-center  justify-between ">
                            {/* left item  */}
                            <div className=" bg-gray-200 px-5  rounded-xl inline-flex items-center md:mb-2 lg:mb-0">
                              {d.tag}
                            </div>
                            {/* right item  */}
                            <div className=" flex items-center space-x-2">
                              {/* edit icon  */}
                              <div
                                className="edit"
                                onClick={() => {
                                  editHandler(d);
                                  setIsUpdate(true);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6 cursor-pointer"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                  />
                                </svg>
                              </div>
                              {/* delete icon  */}
                              <div
                                className="del"
                                onClick={() => deleteNotes(d._id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6 cursor-pointer"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
