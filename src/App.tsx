import './App.css';
import { Main } from './components/Main';
import { ActivityProvider } from './context/ActivityContext';
import { NotesProvider } from './context/NotesContext';

function App() {
  return (
    <div className="App">
      <ActivityProvider>
        <NotesProvider>
        <Main/>
        </NotesProvider>
      </ActivityProvider>
    </div>
  );
}

export default App;
