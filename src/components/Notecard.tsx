interface NoteCardProps {
  id: number
  label: string
  title: string
  footer: string
  onUpdate: (id: number, title: string) => void
}

function NoteCard({
  id,
  label,
  title,
  footer,
  onUpdate,
}: NoteCardProps) {
  return (
    <article className="note-preview">
      <div className="note-pin">✳</div>

      <p className="note-label">{label}</p>

      <textarea
        className="note-content"
        value={title}
        onChange={(event) => onUpdate(id, event.target.value)}
        placeholder="Write something..."
      />

      <p className="note-footer">{footer}</p>
    </article>
  )
}

export default NoteCard