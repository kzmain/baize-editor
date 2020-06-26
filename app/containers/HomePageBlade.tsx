import React from 'react';
import NavSiderBlade from '../components/NavSiderBlade';
import HomeBlade from '../components/HomeBlade';
import ContentBlade from '../components/ContentBlade';

const ids = require('../constants/ids.json');
const storage = require('../constants/storage.json');
const content = require('../constants/content.json');
// eslint-disable-next-line react/prefer-stateless-function
export default class HomePageBlade extends React.Component {
  domIds = {
    contDomId: ids.WINDOW,
    leftDomId: ids.NAVSIDEBAR,
    navGutterId: ids.NAVGUTTER,
    rightDomId: ids.CONTENT,
  };

  sConfig = {
    SnapOffset: 30,
    WidthNarrow: 50,
    GutterWidth: 10,
    LeftDivStorage: [storage.NAVWIDTH.key, storage.NAVWIDTH.default],
  };

  domRenders = {
    leftRender: () => {
      return (
        <NavSiderBlade
          breakpoint={this.sConfig.WidthNarrow + this.sConfig.SnapOffset}
          handler={this.navClickHandler}
        />
      );
    },
    rightRender: () => {
      return <ContentBlade type={content.NOTE} />;
    },
  };

  constructor(props: any) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      ContentType: '',
    };
  }

  // ------------------ Nav  Block Config ------------------
  navClickHandler = (contentType: string) => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ ContentType: contentType.key });
  };

  // ------------------ Main Block Config ------------------

  render() {
    return (
      <HomeBlade
        domRenders={this.domRenders}
        domIds={this.domIds}
        sConfig={this.sConfig}
      />
    );
  }
}
