export interface Repository<T> {
  create(data: T): Promise<T>
  update(id: string, data: Partial<T>): Promise<T>
  findById(id: string): Promise<T>
  findMany(filters: Partial<T>): Promise<T[]>
}