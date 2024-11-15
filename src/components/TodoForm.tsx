import { useRef } from "react";
import { TodoItemType } from "../types";

import c from './TodoForm.module.css'

let globalID = 0;
type TodoFormProps = {
  addTodo : (todo :TodoItemType) => void;
}

export const TodoForm = ( { addTodo } :TodoFormProps) => {

  const input = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if(input.current){
      if(!input.current.value)
        return;
      const ntodo :TodoItemType = {
        id: ++globalID,
        name: 'nuevo',
        description: input.current.value,
        done: false,
      }
      addTodo(ntodo);
      input.current.value='';
    }
      
  }

  return (
    <form action="#" className={c.form}>
      <div className={c.container}>
        <button aria-label="submit" 
                className={c.btn}
                onClick={()=>handleSubmit()}
        />
        <input ref={input} 
               aria-label="Enter new task"
               type="text"  
               placeholder="Create a new todo..." 
               className={c.newtodo}
        />
      </div>
    </form>
  )
}
