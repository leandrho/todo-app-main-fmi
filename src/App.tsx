import { useRef, useState } from "react";

import { useTodoApp } from "./hooks/useTodoApp"

import { TodoForm, TodoList } from './components';

import c from './App.module.css'

function App() {
  const appref = useRef<HTMLDivElement>(null)
  const { todoList, addTodo, removeTodo, modifyTodo, clearCompleted, updateOrder } = useTodoApp();
  const [theme, setTheme] = useState(false)

  const themeCheck = useRef<HTMLInputElement>(null);
  const changeTheme = () => {
      const body :HTMLElement = document.body;
      if(theme){
        body.classList.remove('dark');
        body.classList.add('light');
        if(appref.current){
            appref.current.classList.remove('darka');
            appref.current.classList.add('lighta');
        }
      } 
      else{
        body.classList.add('dark')
        body.classList.remove('light')
        if(appref.current){
            appref.current.classList.remove('lighta');
            appref.current.classList.add('darka');
        }
      }
      setTheme(!theme);
  }
  return (
    <div ref={appref} className={c.app + ' lighta'}>
      <section className={c.container}>
          <header className={c.header}>
            <h1 className={c.title}>TODO</h1>
            <div>
              <input ref={themeCheck} type="checkbox" name="theme" id="theme" className={c.theme__input} onChange={()=>changeTheme()}/>
              <label htmlFor="theme" className={c.theme__icon} aria-label="icon theme"></label>
            </div>
          </header>
          <main className={c.main}>
            <TodoForm addTodo={addTodo}/>
            {
              todoList.length?<TodoList items={todoList} removeItem={removeTodo} modifyItem={modifyTodo} clearCompleted={clearCompleted} updateOrder={updateOrder}/>:null
            }
          </main>
      </section>
      <footer className={c.footer}>
            <p>Drag and drop to reorder list</p>
      </footer>
    </div>
  )
}

export default App
