import { Menu, Row } from "antd"
import { Layout } from 'antd';
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../router";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const { isAuth } = useTypedSelector(state => state.auth)
    const logoutItems = [
        { label: 'Logout', key: 'out', onClick: () => console.log('Logout') }
    ]
    const loginItems = [
        { label: 'Login', key: 'in', onClick: () => navigate(RouteNames.LOGIN) }
    ]
    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth
                    ? <>
                        <div style={{color: 'white'}}>User Name</div>
                        <Menu theme="dark" mode="horizontal" selectable={false} items={logoutItems} />
                      </>
                    : <Menu theme="dark" mode="horizontal" selectable={false} items={loginItems} />
                }

            </Row>
        </Layout.Header>
    )
}

export default Navbar