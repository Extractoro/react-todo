import React from 'react'
import { useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import s from '../styles/modules/app.module.scss'
import TodoItem from './TodoItem'

const contentVariant = {
   hidden: { opacity: 1 },
   visible: {
      opacity: 1,
      scale: 1,
      transition: {
         staggerChildren: 0.2,
      },
   },
}

const child = {
   hidden: { y: 20, opacity: 0 },
   visible: {
      y: 0,
      opacity: 1,
   },
}

const AppContent = () => {
   const filterStatus = useSelector((state) => state.todo.filterStatus)
   const todoList = useSelector((state) => state.todo.todoList)
   const sortedList = [...todoList]
   sortedList.sort((a, b) => new Date(b.time) - new Date(a.time))

   const filteredTodoList = sortedList.filter((item) => {
      if (filterStatus === 'all') {
         return true
      }
      return item.status === filterStatus
   })

   return (
      <motion.div
         className={s.content__wrapper}
         variants={contentVariant}
         initial="hidden"
         animate="visible"
      >
         <AnimatePresence>
            {filteredTodoList && filteredTodoList.length > 0 ? (
               filteredTodoList.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
               ))
            ) : (
               <motion.p className={s.emptyText} variants={child}>
                  No Todos
               </motion.p>
            )}
         </AnimatePresence>
      </motion.div>
   )
}

export default AppContent
