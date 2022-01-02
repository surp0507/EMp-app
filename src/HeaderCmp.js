import React from "react";
import { Header, Content } from "antd/lib/layout/layout";
import Layout from "antd/lib/layout/layout";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import Employee from "./Employee";

export const HeaderCmp = () => {
  return (
    <div>
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item>Employee App</Menu.Item>

            <Menu.Item>
              {" "}
              <Link to="/employee">Home</Link>{" "}
            </Menu.Item>
            <Menu.Item>
              {" "}
              <Link to="/admin">Logout </Link>{" "}
            </Menu.Item>

            <Menu.Item>
              {" "}
              <Link to="/login">Login</Link>{" "}
            </Menu.Item>
            <Menu.Item>
              {" "}
              <Link to="/admin">Admin</Link>{" "}
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <div className="site-layout-background" style={{ padding: 24 }}></div>
        </Content>
      </Layout>
    </div>
  );
};
