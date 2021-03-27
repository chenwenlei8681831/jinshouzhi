<template>

          <div class="views">
                <bot-header></bot-header>
                <!--方块-->
                <div class="bg_fff b_s pad_r_30 pad_l_30 pad_b_30">
                    <div class="flex row tj_top">
                        <div class="h_100 left font14 h_100 center font14 flex row pad_t_20 pad_b_20 b_s" style="line-height: 0.5rem;">驻厂数据简报</div>
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
  name: '',
  data(){
      return {  
          cityId:window.localStorage.cityId?window.localStorage.cityId:'',
          tabIndex:0,
          headerMsg:[
            { title:'驻厂总数',number:'100',class:'current06'},
            { title:'待接收员工',number:'200',class:'current07'},
            { title:'待办理入职员工',number:'300',class:'current02'},
            { title:'待签署合同员工',number:'400',class:'current08'}
          ],
          qs:{
              header_title:['驻厂总数','待接收','待办入职','待签合同'],
              data:[],
              dataTxt:[]
          },
          list:{
            title:'驻厂管理数据排行',
            link:'/home/statistical/statisticalTwo/statistical_zcDetail',
            tabIndex:0,
            header:[
                { class:'v_color01',title:'驻厂' },
                { class:'v_color02',title:'工厂数' },
                { class:'v_color03',title:'员工数' }
            ],
            list:[]
          }
          
      }
  },
  methods:{

      get_detail(){
            var THIS = this;
            var data = {
                type:1,
                province:THIS.cityId
            };
            vue_Post(THIS,'index/tongjiIndex',data,callback,1,1,1,1);
            function callback(msg){
                THIS.headerMsg[0].number = msg.jb.zs.num;
                THIS.headerMsg[1].number = msg.jb.dj.num;
                THIS.headerMsg[2].number = msg.jb.db.num;
                THIS.headerMsg[3].number = msg.jb.dq.num;
                var a = msg.ph;
                THIS.list.list = [];
                for(let i=0;i<a.length;i++){
                    THIS.list.list.push([
                      { class:'v_color01',title:a[i].name  },
                      { class:'v_color02',title:a[i].num_0 },
                      { class:'v_color03',title:a[i].num_1 }
                    ])
                };
                //趋势图
                THIS.qs.dataTxt = msg.qs.time;
                THIS.qs.data[0] = {  title:'驻厂总数',line_color:'#474747',data:msg.qs.zs };
                THIS.qs.data[1] = {  title:'待接收',line_color:'#09A895',data:msg.qs.dj };
                THIS.qs.data[2] = {  title:'待办入职',line_color:'#FF6A4B',data:msg.qs.db };
                THIS.qs.data[3] = {  title:'待签合同',line_color:'#007DF2',data:msg.qs.dq };
            }; 
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
            vue_Post(THIS,'index/zhuchangranking',data,callback,1,1,1,1);
            function callback(msg){
                var a = msg.list;
                THIS.list.list = [];
                for(let i=0;i<a.length;i++){
                    THIS.list.list.push([
                      { class:'v_color01',title:a[i].name  },
                      { class:'v_color02',title:a[i].num_0 },
                      { class:'v_color03',title:a[i].num_1 }
                    ])
                };
            }
      }

  },
  mounted(){

      this.store.commit('setPageText','当前位置：统计 / 驻厂统计');
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
