import React from 'react';
import $ from 'jquery';
import { Col, Layout, Menu } from 'antd';
import Split from 'split.js';
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

const { Sider } = Layout;
const { SubMenu } = Menu;

export default class NavSideBarBlade extends React.Component {
  private navSnapOffset = 20;

  private navWidthNarrow = 80;

  private navTogglePoint = this.navSnapOffset + this.navWidthNarrow;

  private splitterGutterSize = 10;

  private ids = {
    navId: 'test-nav',
    contentId: 'test-content',
  };

  private storage = {
    navDivWidth: ['nav-width', 160],
    windowWidth: ['window-width', window.innerWidth],
  };

  constructor(props: any) {
    super(props);

    this.state = {
      collapsed: false,
    };

    this.handleNavCollapse = this.handleNavCollapse.bind(this);
    this.initializeSplitter = this.initializeSplitter.bind(this);

    this.handleResize = this.handleResize.bind(this);

    this.getElementWidth = this.getElementWidth.bind(this);
    // this.getSplitterSizes = this.getSplitterSizes.bind(this);

    this.getStorage(this.storage.navDivWidth);
    this.getStorage(this.storage.windowWidth);
  }

  // ---Modification--
  componentDidMount() {
    this.initializeSplitter();
    this.setToggle();
    window.addEventListener('resize', this.handleResize, true);
  }

  // --------- Initial ---------
  getStorage = (storageKey: any) => {
    const [storageId, defaultValue] = storageKey;
    const result = localStorage.getItem(storageId);
    let finalResult;
    if (!result) {
      finalResult = defaultValue;
      localStorage.setItem(storageId, JSON.stringify(finalResult));
    } else {
      finalResult = JSON.parse(result);
    }
    return finalResult;
  };

  setStorage = (storageKey: any, value: any) => {
    const [storageId] = storageKey;
    localStorage.setItem(storageId, JSON.stringify(value));
    return value;
  };

  setToggle = () => {
    if (this.getStorage(this.storage.navDivWidth) > this.navTogglePoint) {
      this.setState({ collapsed: false });
    } else {
      this.setState({ collapsed: true });
    }
  };

  // --------- Getter  ---------
  getSplitterSizes = (leftWidth: number, totalWidth: number) => {
    const perc = ((leftWidth + this.splitterGutterSize / 2) / totalWidth) * 100;
    return [perc, 100 - perc];
  };

  getSplitterWidths = (sizes: number[], totalWidth: number) => {
    const left = (sizes[0] * totalWidth) / 100 - this.splitterGutterSize / 2;
    const right = (sizes[1] * totalWidth) / 100 - this.splitterGutterSize / 2;
    return [left, right];
  };

  // --------- Handle  ---------
  handleNavCollapse = (collapsed: any) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  handleResize = () => {
    const navWidth = this.getStorage(this.storage.navDivWidth);
    const sizes = this.getSplitterSizes(navWidth, window.innerWidth);
    const gSize = this.splitterGutterSize / 2;
    const navId = `#${this.ids.navId}`;
    const conId = `#${this.ids.contentId}`;

    $(navId)[0].style.flexBasis = `calc(${sizes[0]}% - ${gSize}px)`;
    $(conId)[0].style.flexBasis = `calc(${sizes[1]}% - ${gSize}px)`;
  };

  initializeSplitter = () => {
    const navId = `#${this.ids.navId}`;
    const conId = `#${this.ids.contentId}`;
    const { storage } = this;
    const navWidth = this.getStorage(this.storage.navDivWidth);
    const winWidth = this.getStorage(this.storage.windowWidth);
    const { getSplitterWidths } = this;
    const { setStorage } = this;
    const { setToggle } = this;

    const splitterSizes = this.getSplitterSizes(navWidth, winWidth);

    Split([navId, conId], {
      sizes: splitterSizes,
      minSize: this.navWidthNarrow,
      snapOffset: this.navSnapOffset,
      elementStyle: (dimension, size, gutterSize) => ({
        'flex-basis': `calc(${size}% - ${gutterSize}px)`,
      }),
      gutterStyle: (dimension, gutterSize) => ({
        'flex-basis': `${gutterSize}px`,
      }),
      gutter(index, direction) {
        const gutter = document.createElement('div');
        gutter.className = `gutter gutter-${direction}`;
        gutter.id = `nav-gutter`;
        return gutter;
      },
      onDragEnd(sizes: any) {
        const navWidthPx = getSplitterWidths(sizes, window.innerWidth)[0];
        setStorage(storage.navDivWidth, navWidthPx);
        setToggle();
      },
    });
  };

  getElementWidth = (eleId: string) => {
    return parseFloat(window.getComputedStyle($(`#${eleId}`)).width);
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Col
        id="test-nav"
        style={{ backgroundColor: 'darkcyan', overflow: 'auto' }}
      >
        <Sider
          collapsed={collapsed}
          onCollapse={this.handleNavCollapse}
          collapsible
          width="100%"
          collapsedWidth="100%"
          style={{
            height: '100vh',
            // backgroundColor: '#1fc8db',
            // backgroundImage:
            //   'linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)',
          }}
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
