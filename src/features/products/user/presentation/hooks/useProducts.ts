import { useInject } from '@core/di/useInject'
import { useAsync } from '@shared/hooks/useAsync'
import { useDebouncedValue } from '@shared/hooks/useDebouncedValue'
import { useListQuery } from '@shared/hooks/useListQuery'
import type { ProductStatus } from '../../../common/domain/productTypes'
import { PRODUCTS_USER_TOKENS } from '../../di/tokens'

const LIMIT = 15

export function useProductList() {
  const getProducts = useInject(PRODUCTS_USER_TOKENS.getProducts)
  const list = useListQuery({ search: '', status: '' as ProductStatus | '' })
  const search = useDebouncedValue(list.query.search.trim())
  const request = { ...list.query, search, limit: LIMIT }
  const { state } = useAsync(() => getProducts.execute(request), [request])
  return { ...list, state }
}

export function useProductDetail(id: string) {
  const getProduct = useInject(PRODUCTS_USER_TOKENS.getProductById)
  return useAsync(() => getProduct.execute(id), [id]).state
}
