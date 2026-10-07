import type { ReviewStatus } from '@shared/constants/reviewStatus'

export interface PostAdminDto {
  id: string
  content: string
  image_url: string | null
  status: ReviewStatus
  author: { id: string; name: string }
  reviewed_at: string | null
  created_at: string
}
