import React, { Component,createRef } from 'react'

import {Card,Row, Col} from 'antd'

import tabEcharts from 'echarts'

import './dashbord.less'

export default class Dashbord extends Component {
    constructor(){
        super()
        this.showEacherts = createRef()
        this.showEacherts1 = createRef()
    }
    // 初始化图表
    initEacherts = () =>{
        this.myChart = tabEcharts.init(this.showEacherts.current)
        // 指定图表的配置项和数据
        const option = {
            title: {
                text: '浏览量'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        }// 使用刚指定的配置项和数据显示图表。
        this.myChart.setOption(option);
    }

    initEacherts1 = () =>{
        this.myChart = tabEcharts.init(this.showEacherts1.current)
        
        this.myChart.setOption({
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    data:[
                        {value:235, name:'视频广告'},
                        {value:274, name:'联盟广告'},
                        {value:310, name:'邮件营销'},
                        {value:335, name:'直接访问'},
                        {value:400, name:'搜索引擎'}
                    ]
                }
            ]
        })
    }

    componentDidMount() {
        this.initEacherts()
        this.initEacherts1()
    }
    render() {
        return (
            <>
                <Card title="控制图" bordered={false}>
                    <Row gutter={4}>
                        <Col span={6}>
                            <Card.Grid className="sm-ecarths">展示区1</Card.Grid>
                        </Col>
                        <Col span={6}>
                            <Card.Grid className="sm-ecarths">展示区2</Card.Grid>
                        </Col>
                        <Col span={6}>
                            <Card.Grid className="sm-ecarths">展示区3</Card.Grid>
                        </Col>
                        <Col span={6}>
                            <Card.Grid className="sm-ecarths">展示区3</Card.Grid>
                        </Col>
                    </Row>
                </Card>
                <Card className="sj-echarts" title="图表" bordered={false}>
                    <div className="tb-echarts" ref={this.showEacherts}></div>
                    <div className="tb-echarts" ref={this.showEacherts1}></div>
                </Card>
            </>
        )
    }
}
