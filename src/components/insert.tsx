import { Input} from 'antd'
import * as React from 'react'

import { ITask } from 'src/constants/state'

const Search = Input.Search

interface IProps {
  insert: (item: ITask) => void
}

interface State {
  val: string
}

export default class Insert extends React.Component<IProps, State> {
  // public input: any
	constructor (props: IProps, state: State) {
    super(props, state)

    // this.input = React.createRef()

    this.state = {
      val: ''
    }
  }
  
  public insert = (val: string): void => {
    if (val) {
      this.props.insert({
        id: Date.now(),
        text: val,
        status: 0
      })

      this.setState({
        val: ''
      })
    }
  }

  public change = (e: any) :void => {
    this.setState({
      val: e.target.value
    })
  }

	public render () {
		return (
			<div className="dialog">
				<div>
					<h3>添加待办事项</h3>
          <Search 
            placeholder="input text"
            onSearch={this.insert}
            value={this.state.val}
            onChange={this.change}
            style={{ width: 400 }}
            enterButton="Insert"
            size="large"
            // ref={this.input}
          />
				</div>
			</div>
		)
	}
}
