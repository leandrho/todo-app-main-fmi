import { useEffect, useRef, useState } from 'react';
import { TodoItemType } from '../types';

import c from './TodoList.module.css'
import { TodoListControls } from './TodoListControls';
import { TodoDnDContainer } from './TodoDnDContainer';

type TodoListProps = {
    items :TodoItemType[];
    removeItem: (id:number) => void;
    modifyItem: (todo:TodoItemType)=>void;
    clearCompleted: ()=>void;
    updateOrder :(items :TodoItemType[])=>void
}

export const TodoList = ({ items, removeItem, modifyItem, clearCompleted, updateOrder }:TodoListProps) => {

  const allInput = useRef<HTMLInputElement>(null);
  const [showItems, setShowItems] = useState<TodoItemType[]>([]);

  const updateContent = (its :TodoItemType[])=>{
    updateOrder(its);
  }

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
       <TodoDnDContainer items={showItems} updateContent={updateContent} removeItem={removeItem} modifyItem={modifyItem} />
       <TodoListControls itemsLeft={items.reduce(( acc, cur ) => cur.done ? acc : acc+1 , 0)} filterTodos={filterTodos} clearCompleted={clearCompleted} ref={allInput}/>
    </div>
  )
}
