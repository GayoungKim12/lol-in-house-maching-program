import { ErrorMessageKey, errorMessages } from '@/shared/lib/config/errorMessages'

export default function handleAPIError(key: ErrorMessageKey) {
  const { title, description } = errorMessages[key]

  throw new Error(`${title}|${description}`)
}