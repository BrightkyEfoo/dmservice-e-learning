import './App.css';
// import Antonyms from './components/Antonyms/Antonyms';
import WordGrid from './components/WordGrid/WordGrid';
import { DndProvider } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Antonyms from './components/dnd/Antonyms';
import { MousePosActions } from './rtk/features/MousePos';
import Synonyms from './components/dnd/Synonyms';
import Paragraph from './components/paragraph/Paragraph';
import Memoires from './components/Memoires/Memoires';
function App() {
  const dispatch = useDispatch()
  const handleMouseMove = e => {
    dispatch(MousePosActions.set({x : e.clientX , y : e.clientY}))
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App" onMouseMove={handleMouseMove}>
        {/* <WordGrid/> */}
        {/* <Antonyms  /> */}
        {/* <Synonyms/> */}
        {/* <Paragraph/> */}
        <Memoires />
      </div>
    </DndProvider>
  );
}

export default App;
