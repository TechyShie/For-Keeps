type NoteColor = 'lavender' | 'butter' | 'blue' | 'rose'

interface NoteCardProps {
  id: number
  label: string
  title: string
  footer: string
  color: NoteColor
  onUpdate: (id: number, title: string) => void
  onDelete: (id: number) => void
  onColorChange: (id: number, color: NoteColor) => void
}

function NoteCard({
  id,
  label,
  title,
  footer,
  color,
  onUpdate,
  onDelete,
  onColorChange,
}: NoteCardProps) {
  const colors: NoteColor[] = [
    'lavender',
    'butter',
    'blue',
    'rose',
  ]

  return (
    <article className={`note-preview note-${color}`}>
      <div className="note-pin">✳</div>

      <button
        className="delete-note-btn"
        onClick={() => onDelete(id)}
        aria-label="Delete note"
        title="Delete note"
      >
        ×
      </button>

      <p className="note-label">{label}</p>

      <textarea
        className="note-content"
        value={title}
        onChange={(event) => onUpdate(id, event.target.value)}
        placeholder="Write something..."
      />

      <p className="note-footer">{footer}</p>

      <div className="note-colors">
        {colors.map((noteColor) => (
          <button
            key={noteColor}
            className={`color-swatch swatch-${noteColor}`}
            onClick={() => onColorChange(id, noteColor)}
            aria-label={`Change note color to ${noteColor}`}
            aria-pressed={color === noteColor}
            title={noteColor}
          />
        ))}
      </div>
    </article>
  )
}

export default NoteCard
