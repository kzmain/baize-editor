import React from 'react';
import { Layout, Row } from 'antd';
import SideNavBarBlade from '../components/SideNavBarBlade';
import ContentNoteContentBlade from '../components/ContentNoteContentBlade';

// eslint-disable-next-line react/prefer-stateless-function
export default class HomePageBlade extends React.Component {
  ids = {
    contDomId: 'window',
    leftDomId: 'test-nav1',
    navGutterId: 'nav-gutter',
    rightDomId: 'test-content',
  };

  storage = {
    leftDivWidth: ['nav-width', 160],
  };

  sConfig = {
    SnapOffset: 20,
    WidthNarrow: 50,
    GutterWidth: 20,
  };

  cids = {
    contDomId: this.ids.rightDomId,
    leftDomId: 'note-nav-width',
    navGutterId: 'note-nav-gutter',
    rightDomId: 'editor-content',
  };

  cstorage = {
    leftDivWidth: ['note-nav-width', 160],
  };

  render() {
    return (
      <Layout>
        <Row className="flex" style={{ width: '100vw', flexWrap: 'nowrap' }}>
          <SideNavBarBlade
            id={this.ids.leftDomId}
            ids={this.ids}
            storage={this.storage}
            sConfig={this.sConfig}
          />
          <ContentNoteContentBlade
            id={this.ids.rightDomId}
            ids={this.cids}
            storage={this.cstorage}
            sConfig={this.sConfig}
          />
        </Row>
      </Layout>
    );
  }
}
