import MainPage from '@/pages/MainPage'
import { Route, Routes } from 'react-router-dom'
import Layout from '@/app/layout'
import RandomLineMatchingPage from '@/pages/RandomLineMatchingPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/random-line-maching" element={<RandomLineMatchingPage />} />
      </Route>
    </Routes>
  )
}