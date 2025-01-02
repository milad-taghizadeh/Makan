export interface Repository<T> {
  create(data: T): Promise<T>
  update(id: string | number, data: Partial<T>): Promise<T>
  findById(id: string | number): Promise<T>
  findMany?(filters: Partial<T>): Promise<T[]>
}