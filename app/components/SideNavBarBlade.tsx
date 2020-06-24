import { Col, Menu, Layout } from 'antd';
import React from 'react';

import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import SplitterBlade from './SplitterBlade';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default class SideNavBarBlade extends SplitterBlade {
  render() {
    const { collapsed } = this.state;
    return (
      <Col
        id={this.props.id}
        style={{ backgroundColor: 'darkcyan', overflow: 'auto' }}
      >
        <Sider
          collapsed={collapsed}
          onCollapse={this.handleNavCollapse}
          collapsible
          width="100%"
          collapsedWidth="100%"
          style={{ height: '100vh' }}
          trigger={null}
        >
          <Menu mode="inline" defaultSelectedKeys={['4']} theme="dark">
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
            <Menu.Item key="4" icon={<BarChartOutlined />}>
              nav 4
            </Menu.Item>
            <Menu.Item key="5" icon={<CloudOutlined />}>
              nav 5
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="6" icon={<AppstoreOutlined />}>
                nav 6
              </Menu.Item>
              <Menu.Item key="7" icon={<TeamOutlined />}>
                nav 7
              </Menu.Item>
              <Menu.Item key="8" icon={<ShopOutlined />}>
                nav 8
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      </Col>
    );
  }
}
