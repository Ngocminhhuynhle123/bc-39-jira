import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DatabaseOutlined,
  UserOutlined,
  ProjectOutlined,
  UsergroupAddOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { IoLogOutOutline } from "react-icons/io5";
import { Layout, Menu, theme } from "antd";
import { Dropdown } from "antd";
import React, { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
// import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
function JiraAdmin() {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "signout",
      label: (
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("@user");
            navigate("/logInjiraa");
          }}
          className=" btn btnLogOut"
          style={{
            fontSize: 15,
          }}
        >
          <IoLogOutOutline /> Log Out
        </button>
      ),
    },
  ];
  const handleUser = () => {
    const user = JSON.parse(localStorage.getItem("@user"));
    return (
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomLeft"
        arrow
      >
        <button className="btn btn-outline-primary user">
          <span>
            <img src={user.avatar} alt={user.name} /> {user.name}
          </span>
        </button>
      </Dropdown>
    );
  };
  if (!localStorage.getItem("@user")) {
    return <Navigate to="/logInjiraa" />;
  }
  return (
    <section id="layout">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo text-center mt-3" style={{ color: "white" }}>
            JiraClone
          </div>
          <Menu
            theme="dark"
            mode="inline"
            onClick={(key) => {
              if (key.key === "/signout") {
                //Signout
              } else {
                navigate(key.key);
              }
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={[""]}
            items={[
              {
                label: "Create Project",
                key: "/createProject",
                icon: <FileAddOutlined />,
              },
              {
                label: "Project Management",
                key: "/",
                icon: <ProjectOutlined />,
              },
              {
                label: "Project Detail",
                key: "/projectDetail",
                icon: <DatabaseOutlined />,
              },
              {
                label: "My Profile",
                key: "/myProfile",
                icon: <UserOutlined />,
              },
              {
                label: "User Management",
                key: "/userManagement",
                icon: <UsergroupAddOutlined />,
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
            className="header"
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            {handleUser()}
          </Header>
          <Content style={{ minHeight: "100vh" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </section>
  );
}
export default JiraAdmin;
