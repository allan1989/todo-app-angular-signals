export interface ITodo {
  id: string;
  body: string;
  completed: boolean;
}
export enum Filter {
  'ALL' = 'ALL',
  'ACTIVE' = 'ACTIVE',
  'COMPLETED' = 'COMPLETED',
}
