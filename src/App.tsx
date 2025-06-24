import React, { createContext, useContext, useMemo, useCallback, useState, useEffect } from 'react';
import Card from './components/Card';
import './App.css';

interface CardType {
  id: number;
  title: string;
  writer: string;
  text: string;
}

interface UsercontextType {
  defaultTodo: CardType;
}

const Usercontext = createContext({});

export default function App(){
  const [defaultTodo, setDefaultTodo] = useState({id: 0, title: '제목을 입력하지 않았습니다.', writer: '작성자를 입력하지 않았습니다.', text: '내용을 입력하지 않았습니다.'});
  return(
    <Usercontext.Provider value={{defaultTodo,}}>
      <TodoList />
    </Usercontext.Provider>
  )
}

function TodoList(){
  const { defaultTodo } = useContext(Usercontext);
  const [todoList, setTodoList] = useState<CardType[]>([]);
  const [titleInputValue, setTitleInputValue] = useState('');
  const [contentInputValue, setContentInputValue] = useState('');
  const [writerInputValue, setWriterInputValue] = useState('');

  const handleClick = () => {
    const newTodo = {
      id: Date.now(),
      title: titleInputValue || defaultTodo.title,
      writer: writerInputValue || defaultTodo.writer,
      text: contentInputValue || defaultTodo.text
    }
    setTodoList(prev => [...prev, newTodo]);
    setTitleInputValue('');
    setContentInputValue('');
    setWriterInputValue('');
  }

  const handleDelete = (id: number) => {
    setTodoList(prev => prev.filter(todo => todo.id !== id));
  };


  return(
    <div className='container'>
      <header>
        <span className='header-title'>Todo List</span>
      </header>
      <div className='upload'>
        <input className='input-title' type='text' value={titleInputValue} placeholder='제목을 입력하세요' onChange={(e) => setTitleInputValue(e.target.value)} />
        <textarea className='input-content' value={contentInputValue} placeholder='내용을 입력하세요' onChange={(e) => setContentInputValue(e.target.value)}/>
        <input className='input-writer' type='text' value={writerInputValue} placeholder='작성자 이름' onChange={(e) => setWriterInputValue(e.target.value)}/>
        <button className='upload-button' onClick={handleClick}>등록</button>
      </div>
      <hr className='line' />
      <div className='lists'>
        {todoList.map((todo, index) => (
          <Card 
          id={todo.id}
          order={index+1}
          title={todo.title}
          writer={todo.writer}
          text={todo.text}
          onDelete={handleDelete}
        />
        ))}
        
      </div>
    </div>
  )
}