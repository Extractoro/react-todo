import React, { useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import s from '../styles/modules/todoItem.module.scss'
import { multipleClasses } from '../utils/multipleClasses'
import { deleteTodo } from '../slice/todoSlice'
import TodoModal from './TodoModal'

const TodoItem = ({ todo }) => {
   const dispatch = useDispatch()
   const [updateModalOpen, setUpdateModalOpen] = useState(false)

   const handleDelete = () => {
      dispatch(deleteTodo(todo.id))
      toast.success('Todo deleted!')
   }

   const handleUpdate = () => {
      setUpdateModalOpen(true)
   }

   return (
      <>
         <div className={s.item}>
            <div className={s.todoDetails}>
               [ ]
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
         </div>

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
