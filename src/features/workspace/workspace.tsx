
import { useState } from 'react'
import NoteCard from '../../components/Notecard'

interface Note {
  id: number
  label: string
  title: string
  footer: string
}

function Workspace() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      label: 'A LITTLE REMINDER',
      title: "Don't forget to enjoy the little things.",
      footer: 'Made with a little care ♡',
    },
    {
      id: 2,
      label: 'STUDY TIME',
      title: 'Keep learning, one step at a time.',
      footer: 'You are making progress ♡',
    },
  ])

  const addNote = () => {
    const newNote: Note = {
      id: Date.now(),
      label: 'NEW NOTE',
      title: 'Write something...',
      footer: 'A little space for you ♡',
    }
    setNotes((currentNotes) => [...currentNotes, newNote])
  }

  const updateNote = (id: number, newTitle: string) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id
          ? { ...note, title: newTitle }
          : note
      )
    )
  }

  return (
    <section className="workspace">
      <div className="workspace-heading">
        <p className="eyebrow">YOUR LITTLE CORNER</p>

        <h2>Room for your thoughts.</h2>

        <p className="workspace-description">
          Your notes, reminders and little bits of inspiration
          will find a home here.
        </p>
      </div>

      <button type="button" className="add-note-button" onClick={addNote}>
        Add a note
      </button>

      <div className="notes-container">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            label={note.label}
            title={note.title}
            footer={note.footer}
            onUpdate={updateNote}
          />
        ))}
      </div>
    </section>
  )
}

export default Workspace
