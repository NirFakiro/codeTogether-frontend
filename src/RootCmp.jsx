import React from 'react'
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
export function RootCmp() {
  return (
    <div className="main-container">
      <main>
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </main>
      <AppFooter />
    </div>
  )
}
