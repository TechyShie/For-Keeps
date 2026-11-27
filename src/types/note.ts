export type NoteColor = 
| 'lavender'
| 'butter'
| 'blue'
| 'rose'

export interface HeadingBlock {
    id: number
    type: 'heading'
    text: string
}

export interface  ParagraphBlock{
    id: number
    type: 'paragraph'
    text: string
}

export interface TaskBlock{
    id: number
    type: 'task'
    text: string
    completed: boolean
}

export  type NoteBlock = 
| HeadingBlock
| ParagraphBlock
| TaskBlock

export interface Note {
    id: number
    label: string
    footer: string
    color: NoteColor
    paper: NotePaper
    content: NoteBlock[]
    x: number
    y: number
    zIndex: number
}

export type NotePaper = 'sticky' | 'notebook'