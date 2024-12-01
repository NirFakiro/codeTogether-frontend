import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { CodePage } from './pages/CodePage'

export function RootCmp() {
  return (
    <div className="main-container">
      <AppHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/code/:id" element={<CodePage />}></Route>
        </Routes>
      </main>
      <AppFooter />
    </div>
  )
}
