import type { ReviewStatus } from '@shared/constants/reviewStatus'

export interface PostDto {
  id: string
  content: string
  image_url: string | null
  author_name: string
  created_at: string
}

export interface MyPostDto extends PostDto {
  status: ReviewStatus
}
