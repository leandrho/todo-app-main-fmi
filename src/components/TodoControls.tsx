import { forwardRef, useId } from 'react';
import c from './TodoControls.module.css'

type TodoListControlsProps = {
    filterTodos: (id:string) => void;
}

export const TodoControls = forwardRef<HTMLInputElement, TodoListControlsProps>(({filterTodos }, ref) => {
    const idi= useId();
  return (
    <div className={c.controls}>
            <input ref={ref} type="radio" id={idi+'all'} name='show' 
              className={c.input__control}
              onChange={()=>filterTodos('all')}
            />
            <label htmlFor={idi+'all'} className={c.input__control_label}>All</label>
            <input type="radio" id={idi+'active'} name='show' 
                   className={c.input__control}
                   onChange={()=>filterTodos('active')}
            />
            <label htmlFor={idi+'active'} className={c.input__control_label}>Active</label>
            <input type="radio" id={idi+'completed'} name='show' 
              className={c.input__control}
              onChange={()=>filterTodos('completed')}
            />
            <label htmlFor={idi+'completed'} className={c.input__control_label}>Completed</label>
    </div>
  )
})
