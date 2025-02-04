import AppRouter from '@/app/route'
import { BrowserRouter } from 'react-router-dom'
import Provider from '@/app/provider'

export default function App() {
  return (
    <Provider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}