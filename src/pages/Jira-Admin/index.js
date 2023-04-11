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
import {AiFillProject} from 'react-icons/ai'
import {IoCreateOutline}from 'react-icons/io5'
import {FaUserEdit}from 'react-icons/fa'
const { Header, Sider, Content } = Layout;
function JiraAdmin() {

    const navigation = [
        { label: "Home", key: 1, target: "/" },
        { label: "Holiday Calendar", key: 2, target: "/holidaycalendar" },
        { label: "Event", key: 3, target: "/event" },
    ];
    const navigate = useNavigate()

    const handleMenuClick = ({ key }) => {
        const { target } = navigation.find(item => item.key === key) || {};
        if (target) {
            navigate(target);
        }
    };
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const items = [
        {
            key: '1',
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
                                icon: <AiFillProject />,
                                label: 'Project Management',
                                onClick: () => navigate("/", { replace: true })

                            },
                            {
                                key: '2',
                                icon: <IoCreateOutline />,
                                label: 'Create Project',
                                onClick: () => navigate("/createProject", { replace: true })

                            },
                            {
                                key: '3',
                                icon: <FaUserEdit />,
                                label: 'User Management',
                                onClick: () => navigate("/userManagement", { replace: true })

                            },
                            {
                                key: '4',
                                icon: <UserOutlined />,
                                label: 'My Profile',
                                onClick: () => navigate("/myProfile", { replace: true })
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
                    <Content style={{ minHeight: "100vh", padding: 10, }}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </section>
    );

}
export default JiraAdmin;
