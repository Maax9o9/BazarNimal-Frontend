export interface PetDto {
  id: string
  name: string
  species: 'dog' | 'cat'
  breed: string
  age_years: number
  age_months: number
  image_url: string | null
  status: 'in_adoption' | 'adopted'
}

export interface PetListParamsDto {
  limit: number
  status?: 'in_adoption' | 'adopted'
}
