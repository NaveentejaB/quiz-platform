import { useState } from 'react'
import Home from './components/pages/home'
import Quiz from './components/pages/Quiz'
import { BrowserRouter as Router,Route,Navigate,createBrowserRouter,RouterProvider } from 'react-router-dom'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/quiz',
    element: <Quiz />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

function App() {

  return (
    <main className='h-screen bg-white'>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
