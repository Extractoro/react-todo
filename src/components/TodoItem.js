import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import s from '../styles/modules/todoItem.module.scss'
import { multipleClasses } from '../utils/multipleClasses'
import { deleteTodo, updateTodo } from '../slice/todoSlice'
import TodoModal from './TodoModal'
import CheckButton from './CheckButton'

const child = {
   hidden: { y: 20, opacity: 0 },
   visible: {
      y: 0,
      opacity: 1,
   },
}

const TodoItem = ({ todo }) => {
   const dispatch = useDispatch()
   const [checked, setChecked] = useState(false)
   const [updateModalOpen, setUpdateModalOpen] = useState(false)

   useEffect(() => {
      if (todo.status === 'complete') {
         setChecked(true)
      } else {
         setChecked(false)
      }
   }, [todo.status])

   const handleDelete = () => {
      dispatch(deleteTodo(todo.id))
      toast.success('Todo deleted!')
   }

   const handleUpdate = () => {
      setUpdateModalOpen(true)
   }

   const handleCheck = () => {
      setChecked(!checked)
      dispatch(
         updateTodo({
            ...todo,
            status: checked ? 'incomplete' : 'complete',
         }),
      )
   }

   return (
      <>
         <motion.div className={s.item} variants={child}>
            <div className={s.todoDetails}>
               <CheckButton checked={checked} handleCheck={handleCheck} />
               <div className={s.texts}>
                  <p
                     className={multipleClasses([
                        s.todoText,
                        todo.status === 'complete' && s['todoText--completed'],
                     ])}
                  >
                     {todo.title}
                  </p>
                  <p className={s.time}>{todo.time}</p>
               </div>
            </div>
            <div className={s.todoActions}>
               <div
                  className={s.icon}
                  onClick={handleUpdate}
                  onKeyDown={handleUpdate}
                  tabIndex={0}
                  role="button"
                  aria-label="Edit"
               >
                  <MdEdit />
               </div>
               <div
                  className={s.icon}
                  onClick={handleDelete}
                  onKeyDown={handleDelete}
                  tabIndex={0}
                  role="button"
                  aria-label="Delete"
               >
                  <MdDelete />
               </div>
            </div>
         </motion.div>

         <TodoModal
            type="update"
            todo={todo}
            isModal={updateModalOpen}
            setIsModal={setUpdateModalOpen}
         />
      </>
   )
}

export default TodoItem
