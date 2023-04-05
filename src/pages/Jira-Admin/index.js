import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { IoLogOutOutline } from 'react-icons/io5'
import { Layout, Menu, theme } from 'antd';
import { Dropdown } from 'antd';
import React, { useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router';
const { Header, Sider, Content } = Layout;
function JiraAdmin() {
    const navigate = useNavigate()

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <button type='button' onClick={() => {
                    localStorage.removeItem('@user');
                    navigate("/logInjiraa");

                }} className=' btn btnLogOut' style={{
                    fontSize: 15,
                }}>
                    <IoLogOutOutline /> Log Out
                </button>
            ),
        },

    ];
    const handleUser = () => {
        const user = JSON.parse(localStorage.getItem('@user'))
        return (
            <Dropdown
                menu={{
                    items,
                }}
                placement="bottomLeft"
                arrow
            >
                <button className='btn btn-outline-primary user'><span><img src={user.avatar} alt={user.name} /> {user.name}</span></button>
            </Dropdown>

        )
    }
    if (!localStorage.getItem('@user')) {
        return <Navigate to='/logInjiraa' />
    }
    return (
        <section id='layout'>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <UserOutlined />,
                                label: 'nav 1',
                            },
                            {
                                key: '2',
                                icon: <VideoCameraOutlined />,
                                label: 'nav 2',
                            },

                        ]}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Header
                        style={{
                            padding: 10,
                            background: colorBgContainer,

                        }}
                        className="header"

                    >
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                        {handleUser()}
                    </Header>
                    <Content style={{ minHeight: "100vh",padding: 10, }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </section>
    );

}
export default JiraAdmin;