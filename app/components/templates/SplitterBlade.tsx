import React from 'react';
import $ from 'jquery';
import Split from 'split.js';
import PropTypes from 'prop-types';
import { Layout, Row, Col } from 'antd';

export default class SplitterBlade extends React.Component {
  protected domIds: {
    contDomId: string;
    leftDomId: string;
    rightDomId: string;
    navGutterId: string;
  };

  protected sConfig: {
    SnapOffset: number;
    WidthNarrow: number;
    GutterWidth: number;
    LeftDivStorage: (string | number)[];
  };

  protected domRenders: {
    leftRender: any;
    rightRender: any;
  };

  private splitter: Split.Instance | null;

  private observer: ResizeObserver | null;

  constructor(props: any) {
    super(props);

    this.domIds = props.domIds;

    this.domRenders = props.domRenders;

    this.sConfig = props.sConfig;

    this.splitter = null;

    this.observer = null;
  }

  // ---Modification--
  componentDidMount() {
    this.initial();
  }

  componentWillUnmount() {
    this.destroy();
  }

  initial = () => {
    this.getStorage(this.sConfig.LeftDivStorage);

    this.splitter = this.initializeSplitter();
    this.observer = this.initializeObserver();

    // window.addEventListener('resize', this.handleResize);
  };

  destroy = () => {
    this.splitter?.destroy();
    this.observer?.disconnect();

    // window.removeEventListener('resize', this.handleResize);
  };

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

  getSplitterSizes = (leftWidth: number, totalWidth: number) => {
    const per = ((leftWidth + this.sConfig.GutterWidth / 2) / totalWidth) * 100;
    return [per, 100 - per];
  };

  getSplitterWidths = (sizes: number[], totalWidth: number) => {
    const left = (sizes[0] * totalWidth) / 100 - this.sConfig.GutterWidth / 2;
    const right = (sizes[1] * totalWidth) / 100 - this.sConfig.GutterWidth / 2;
    return [left, right];
  };

  // --------- Handle  ---------

  handleResize = () => {
    const conWidth = window.innerWidth;
    const leftWidth = this.getStorage(this.sConfig.LeftDivStorage);
    const sizes = this.getSplitterSizes(leftWidth, conWidth);
    const gSize = this.sConfig.GutterWidth / 2;
    const navId = `#${this.domIds.leftDomId}`;
    const conId = `#${this.domIds.rightDomId}`;

    $(navId)[0].style.flexBasis = `calc(${sizes[0]}% - ${gSize}px)`;
    $(conId)[0].style.flexBasis = `calc(${sizes[1]}% - ${gSize}px)`;
  };

  initializeObserver = () => {
    const elem = $(`#${this.domIds.contDomId}`)[0];
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

  initializeSplitter = () => {
    const { leftDomId, rightDomId, navGutterId } = this.domIds;
    const { sConfig } = this;
    const navWidth = this.getStorage(this.sConfig.LeftDivStorage);
    let winWidth = window.innerWidth;
    const { getSplitterWidths } = this;
    const { setStorage } = this;

    const splitterSizes = this.getSplitterSizes(navWidth, winWidth);

    this.splitter = Split([`#${leftDomId}`, `#${rightDomId}`], {
      sizes: splitterSizes,
      minSize: this.sConfig.WidthNarrow,
      snapOffset: this.sConfig.SnapOffset,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      elementStyle: (dimension, size, gutterSize) => ({
        'flex-basis': `calc(${size}% - ${gutterSize}px)`,
      }),
      gutterStyle: (dimension, gutterSize) => ({
        'flex-basis': `${gutterSize}px`,
      }),
      gutter(index, direction) {
        const gutter = document.createElement('div');
        gutter.className = `gutter gutter-${direction}`;
        gutter.id = `#${navGutterId}`;
        return gutter;
      },
      onDragEnd(sizes: any) {
        winWidth = window.innerWidth;
        const navWidthPx = getSplitterWidths(sizes, winWidth)[0];
        setStorage(sConfig.LeftDivStorage, navWidthPx);
      },
    });
    return this.splitter;
  };

  render() {
    const leftDom = this.domRenders.leftRender();
    const rightDom = this.domRenders.rightRender();
    return (
      <Layout id={this.domIds.contDomId}>
        <Row
          className="flex"
          style={{
            width: '100vw',
            flexWrap: 'nowrap',
            backgroundColor: 'darkcyan',
          }}
        >
          <Col
            id={this.domIds.leftDomId}
            flex="100px"
            style={{
              height: '100vh',
              overflow: 'auto',
              backgroundColor: 'darkgreen',
            }}
          >
            {leftDom}
          </Col>
          <Col
            flex="auto"
            id={this.domIds.rightDomId}
            style={{
              height: '100vh',
              overflow: 'auto',
              backgroundColor: 'darkgreen',
            }}
          >
            {rightDom}
          </Col>
        </Row>
      </Layout>
    );
  }
}

SplitterBlade.propTypes = {
  domIds: PropTypes.objectOf(PropTypes.string).isRequired,
  domRenders: PropTypes.objectOf(PropTypes.any),
  sConfig: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
};

SplitterBlade.defaultProps = {
  domRenders: {
    leftRender: function leftRender() {
      return <p>left</p>;
    },
    rightRender: function rightRender() {
      return <p>right</p>;
    },
  },
  sConfig: {
    SnapOffset: 30,
    WidthNarrow: 80,
    GutterWidth: 10,
    LeftDivStorage: [Math.random(), Math.random()],
  },
};
