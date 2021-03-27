<template>

          <div class="views">
                <bot-header></bot-header>
                <!--方块-->
                <div class="bg_fff b_s pad_r_30 pad_l_30 pad_b_30">
                    <div class="flex row tj_top"  style="height:0.9rem;">
                        <div class="h_100 left font14 h_100 center font14 flex row pad_t_20 pad_b_20 b_s" style="line-height: 0.5rem;">运营中心数据简报</div>
                        <ul class="v_data h_100 center font14 flex row pad_t_20 pad_b_20 b_s">
                            <li @click="tabs(0)" :class="tabIndex==0?'current':''" class="mar_r_20 f_l font14 h_100 pointer timer b_s">今日</li>
                            <li @click="tabs(1)" :class="tabIndex==1?'current':''" class="mar_r_20 f_l font14 h_100 pointer timer b_s">本周</li>
                            <li @click="tabs(2)" :class="tabIndex==2?'current':''" class="mar_r_20 f_l font14 h_100 pointer timer b_s">本月</li>
                            <div class="clearfix"></div>
                        </ul>
                    </div>
                    <xt-header :msg='headerMsg'></xt-header>
                </div>
                <!--趋势-->
                <div class="w_100 flex row j_between mar_t_30" style="height:6rem;">
                    <div class="bg_fff h_100 w_60">
                        <xt-qushi :msg='qs'></xt-qushi>
                    </div>
                    <div class="flex col h_100 bg_fff w_40 mar_l_30" style="border-radius:5px;">
                        <xt-list @choose_tab='choose_tab' :list='list'></xt-list>
                    </div>
                </div>
          </div>
  
</template>

<script>
import botHeader from '../../components/bot-header/bot-header';
import xtHeader from './components/xt-header';
import xtQushi from './components/xt-qushi';
import xtList from './components/xt-list';
export default {
  components:{
    botHeader,
    xtHeader,
    xtQushi,
    xtList
  },
  name: '',
  computed: {
        watchCityId() {
            return this.store.state.cityId;
        },
  },
  watch:{
        watchCityId(id) {
            var THIS = this;
            THIS.cityId = window.localStorage.cityId;
            THIS.get_detail();
        },
  },
  data(){
      return {  
          cityId:window.localStorage.cityId?window.localStorage.cityId:'',
          tabIndex:0,
          headerMsg:[
            { title:'运营中心总数',number:'0',class:'current12'},
            { title:'业务员',number:'0',class:'current11'},
            { title:'录入员工',number:'0',class:'current10'},
            { title:'发送员工',number:'0',class:'current09'}
          ],
          qs:{
              header_title:['运营中心','业务员','录入员工','发送员工'],
              data:[],
              dataTxt:[]
          },
          list:{
            title:'运营中心员工数据排行',
            link:'/home/statistical/statisticalThree/statistical_yyDetail',
            tabIndex:0,
            header:[
                { class:'v_color01',title:'运营中心' },
                { class:'v_color03',title:'录入员工' },
                { class:'v_color05',title:'出发员工' }
            ],
            list:[]
          }
          
      }
  },
  methods:{

      tabs(index){
        this.tabIndex = index;
        this.get_statistical();
      },

      get_detail(){
            var THIS = this;
            var data = {
                type:2,
                province:THIS.cityId
            };
            vue_Post(THIS,'index/tongjiIndex',data,callback,1,1,1,1);
            function callback(msg){
                THIS.headerMsg[0].number = msg.jb.yy.num;
                THIS.headerMsg[1].number = msg.jb.yw.num;
                THIS.headerMsg[2].number = msg.jb.lr.num;
                THIS.headerMsg[3].number = msg.jb.cf.num;
                var a = msg.ph;
                THIS.list.list = [];
                for(let i=0;i<a.length;i++){
                    THIS.list.list.push([
                      { class:'v_color01',title:a[i].name  },
                      { class:'v_color03',title:a[i].num_0 },
                      { class:'v_color05',title:a[i].num_1 }
                    ])
                };
                //趋势图
                THIS.qs.dataTxt = msg.qs.time;
                THIS.qs.data[0] = { title:'运营中心',line_color:'#474747',data:msg.qs.yy };
                THIS.qs.data[1] = { title:'业务员',line_color:'#09A895',data:msg.qs.yw };
                THIS.qs.data[2] = { title:'录入员工',line_color:'#FF6A4B',data:msg.qs.lr };
                THIS.qs.data[3] = { title:'出发员工',line_color:'#F7A54D',data:msg.qs.cf };
            }; 
      },

      get_statistical(){
            var THIS = this;
            var data = {
                type:2,
                time:THIS.tabIndex,
                province:THIS.cityId
            };
            vue_Post(THIS,'index/jianbaobytime',data,callback,1,1,1,1);
            function callback(msg){
                THIS.headerMsg[0].number = msg.yy.num;
                THIS.headerMsg[1].number = msg.yw.num;
                THIS.headerMsg[2].number = msg.lr.num;
                THIS.headerMsg[3].number = msg.cf.num;
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
                type:0,
                sort:THIS.list.tabIndex==0?0:THIS.list.tabIndex-1,
                desc:THIS.list.tabIndex==0?1:0
            };
            vue_Post(THIS,'index/centerranking',data,callback,1,1,1,1);
            function callback(msg){
                var a = msg.list;
                THIS.list.list = [];
                for(let i=0;i<a.length;i++){
                    THIS.list.list.push([
                      { class:'v_color01',title:a[i].name  },
                      { class:'v_color03',title:a[i].num_0 },
                      { class:'v_color05',title:a[i].num_1 }
                    ])
                };
            }
      }

  },
  mounted(){

      this.store.commit('setPageText','当前位置：统计 / 运营中心统计');
      this.get_detail();

  }
}
</script>

<style scoped>
   .title{
     height: 0.6rem;
     line-height: 0.6rem;
     font-size: 14px;
     color: #262626;
     font-weight: bold;
   }
   .margin_bottom{
     margin-bottom: 0.32rem;
   }
   .tj_top .left{
        margin-right: 0.5rem;
   }
   .timer{
     line-height: 0.5rem;
   }
   .timer.current{
     border-bottom: 2px solid #007DF1;
     color: #007DF1;
   }
</style>
