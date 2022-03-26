import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import keeper from "../apis";


function App() {
  const [notes, setNotes] = useState([]);

  useEffect(()=>{
    async function fetchData(){
      const {data} = await keeper.get("/keeper");
      setNotes(data);
    }
    fetchData();
  }, []);

   async function addNote(newNote) {
     const {data} = await keeper.post("/keeper", newNote);
    setNotes(prevNotes => {
      return [...prevNotes, data];
    });
  }

  async function deleteNote(id) {
    await keeper.delete(`/keeper/${id}`);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return noteItem._id !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
