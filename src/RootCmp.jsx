import React from 'react'
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import { Start } from './cmps/Start'
export function RootCmp() {
  return (
    <div className="main-container">
      <HomePage />
      <main>
        <Routes>
          <Route path="start" element={<Start />}></Route>
        </Routes>
      </main>
    </div>
  )
}
