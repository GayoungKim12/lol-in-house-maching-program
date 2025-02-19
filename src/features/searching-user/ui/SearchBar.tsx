import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import useThrottleInput from '@/shared/hooks/useThrottleInput'
import { Icon } from '@/shared/components/icon'
import { ChangeEvent, FormEvent } from 'react'

export default function SearchBar() {
  const { input, finalInput, setInput } = useThrottleInput()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInput(e.target.value)
  }

  return (
    <form className="flex justify-center gap-1" onSubmit={handleSubmit}>
      <div className="w-1/2">
        <Input type="text" placeholder="nickname + #subname" value={input} onChange={handleChangeInput} />
      </div>
      <Button><Icon name="Search" /></Button>
    </form>
  )
}