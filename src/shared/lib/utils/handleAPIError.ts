import { APIError } from '@/shared/types/api'

export default function handleAPIError({ errorCode, errorMessage }: APIError): APIError {
  return {
    errorMessage: errorMessage,
    errorCode: errorCode,
  }
}