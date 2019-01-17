import * as React from "react"

import { List, Button, Modal, Input } from 'antd'

import Insert from 'src/components/insert'

import { ITask } from 'src/constants/state'

import './list.scss'

interface IState {
  list: ITask[]
  finished: number
  model: ITask
  visible: boolean
  loading: boolean
}


export default class ListCon extends React.Component <{}, IState> {
    constructor(props: {}, state: IState){
      super(props, state)

      this.state = {
        finished: 0,
        list: [{
            text: '事项1',
            status: 0,
            id: Date.now(),
        }],
        model: {},
        visible: false,
        loading: false
      }
    }

    public insert = (item: ITask): void => {
      const allTask: ITask[] = this.state.list

      const list: ITask[] = allTask

      list.push(item)

      this.setState({
          list
      })
    }

    public delete = (id: number): any => {
      let list: ITask[] = this.state.list

      list.splice(list.findIndex(v => v.id === id), 1)

      this.setState({
        list
      })
    }

    public openModal = (model: ITask): void => {
      this.setState({
        visible: true,
        model: Object.assign({}, model)
      })
    }

    public handleOk = (model: ITask): void => {
      console.log(model, '-------')
      const list: ITask[] = this.state.list

      const i: number = list.findIndex(v => v.id === model.id)

      list[i] = Object.assign({}, model)

      this.setState({
        loading: true,
        list
      })

      setTimeout(() => {
        this.setState({ loading: false, visible: false })
      }, 500)


    }
  
    public handleCancel = (): void => {
      this.setState({ visible: false })
    }
    public updateModel = (e: any): void => {
      const model: ITask = this.state.model

      this.setState({ model: Object.assign(model, {
        text: e.target.value
      })})
    }

    public render() {
      const Item = (item: ITask) => (
        <List.Item>
            <List.Item.Meta
              title={<a href="#item">{item.text}</a>}
            />
            <Button
              type="danger"
              onClick={this.delete.bind(this, item.id)}
            >
              delete
            </Button>
            <Button
              className="update"
              type="primary"
              onClick={this.openModal.bind(this, item)}
            >
              update
            </Button>
        </List.Item>
      )

      const { list, visible, loading, model } = this.state

      return (
        <div>
            <Insert
              insert={this.insert} 
            />
            <List
                itemLayout="horizontal"
                dataSource={list}
                renderItem={Item}
            />
            <Modal
              visible={visible}
              title="modify current item"
              onOk={this.handleOk.bind(this, model)}
              onCancel={this.handleCancel}
              footer={[
                <Button
                  key="back"
                  onClick={this.handleCancel}
                >
                  cancel
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={this.handleOk.bind(this, model)}
                >
                  modify
                </Button>,
              ]}
            >
              <p>change your content:</p>
              <Input
                value={ model.text }
                onChange={ this.updateModel }
              />
            </Modal>
    
        </div>
      )
    }
}
