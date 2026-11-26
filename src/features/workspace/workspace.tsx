import { useState } from 'react'
import NoteCard from '../../components/NoteCard'
import type { Note, NoteColor, NoteBlock } from '../../types/notes'

function Workspace() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      label: 'A LITTLE REMINDER',
      footer: 'Made with a little care ♡',
      color: 'lavender',
      content: [
        {
          id: 1,
          type: 'heading',
          text: 'A gentle reminder',
        },
        {
          id: 2,
          type: 'paragraph',
          text: "Don't forget to enjoy the little things.",
        },
      ],
    },
    {
      id: 2,
      label: 'STUDY TIME',
      footer: 'You are making progress ♡',
      color: 'butter',
      content: [
        {
          id: 3,
          type: 'heading',
          text: 'Things to learn',
        },
        {
          id: 4,
          type: 'task',
          text: 'Practise React',
          completed: false,
        },
        {
          id: 5,
          type: 'task',
          text: 'Review TypeScript',
          completed: true,
        },
      ],
    },
  ])

  const addNote = () => {
    const newNote: Note = {
      id: Date.now(),
      label: 'NEW NOTE',
      footer: 'A little space for you ♡',
      color: 'blue',
      content: [
        {
          id: Date.now(),
          type: 'paragraph',
          text: '',
        },
      ],
    }

    setNotes((currentNotes) => [...currentNotes, newNote])
  }

  const updateNoteContent = (noteId: number, content: NoteBlock[]) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === noteId
          ? { ...note, content }
          : note
      )
    )
  }

  const deleteNote = (id: number) => {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== id)
    )
  }

  const updateNoteColor = (id: number, color: NoteColor) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id
          ? { ...note, color }
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

        <button className="add-note-btn" onClick={addNote}>
          <span>+</span> Add a note
        </button>
      </div>

      <div className="notes-container">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={deleteNote}
            onColorChange={updateNoteColor}
            onContentChange={updateNoteContent}
          />
        ))}
      </div>
    </section>
  )
}

export default Workspace