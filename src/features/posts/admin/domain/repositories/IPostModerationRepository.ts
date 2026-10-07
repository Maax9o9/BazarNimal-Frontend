import type { Page } from '@shared/types/pagination'
import type { AdminPost, AdminPostQuery } from '../entities/AdminPost'

export interface IPostModerationRepository {
  list(query: AdminPostQuery): Promise<Page<AdminPost>>
  approve(id: string): Promise<AdminPost>
  reject(id: string): Promise<AdminPost>
  delete(id: string): Promise<void>
}
