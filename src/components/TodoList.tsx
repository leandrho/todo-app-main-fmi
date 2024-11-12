import { useEffect, useRef, useState } from 'react';
import { TodoItemType } from '../types';
import { TodoItem } from './TodoItem';

import c from './TodoList.module.css'
import { TodoListControls } from './TodoListControls';

type TodoListProps = {
    items :TodoItemType[];
    removeItem: (id:number) => void;
    modifyItem: (todo:TodoItemType)=>void;
    clearCompleted: ()=>void;
}

export const TodoList = ({ items, removeItem, modifyItem, clearCompleted }:TodoListProps) => {

  const allInput = useRef<HTMLInputElement>(null);
  const [showItems, setShowItems] = useState<TodoItemType[]>([]);

  useEffect(() => {
    setShowItems(items);
    if(allInput.current)
      allInput.current.checked = true;
  }, [ items ])
  
  const filterTodos = (filter :string) => {
    if(filter==='active')
      setShowItems(items.filter((i)=>!i.done));
    else if(filter === 'completed')
      setShowItems(items.filter((i)=>i.done));
    else
      setShowItems(items);
  }

  return (
    <div className={c.container}>
        {
          showItems.map(( todo )=>(
              <div key={todo.id} 
                   className='list'
              >
                <TodoItem  item={todo} removeItem={removeItem} modifyItem={modifyItem}/>
                <hr className={c.line}/>
              </div>
          ))
        }
       <TodoListControls itemsLeft={items.reduce(( acc, cur ) => cur.done ? acc : acc+1 , 0)} filterTodos={filterTodos} clearCompleted={clearCompleted} ref={allInput}/>
    </div>
  )
}
