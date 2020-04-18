import React, { Component } from 'react'

import { Table } from 'antd'

export default class Edit extends Component {
    render() {
        return (
            <Table pagination={{total:5}} />
        )
    }
}
