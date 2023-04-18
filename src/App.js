import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
import {useCallback, useReducer, useRef } from 'react';

const mockTodo = [
  // {
  //   id: 0,
  //   isDone: false,
  //   content: 'React 공부하기',
  //   createdDate: new Date().getTime(),
  // },

];
function reducer(state, action){
  switch(action.type){
    case 'CREATE':{
      return [action.newItem, ...state];
    }
    case 'UPDATE':{
      return state.map((it) =>
      it.id === action.targetID
      ? {
        ...it,
        isDone: !it.isDone,
        }
      : it
      );
    }
    case 'DELETE':{
      return state.filter((it) => it.id !== action.targetID);
    }
    default:
      return state;
  }
}

function App() {
  const idRef = useRef(3);
  const [todo, dispatch] = useReducer(reducer, mockTodo);

  const onCreate = (content) => {
    dispatch({
      type: 'CREATE',
      newItem:{
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    });
    idRef.current+=1;
  };
  const onUpdate = useCallback((targetID) => {
    dispatch({
      type: 'UPDATE',
      targetID,
    });
  },[]);
  const onDelete = useCallback((targetID) => {
    dispatch({
      type: 'DELETE',
      targetID,
    });
  },[]);

  return (
    <div className="App">
      <Header/>
      <TodoEditor onCreate={onCreate}/>
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
