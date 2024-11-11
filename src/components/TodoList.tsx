import { useEffect, useRef, useState } from 'react';
import { TodoItemType } from '../types';
import { TodoItem } from './TodoItem';

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
    <div className=''>
        {
            showItems.map(( todo )=>(
                <div key={todo.id}>
                  <TodoItem  item={todo} removeItem={removeItem} modifyItem={modifyItem}/>
                  <hr />
                </div>
            ))
        }
        <div className=''>
          <p className=''>
            {showItems.reduce(( acc, c ) => c.done ? acc : acc+1 , 0)} items left
          </p>
          <div className=''>
            <input ref={allInput} type="radio" id='all' name='show' className=''
               onChange={()=>filterTodos('all')}
            />
            <label htmlFor="all" className=''>All</label>
            <input type="radio" id='active' name='show' 
                   className=''
                   onChange={()=>filterTodos('active')}
            />
            <label htmlFor="active" className=''>Active</label>
            <input type="radio" id='completed' name='show' className=''
              onChange={()=>filterTodos('completed')}
            />
            <label htmlFor="completed" className=''>Completed</label>
          </div>
          <div>
            <button className=''
                    onClick={()=>clearCompleted()}
            >
              Clear completed
            </button>
          </div>
        </div>
    </div>
  )
}
