import { useId, useRef } from 'react';
import { TodoItemType } from '../types/index';
import c from './TodoItem.module.css';


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
    <div className={c.container}>
      <div className={c.item}>
        <div className={c.item__content}>
          <input ref={checkinput} 
                id={id} 
                type='checkbox' 
                aria-label="submit" 
                className={c.item__checkbox}
                checked={item.done}
                onChange={()=>changeDone()}
          />
          <label htmlFor={id} 
                  aria-label="submit label" 
                  className={c.item__label}
          >
          </label>
          <input ref={input}
                  id={id + '_titem_text'} 
                  aria-label="Todo text" 
                  type="text" 
                  className={c.item__text}
                  value={item.description} 
                  readOnly
          />
        </div>
        <button className={c.item__btn}
                aria-label='remove item'
                onClick={()=>removeItem(item.id)}
        >
          <svg className={c.item__btn_svg} xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="currentColor" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
        </button>   
      </div>
    </div>
  )
}
