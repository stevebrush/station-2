export interface Crudable {
  getById<T>(id: number): T;
}
