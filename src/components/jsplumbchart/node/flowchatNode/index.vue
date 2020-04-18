<template>
  <div id="flowchartnode" class="flowchart-node">
    <div
      v-for="(data,index) in stepData"
      :id="data.id"
      :key="index"
      :class="'designIconBig '+setClass(nodeClass(data.type))"
      :data-sign="data.name"
      :data-type="data.type"
      :style="'left:'+data.x+'px;top:'+data.y+'px;position:absolute;margin:0'"
      @dblclick="dblClick(data)"
    >
      <i class="icon iconfont icon-ir-designIconBg designIconBg" />
      <i
        id="changeSte"
        :class="nodeIcon(data.type) == 'iconTrue'?'icon iconfont icon-ir-d-'+data.type:'icon iconfont icon-ir-d-default'"
      />
      <h4 :title="data.name">{{ data.name }}</h4>
      <h5>ID:{{ data.id }}</h5>
      <em
        id="copeDes"
        class="icon iconfont icon-ir-copy"
        title="复制"
        @click.prevent="copyNode(data)"
      />
      <em id="removeDes" class="fa fa-trash-o" title="删除" @click="delNode(data.id)" />

      <div v-show="data.type=='split'" class="line-split" :style="setLineSplit(data)" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { setClass, nodeClass, nodeIcon } from '../../lib/flowchart'
export default {
  components: {},
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data: function() {
    return {
      stepData: [],
      nodeClass: nodeClass,
      nodeIcon: nodeIcon,
      setClass: setClass
    }
  },
  computed: {
    // ...mapState([""])
  },
  watch: {
    data(val) {
      this.stepData = val.stepData
    }
  },
  mounted() {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed: function() {},
  methods: {
    // ...mapActions([""]),

    delNode(val) {
      this.$emit('delNode', val)
    },
    dblClick(val) {
      this.$emit('dblClick', val)
    },
    copyNode(val) {
      this.$emit('copyNode', val)
    },
    setLineSplit(step) {
      if (step.type == 'split') {
        const outputConfigurations = _.toArray(step.outputConfigurations)

        switch (outputConfigurations.length) {
          case 21:
          case 20:
            return 'height: 280px; top: -100px;'
          case 19:
          case 18:
          case 17:
            return 'height: 270px; top: -95px;'

          case 16:
          case 15:
            return 'height: 270px; top: -90px;'
          case 14:
          case 13:
          case 12:
            return 'height: 190px; top: -50px;'
          case 11:
          case 10:
            return 'height: 155px; top: -43px;'
          case 9:
          case 8:
            // case 7:
            return 'height: 120px; top: -35px;'
          case 7:
          case 6:
          case 5:
            return 'height: 120px; top: -25px;'
          default:
            return 'height: 70px; top: 0px;'
        }
      }
    }
  }
}
</script>

<style lang="scss">
.flowchart-node {
  height: 100%;
  width: 100%;
  position: relative;
  // ////////////////////////node style begin///////////////////
  .designIconBig {
    height: 70px;
    width: 150px;
    margin: 0 auto;
    padding: 12px;
    box-sizing: border-box;
    box-shadow: 0 10px 18px -9px rgba(0, 0, 0, 0.5);
    background: #ffffff;
    text-align: center;
    position: absolute;
    margin-right: 15px;
    margin-bottom: 20px;
    // cursor: move;
    float: left;
  }

  .designIconBig i {
    float: none !important;
    position: absolute;
    left: 5px;
    top: 8px;
    width: 30px !important;
    height: 30px !important;
    line-height: 30px !important;
    font-size: 30px !important;
  }

  .designIconBig h4 {
    position: absolute;
    top: 5px;
    left: 38px;
    margin: 0px;
    padding: 2px 0;
    width: 110px;
    text-align: left;
    font-size: 14px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .designIconBig h5 {
    position: absolute;
    top: 25px;
    left: 38px;
    margin: 0px;
    padding: 0px;
    width: 110px;
    text-align: left;
    font-size: 12px;
    font-weight: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .designIconBig #removeDes {
    position: absolute;
    top: 46px;
    right: 15px;
    font-size: 14px;
    color: #b9c0d8;
    margin: 0px;
    padding: 0px;
  }

  .designIconBig #copeDes {
    position: absolute;
    top: 45px;
    right: 35px;
    font-size: 14px;
    color: #b9c0d8;
    margin: 0px;
    padding: 0px;
  }
  .designIconBig #pitchOnDes {
    position: absolute;
    top: 47px;
    right: 60px;
    font-size: 14px;
    color: #b9c0d8;
    margin: 0px;
    padding: 0px;
  }
  .desingIconBig #markDes {
    position: absolute;
    top: 45px;
    right: 20px;
    font-size: 14px;
    color: #b9c0d8;
    margin: 0px;
    padding: 0px;
  }

  // .t1Style {
  //   border: 2px solid #48c038;
  //   color: #48c038;
  //   border-radius: 2px;
  // }
  // .t2Style {
  //   border: 2px solid #4586f3;
  //   color: #4586f3;
  //   border-radius: 2px;
  // }
  // .t3Style {
  //   border: 2px solid #8367df;
  //   color: #8367df;
  //   border-radius: 2px;
  // }

  .redStyle {
    border: 2px solid red;
  }
  .designIconBg {
    position: absolute;
    color: #ffffff !important;
  }

  .designIconBig #removeDes:hover {
    color: #ff4e4e;
  }

  .designIconBig #copeDes:hover {
    color: #ff4e4e;
  }

  .designIconBig #pitchOnDes:hover {
    color: #ff4e4e;
  }

  // ////////////////////////node style end///////////////////

  .line-split {
    position: absolute;
    height: 100px;
    width: 2px;
    background: #4586f3;
    right: -2px;
    top: 0;
  }

  .jtk-endpoint {
    // z-index: 12;
    // opacity: 0.8;
    cursor: default;
  }
}
</style>
