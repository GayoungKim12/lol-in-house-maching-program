import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import useRegisterCustomMatch from '@/features/register-custom-match/hooks/useRegisterCustomMatch'
import { useState } from 'react'

export default function RegisterCustomMatchDialog() {
  const [matchId, setMatchId] = useState('')
  const { mutate: registerCustomMatch } = useRegisterCustomMatch()

  const handleClick = () => {
    void registerCustomMatch(`KR_${matchId}`)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          내전 ID 등록
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-2">내전 ID 등록</DialogTitle>
          <DialogDescription className="mb-2">
            내전 ID를 등록하시면 Summoner의 Custom 페이지에서 내전 기록을 확인할 수 있습니다.(단, 한국 서버만 가능합니다.)
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="matching-id-input">
              내전 ID
            </Label>
            <Input
              id="matching-id-input"
              placeholder="내전 ID를 입력해주세요."
              className="col-span-4 text-sm"
              value={matchId}
              onChange={(e) => setMatchId(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClick}>제출</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}