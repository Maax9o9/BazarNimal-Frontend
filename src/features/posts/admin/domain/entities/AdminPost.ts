import type { ReviewStatus } from '@shared/constants/reviewStatus'
import type { PageRequest } from '@shared/types/pagination'

export interface AdminPost {
  id: string
  content: string
  imageUrl: string | null
  status: ReviewStatus
  authorName: string
  createdAt: Date
}

export interface AdminPostQuery extends PageRequest {
  status?: ReviewStatus | ''
}
