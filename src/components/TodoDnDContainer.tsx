import c from './TodoDnDContainer.module.css'
import { TodoItemType } from '../types';
import { TodoItem } from './TodoItem';
import { useState, DragEvent } from 'react';

type TodoDnDContainerProps = {
    items :TodoItemType[];
    removeItem: (id:number) => void;
    modifyItem: (todo:TodoItemType)=>void;
    updateContent :(items :TodoItemType[])=>void
}

export const TodoDnDContainer = ({items, removeItem, modifyItem, updateContent}:TodoDnDContainerProps) => {

    const [curDragId, setCurDragId] = useState<string>('')
    const [lastVisited, setLastVisited] = useState<string>('')

    const dragStart = (e: DragEvent<HTMLDivElement>) => {
        const elem :HTMLDivElement = e.target as HTMLDivElement;
        setCurDragId(elem.id);
        setLastVisited(elem.id);
    }
    const drop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setCurDragId('');
    }
    const dragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        let newList = items;
        const elem :HTMLDivElement = e.currentTarget as HTMLDivElement;
        const enterId :string = elem.id+"";
        console.log('curID : ', curDragId);
        console.log('EnterID: ', enterId);
        console.log('LastVisitedID: ', lastVisited)

        if( lastVisited == enterId)
            return;

        setLastVisited(enterId);
        if( enterId == curDragId)
            return;

        const oi:number = newList.findIndex((item)=> item.id+'' == curDragId);
        const di:number = newList.findIndex((item)=> item.id+'' == enterId);

        [newList[oi],newList[di]] = [newList[di],newList[oi]];
        updateContent(newList);
    }
    return (
        <div className={c.container}>
            {
            items.map(( todo )=>(
                <div key={todo.id} 
                   className={ curDragId == todo.id+'' ? c.dropzone+'':''}
                    onDragStart={ dragStart }
                    onDrop={ drop }
                    onDragOver={(e)=>e.preventDefault()}
                    onDragEnter={ dragEnter }
                    id={ todo.id+'' }
                    draggable
                >
                    <TodoItem  item={todo} removeItem={removeItem} modifyItem={modifyItem}/>
                    <hr className={c.line}/>
                </div>
            ))
            }
        </div>
  )
}
