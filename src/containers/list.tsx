import * as React from "react"

import { List, Button } from 'antd'

import Insert from 'src/components/insert'

import { ITask } from 'src/constants/state'

interface IState {
  list: ITask[]
  lists: ITask[]
  finished: number
  updateTask: ITask[]
  style: boolean
}


export default class ListCon extends React.Component <{}, IState> {
    constructor(props: {}, state: IState){
      super(props, state)

      this.state = {
        finished: 0,
        list: [{
            name: '事项1',
            status: 0,
            id: Date.now(),
        }],
        style:false,
        lists:[{
            name: '事项2',
            status: 0,
            id: 0,
        }],
        updateTask: []
      }
    }

    public insert = (item: ITask): void => {
      const allTask: ITask[] = this.state.list

      const list: ITask[] = allTask

      list.push(item)

      this.setState({
          list,
          lists: list
      })
    }

    public delete = (id: number): any => {
      let list: ITask[] = this.state.list

      list.splice(list.findIndex(v => v.id === id), 1)

      this.setState({
        list
      })
    }

    public render() {
      const del: any = (id: number) => (): void => this.delete(id)

      const Item = (item: ITask) => (
        <List.Item>
            <List.Item.Meta
              title={<a href="#item">{item.name}</a>}
            />
            <Button
              type="primary"
              onClick={del(item.id)}
            >
              delete
            </Button>
        </List.Item>
      )

      return (
        <div>
            <Insert
              insert={this.insert} 
              lens={this.state.list.length}
            />
            <List
                itemLayout="horizontal"
                dataSource={this.state.list}
                renderItem={Item}
            />
        </div>
      )
    }
}
