import React, { useState } from 'react'
import Button, { SelectButton } from './Button'
import s from '../styles/modules/app.module.scss'
import TodoModal from './TodoModal'

const AppHeader = () => {
   const [isModal, setIsModal] = useState(false)
   return (
      <div className={s.appHeader}>
         <Button
            variant="primary"
            type="button"
            onClick={() => setIsModal(true)}
         >
            Add Task
         </Button>

         <SelectButton>
            <option value="all">All</option>
            <option value="incomplete">Incomplete</option>
            <option value="complete">Complete</option>
         </SelectButton>

         <TodoModal type="add" isModal={isModal} setIsModal={setIsModal} />
      </div>
   )
}

export default AppHeader
