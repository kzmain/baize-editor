import React from 'react';
import { Col, Layout, Row, Breadcrumb } from 'antd';
import NavSideBarBlade from '../components/NavSideBarBlade';

const { Header, Content, Footer, Sider } = Layout;

// eslint-disable-next-line react/prefer-stateless-function
export default class HomePageBlade extends React.Component {
  render() {
    return (
      <Layout>
        <Row className="flex" style={{ width: '100vw' }}>
          <NavSideBarBlade />

          <Row
            className="flex"
            id="test-content"
            flex="auto"
            style={{
              height: '100vh',
              // backgroundColor: '#1fc8db',
              overflowY: 'auto',
              // backgroundImage:
              //   'linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)',
            }}
          >
            <Col
              flex="100px"
              style={{ height: '100vh', backgroundColor: 'darkgreen' }}
            />
            <Layout
              flex="auto"
              className="site-layout"
              style={{
                // backgroundColor: '#1fc8db',
                overflowY: 'auto',
                // backgroundImage:
                //   'linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)',
              }}
            >
              <Header
                className="site-layout-background"
                style={{ padding: 0 }}
              />
              <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div
                  className="site-layout-background"
                  style={{ padding: 24, minHeight: 360 }}
                >
                  Bill is a cat.
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 Created by Ant UED
              </Footer>
            </Layout>
          </Row>
        </Row>
      </Layout>
    );
  }
}
