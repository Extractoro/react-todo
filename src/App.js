import React from 'react'
import { Toaster } from 'react-hot-toast'
import AppTitle from './components/AppTitle'
import s from './styles/modules/app.module.scss'
import AppHeader from './components/AppHeader'

function App() {
   return (
      <>
         <div className="container">
            <AppTitle>TODO LIST</AppTitle>
            <div className={s.app__wrapper}>
               <AppHeader />
            </div>
         </div>
         <Toaster
            position="top-right"
            toastOptions={{
               style: {
                  fontSize: '16px',
               },
            }}
         />
      </>
   )
}

export default App
