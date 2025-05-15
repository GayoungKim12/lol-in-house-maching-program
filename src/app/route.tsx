import MainPage from '@/pages/MainPage'
import { Route, Routes } from 'react-router-dom'
import Layout from '@/app/layout'
import TeamMatchingPage from '@/pages/TeamMatchingPage'
import SummonerSearchPage from '@/pages/SummonerSearchPage'
import MatchDetailPage from '@/pages/MatchDetailPage'
import SummonerPage from '@/pages/SummonerPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/matching-team" element={<TeamMatchingPage />} />
        <Route path="/match/:matchId" element={<MatchDetailPage />} />
        <Route path="/summoner/public" element={<SummonerSearchPage />} />
        <Route path="/summoner/custom" element={<SummonerSearchPage />} />
        <Route path="/summoner/public/:summonerName" element={<SummonerPage />} />
        <Route path="/summoner/custom/:summonerName" element={<SummonerPage />} />
      </Route>
    </Routes>
  )
}
