import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/components/ui/pagination'
import { useLocation } from 'react-router-dom'
import useGetMatchIds from '@/features/searching-user/hooks/useGetMatchIds'

export default function MatchHistoryPagination() {
  const { data: matchIds } = useGetMatchIds()
  const location = useLocation()
  const hash = location.hash
  const page = Number(hash.split('#')[1] ?? 1)

  return (
    <Pagination>
      <PaginationContent>
        {page !== 1 && (
          <PaginationItem>
            <PaginationPrevious href={`#${page - 1}`} />
          </PaginationItem>
        )}
        <PaginationItem>
          {page}
        </PaginationItem>
        {matchIds?.length === 10 && (
          <PaginationItem>
            <PaginationNext href={`#${page + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}