<template>

        <div class="flex col w_100  bg_fff b_radius10 qs_big_box margin_bottom">
              <div v-if="msg.type==1" class="qs01 flex j_between row qs_top b_line pad_l_30 pad_r_30">
                  <div class="flex row">
                      <div class="h_100 left font14">绩效统计</div>
                      <div class="h_100 center font14">
                        上月绩效金额<b class="font24" style="color:#E64726;line-height:0.6rem;">￥560,455.00</b>    月同比
                        <i style="color:#51C319;font-style:normal;">12%</i>
                      </div>
                  </div>
                  <div class="h_100 r_ed right"></div>
              </div>
              <div v-if="msg.type==2" class="qs02 flex row qs_top b_line b_line pad_l_30 pad_r_30">
                  <div class="w_100 flex row j_between">
                      <div class="w_60 flex row">
                            <div class="h_100 left font14" style="font-weight:bold;width:1.4rem;">注册用户统计</div>
                            <ul class="v_data h_100 center font14 flex row pad_t_20 pad_b_20 b_s">
                                <li @click="tab(index)" :class="index==tabIndex?'current':''" class="f_l font14 h_100 pointer" v-for="(item,index) in msg.search" :key="index">{{item}}</li>
                                <div class="clearfix"></div>
                            </ul>
                      </div>
                      <div style="100px;">
                            <el-select class="w_100" v-model="year" filterable  placeholder="请选择年份" clearable>
                                <el-option v-for="(item,index) in yearArr" :key="index" :label="item+'年'" :value="item"></el-option>
                            </el-select>
                      </div>
                  </div>
                  <div class="h_100 r_ed right"></div>
              </div>
              <div class="flex_1">
                  <div class="quxian" :id="msg.id"></div>
              </div>
        </div>
  
</template>

<script>
var THIS;
export default {
  props:['msg'],
  computed: {
      watchMsg() {
          return this.msg.data.data;
      },
      watchYear() {
          return this.year;
      }
  },
  watch: {
      watchMsg() {
          this.drawing();
      },
      watchYear(msg) {
          this.tabIndex = msg?5:0;
          this.$emit('tabClick02',msg);
      },
  },
  name: '',
  data(){
      return {
          tabIndex:0,
          yearArr:[],
          year:''
      }
  },
  methods:{

     drawing(){
          var dom = document.getElementById(THIS.msg.id);
          var myChart = echarts.init(dom);
          var texts = '';
          var option = {
                tooltip : {
                    trigger: 'axis',
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : THIS.msg.data.dataTxt
                    }
                ],
                yAxis : [ { type : 'value' } ],
                series : [                        
                    {
                        name:'注册用户',
                        type:'line',
                        smooth: true,
                        areaStyle: {},
                        data:THIS.msg.data.data,
                        areaStyle: {
                              normal: {//渐变颜色
                                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    { offset: 0, color: THIS.msg.data.line_bottom_color01 },
                                    { offset: 1, color: THIS.msg.data.line_bottom_color02 }
                                  ])
                                }
                              }, //填充区域样式
                              lineStyle: {
                                color: THIS.msg.data.line_color,
                                width: 2
                              }, //线条的样式
                              itemStyle:{
                                    normal: {
                                        // 点的颜色。
                                        color: THIS.msg.data.line_color
                                    },
                              }
                    },                       
                ],  
          };
          var app = {};
          if (option && typeof option === "object") {
              myChart.setOption(option, true);
              //window.onresize = myChart.resize;
          }
     },

     tab(index){
        this.tabIndex = index;
        this.$emit('tabClick02',index);
        this.year = '';
     }

  },
   mounted(){
        THIS = this;
        this.drawing();
        var date = new Date();
        var y = parseInt(date.getFullYear());
        for(let i=2015;i<=y;i++){
            this.yearArr.push(i);
        };
  }
}
</script>

<style scoped>
   .qs_big_box{
     height: 6rem;
   }
   .qs_top{
     height: 0.9rem;
     line-height: 0.9rem;
   }
   .qs01 .left,.qs02 .left{
      width: 1rem;
      margin-right: 0.5rem;
   }
   .qs01 .center{
   }
   .qs01 .right{
     width: 2.8rem;
   }
   .quxian{
      width: 100%;
      height: 5.1rem;
      box-sizing: border-box;
   }
   .v_data li{
      line-height: 0.5rem;
      margin-right: 0.2rem;
   }
   .v_data li.current{
      border-bottom: 2px solid #007DF1;
      color: #007DF1;
   }
</style>
