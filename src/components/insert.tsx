import Button from 'antd/lib/button'
import * as React from 'react'

import { ITask } from 'src/constants/state'

interface IProps {
  lens: number,
  insert: (item: ITask) => void
}

interface State {
  val: string
}

export default class Insert extends React.Component<IProps, State> {
	constructor (props: IProps, state: State) {
    super(props, state)
    
  }
  
  public insert = (): void => {
    const val = this.state.val

    if (val) {
      console.log(val)
      this.props.insert({
        id: this.props.lens,
        name: val,
        status: 0
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
					<input
            type="text"
            placeholder="添加"
            onChange={this.change}
          />
					<Button
            type="primary"
            onClick={this.insert}
          >insert</Button>
				</div>
			</div>
		)
	}
}
