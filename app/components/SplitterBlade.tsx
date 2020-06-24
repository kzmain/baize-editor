import React from 'react';
import $ from 'jquery';
import Split from 'split.js';
import PropTypes from 'prop-types';

export default class SplitterBlade extends React.Component {
  public readonly ids: {
    contDomId: string;
    leftDomId: string;
    rightDomId: string;
    navGutterId: string;
  };

  private storage: {
    leftDivWidth: (string | number)[];
  };

  private sConfig: {
    SnapOffset: number;
    WidthNarrow: number;
    // TogglePoint: number;
    GutterWidth: number;
  };

  private readonly TogglePoint: number;

  constructor(props: any) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      collapsed: false,
    };

    this.ids = props.ids;

    this.storage = props.storage;

    this.sConfig = props.sConfig;
    //   {
    //   SnapOffset: 20,
    //   WidthNarrow: 80,
    //   GutterWidth: 10,
    // };

    this.TogglePoint = this.sConfig.SnapOffset + this.sConfig.WidthNarrow;

    this.initializeSplitter = this.initializeSplitter.bind(this);

    this.handleResize = this.handleResize.bind(this);
  }

  // ---Modification--
  componentDidMount() {
    this.getStorage(this.storage.leftDivWidth);

    this.initializeSplitter();
    this.setToggle();
    window.addEventListener('resize', this.handleResize, true);

    const elem = $(`#${this.ids.contDomId}`)[0];
    const { handleResize } = this;
    if (elem) {
      console.log(elem);
      const resizeObserver = new ResizeObserver(() => {
        handleResize();
      });

      resizeObserver.observe(elem);
    }
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
    let state;
    if (this.getStorage(this.storage.leftDivWidth) > this.TogglePoint) {
      state = false;
    } else {
      state = true;
    }

    // eslint-disable-next-line react/no-unused-state
    this.setState({ collapsed: state });
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

  getElementWidth = (eleId: string) => {
    if (eleId === 'window') return window.innerWidth;
    return parseFloat(window.getComputedStyle($(`#${eleId}`)[0]).width);
  };

  // --------- Handle  ---------

  handleResize = () => {
    const conWidth = this.getElementWidth(this.ids.contDomId);
    const navWidth = this.getStorage(this.storage.leftDivWidth);
    const sizes = this.getSplitterSizes(navWidth, conWidth);
    const gSize = this.sConfig.GutterWidth / 2;
    const navId = `#${this.ids.leftDomId}`;
    const conId = `#${this.ids.rightDomId}`;

    $(navId)[0].style.flexBasis = `calc(${sizes[0]}% - ${gSize}px)`;
    $(conId)[0].style.flexBasis = `calc(${sizes[1]}% - ${gSize}px)`;
  };

  initializeSplitter = () => {
    const { contDomId, leftDomId, rightDomId, navGutterId } = this.ids;
    const { storage } = this;
    const navWidth = this.getStorage(this.storage.leftDivWidth);
    const winWidth = this.getElementWidth(this.ids.contDomId);
    const { getSplitterWidths } = this;
    const { setStorage } = this;
    const { setToggle } = this;
    const { getElementWidth } = this;

    const splitterSizes = this.getSplitterSizes(navWidth, winWidth);

    Split([`#${leftDomId}`, `#${rightDomId}`], {
      sizes: splitterSizes,
      minSize: this.sConfig.WidthNarrow,
      snapOffset: this.sConfig.SnapOffset,
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
        const conWidth = getElementWidth(contDomId);
        const navWidthPx = getSplitterWidths(sizes, conWidth)[0];
        setStorage(storage.leftDivWidth, navWidthPx);
        setToggle();
      },
    });
  };
}

SplitterBlade.propTypes = {
  ids: PropTypes.objectOf(PropTypes.string).isRequired,
  storage: PropTypes.objectOf(PropTypes.array).isRequired,
  sConfig: PropTypes.objectOf(PropTypes.number).isRequired,
};
