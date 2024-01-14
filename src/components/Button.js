import React from 'react'
import s from '../styles/modules/button.module.scss'
import { multipleClasses } from '../utils/multipleClasses'

const buttonsVariant = {
   primary: 'primary',
   secondary: 'secondary',
}

const Button = ({ children, variant, type, ...rest }) => (
   <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={multipleClasses([
         s.button,
         s[`button--${buttonsVariant[variant]}`],
      ])}
      {...rest}
   >
      {children}
   </button>
)

const SelectButton = ({ children, ...rest }) => (
   <select className={multipleClasses([s.button, s.button__select])} {...rest}>
      {children}
   </select>
)

export { SelectButton }
export default Button
