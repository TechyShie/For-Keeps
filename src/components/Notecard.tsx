import { useRef } from 'react'
import type { Note, NoteColor, NoteBlock } from '../types/note'

interface NoteCardProps {
  note: Note
  onDelete: (id: number) => void
  onColorChange: (id: number, color: NoteColor) => void
  onContentChange: (id: number, content: NoteBlock[]) => void
  isActive: boolean
  onDragStart: (id: number) => void
  onDrag: (id: number, x: number, y: number) => void
  onDragEnd: () => void
}

function NoteCard({
  note,
  onDelete,
  onColorChange,
  onContentChange,
  isActive,
  onDragStart,
  onDrag,
  onDragEnd,
}: NoteCardProps) {
  const dragOffset = useRef({ x: 0, y: 0 })

  const colors: NoteColor[] = [
    'lavender',
    'butter',
    'blue',
    'rose',
  ]

  const updateBlock = (blockId: number, text: string) => {
    const updatedContent = note.content.map((block) =>
      block.id === blockId
        ? { ...block, text }
        : block
    )

    onContentChange(note.id, updatedContent)
  }

  const toggleTask = (blockId: number) => {
    const updatedContent = note.content.map((block) =>
      block.id === blockId && block.type === 'task'
        ? { ...block, completed: !block.completed }
        : block
    )

    onContentChange(note.id, updatedContent)
  }

  const addBlock = (type: NoteBlock['type']) => {
    const newBlock: NoteBlock =
      type === 'task'
      ? {
        id: Date.now(),
        type: 'task',
        text: '',
        completed: false,
      }
      :{
        id: Date.now(),
        type,
        text: '',
      }

    onContentChange(note.id,[...note.content, newBlock])

        }


  const deleteBlock = (blockId: number) => {
    const updatedContent = note.content.filter(
      (block) => block.id !== blockId
    )

    onContentChange(note.id, updatedContent)
  }

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const noteElement = event.currentTarget.parentElement

    if (!noteElement) return

    const rect = noteElement.getBoundingClientRect()

    dragOffset.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }

    onDragStart(note.id)
  }

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (event.buttons !== 1) return

    const workspace = event.currentTarget.closest('.notes-container')

    if (!workspace) return

    const workspaceRect = workspace.getBoundingClientRect()

    const x =
      event.clientX -
      workspaceRect.left -
      dragOffset.current.x

    const y =
      event.clientY -
      workspaceRect.top -
      dragOffset.current.y

    onDrag(
      note.id,
      x,
      y
    )
  }

  return (
    <article
      className={`note-preview note-${note.color} note-${note.paper}${isActive ? ' note-active' : ''}`}
      style={{
        left: note.x,
        top: note.y,
        zIndex: note.zIndex,
      }}
    >
      <div
        className="note-drag-handle"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onDragStart={(event) => event.preventDefault()}
      >
        <span>✳</span>
        <span>Drag note</span>
      </div>

      <div className="note-pin">✳</div>

      <button
        className="delete-note-btn"
        onClick={() => onDelete(note.id)}
        aria-label="Delete note"
        title="Delete note"
      >
        ×
      </button>

      <p className="note-label">{note.label}</p>

      <div className="note-toolbar">
        <button onClick={() => addBlock('heading')}>
          +Heading
        </button>

        <button onClick={() => addBlock('paragraph')}>|
          +Text
        </button>

        <button onClick={() => addBlock('task')}>
          +Task
        </button>
      </div>

      <div className="note-content-area">
        {note.content.map((block) => {
          if (block.type === 'heading') {
            return (
              <div className="note-block" key={block.id}>
                <input
                  className="note-heading-input"
                  value={block.text}
                  onChange={(event) =>
                    updateBlock(block.id, event.target.value)
                  }
                  placeholder="Heading..."
                />

                <button
                  className="delete-block-btn"
                  onClick={() => deleteBlock(block.id)}
                  aria-label="Delete heading"
                  title="Delete heading"
                >
                  ×
                </button>
              </div>
            )
          }

          if (block.type === 'paragraph') {
            return (
              <div className="note-block" key={block.id}>
                <textarea
                  className="note-paragraph-input"
                  value={block.text}
                  onChange={(event) =>
                    updateBlock(block.id, event.target.value)
                  }
                  placeholder="Write something..."
                />

                <button
                  className="delete-block-btn"
                  onClick={() => deleteBlock(block.id)}
                  aria-label="Delete paragraph"
                  title="Delete paragraph"
                >
                  ×
                </button>
              </div>
            )
          }

          if (block.type === 'task') {
            return (
              <div className="note-block" key={block.id}>
                <div className="note-task">
                  <input
                    type="checkbox"
                    checked={block.completed}
                    onChange={() => toggleTask(block.id)}
                  />

                  <input
                    className={block.completed ? 'task-completed' : ''}
                    value={block.text}
                    onChange={(event) =>
                      updateBlock(block.id, event.target.value)
                    }
                    placeholder="Add a task..."
                  />
                </div>

                <button
                  className="delete-block-btn"
                  onClick={() => deleteBlock(block.id)}
                  aria-label="Delete task"
                  title="Delete task"
                >
                  ×
                </button>
              </div>
            )
          }

          return null
        })}
      </div>

      <p className="note-footer">{note.footer}</p>

      <div className="note-colors">
        {colors.map((color) => (
          <button
            key={color}
            className={`color-swatch swatch-${color}`}
            onClick={() => onColorChange(note.id, color)}
            aria-label={`Change note color to ${color}`}
            aria-pressed={note.color === color}
            title={color}
          />
        ))}
      </div>
    </article>
  )
}

export default NoteCard