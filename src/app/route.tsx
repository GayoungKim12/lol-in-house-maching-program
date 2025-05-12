import MainPage from '@/pages/MainPage'
import { Route, Routes } from 'react-router-dom'
import Layout from '@/app/layout'
import TeamMatchingPage from '@/pages/TeamMatchingPage'
import SummonerSearchPage from '@/pages/SummonerSearchPage'
import MatchDetailPage from '@/pages/MatchDetailPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/matching-team" element={<TeamMatchingPage />} />
        <Route path="/match/:matchId" element={<MatchDetailPage />} />
        <Route path="/summoner" element={<SummonerSearchPage />} />
        <Route path="/summoner/:summonerName" element={<SummonerSearchPage />} />
      </Route>
    </Routes>
  )
}
