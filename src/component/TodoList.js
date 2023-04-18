import './TodoList.css';
import TodoItem from './TodoItem';
import { useMemo, useState } from 'react';

const TodoList = ({todo, onUpdate, onDelete}) => {
    const[search, setSearch]= useState('');
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }
    const getSearchResult = () => {
        return search ===''
        ? todo
        : todo.filter((it)=>
        it.content.toLowerCase().includes(search.toLowerCase()));
    }

    const analyzeTodo = useMemo(() => {
        const totalCount = todo.length;
        const doneCount = todo.filter((it) => it.isDone).length;
        const notDonecount = totalCount - doneCount;
        return{
            totalCount,
            doneCount,
            notDonecount,
        };
    }, [todo]);

    const {totalCount, doneCount, notDonecount} = analyzeTodo;
    
    return(
        <div className='TodoList'>
            <h4>Todo List 🍀</h4>
            <div>
                <div>총개수: {totalCount}</div>
                <div>완료된 할 일: {doneCount}</div>
                <div>아직 완료되지 못한 할 일: {notDonecount}</div>
            </div>
            <input
            value={search}
            onChange={onChangeSearch} 
            className='searchbar' 
            placeholder='검색어를 입력하세요' 
            />
            <div className='list_wrapper'>
                {
                    getSearchResult().map((it)=>(
                        <TodoItem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete}/>
                    ))
                }
            </div>
        </div>
    );
};

export default TodoList;