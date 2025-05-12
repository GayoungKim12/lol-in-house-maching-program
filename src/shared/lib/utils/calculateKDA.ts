export default function calculateKDA(kills: number, assists: number, deaths: number) {
  return deaths === 0 ? 'Perfect' : ((kills + assists) / deaths).toFixed(2)
}