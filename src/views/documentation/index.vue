<template>
  <div class="app-container documentation-container">
    <div class="jspluimbchart">
      <el-container>
        <el-header>
          <el-row>备注:按下鼠标可以拖动平移(pan)设计器,滚动鼠标可进行缩放(zoom)操作,也可从右边菜单栏拖动step到设计器，进行连线操作</el-row>
        </el-header>
        <el-container>
          <el-main class="jsplumbchart-main">
            <drop id="workplace" class="drop-workplace" @drop="handleDrop">
              <jsplumbchart
                ref="jsplumbchart"
                :data="jsplumbchartOption"
                @modifyJsplumbchartOption="modifyJsplumbchartOption"
                @modifyChart="modifyChart"
                @nodedblClick="nodedblClick"
                @handleDrop="handleDrop"
              />
            </drop>
          </el-main>
          <el-aside width="250px">
            <vaside></vaside>
          </el-aside>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
import vaside from "./aside/left/index";
import jsplumbchart from "@/components/jsplumbchart/index";
import moment from "moment";
import { Base64 } from "js-base64";

// import "@/components/jsplumbchart/dist/jsplumbchart.css"
// import * as jsplumbchart from "@/components/jsplumbchart/dist/jsplumbchart.umd.min.js";

// import stepdialog from "@/components/dialog/index";
import plumbGather from "jsplumb";
import _ from "loadsh";

export default {
  name: "JsplumbChart",
  components: {
    vaside,
    jsplumbchart
  },
  props: {
    // data: {
    //   type: Object,
    //   default: false
    // }
  },

  data: function() {
    return {
      jsplumbchartOption: {
        isPanZoom: true,
        steps: this.steps,
        links: this.links,
        container: "workplace",
        nodeType: "flowchartnode",
        jsPlumb: plumbGather.jsPlumb
      },
      nodeTab: [
        {
          title: "输入",
          name: "input",
          icon: "fa fa-sign-in",
          lable: "input"
        },
        {
          title: "参数",
          name: "parameter",
          icon: "fa fa-gear",
          lable: "parameter"
        },
        {
          title: "输出",
          name: "output",
          icon: "fa fa-sign-out",
          lable: "output"
        }
      ],
      dialogOption: {},
      input1: "",
      links: [],
      steps: [],
      // jsPlumb: jsPlumb,
      matrix: "",
      operationType: "copy",
      input1Test: "",
      flowData: {
        flowName: "aggregate_flow",
        links: [
          {
            name: "con_43",
            source: "dummy_source_7",
            sourceOutput: "output",
            target: "sql_6",
            targetInput: "input",
            input: "input"
          },
          {
            name: "con_44",
            source: "sql_6",
            sourceOutput: "output",
            target: "lookup_3",
            targetInput: "input",
            input: "input"
          },
          {
            name: "con_45",
            source: "lookup_3",
            sourceOutput: "output",
            target: "transform_8",
            targetInput: "input",
            input: "input"
          },
          {
            name: "con_46",
            source: "transform_8",
            sourceOutput: "output",
            target: "join_2",
            targetInput: "left",
            input: "left"
          },
          {
            name: "con_47",
            source: "source_10",
            sourceOutput: "output",
            target: "join_2",
            targetInput: "right",
            input: "right"
          },
          {
            name: "con_48",
            source: "join_2",
            sourceOutput: "output",
            target: "filter_5",
            targetInput: "input",
            input: "input"
          },
          {
            name: "con_49",
            source: "filter_5",
            sourceOutput: "output",
            target: "aggregate_1",
            targetInput: "input",
            input: "input"
          },
          {
            name: "con_50",
            source: "aggregate_1",
            sourceOutput: "output",
            target: "sql_9",
            targetInput: "input",
            input: "input"
          },
          {
            name: "con_51",
            source: "sql_9",
            sourceOutput: "output",
            target: "transform_4",
            targetInput: "input",
            input: "input"
          },
          {
            name: "con_52",
            source: "transform_4",
            sourceOutput: "output",
            target: "sink_11",
            targetInput: "input",
            input: "input"
          }
        ],
        steps: [
          {
            id: "aggregate_1",
            name: "aggregate",
            type: "aggregate",
            x: 544,
            y: 269,
            stepSettings: {},
            inputConfigurations: { input: [] },
            outputConfigurations: { output: [] }
          },
          {
            id: "join_2",
            name: "join",
            type: "join",
            x: 656,
            y: 60,
            stepSettings: {},
            inputConfigurations: { input: [] },
            outputConfigurations: { output: [] }
          },
          {
            id: "lookup_3",
            name: "lookup",
            type: "lookup",
            x: 311,
            y: 164,
            stepSettings: {},
            inputConfigurations: { input: [] },
            outputConfigurations: { output: [] }
          },
          {
            id: "transform_4",
            name: "transform",
            type: "transform",
            x: 928,
            y: 242,
            stepSettings: {},
            inputConfigurations: { input: [] },
            outputConfigurations: { output: [] }
          },
          {
            id: "filter_5",
            name: "filter",
            type: "filter",
            x: 980,
            y: 59,
            stepSettings: {},
            inputConfigurations: { input: [] },
            outputConfigurations: { output: [] }
          },
          {
            id: "sql_6",
            name: "sql",
            type: "sql",
            x: 88,
            y: 311,
            stepSettings: {},
            inputConfigurations: { input: [] },
            outputConfigurations: { output: [] }
          },
          {
            id: "dummy_source_7",
            name: "dummy_source",
            type: "source_dummy",
            x: 63,
            y: 108,
            stepSettings: { dataType: "userClick", storage: "DUMMY" },
            outputConfigurations: { output: [] }
          },
          {
            id: "transform_8",
            name: "transform",
            type: "transform",
            x: 347,
            y: 303,
            stepSettings: {},
            inputConfigurations: { input: [] },
            outputConfigurations: { output: [] }
          },
          {
            id: "sql_9",
            name: "sql",
            type: "sql",
            x: 811,
            y: 398,
            stepSettings: {},
            inputConfigurations: { input: [] },
            outputConfigurations: { output: [] }
          },
          {
            id: "source_10",
            name: "source",
            type: "source",
            x: 22,
            y: 460,
            stepSettings: {},
            outputConfigurations: { output: [] }
          },
          {
            id: "sink_11",
            name: "sink",
            type: "sink",
            x: 1208,
            y: 334,
            stepSettings: {},
            inputConfigurations: { input: [] }
          }
        ],
        date: "2020-03-29 18:27:17",
        matrix: '{"x":-7,"y":40,"scale":1}',
        id: 6
      }
    };
  },
  watch: {},
  // computed: {
  //   ...Vuex.mapState([""])
  // },
  mounted() {
    this.steps = this.flowData.steps;
    this.links = this.flowData.links;
    this.input1 = this.flowData.flowName;
    this.matrix = this.flowData.matrix;
    this.jsplumbchartOption = {
      isPanZoom: true,
      steps: this.steps,
      links: this.links,
      container: "workplace",
      nodeType: "flowchartnode",
      jsPlumb: this.jsPlumb,
      matrix: this.flowData.matrix && JSON.parse(this.flowData.matrix)
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed: function() {},
  methods: {
    // ...mapActions([""]),
    modifyJsplumbchartOption(val) {
      this.jsplumbchartOption = val;
    },
    handleDragover() {
      // console.log("handleDragover(){");
    },
    copyNode(node) {
      // let uuid = jsPlumbUtil.uuid();
      const uuid = "";
      return {
        ...node,
        id: this.isExitStepID(node.id) ? node.id + "_new" + uuid : node.id
      };
    },
    handleDrop(val) {
      console.log("handleDrop(val) {", val);
      let stepData = "";
      let containerRect = "";
      const container = this.$refs.jsplumbchart.jsplumbInstance.getContainer();
      // add step
      if (val.drawIcon) {
        stepData = this.getCurrentNode(
          val,
          this.jsplumbchartOption.isPanZoom ? container : ""
        );
        containerRect = container && container.getBoundingClientRect();
        this.operationType = "add";
      } else {
        // copy step
        stepData = this.copyNode(val);
      }
      this.steps.push(stepData);

      this.jsplumbchartOption = {
        ...this.jsplumbchartOption,
        steps: this.steps,
        links: this.links,
        operationType: this.operationType,
        containerRect: containerRect
      };
    },
    isExitStepID(val) {
      let result = false;
      _.forEach(this.steps, item => {
        if (item.id == val) {
          result = true;
        }
      });

      return result;
    },
    getScale(instance) {
      const container = instance.getContainer();
      let scale1;
      if (instance.pan) {
        const { scale } = instance.pan.getTransform();
        scale1 = scale;
      } else {
        const matrix = window.getComputedStyle(container).transform;
        scale1 = matrix.split(", ")[3] * 1;
      }
      instance.setZoom(scale1);
      return scale1;
    },
    getCurrentNode(data, container) {
      // let uuid = jsPlumbUtil.uuid();
      const uuid = "";
      const stepId = data.drawIcon.id + "_" + (this.steps.length + 1);
      const newstepid = this.isExitStepID(stepId)
        ? stepId + "_new" + uuid
        : stepId;
      const node = {
        id: this.isExitStepID(newstepid) ? newstepid + "_new" : newstepid,
        name: data.drawIcon.name,
        type: data.drawIcon.type,
        // x: left,
        // y: top,
        // x: event.offsetX,
        // y: event.offsetY,
        // x: event.pageX,
        // y: event.pageY,
        x: _.isElement(container) ? event.pageX : event.offsetX,
        y: _.isElement(container) ? event.pageY : event.offsetY,
        stepSettings: data.drawIcon.stepSettings
      };

      const outputConfigurations = {
        outputConfigurations: {
          output: []
        }
      };

      const inputConfigurations = {
        inputConfigurations: {
          input: []
        }
      };

      switch (data.drawIcon.type) {
        case "source":
        case "source_dummy":
          return {
            ...node,
            ...outputConfigurations
          };
        case "sink":
          return {
            ...node,
            ...inputConfigurations
          };
        default:
          return {
            ...node,
            ...inputConfigurations,
            ...outputConfigurations
          };
      }
    },
    saveFlow() {
      if (!this.input1) {
        this.$message({
          showClose: true,
          message: "流程名称不可以为空",
          type: "error"
        });
        return;
      }
      let data = {};
      if (this.jsplumbchartOption.isPanZoom) {
        data = {
          flowName: this.input1,
          links: this.links,
          steps: this.steps,
          date: moment().format("YYYY-MM-DD HH:mm:ss"),
          matrix: JSON.stringify(
            this.$refs.jsplumbchart.jsplumbInstance.pan.getTransform()
          )
        };
      } else {
        data = {
          flowName: this.input1,
          links: this.links,
          steps: this.steps,
          date: moment().format("YYYY-MM-DD HH:mm:ss")
        };
      }
      if (this.$route.query.row) {
        modifyFlow({
          ...data,
          id: this.flowData.id
        }).then(() => {
          this.$router.go(-1);
        });
      } else {
        addFlow(data).then(() => {
          this.$router.go(-1);
        });
      }
    },
    modifyChart(val) {
      this.steps = val.stepData;
      this.links = val.links;

      this.jsplumbchartOption = {
        ...this.jsplumbchartOption,
        steps: val.stepData,
        links: val.links
      };
    },
    clearall() {
      this.steps = [];
      this.links = [];
      this.$refs.jsplumbchart.reset();
    },
    reset() {
      this.$refs.jsplumbchart.resume();
    },
    nodedblClick(val) {
      if (this.isOpenStepDialog(val)) {
        this.$message({
          message: "请建立正确的连接！",
          type: "error"
        });
        return;
      }
      // if (val.type == "source" || val.type == "sink") {
      //   getSteoConfigData(val.type).then(res => {});
      // }

      // nodeSetTab
      this.dialogOption = {
        dialogVisible: true,
        step: val,
        filterLinks: this.filterLinks(val),
        preSteps: this.getPreNodes(this.filterLinks(val)),
        pre: this.getPreNode(this.findLinks(val)),
        nodeSetTab: this.setNodeSetTab(
          val,
          this.getPreNode(this.findLinks(val))
        ),
        steps: this.steps,
        links: this.links
      };
    },
    isOpenStepDialog(val) {
      if (val.type == "source" || val.type == "source_dummy") {
        return false;
      }

      if (
        val.type == "join" &&
        (this.filterLinks(val).length == 0 || this.filterLinks(val).length == 1)
      ) {
        return true;
      }

      if (
        (val.type == "filter" ||
          val.type == "sink" ||
          val.type == "aggregate" ||
          val.type == "transform" ||
          // val.type == "join" ||
          val.type == "lookup" ||
          val.type == "split" ||
          val.type == "sql") &&
        !this.filterLinks(val)[0]
      ) {
        return true;
      }
    },
    filterLinks(val) {
      return _.filter(this.links, function(item) {
        return item.target == val.id;
      });
    },
    setNodeSetTab(val, pre) {
      if (val.type == "sink") {
        return [
          {
            ...this.nodeTab[0],
            title: "输入 (" + pre.name + ")"
          },
          this.nodeTab[1]
        ];
      }
      if (val.type == "source" || val.type == "source_dummy") {
        return [this.nodeTab[1], this.nodeTab[2]];
      }
      if (
        val.type == "filter" ||
        val.type == "aggregate" ||
        val.type == "sql" ||
        val.type == "transform" ||
        val.type == "lookup" ||
        val.type == "split"
      ) {
        return [
          {
            ...this.nodeTab[0],
            title: "输入 (" + pre.name + ")"
          },
          this.nodeTab[1],
          this.nodeTab[2]
        ];
      }

      if (val.type == "join") {
        // console.log("this.getLinks(val)", this.getLinks(val));
        const result = [];
        _.forEach(this.getLinks(val), element => {
          result.push({
            ...this.nodeTab[0],
            title:
              element.targetInput + " (" + this.getPreNode(element).name + ")",
            targetInput: element.targetInput
          });
        });
        return [...result, this.nodeTab[1], this.nodeTab[2]];
      }
    },
    getPreNodes(links) {
      const result = [];
      _.forEach(links, p => {
        _.forEach(this.steps, s => {
          if (p.source == s.id) {
            result.push(s);
          }
        });
      });
      return result;
    },

    getPreNode(val) {
      return _.find(this.steps, function(o) {
        if (!val) {
          return "";
        }
        return o.id == val.source;
      });
    },
    findLinks(val) {
      return _.find(this.links, function(item) {
        return item.target == val.id;
      });
    },
    modifyFlowData(val) {
      this.steps = _.map(this.steps, item => {
        if (
          item.type == val.step.type &&
          val.step.type == "source" &&
          item.id == val.step.id
        ) {
          return {
            ...item,
            stepSettings: val.data.parametData,
            outputConfigurations: val.data.checkedOutData
          };
        }

        if (
          item.type == val.step.type &&
          (val.step.type != "source" || val.step.type != "sink") &&
          item.id == val.step.id
        ) {
          return {
            ...item,
            stepSettings: val.data.parametData,
            outputConfigurations: val.data.checkedOutData,
            inputConfigurations: val.data.checkedinPUTData
          };
        }

        if (
          item.type == val.step.type &&
          val.step.type == "sink" &&
          item.id == val.step.id
        ) {
          return {
            ...item,
            stepSettings: val.data.parametData,
            inputConfigurations: val.data.checkedinPUTData
          };
        }
        return item;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.documentation-container {
  .jspluimbchart {
    position: absolute;
    width: 100%;
    height: 1000px;
    background: #fff;

    .el-aside {
      background-color: #d3dce6;
      color: #333;
      padding: 0;
      line-height: 200px;
    }

    .el-container {
      height: 100%;
    }

    .el-main {
      background-image: url("./assets/img/editor/designBg.png");
      position: relative;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }

    .el-row {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }

      height: 100%;
    }

    .el-col {
      border-radius: 4px;
      height: 100%;
    }

    .bg-purple-dark {
      background: #99a9bf;
    }

    .bg-purple {
      background: #d3dce6;
    }

    .bg-purple-light {
      // background: #e5e9f2;
      display: flex;
      justify-content: flex-start;
    }

    .grid-content {
      border-radius: 4px;
      min-height: 36px;
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 25px;
    }

    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
  }
}
</style>
