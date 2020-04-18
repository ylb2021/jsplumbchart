<template>
  <div class="container">
    <h1>疫情数据实时监控</h1>
    <MapChart
      :countryData="{'US': 4, 'CA': 7, 'GB': 8, 'IE': 14, 'ES': 21}"
      highColor="#ff0000"
      lowColor="#aaaaaa"
      countryStrokeColor="#909090"
      defaultCountryFillColor="#dadada"
    />
  </div>
</template>

<script>
import MapChart from "vue-map-chart";

export default {
  components: {
    MapChart
  },
  data() {
    return {
      dataPoints: null,
      height: 20
    };
  },
  mounted() {},
  methods: {},
  computed: {}
};
</script>

<style>
.container {
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  font-family: "Helvetica", Arial;
  color: #464646;
  text-transform: uppercase;
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 15px;
  font-size: 28px;
  margin-top: 50px;
  text-align: center;
  height: 30px;
  line-height: 30px;
}

.Chart {
  padding: 20px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  margin: 50px 0;
}
</style>
