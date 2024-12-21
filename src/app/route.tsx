import MainPage from '@/pages/MainPage'
import { Route, Routes } from 'react-router-dom'
import Layout from '@/app/layout'
import MatchingRandomLinePage from '@/pages/MatchingRandomLinePage'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/matching/random-line" element={<MatchingRandomLinePage />} />
      </Route>
    </Routes>
  )
}