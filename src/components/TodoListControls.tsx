import { forwardRef } from 'react';

import c from './TodoListControls.module.css'
import { TodoControls } from './TodoControls';

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
          <div className={c.desk}>
            <TodoControls filterTodos={filterTodos} ref={ref}/>
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
