import { Form, Button, Input, Checkbox, message, Card } from 'antd'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { axiosInstance } from '../../utils/interceptors'
import './index.css'

function LoginTest() {
  const navigate = useNavigate()

  const defaultUser = {
    email: '',
    password: '',
  }
  const [user, setUser] = useState(defaultUser)
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const authUser = async (user) =>
    await axiosInstance
      .post('https://app.spiritx.co.nz/api/login', user)
      .then((res) => {
        res.data && localStorage.setItem('pc-key', res.data.token.token)
        res.data && localStorage.setItem('email', res.data.user.email)

        console.log(res.data.user.email)
        console.log(res.data.token.token)
        if (res.data) {
          navigate('/')

          message.success('Login Successfully')
        } else {
          message.success('Login failed')
        }
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })

  return (
    <div className="login">
      <Card className="login-container">
        <h1>Login</h1>

        <Form
          className="login-form"
          name="basic"
          initialValues={{ remember: true }}
          validateTrigger={['onBlur', 'onChange']}
          autoComplete="off"
          onFinish={() => authUser(user)}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}>
            <Input
              name="email"
              size="large"
              placeholder="Please Enter Mobile Number"
              onChange={(e) => handleChange(e)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              {
                message: 'Please input password',
                validateTrigger: 'onBlur',
              },
            ]}>
            <Input
              name="password"
              size="large"
              placeholder="Please Enter Password"
              onChange={(e) => handleChange(e)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default LoginTest
