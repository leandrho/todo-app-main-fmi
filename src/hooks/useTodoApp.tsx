import { useState } from 'react'
import type { TodoItemType } from '../types';

export const useTodoApp = () => {
    
    const [todoList, setTodoList] = useState<TodoItemType[]>([]);

    const addTodo = (todo:TodoItemType) => {
        setTodoList([...todoList, todo]);//need to check for duplicates? 
    }
    const removeTodo = (id :number) => {
        setTodoList(todoList.filter( todo => todo.id !== id))
    }
    const modifyTodo = ( todo :TodoItemType ) => {
        setTodoList( todoList.map( t => {
            if(t.id == todo.id)
                return todo;
            return t;
        }) );
    }
    const clearCompleted = () => {
        setTodoList(todoList.filter((t)=>!t.done));
    }
    return {
        todoList,
        addTodo,
        removeTodo,
        modifyTodo,
        clearCompleted,
    };
}
