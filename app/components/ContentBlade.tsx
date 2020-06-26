import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Col, Layout } from 'antd';
import ContentNoteBlade from './ContentNoteBlade';

const { Header, Content, Footer } = Layout;
const ids = require('../constants/ids.json');
const content = require('../constants/content.json');
const storage = require('../constants/storage.json');

export default class ContentBlade extends React.Component {
  domIds = {
    contDomId: ids.CONTENTNOTE,
    leftDomId: ids.CONTENTNOTENAV,
    navGutterId: ids.CONTENTNOTEGUTTER,
    rightDomId: ids.CONTENTNOTEEDITOR,
  };

  sConfig = {
    SnapOffset: 30,
    WidthNarrow: 50,
    GutterWidth: 10,
    LeftDivStorage: [storage.NOTENAVWIDH.key, storage.NOTENAVWIDH.default],
  };

  domRenders = {
    leftRender: () => {
      return (
        <Col
          style={{
            width: '100%',
            height: '100vh',
            overflow: 'auto',
            backgroundColor: 'darkgreen',
          }}
        />
      );
    },
    rightRender: () => {
      return (
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
      );
    },
  };

  render() {
    const { type } = this.props;
    let contentBlade;
    switch (type) {
      case content.NOTE:
        contentBlade = (
          <ContentNoteBlade
            domRenders={this.domRenders}
            domIds={this.domIds}
            sConfig={this.sConfig}
          />
        );
        break;
      case content.TEST:
        contentBlade = (
          <Col
            id={ids.rightDomId}
            style={{ backgroundColor: 'darkblue', width: '100%' }}
          >
            pp
          </Col>
        );
        break;
      default:
        contentBlade = (
          <ContentNoteBlade
            domRenders={this.domRenders}
            domIds={this.domIds}
            sConfig={this.sConfig}
          />
        );
    }
    return contentBlade;
  }
}

ContentBlade.propTypes = {
  type: PropTypes.string,
};

ContentBlade.defaultProps = {
  type: content.NOTE,
};
