import * as React from "react"

import { List } from 'antd'

import Insert from 'src/components/insert'

import { ITask, IState } from 'src/constants/state'

export default class ListCon extends React.Component <{}, IState> {
    constructor(props: {}, state: IState){
      super(props, state)

      this.state = {
        finished: 0,
        list: [{
            name: '事项1',
            status: 0,
            id: 0,
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

    public insert = (item: ITask)=>{
      const allTask: ITask[] = this.state.list

      const list: ITask[] = allTask

      list.push(item)

      this.setState({
          list,
          lists: list
      })
    }

    public render() {
      const Item = (item: ITask) => (
        <List.Item>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.name}</a>}
            />
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
