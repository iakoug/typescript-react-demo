export interface ITask {
  name: string
  status: number
  id: number
}

export interface IState {
  list: ITask[]
  lists: ITask[]
  finished: number
  updateTask: ITask[]
  style: boolean
}
