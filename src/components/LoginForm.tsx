import { Form, Input, Button } from "antd"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { AuthActionCreators } from "../store/reducers/auth/action-creaters"
import {rules} from '../utils/rules'

const LoginForm: React.FC = () => {
    const dispatch = useDispatch()
    const { error, isLoading } = useTypedSelector(state => state.auth)
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = () => {
        dispatch(AuthActionCreators.login(username, password))
    }
    return (
        <Form onFinish={submit}>
            {error && <div style={{ color: 'red' }}>
                {error}
            </div>}
            <Form.Item
                label="Username"
                name="username"
                rules={[rules.required('Please input your username!')]}
            >
                <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required('Please input your password!')]}
            >
                <Input.Password value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 10, span: 20 }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Login
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm