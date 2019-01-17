import * as React from "react"

import { List, Button, Modal, Input } from 'antd'

import Insert from 'src/components/insert'
import Search from 'src/components/search'

import { ITask } from 'src/constants/task'

import './list.scss'

interface IState {
  list: ITask[]
  originList: ITask[]
  currentList: ITask[]
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
        list: [],
        originList: [],
        currentList: [],
        model: {},
        visible: false,
        loading: false
      }
    }

    public search = (val: string): void => {
      console.log(val, this.state.originList.length)
      if (!this.state.originList.length) return void 0
      console.log(val)
    
      if (val) {
        const list: any = this.state.originList.filter((v: ITask | any) => v.text.includes(val))

        this.setState({
          list
        })
      } else {
        console.log(this.state.originList, 'this.state.originList')
        this.setState({
          list: this.state.originList
        })
      }
    }

    public reset = (): void => {
      this.setState({
        list: this.state.originList
      })
    }

    public insert = (item: ITask): void => {
      const list: ITask[] = this.state.list

      list.push(item)

      this.setState({
        list,
        originList: list
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
      const list: ITask[] = this.state.list
      const originList: ITask[] = this.state.originList

      const i: number = list.findIndex(v => v.id === model.id)
      const oI: number = originList.findIndex(v => v.id === model.id)

      list[i] = Object.assign({}, model)
      originList[oI] = Object.assign({}, model)

      this.setState({
        loading: true,
        list,
        originList
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
              insert={ this.insert } 
            />
            <Search
              search={ this.search } 
              reset={ this.reset }
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
