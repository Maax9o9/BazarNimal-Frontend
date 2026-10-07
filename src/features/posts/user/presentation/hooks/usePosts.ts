import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useInject } from '@core/di/useInject'
import { useAction } from '@shared/hooks/useAction'
import { useAsync } from '@shared/hooks/useAsync'
import { applyServerErrors } from '@shared/utils/serverErrors'
import { POSTS_USER_TOKENS } from '../../di/tokens'
import { postFormSchema } from '../validators/postFormSchema'

export function useLatestPosts(limit = 3) {
  const getApproved = useInject(POSTS_USER_TOKENS.getApprovedPosts)
  return useAsync(() => getApproved.execute({ page: 1, limit })).state
}

export function useOfrenda(limit = 12) {
  const getApproved = useInject(POSTS_USER_TOKENS.getApprovedPosts)
  const [page, setPage] = useState(1)
  const { state } = useAsync(() => getApproved.execute({ page, limit }), [page])
  return { state, setPage }
}

export function usePostDetail(id: string) {
  const getPost = useInject(POSTS_USER_TOKENS.getApprovedPostById)
  return useAsync(() => getPost.execute(id), [id]).state
}

export function useMyPosts(limit = 10) {
  const getMine = useInject(POSTS_USER_TOKENS.getMyPosts)
  const deletePost = useInject(POSTS_USER_TOKENS.deleteMyPost)
  const [page, setPage] = useState(1)
  const { state, reload } = useAsync(() => getMine.execute({ page, limit }), [page])
  const remove = useAction((id: string) => deletePost.execute(id))
  return { state, setPage, reload, remove }
}

export function useCreatePostForm() {
  const createPost = useInject(POSTS_USER_TOKENS.createPost)
  const navigate = useNavigate()
  const [serverError, setServerError] = useState<string | null>(null)
  const form = useForm({ resolver: zodResolver(postFormSchema), defaultValues: { content: '', image: null } })
  const content = useWatch({ control: form.control, name: 'content' })

  const onSubmit = form.handleSubmit(async ({ content, image }) => {
    setServerError(null)
    try {
      await createPost.execute({ content, image: image! })
      navigate('/mis-publicaciones', { viewTransition: true, state: { notice: 'Tu recuerdo quedó pendiente de revisión. Te avisaremos aquí cuando se publique.' } })
    } catch (error) {
      setServerError(applyServerErrors(error, ['content', 'image'], form.setError))
    }
  })

  return { form, onSubmit, serverError, contentLength: content.length }
}
