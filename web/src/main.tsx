import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './routes/Home.tsx'
import Visit from './routes/Visit.js'
import './index.css'
import RootLayout from './layouts/RootLayout.tsx'
import Stats from './routes/Stats.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/:slug" element={<Visit />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
