import AppRouter from '@/app/route'
import { BrowserRouter } from 'react-router-dom'
import Provider from '@/app/provider'
import { Toaster } from '@/shared/components/ui/toaster'

export default function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Toaster />
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}