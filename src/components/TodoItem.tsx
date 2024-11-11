import { useId, useRef } from 'react';
import { TodoItemType } from '../types/index';

type TodoItemProps = {
    item: TodoItemType,
    removeItem: (id:number) => void;
    modifyItem: (todo:TodoItemType)=>void;
}

export const TodoItem = ({ item, removeItem, modifyItem }:TodoItemProps) => {

  const input = useRef<HTMLInputElement>(null);
  const id = useId();

  const checkinput = useRef<HTMLInputElement>(null);
  const changeDone = ()=>{
    if(checkinput.current){
      const d :boolean = checkinput.current.checked;
      const mitem :TodoItemType = {...item, done: d};
      modifyItem(mitem);
    }
    
  }

  return (
    <div className=''>
      <div className="">
        <div className=''>
            <input ref={checkinput} id={id} type='checkbox' aria-label="submit" 
                  className=""
                  checked={item.done}
                  onChange={()=>changeDone()}
            />
            <label htmlFor={id} aria-label="submit label" className=''>
              <img src="./images/icon-check.svg" alt="" />
            </label>
            <input ref={input} aria-label="Enter new task" type="text" className="" value={item.description} readOnly/>
        </div>

        <button className=''
                onClick={()=>removeItem(item.id)}
        >
            <img src="./images/icon-cross.svg" alt="" />
        </button>
        
      </div>
    </div>
  )
}
