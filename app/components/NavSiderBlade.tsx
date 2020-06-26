import { Menu, Layout } from 'antd';
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
import PropTypes from 'prop-types';

const { Sider } = Layout;
const { SubMenu } = Menu;
const content = require('../constants/content.json');

export default class NavSiderBlade extends React.Component {
  private readonly siderId: string;

  private observer: ResizeObserver | null;

  constructor(props: any) {
    super(props);

    this.state = {
      collapsed: false,
      breakpoint: props.breakpoint,
    };

    this.siderId = Math.random().toString();
  }

  componentDidMount() {
    this.initial();
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    this.destroy();
  }

  initial = () => {
    this.observer = this.initialObserver();
  };

  destroy = () => {
    this.observer?.disconnect();
  };

  initialObserver = () => {
    const elem = document.getElementById(this.siderId);
    const { handleResize } = this;
    if (elem) {
      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(elem);
      return resizeObserver;
    }
    return null;
  };

  handleResize = () => {
    const { breakpoint } = this.state;
    const siderDom = document.getElementById(this.siderId);
    const siderWidth = siderDom?.getBoundingClientRect().width;
    const siderState = siderWidth && breakpoint > siderWidth;
    this.setState({ collapsed: siderState });
  };

  render() {
    const { state, props } = this;
    return (
      <Sider
        collapsed={state.collapsed}
        // onCollapse={this.handleNavCollapse}
        collapsible
        width="100%"
        collapsedWidth="100%"
        style={{ height: '100vh' }}
        trigger={null}
        id={this.siderId}
      >
        <Menu mode="inline" defaultSelectedKeys={['4']} theme="dark">
          <Menu.Item
            key={content.NOTE}
            icon={<UserOutlined />}
            onClick={props.handler}
          >
            nav 1
          </Menu.Item>
          <Menu.Item
            key={content.TEST}
            icon={<VideoCameraOutlined />}
            onClick={props.handler}
          >
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
    );
  }
}

NavSiderBlade.propTypes = {
  breakpoint: PropTypes.number,
  handler: PropTypes.func,
};

NavSiderBlade.defaultProps = {
  breakpoint: 80,
  handler: null,
};
