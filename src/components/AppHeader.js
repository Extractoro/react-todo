import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button, { SelectButton } from './Button'
import s from '../styles/modules/app.module.scss'
import TodoModal from './TodoModal'
import { updateFilterStatus } from '../slice/todoSlice'

const AppHeader = () => {
   const filterStatus = useSelector((state) => state.todo.filterStatus)
   const [isModal, setIsModal] = useState(false)
   const dispatch = useDispatch()

   const updateFilter = (e) => {
      dispatch(updateFilterStatus(e.target.value))
   }

   return (
      <div className={s.appHeader}>
         <Button
            variant="primary"
            type="button"
            onClick={() => setIsModal(true)}
         >
            Add Task
         </Button>

         <SelectButton id="status" value={filterStatus} onChange={updateFilter}>
            <option value="all">All</option>
            <option value="incomplete">Incomplete</option>
            <option value="complete">Complete</option>
         </SelectButton>

         <TodoModal type="add" isModal={isModal} setIsModal={setIsModal} />
      </div>
   )
}

export default AppHeader
