<template>
  <div class="jsplumb-chart">
    <div id="cavans" class="cavansClass">
      <flowchartNode
        v-show="nodeType=='flowchartnode'"
        :data="{stepData:stepData}"
        @dblClick="dblClick"
        @copyNode="copyNode"
        @delNode="delNode"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// import { mapGetters, mapActions, mapState } from "vuex";
import getInstance from "./lib/getInstance";
import _ from "lodash";
import flowchartNode from "./node/flowchatNode/index.vue";
import panzoom from "./lib/pan";
import {
  message,
  filterLinkData,
  nodeClass,
  nodeIcon,
  specialNodeClass,
  origin,
  destination,
  addEndpointToNode,
  getNodeType,
  setClass,
  connect
} from "./lib/flowchart";

export default {
  watch: {
    data(val) {
      this.stepData = this.data.steps;
      this.links = this.data.links;
      this.nodeType = this.data.nodeType;
      this.operationType = val.operationType;
      this.containerRect = val.containerRect;
      this.isPanZoom = val.isPanZoom;
    },
    stepData(val) {
      this.$emit("modifyChart", {
        stepData: val,
        links: this.links
      });
    },
    links(val) {
      this.$emit("modifyChart", {
        stepData: this.stepData,
        links: val
      });
    }
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  components: {
    flowchartNode
    // cepNode
  },
  data: function() {
    return {
      jsplumbInstance: getInstance({
        // container: "workplace",
        container: this.data.container,
        delConnections: this.delConnections,
        completedConnect: this.completedConnect,
        jsPlumb: this.data.jsPlumb
      }),
      stepData: [],
      links: [],
      nodeClass: nodeClass,
      nodeIcon: nodeIcon,
      setClass: setClass,
      instanceZoom: "",
      nodeType: "",
      isPanZoomInit: true,
      cssText: "",
      containerRect: "",
      isPanZoom: ""
    };
  },
  computed: {
    //...mapState([""])
  },
  mounted() {
    //this.containerRect = this.jsplumbInstance.getContainer() ? this.jsplumbInstance.getContainer().getBoundingClientRect() : ""
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {
    this.$nextTick(() => {
      //          let stepData = "";
      //   let containerRect = "";
      //   let container = this.$refs.jsplumbchart.jsplumbInstance.getContainer();
      //   // add step
      //   if (val.drawIcon) {
      //     stepData = this.getCurrentNode(val, container);
      //     containerRect = container && container.getBoundingClientRect();

      // let container = this.jsplumbInstance.getContainer();
      // if (container) {
      //     this.containerRect = container.getBoundingClientRect();
      // }

      if (this.containerRect && this.isPanZoom) {
        let lastStep = _.last(this.stepData);
        let result = this.modifyNodePositon({
          x: lastStep.x,
          y: lastStep.y
        });
        this.stepData = _.map(_.cloneDeep(this.stepData), item => {
          if (lastStep.id == item.id) {
            return {
              ...item,
              x: result.x,
              y: result.y
            };
          } else {
            return item;
          }
        });

        this.$emit("modifyJsplumbchartOption", {
          ...this.data,
          steps: this.stepData,
          links: this.links,
          containerRect: ""
        });
      }

      // console.log("this.stepData", this.stepData);
      // console.log("this.links", this.links);

      // if (!this.stepData || !this.links) {
      //     return;
      // }
      this.drawJsplumbChart(
        {
          jsplumbInstance: this.jsplumbInstance,
          self: this,
          flowData: this.stepData,
          links: this.links
        },
        () => {
          this.getLinksData();
          if (this.isPanZoomInit && this.isPanZoom) {
            panzoom.init(this.jsplumbInstance, !this.isPanZoom);
            this.isPanZoomInit = false;

            if (!this.data.matrix) {
              return;
            }

            this.canvasMoveTo(this.data.matrix, transformOrigin => {
              this.jsplumbInstance.pan.moveTo(
                transformOrigin.x,
                transformOrigin.y
              );
              this.jsplumbInstance.pan.zoomAbs(
                transformOrigin.x,
                transformOrigin.y,
                transformOrigin.scale
              );
            });
          }
        }
      );
    });
  },
  beforeDestroy() {},
  destroyed: function() {},
  methods: {
    //...mapActions([""]),
    getScale(instance) {
      let container = instance.getContainer();
      let scale1;
      if (instance.pan) {
        const { scale } = instance.pan.getTransform();
        scale1 = scale;
      } else {
        const matrix = window.getComputedStyle(container).transform;
        scale1 = matrix && matrix.split(", ")[3] * 1;
      }
      instance.setZoom(scale1);
      return scale1;
    },

    modifyNodePositon(val) {
      let jsplumbInstance = this.jsplumbInstance;
      const containerRect = this.containerRect;
      let scale = this.getScale(this.jsplumbInstance);
      let left = (val.x - containerRect.left) / scale;
      let top = (val.y - containerRect.top) / scale;
      left -= 20;
      top -= 25;
      return {
        x: left,
        y: top
      };
    },
    canvasMoveTo(data, fn) {
      // let matrix = data
      //   .split("(")[1]
      //   .split(")")[0]
      //   .split(",");
      // let result = {
      //   x: parseInt(matrix[4]),
      //   y: parseInt(matrix[5])
      // };

      fn(data);
    },
    setCavansMatrix(data) {
      let source = _.filter(data, val => {
        return val.type == "source";
      });

      return source[0].stepSettings && source[0].stepSettings.matrix;
    },
    setNodeTemplate(val) {
      switch (val) {
        case "flowchartnode":
          return flowchartNode;
        case "cepNode":
          return cepNode;
        default:
          "";
      }
    },
    drawJsplumbChart(data, connectCallback) {
      addEndpointToNode(
        data.jsplumbInstance,
        data.self,
        data.flowData,
        val => {
          this.stepData = _.map(this.stepData, item => {
            if (item.id == val.id) {
              return {
                ...item,
                x: val.x,
                y: val.y
              };
            } else {
              return item;
            }
          });
        },
        _
      );
      connect(data.jsplumbInstance, data.self, data.links, connectCallback);
    },
    completedConnect() {
      this.getLinksData();
    },
    delConnections(val, fn) {
      fn();
      this.getLinksData();
    },
    delNode(val) {
      this.stepData = _.filter(_.cloneDeep(this.stepData), item => {
        return item.id != val;
      });
    },
    dblClick(val) {
      this.$emit("nodedblClick", val);
    },
    getLinksData() {
      this.links = filterLinkData(
        _.map(this.jsplumbInstance.getAllConnections(), item => {
          return {
            name: item.id,
            source: item.sourceId,
            sourceOutput: item.endpoints[0].canvas.nextSibling.textContent,
            target: item.targetId,
            targetInput: item.target.dataset.type,
            input: item.endpoints[1].canvas.nextSibling.textContent
          };
        }),
        _
      );
    },
    reset() {
      this.stepData = [];
      this.links = [];
      this.jsplumbInstance.deleteEveryEndpoint("workplace");
    },

    copyNode(val) {
      let node = {
        ...val,
        x: val.x + 50,
        y: val.y + 50,
        id: val.type + "_" + (this.stepData.length + 1) + "_copy"
        // id: "rtc_" + val.type + "_" + (this.stepData.length + 1)
      };
      this.$emit("handleDrop", node);
    },
    setLineSplit(step) {
      //console.log("setLineSplit(step){", step); //outputConfigurations

      if (step.type == "split") {
        let outputConfigurations = _.toArray(step.outputConfigurations);

        switch (outputConfigurations.length) {
          case 21:
          case 20:
            return "height: 280px; top: -100px;";
          case 19:
          case 18:
          case 17:
            return "height: 270px; top: -95px;";

          case 16:
          case 15:
            return "height: 270px; top: -90px;";
          case 14:
          case 13:
          case 12:
            return "height: 190px; top: -50px;";
          case 11:
          case 10:
            return "height: 155px; top: -43px;";
          case 9:
          case 8:
            // case 7:
            return "height: 120px; top: -35px;";
          case 7:
          case 6:
          case 5:
            return "height: 120px; top: -25px;";
          default:
            return "height: 70px; top: 0px;";
        }
      }
    }
  }
};
</script>

<style lang="scss">
.jsplumb-chart {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: absolute;

  .cavansClass {
    height: 100%;
    width: 100%;
    position: relative;
  }
}
</style>
