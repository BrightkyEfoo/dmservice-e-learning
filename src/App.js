import './App.css';
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  Routes,
} from 'react-router-dom';
// import Antonyms from './components/Antonyms/Antonyms';
import WordGrid from './components/WordGrid/WordGrid';
// import { DndProvider } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
// import { HTML5Backend } from 'react-dnd-html5-backend';
import Antonyms from './components/dnd/Antonyms';
import { MousePosActions } from './rtk/features/MousePos';
import Synonyms from './components/dnd/Synonyms';
import Paragraph from './components/paragraph/Paragraph';
import Memoires from './components/Memoires/Memoires';
import Intrus from './components/Intrus/Intrus';
function App() {
  const dispatch = useDispatch();
  const handleMouseMove = e => {
    dispatch(MousePosActions.set({ x: e.clientX, y: e.clientY }));
  };
  return (
    <Router>
      <div className="App" onMouseMove={handleMouseMove}>
        <Routes>
          <Route path="/wordgrid" element={<WordGrid />} />
          <Route path="/memories" element={<Memoires />} />
          <Route path="/antonyms" element={<Antonyms />} />
          <Route path="/synonyms" element={<Synonyms />} />
          <Route path="/paragraph" element={<Paragraph />} />
          <Route path="/intrus" element={<Intrus />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
