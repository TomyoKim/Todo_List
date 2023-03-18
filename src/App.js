import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
import { useState, useRef } from 'react';

const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: 'React 공부하기',
    createdDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: '빨래 널기',
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content:'노래 연습하기',
    createdDate: new Date().getTime(),
  },
];

function App() {
  const idRef = useRef(3);
  const [todo, setTodo] = useState(mockTodo);
  const onCreate = (content) => {
    const newItem = {
      id: idRef.current,
      content,
      isDo: false,
      createdDate: new Date().getTime(),
    };
    setTodo([newItem, ...todo]);
    idRef.current+=1;
  };
  const onUpdate = (targetID) => {
    setTodo(
      todo.map((it)=>
      it.id === targetID ? {...it, isDone: !it.isDone} : it    
      )
    );
  };
  const onDelete = (targetID) => {
    setTodo(todo.filter((it)=> it.id !==targetID));
  };

  return (
    <div className="App">
      <Header/>
      <TodoEditor onCreate={onCreate}/>
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
