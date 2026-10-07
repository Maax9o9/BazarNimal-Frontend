import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useInject } from '@core/di/useInject'
import { useAction } from '@shared/hooks/useAction'
import { useAsync } from '@shared/hooks/useAsync'
import { useDebouncedValue } from '@shared/hooks/useDebouncedValue'
import { useListQuery } from '@shared/hooks/useListQuery'
import { applyServerErrors } from '@shared/utils/serverErrors'
import type { ProductStatus } from '../../../common/domain/productTypes'
import type { AdminProduct } from '../../domain/entities/AdminProduct'
import { PRODUCTS_ADMIN_TOKENS } from '../../di/tokens'
import { productFormSchema } from '../validators/productFormSchema'

const LIMIT = 10

export function useAdminProducts() {
  const getProducts = useInject(PRODUCTS_ADMIN_TOKENS.getProducts)
  const deleteProduct = useInject(PRODUCTS_ADMIN_TOKENS.deleteProduct)
  const list = useListQuery({ search: '', status: '' as ProductStatus | '' })
  const search = useDebouncedValue(list.query.search.trim())
  const request = { ...list.query, search, limit: LIMIT }
  const { state, reload } = useAsync(() => getProducts.execute(request), [request])
  const remove = useAction((id: string) => deleteProduct.execute(id))
  return { ...list, state, reload, remove }
}

export function useProductToEdit(id: string) {
  const getProduct = useInject(PRODUCTS_ADMIN_TOKENS.getProductById)
  return useAsync(() => getProduct.execute(id), [id]).state
}

const SERVER_FIELDS = { name: 'name', weight_kg: 'weightKg', pieces: 'pieces', status: 'status', image: 'image' } as const

export function useProductForm(product?: AdminProduct) {
  const createProduct = useInject(PRODUCTS_ADMIN_TOKENS.createProduct)
  const updateProduct = useInject(PRODUCTS_ADMIN_TOKENS.updateProduct)
  const navigate = useNavigate()
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm({
    resolver: zodResolver(productFormSchema(Boolean(product))),
    defaultValues: {
      name: product?.name ?? '',
      weightKg: product?.weightKg?.toString() ?? '',
      pieces: product?.pieces?.toString() ?? '',
      status: product?.status ?? 'available',
      image: null,
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null)
    try {
      if (product) await updateProduct.execute(product.id, values)
      else await createProduct.execute(values)
      navigate('/admin/productos', { viewTransition: true, state: { notice: `“${values.name}” se guardó correctamente.` } })
    } catch (error) {
      setServerError(applyServerErrors(error, SERVER_FIELDS, form.setError))
    }
  })

  return { form, onSubmit, serverError }
}
