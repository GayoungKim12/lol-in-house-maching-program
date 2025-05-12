export default function calculateCSPerMinutes(totalCS: number, gameDuration: number) {
  return (totalCS / (gameDuration / 60)).toFixed(1)
}