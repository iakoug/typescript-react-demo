import { Input, Button } from 'antd'
import * as React from 'react'

const Search = Input.Search

interface IProps {
  search: (val: string) => void
  reset(): void
}

interface State {
  val: string
}

export default class SearchCom extends React.Component<IProps, State> {
	constructor (props: IProps, state: State) {
    super(props, state)

    this.state = {
      val: ''
    }
  }
  
  public search = (val: string): void => {
    if (val) this.props.search(val)
  }

  public reset = (): void => {
    this.props.reset()
  }

  public change = (e: any) :void => {
    this.setState({
      val: e.target.value
    })
  }

	public render () {
		return (
			<div>
				<div>
					<h3>搜索待办事项</h3>
          <Search 
            placeholder="input text"
            onSearch={this.search}
            value={this.state.val}
            onChange={this.change}
            style={{ width: 400 }}
            enterButton="Search"
            size="large"
          />
          <Button type="primary" onClick={ this.reset }>
              reset
          </Button>
				</div>
			</div>
		)
	}
}
