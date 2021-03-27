<template>
        <div class="views pad_l_50 pad_r_50 b_s mr_color01">
          <div class="bg_fff">
                <bot-header :link='link'></bot-header>
                <div class="views_100ch_1">
                    <!--顶部选项-->
                    <div class="pad_l_30 pad_r_30 w_100 header_item h_60px b_s font14">
                            合作企业数据排行
                    </div>
                    <!--列表-->
                    <div class="list">
                        <detail-list @choose_tab='choose_tab' @choose_span='choose_span' :list="list"></detail-list>
                        <!--分页-->
                        <div class="page_footer b_s w_100 h_60px">
                            <el-pagination
                                class="f_r"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="page"
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size=count
                                layout="total, sizes, prev, pager, next, jumper"
                                :total=total>
                            </el-pagination>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
          </div>
        </div>
</template>

<script>
import botHeader from '../../components/bot-header/bot-header';
import tabCar from '../../components/list/tab-car.vue';
import downLoad from '../../components/list/down-load.vue';
import detailList from './components/detail-list.vue';
export default {
  components:{
      botHeader,
      tabCar,
      downLoad,
      detailList
  },
  computed: {
        watchCityId() {
            return this.store.state.cityId;
        },
  },
  watch:{
        watchCityId(id) {
            var THIS = this;
            THIS.cityId = window.localStorage.cityId;
            THIS.get_list();
        },
  },
  name: '',
  data(){
      return {
          adminType:(JSON.parse(window.localStorage.userInfo)).rule_type==5?1:2,
          cityId:window.localStorage.cityId?window.localStorage.cityId:'',
          link:'/home/statistical/statisticalOne/statistical_yg',
          page:1,
          count:10,
          total:0,
          list:{
            title:'合作企业数据排行',
            link:'/home/statistical/statisticalFour/statistical_qyDetail',
            tabIndex:0,
            allFlag:false,
            header:[],
            header01:[
                { class:'v_color01',title:'省级分公司' },
                { class:'v_color03',title:'在职员工' },
            ],
            header02:[
                { class:'v_color01',title:'运营中心' },
                { class:'v_color03',title:'在职员工' }
            ],
            list:[],
          }

      }
  },
  methods:{


      handleCurrentChange(val){
          this.page = val;
          this.get_list();
      },

      handleSizeChange(val) {
          this.count = val;
          this.page = 1;
          this.get_list();
      },

      view(type,id){
          if(type==1){
              this.$router.replace('/home/zhuchang/zhuchangOne/zhuchangDatile/'+id);
          }else if(type==2){
              this.$router.replace('/home/zhuchang/zhuchangCreate/'+id);
          };
      },

      down(type){
            var THIS = this;
            if(type==1){
                THIS.$router.replace(THIS.downobj.addLink);
            }
      },

      choose_tab(index){
            this.list.tabIndex = this.list.tabIndex==index?0:index;
            this.get_list();
      },

      get_list(){
            var THIS = this;
            var data = {
                province:THIS.cityId,
                type:1,
                sort:THIS.list.tabIndex==0?0:THIS.list.tabIndex-1,
                desc:THIS.list.tabIndex==0?1:0,
                page:THIS.page,
                count:THIS.count
            };
            var url = THIS.adminType==1?'index/branch_rank':'index/center_rank';
            vue_Post(THIS,url,data,callback,1,1,1,1);
            function callback(msg){
                var a = msg.list;
                THIS.total = msg.total;
                THIS.list.list = [];
                if(THIS.adminType==1){//总公司
                    for(let i=0;i<a.length;i++){
                        THIS.list.list.push([
                            { class:'v_color01',title:a[i].name  },
                            { class:'v_color02',title:a[i].num_0 },
                        ])
                    };
                }else{//分公司
                    for(let i=0;i<a.length;i++){
                        THIS.list.list.push([
                        { class:'v_color01',title:a[i].name  },
                        { class:'v_color02',title:a[i].num_0 }
                        ])
                    };
                };
            }
      },

      choose_span(index){
          var THIS = this;
          if(index==1000){//全选
              THIS.list.allFlag = !THIS.list.allFlag;
              for(let i=0;i<THIS.list.list.length;i++){
                THIS.list.list[i][0].flag = THIS.list.allFlag;
              };
          }else{//单选
              THIS.list.list[index][0].flag = !THIS.list.list[index][0].flag;
              if(!THIS.list.list[index][0].flag){
                  THIS.list.allFlag = false;
              };
              THIS.list.list = JSON.parse(JSON.stringify(THIS.list.list));
          };
      }


  },
   mounted(){

      this.store.commit('setPageText','当前位置：统计 / 员工统计详情');
      this.list.header = this.adminType==1?this.list.header01:this.list.header02;
      this.get_list();
      
  }
}
</script>

<style scoped>
    .list_header li,.list_main ol li{
        width: 16%;
    }
    .zc_img{
        width:40px;
        height:40px;
        border-radius: 50%;
        overflow: hidden;
        margin: 5px 0;
        background: url(../../../assets/images/moren01.png) no-repeat center /100%;
    }
</style>
