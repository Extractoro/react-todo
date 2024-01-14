import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { MdClose } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'
import s from '../styles/modules/modal.module.scss'
import Button from './Button'
import { addTodo } from '../slice/todoSlice'

const TodoModal = ({ isModal, setIsModal }) => {
   const [title, setTitle] = useState('')
   const [status, setStatus] = useState('incomplete')
   const dispatch = useDispatch()

   const handleSubmit = (e) => {
      e.preventDefault()
      if (title && status) {
         dispatch(
            addTodo({
               id: uuid(),
               title,
               status,
               time: new Date().toLocaleString(),
            }),
         )
         toast.success('Task added!')
      } else {
         toast.error('Title should not be empty!')
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
                  <h1 className={s.formTitle}>Add TODO</h1>

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
                        Add Task
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
