import type { ReviewStatus } from '@shared/constants/reviewStatus'

export interface Post {
  id: string
  content: string
  imageUrl: string | null
  authorName: string
  createdAt: Date
}

/** Publicación propia: incluye su estatus de revisión. */
export interface MyPost extends Post {
  status: ReviewStatus
}

export interface PostInput {
  content: string
  image: File
}
