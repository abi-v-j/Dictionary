import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './Router'
import { RouterProvider } from 'react-router-dom'
import './global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
