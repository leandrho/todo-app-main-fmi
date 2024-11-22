import { forwardRef } from 'react';
import c from './TodoControls.module.css'

type TodoListControlsProps = {
    filterTodos: (id:string) => void;
}

export const TodoControls = forwardRef<HTMLInputElement, TodoListControlsProps>(({filterTodos }, ref) => {
  return (
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
  )
})
