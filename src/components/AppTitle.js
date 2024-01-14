import React from 'react'
import s from '../styles/modules/title.module.scss'

const AppTitle = ({ children }) => (
   <div>
      <h2 className={s.title}>{children}</h2>
   </div>
)

export default AppTitle
