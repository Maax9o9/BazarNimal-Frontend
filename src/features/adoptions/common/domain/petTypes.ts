/** Tipos de mascota compartidos por los módulos user y admin de adopciones. */
export type PetSpecies = 'dog' | 'cat'
export type PetStatus = 'in_adoption' | 'adopted'
export type PetSort = '-created_at' | 'created_at' | 'name' | '-name'
