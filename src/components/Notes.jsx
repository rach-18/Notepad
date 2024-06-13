function Notes({idx, title, delNote, changeCurrent}) {
    return(
        <div onClick={() => {changeCurrent(idx)}} className="flex items-center justify-between cursor-pointer p-4">
            <p>{title}</p>
            <i onClick={() => delNote(idx)} className="fa-solid fa-trash cursor-pointer"></i>
        </div>
    )
}

export default Notes;
