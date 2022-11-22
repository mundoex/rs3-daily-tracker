import { createContext, useState } from 'react';

interface INotesContext{
    notes:string;

    // eslint-disable-next-line no-unused-vars
    updateNotes:(text:string) => void;
}

const NotesContext = createContext<INotesContext|null>(null);

interface ActivityProviderProps{
    // eslint-disable-next-line no-undef
    children:JSX.Element;
}

function loadNotes() : string {
  // eslint-disable-next-line no-undef
  return localStorage.getItem('notes') || '';
}

function saveNotes(notes:string) {
  // eslint-disable-next-line no-undef
  localStorage.setItem('notes', notes);
}

export function NotesProvider(props:ActivityProviderProps) {
  const [notes, setNotes] = useState<string>(loadNotes());

  const updateNotes = (text:string) => {
    setNotes(text);
    saveNotes(text);
  };

  return <NotesContext.Provider value={{ notes, updateNotes }}>
    {props.children}
    </NotesContext.Provider>;
}

export default NotesContext;
