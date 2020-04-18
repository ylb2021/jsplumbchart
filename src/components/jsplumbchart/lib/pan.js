/* eslint-disable */
// import instance from './instance';

const panzoom = require("panzoom");

// 初始化panzoom插件
// shouldIgnore true 禁止zoom 放大缩小，false则相反

function init(instance, shouldIgnore) {
  const mainContainer = instance.getContainer();
  const mainContainerWrap = mainContainer.parentNode;
  const pan = panzoom(mainContainer, {
    smoothScroll: false,
    bounds: false,
    autocenter: true,
    zoomDoubleClickSpeed: 1,
    minZoom: 0.5,
    maxZoom: 2,
    beforeWheel: function(e) {
      return shouldIgnore;
    }
  });
  instance.mainContainerWrap = mainContainerWrap;
  instance.pan = pan;
  // 缩放时设置jsPlumb的缩放比率
  pan.on("zoom", e => {
    const { scale } = e.getTransform();
    // console.log("scale", scale);
    instance.setZoom(scale);
  });

  // pan.on('panstart', function(e) {
  // 	// console.log("Fired when pan is just started ", e);
  // 	// Note: e === instance.
  // });

  // pan.on('panend', function(e, x, y) {});

  // 平移时设置鼠标样式
  mainContainerWrap.style.cursor = "grab";
  mainContainerWrap.addEventListener("mousedown", function wrapMousedown() {
    this.style.cursor = "grabbing";
    mainContainerWrap.addEventListener("mouseout", function wrapMouseout() {
      this.style.cursor = "grab";
    });
  });
  mainContainerWrap.addEventListener("mouseup", function wrapMouseup() {
    this.style.cursor = "grab";
  });

  return pan;
}
const panZoom = {
  init
};

/**
 * @description 获取缩放比率
 * @returns {number} 缩放比率
 */
const getScale = instance => {
  // let container = instance.getContainer();
  // let scale1;
  // if (instance.pan) {
  //   const { scale } = instance.pan.getTransform();
  //   scale1 = scale;
  // } else {
  //   const matrix = window.getComputedStyle(container).transform;
  //   scale1 = matrix.split(", ")[3] * 1;
  // }
  // instance.setZoom(scale1);
  // return scale1;

  let container = this.jsplumbInstance.getContainer();
  let scale1;
  if (this.jsplumbInstance.pan) {
    const { scale } = this.jsplumbInstance.pan.getTransform();
    scale1 = scale;
  } else {
    const matrix = window.getComputedStyle(container).transform;
    scale1 = matrix.split(", ")[3] * 1;
  }
  this.jsplumbInstance.setZoom(scale1);
  return scale1;
};

export default panZoom;

export { getScale };
