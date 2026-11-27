
import { useState } from 'react'
import NoteCard from '../../components/NoteCard'

import type {
  Note,
  NoteColor,
  NoteBlock,
  NotePaper,
} from '../../types/note'

function Workspace() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      label: 'A LITTLE REMINDER',
      footer: 'Made with a little care ♡',
      color: 'lavender',
      paper: 'sticky',
      x: 40,
      y: 30,
      zIndex: 1,
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
      paper: 'notebook',
      x: 340,
      y: 80,
      zIndex: 2,
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

  const [showCreateMenu, setShowCreateMenu] = useState(false)

  const [activeNoteId, setActiveNoteId] = useState<number | null>(null)

  const addNote = (paper: NotePaper) => {
    const newNote: Note = {
      id: Date.now(),
      label: paper === 'sticky' ? 'NEW NOTE' : 'NEW PAGE',
      footer: 'A little space for you ♡',
      color: 'blue',
      paper,
      x: 80,
      y: 60,
      zIndex: Date.now(),
      content: [
        {
          id: Date.now() + 1,
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

  const bringToFront = (id: number) => {
    setNotes((currentNotes) => {
      const highestZIndex = Math.max(
        ...currentNotes.map((note) => note.zIndex),
        0
      )

      return currentNotes.map((note) =>
        note.id === id
          ? { ...note, zIndex: highestZIndex + 1 }
          : note
      )
    })
  }

  const startDragging = (id: number) => {
    setActiveNoteId(id)
    bringToFront(id)
  }

  const moveNote = (id: number, x: number, y: number) => {
    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === id
          ? { ...note, x, y }
          : note
      )
    )
  }

  const stopDragging = () => {
    setActiveNoteId(null)
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

        <div className="create-note-wrapper">
          <button
            className="add-note-btn"
            onClick={() => setShowCreateMenu(!showCreateMenu)}
            aria-expanded={showCreateMenu}
          >
            <span>+</span> Add a note
          </button>

          {showCreateMenu && (
            <div className="create-note-menu">
              <button
                onClick={() => {
                  addNote('sticky')
                  setShowCreateMenu(false)
                }}
              >
                <span>🗒️</span>
                <div>
                  <strong>Sticky note</strong>
                  <small>For quick thoughts</small>
                </div>
              </button>

              <button
                onClick={() => {
                  addNote('notebook')
                  setShowCreateMenu(false)
                }}
              >
                <span>📖</span>
                <div>
                  <strong>Notebook page</strong>
                  <small>For longer notes and lists</small>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="notes-container">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={deleteNote}
            onColorChange={updateNoteColor}
            onContentChange={updateNoteContent}
            isActive={activeNoteId === note.id}
            onDragStart={startDragging}
            onDrag={moveNote}
            onDragEnd={stopDragging}
          />
        ))}
      </div>
    </section>
  )
}

export default Workspace
