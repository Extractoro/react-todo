import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MdClose } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'
import s from '../styles/modules/modal.module.scss'
import Button from './Button'
import { addTodo, updateTodo } from '../slice/todoSlice'

const TodoModal = ({ type, isModal, setIsModal, todo }) => {
   const [title, setTitle] = useState('')
   const [status, setStatus] = useState('incomplete')
   const dispatch = useDispatch()

   useEffect(() => {
      if (type === 'update' && todo) {
         setTitle(todo.title)
         setStatus(todo.status)
      } else {
         setTitle('')
         setStatus('incomplete')
      }
   }, [todo, type, isModal])

   const handleSubmit = (e) => {
      e.preventDefault()

      if (title === '') {
         toast.error('Title should not be empty!')
         return
      }

      if (title && status) {
         if (type === 'add') {
            dispatch(
               addTodo({
                  id: uuid(),
                  title,
                  status,
                  time: new Date().toLocaleString(),
               }),
            )
            toast.success('Task added!')
            setIsModal(false)
         } else if (type === 'update') {
            if (todo.title !== title || todo.status !== status) {
               dispatch(
                  updateTodo({
                     ...todo,
                     title,
                     status,
                  }),
               )
               toast.success('Task updated!')
               setIsModal(false)
            } else {
               toast.error('No changes made!')
            }
         }
      }
   }

   return (
      isModal && (
         <div className={s.wrapper}>
            <div className={s.container}>
               <div
                  className={s.closeButton}
                  onClick={() => setIsModal(false)}
                  onKeyDown={() => setIsModal(false)}
                  role="button"
                  tabIndex="0"
                  aria-label="Close Modal"
               >
                  <MdClose />
               </div>

               <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
                  <h1 className={s.formTitle}>
                     {type === 'update' ? 'Update' : 'Add'} Task
                  </h1>

                  <label htmlFor="title">
                     Title
                     <input
                        name="title"
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                     />
                  </label>
                  <label htmlFor="status">
                     Status
                     <select
                        name="status"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                     >
                        <option value="incomplete">Incomplete</option>
                        <option value="complete">Complete</option>
                     </select>
                  </label>

                  <div className={s.buttonContainer}>
                     <Button variant="primary" type="submit">
                        {type === 'update' ? 'Update' : 'Add'} Task
                     </Button>
                     <Button
                        variant="secondary"
                        type="button"
                        onClick={() => setIsModal(false)}
                        onKeyDown={() => setIsModal(false)}
                     >
                        Cancel
                     </Button>
                  </div>
               </form>
            </div>
         </div>
      )
   )
}

export default TodoModal
