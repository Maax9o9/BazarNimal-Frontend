import { useState } from 'react'
import { useInject } from '@core/di/useInject'
import { useAction } from '@shared/hooks/useAction'
import { useAsync } from '@shared/hooks/useAsync'
import { ADOPTIONS_USER_TOKENS } from '../../di/tokens'

export function usePetDetail(id: string) {
  const getPet = useInject(ADOPTIONS_USER_TOKENS.getPetById)
  const createRequest = useInject(ADOPTIONS_USER_TOKENS.createRequest)
  const { state } = useAsync(() => getPet.execute(id), [id])
  const [requested, setRequested] = useState(false)
  const action = useAction(() => createRequest.execute(id))

  const requestAdoption = async () => setRequested(await action.run())

  return { state, requestAdoption, requested, requesting: action.busy, requestError: action.error }
}
