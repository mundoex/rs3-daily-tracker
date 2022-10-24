import './App.css';
import { Main } from './components/Main';
import { ActivityProvider } from './context/ActivityContext';

function App() {
  return (
    <div className="App">
      <ActivityProvider>
        <Main/>
      </ActivityProvider>
    </div>
  );
}

export default App;
