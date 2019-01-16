import * as React from "react"

import Insert from 'src/components/insert'

export default class List extends React.Component <{}> {
    constructor(props: {}){
      super(props)
    }

    public render() {
      return (
        <div>
            <Insert />
        </div>
      )
    }
}
