import React, { Component,createRef } from 'react'
import { Card, Button,Form, Input,DatePicker } from 'antd'
import E from 'wangeditor'
const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 8,
    },
  }

const  formItemLayout2 = {
    labelCol: {
        span: 4,
      },
      wrapperCol: {
        span:12,
      }
}
const tailLayout = {
    wrapperCol: {
        offset: 4,
        span: 4,
    }
}

const onFinish = (values ) => {
    console.log(values)
}

const onFinishFailed = (values ) => {
    console.log(values)
}

class Edit extends Component {
    constructor(){
        super()
        // 因富文本编辑器需要操作DOM,而React中进行DOM操作的需要使用到Ref,在div中使用ref属性进行DOM绑定,估要引入createRef
        this.editeRef = createRef()
    }
    goback = () =>{
        this.props.history.push('/admin/article')
    }
    // 初始化富文本编辑器
    initEditer = () => {
        // this.editeRef.current才是最终的DOM  setFieldsValue
        this.editor = new E(this.editeRef.current)
        this.editor.customConfig.onchange = (html) => {
            // html 即变化之后的内容
            console.log(html)
            console.log(this.form)
            // this.setFieldsValue({
            //     content:html
            // })
        }
        this.editor.create()
    }

    componentDidMount(){
        this.initEditer()
    }
    render() {
        return (
            <>
                <Card title="文章编辑" bordered={false} extra={<Button onClick={this.goback}>返回</Button>}>
                    <Form 
                        {...formItemLayout}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item 
                            label="文章标题" 
                            name = "title"
                            rules={[
                                {
                                    required: true,
                                    message: '文章标题不为空',
                                }  
                            ]}
                        >
                            <Input placeholder="请输入文章标题" />
                        </Form.Item>
                        <Form.Item
                            label="作者" 
                            name = "author"
                            rules={[
                                {
                                    required: true,
                                    message: '作者不为空',
                                }  
                            ]}
                        >
                            <Input placeholder="请输入文章作者" />
                        </Form.Item>
                        <Form.Item
                            label="阅读量" 
                            name = "amount"
                            rules={[
                                {
                                    required: true,
                                    message: '阅读量不为空',
                                }  
                            ]}
                        >
                            <Input placeholder="请输入文章阅读量" />
                        </Form.Item>
                        <Form.Item
                            label="创建时间" 
                            name = "creatAt"
                            rules={[
                                {
                                    required: true,
                                    message: '创建时间不为空',
                                }  
                            ]}
                        >
                            <DatePicker showTime/>
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout2}
                            label="文章内容"
                            name = "contnet"
                            rules={[
                                {
                                    required: true,
                                    message: '内容不为空',
                                }  
                            ]}
                        >
                            <div ref={this.editeRef} />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                保存修改
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </>
        )
    }
}

export default Edit