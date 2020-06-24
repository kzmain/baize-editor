import { Col, Layout, Row, Breadcrumb } from 'antd';
import React from 'react';
import SplitterBlade from './SplitterBlade';

const { Header, Content, Footer } = Layout;

// eslint-disable-next-line react/prefer-stateless-function
export default class ContentNoteContentBlade extends SplitterBlade {
  render() {
    const { ids } = this;
    return (
      <Col id={this.props.id} flex="auto">
        <Row
          className="flex"
          style={{
            height: '100vh',
            flexWrap: 'nowrap',
          }}
        >
          <Col
            flex="100px"
            id={ids.leftDomId}
            style={{
              height: '100vh',
              overflow: 'auto',
              backgroundColor: 'darkgreen',
            }}
          />
          <Col flex="auto" id={ids.rightDomId}>
            <Layout
              className="site-layout"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
              }}
            >
              <Header className="site-layout-background" style={{ padding: 0 }}>
                <input name="name" id="id" placeholder="email@example.com" />
                Update Time: XX.XX.XX Create Time: XX.XX.XX
              </Header>
              <Content
                style={{
                  margin: '0 16px',
                  backgroundColor: 'darkred',
                  flex: 1,

                  // flexDirection: 'vertical',
                }}
              >
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                {/*  <div */}
                {/*    className="site-layout-background" */}
                {/*    style={{ padding: 24, minHeight: 360 }} */}
                {/*  > */}
                {/*    Bill is a cat. */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*    <br /> */}
                {/*  </div> */}
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 Created by Ant UED
              </Footer>
            </Layout>
          </Col>
        </Row>
      </Col>
    );
  }
}
