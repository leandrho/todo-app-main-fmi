import { forwardRef } from 'react';

import c from './TodoListControls.module.css'

type TodoListControlsProps = {
    itemsLeft :number;
    filterTodos: (id:string) => void;
    clearCompleted: ()=>void;
}

export const TodoListControls = forwardRef<HTMLInputElement, TodoListControlsProps>(({itemsLeft, filterTodos, clearCompleted }, ref) => {
  return (
    <>
     <div className={c.container}>
          <p className={c.items}>
            {itemsLeft} items left
          </p>
          <div className={c.controls}>
            <input ref={ref} type="radio" id='all' name='show' 
              className={c.input__control}
              onChange={()=>filterTodos('all')}
            />
            <label htmlFor="all" className={c.input__control_label}>All</label>
            <input type="radio" id='active' name='show' 
                   className={c.input__control}
                   onChange={()=>filterTodos('active')}
            />
            <label htmlFor="active" className={c.input__control_label}>Active</label>
            <input type="radio" id='completed' name='show' 
              className={c.input__control}
              onChange={()=>filterTodos('completed')}
            />
            <label htmlFor="completed" className={c.input__control_label}>Completed</label>
          </div>
          <div>
            <button className={c.clear}
                    onClick={()=>clearCompleted()}
            >
              Clear completed
            </button>
          </div>
        </div>
    </>
  )
})
