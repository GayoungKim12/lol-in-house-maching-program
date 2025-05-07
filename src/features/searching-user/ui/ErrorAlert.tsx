import { Icon } from '@/shared/components/icon'
import { Alert, AlertDescription, AlertTitle } from '@/shared/components/ui/alert'

interface ErrorAlertProps {
  error: unknown
}

export default function ErrorAlert({ error }: ErrorAlertProps) {
  return (
    <Alert variant="destructive">
      <Icon name="AlertCircle" className="h-4 w-4" />
      <AlertTitle>검색 오류</AlertTitle>
      <AlertDescription>{error instanceof Error ? error.message : '소환사 정보를 찾을 수 없습니다.'}</AlertDescription>
    </Alert>
  )
}