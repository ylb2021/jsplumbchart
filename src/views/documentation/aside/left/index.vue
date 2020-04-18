<template>
  <div class="right-aside">
    <el-collapse accordion>
      <el-collapse-item
        v-for="(drawNav, index) in stepList"
        v-show="drawNav.thisIcon.length != '0'"
        :key="index + '-gQuery'"
        track-by="$index"
        :name="index"
      >
        <template slot="title">
          <i class="icon iconfont icon-ir-supply-chain" />
          &nbsp;{{ drawNav.group }}
          <span
            class="iconNavNub"
          >({{ drawNav.thisIcon.length }})</span>
        </template>
        <drag
          v-for="(drawIcon, index) in drawNav.thisIcon"
          :key="index + '-drawNav'"
          class="designIcon"
          :data-index="index"
          :data-type="drawIcon.type"
          :transfer-data="{ drawIcon }"
          @dragstart="handleDragstart"
        >
          <el-tooltip class="item" effect="dark" :content="drawIcon.name" placement="top">
            <div class="item-step-icon">
              <i :class="drawIcon.name | iconFilter" />
              <h4>{{ drawIcon.name }}</h4>
            </div>
          </el-tooltip>
        </drag>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { nodeIcon } from "@/utils/index";
// import { getAllStepList } from "@/api/flow";
// import _ from "lodash";
export default {
  filters: {
    // 过滤右侧图标
    iconFilter: function(value) {
      if (nodeIcon(value) == "iconTrue") {
        return "icon iconfont icon-ir-d-" + value;
      } else {
        return "icon iconfont icon-ir-d-default";
      }
    },
    // 过滤历史版本下拉内容的时间，返回 YYYY-MM-DD HH:mm:ss 格式
    updateTimeFilter: function(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  data() {
    return {
      gqueryTree: [],
      stepList: [],
      cnObj: {}
    };
  },
  mounted() {
    // this.initData();

    this.stepList = [
      {
        group: "IO",
        thisIcon: [
          {
            id: "source",
            name: "source",
            type: "source",
            tags: ["IO", "rtcflow"],
            stepSettings: {},
            outputConfigurations: {
              output: [{ column: "", type: "", alias: "", description: "" }]
            }
          },
          {
            id: "dummy_source",
            name: "dummy_source",
            type: "source_dummy",
            tags: ["IO", "rtcflow"],
            stepSettings: { dataType: "userClick", storage: "DUMMY" },
            outputConfigurations: {
              output: [{ column: "", type: "", alias: "", description: "" }]
            }
          },
          {
            id: "sink",
            name: "sink",
            type: "sink",
            tags: ["IO", "rtcflow"],
            stepSettings: {},
            inputConfigurations: {
              input: [{ column: "", type: "", alias: "", description: "" }]
            }
          }
        ]
      },
      {
        group: "Transform",
        thisIcon: [
          {
            id: "filter",
            name: "filter",
            type: "filter",
            tags: ["Transform", "rtcflow"],
            stepSettings: {},
            inputConfigurations: {
              input: [{ column: "", type: "", alias: "", description: "" }]
            },
            outputConfigurations: {
              output: [{ column: "", type: "", alias: "", description: "" }]
            }
          },
          {
            id: "transform",
            name: "transform",
            type: "transform",
            tags: ["Transform", "rtcflow"],
            stepSettings: {},
            inputConfigurations: {
              input: [{ column: "", type: "", alias: "", description: "" }]
            },
            outputConfigurations: {
              output: [{ column: "", type: "", alias: "", description: "" }]
            }
          },
          {
            id: "sql",
            name: "sql",
            type: "sql",
            tags: ["Transform", "rtcflow"],
            stepSettings: {},
            inputConfigurations: {
              input: [{ column: "", type: "", alias: "", description: "" }]
            },
            outputConfigurations: {
              output: [{ column: "", type: "", alias: "", description: "" }]
            }
          }
        ]
      },
      {
        group: "Join",
        thisIcon: [
          {
            id: "join",
            name: "join",
            type: "join",
            tags: ["Join", "rtcflow"],
            stepSettings: {},
            inputConfigurations: {
              left: [{ column: "", type: "", alias: "", description: "" }],
              right: [{ column: "", type: "", alias: "", description: "" }]
            },
            outputConfigurations: {
              output: [{ column: "", type: "", alias: "", description: "" }]
            }
          },
          {
            id: "lookup",
            name: "lookup",
            type: "lookup",
            tags: ["Join", "rtcflow"],
            stepSettings: {},
            inputConfigurations: {
              input: [{ column: "", type: "", alias: "", description: "" }]
            },
            outputConfigurations: {
              output: [{ column: "", type: "", alias: "", description: "" }]
            }
          }
        ]
      },
      {
        group: "Group",
        thisIcon: [
          {
            id: "aggregate",
            name: "aggregate",
            type: "aggregate",
            tags: ["Group", "rtcflow"],
            stepSettings: {},
            inputConfigurations: {
              input: [{ column: "", type: "", alias: "", description: "" }]
            },
            outputConfigurations: {
              output: [{ column: "", type: "", alias: "", description: "" }]
            }
          }
        ]
      },
      {
        group: "Set",
        thisIcon: [
          {
            id: "split",
            name: "split",
            type: "split",
            tags: ["Set", "rtcflow"],
            stepSettings: {},
            inputConfigurations: {
              input: [{ column: "", type: "", alias: "", description: "" }]
            },
            outputConfigurations: {
              output: [{ column: "", type: "", alias: "", description: "" }]
            }
          }
        ]
      }
    ];
  },
  methods: {
    nodeIcon() {
      if (type in nodeIconFont) {
        return "iconTrue";
      } else {
        return false;
      }
    },
    handleDragstart() {},
    start() {
      console.log("拖动开始");
    },
    drag(ev, item) {
      //   console.log(ev);
      //   console.log(item);
      console.log("元素正在拖动");
    },
    // initData() {
    //   getAllStepList().then(res => {
    //     this.stepList = this.getLeftAsideData(
    //       res.data.data,
    //       _.uniq(this.getGroupData(res.data.data))
    //     );
    //   });
    // },
    getLeftAsideData(data, group) {
      return _.map(group, item => {
        return {
          group: item,
          thisIcon: _.compact(this.getIconData(data, item))
        };
      });
    },
    getGroupData(val) {
      return _.map(val, item => {
        return item.tags[0];
      });
    },
    getIconData(data, val) {
      return _.map(data, item => {
        if (item.tags[0] == val) {
          return item;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.right-aside {
  background: #fff;
  height: 100%;
  padding: 0 10px 10px 10px;

  .designIcon {
    text-align: center;
    display: inline-block;
    margin-right: 10px;

    h4 {
      // position: absolute;
      // top: 45px;
      margin: 0px;
      padding: 0px;
      font-size: 12px;
      // width: 100%;
      font-weight: normal;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    i {
      float: none !important;
      // position: absolute;
      left: 0px;
      margin: 0px;
      width: 50px !important;
      height: 50px !important;
      line-height: 50px !important;
      font-size: 40px !important;
    }
  }

  .designIcon:hover {
    color: #3895ff;
  }
}
</style>
