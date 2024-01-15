import React from 'react'
import { useSelector } from 'react-redux'
import s from '../styles/modules/app.module.scss'
import TodoItem from './TodoItem'

const AppContent = () => {
   const todoList = useSelector((state) => state.todo.todoList)
   const sortedList = [...todoList]
   sortedList.sort((a, b) => new Date(b.time) - new Date(a.time))

   return (
      <div className={s.content__wrapper}>
         {
            sortedList && sortedList.length > 0
               ? sortedList.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                 ))
               : ''
            // <p className={styleTodo.todoF}>No Todos</p>
         }
      </div>
   )
}

export default AppContent
