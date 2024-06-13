import { useEffect, useState } from 'react'
import MDEditor from "@uiw/react-md-editor"
import Notes from './components/Notes';
import './App.css'

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(0);

  useEffect(() => {
    if(notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  useEffect(() => {
    if(localStorage.getItem("notes")) {
      let array = JSON.parse(localStorage.getItem("notes"));
      setNotes(array);
    }
  }, []);

  const addNote = () => {
    setNotes([...notes, {
      title : "# Enter title here",
      content : "# Enter title here"
    }]);
  };

  const deleteNote = (index) => {
    const temp = [...notes];
    temp.splice(index, 1);
    setNotes(temp);
  };

  const changeCurrent = (index) => {
    setCurrentNote(index);
    console.log(index);
  }

  const modifyCurrentNote = (text) => {
    let temp = [...notes];
    temp[currentNote].content = text;
    temp[currentNote].title = text.split("\n")[0];
    setNotes(temp);
  }

  return(
    <div className='h-screen'>
      {
        (notes.length === 0) ? 
        <div className='flex flex-col gap-5 items-center justify-center h-full'>
          <p className='text-4xl font-semibold'>You have no notes</p>
          <button 
          onClick={addNote}
          className='bg-[#222222] text-white py-2 px-4 rounded-full'
          >
            Add Notes
          </button>
        </div> :
        <div className='flex justify-between h-full'>
          <div className='w-[20%]'>
            <div className='flex items-center gap-5 text-2xl font-semibold my-2 justify-center'>
              <p>Add Note</p>
              <i onClick={addNote} className="fa-solid fa-circle-plus cursor-pointer"></i>
            </div>
            {
              notes.map((item, index) => {
                return (
                <div>
                  <Notes title={item.title} idx={index} delNote={deleteNote} changeCurrent={changeCurrent} key={index} />
                  <hr />
                </div>)
              })
            }
          </div>
          <div className='w-full'>
            <MDEditor value={notes[currentNote].content} onChange={(value) => modifyCurrentNote(value)} height="100%" />
          </div>
        </div>
      }
    </div>
  )
}

export default App
