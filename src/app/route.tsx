import MainPage from "@/pages/MainPage";
import { Route, Routes } from "react-router-dom";
import Layout from "@/app/layout";
import TeamMatchingPage from "@/pages/TeamMatchingPage";
import UserSearchPage from "@/pages/UserSearchPage";
import MatchDetailPage from "@/pages/MatchDetailPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/matching-team" element={<TeamMatchingPage />} />
        <Route path="/user-search" element={<UserSearchPage />} />
        <Route path="/match/:matchId" element={<MatchDetailPage />} />
      </Route>
    </Routes>
  );
}
