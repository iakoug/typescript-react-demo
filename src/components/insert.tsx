import Button from 'antd/lib/button'
import * as React from 'react'

export default class AddList extends React.Component {
	constructor (props: any) {
		super(props)
	}

	public render () {
		return (
			<div className="dialog">
				<div>
					<h3>添加待办事项</h3>
					<input type="text" placeholder="添加"/>
					<Button type="primary">insert</Button>
				</div>
			</div>
		)
	}
}
