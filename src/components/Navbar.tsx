import { Menu, Row } from "antd"
import { Layout } from 'antd';
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../router";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const { isAuth, user } = useTypedSelector(state => state.auth)

    const { logout } = useActions()
    
    const logoutItems = [
        { label: 'Logout', key: 'out', onClick: () => logout() }
    ]
    const loginItems = [
        { label: 'Login', key: 'in', onClick: () => navigate(RouteNames.LOGIN) }
    ]

    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth
                    ? <>
                        <div style={{ color: 'white' }}>{user.username}</div>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            selectable={false}
                            items={logoutItems}
                        />
                      </>
                    : <Menu theme="dark" mode="horizontal" selectable={false} items={loginItems} />
                }
            </Row>
        </Layout.Header>
    )
}

export default Navbar