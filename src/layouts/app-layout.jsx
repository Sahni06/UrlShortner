import React from 'react'
import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'
import UrlProvider from '@/context'

function AppLayout  () {
  return (
   <UrlProvider>
    <div>

      <main className='min-h-screen container'> 
        < Header />
        <Outlet />
      </main>

      <div className='p-10 text-center bg-gray-800 mt-10'>
Get your URL shorten
      </div>
      {/* footer */}
    </div>
    </UrlProvider>
  )
}

export default AppLayout
