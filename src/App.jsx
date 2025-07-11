import { useState } from 'react'
import './App.css'
import AppLayout from './layouts/app-layout'
import { createBrowserRouter, Link,  } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Auth from './pages/auth'
import Redirectlink from './pages/redirect-link'
import Linkpage from './pages/linkpage'
import {   RouterProvider } from 'react-router-dom'
import Landingpage from './pages/landing'
import UrlProvider from './context'
import RequireAuth from './components/ui/require-auth'

const router = createBrowserRouter([
  {
    element:<AppLayout />,
    children:[
      {
        path: '/',
        element: <Landingpage />
      },
       {
        path: '/dashboard',
        element:(
         < RequireAuth> 
         <Dashboard />
         </RequireAuth>)
      },
       {
        path: '/auth',
        element: <Auth />
      },
      {
        path: '/link/:id',
        element: (
          < RequireAuth> 
        <Linkpage />
        </RequireAuth>)
      },
 {
        path: '/:id',
        element: <Redirectlink />
      }]
    }
])
function App() {
  return  (
  <UrlProvider>
  < RouterProvider router= {router} />
  </UrlProvider>
  )
}

export default App
