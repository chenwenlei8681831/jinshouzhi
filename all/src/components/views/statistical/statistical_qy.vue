<template>

          <div class="views">
                <bot-header></bot-header>
                <div class="bg_fff b_s pad_r_30 pad_l_30 pad_b_30">
                    <!--方块-->
                    <div class="flex row tj_top">
                        <div class="h_100 left font14 h_100 center font14 flex row pad_t_20 pad_b_20 b_s" style="line-height: 0.5rem;">企业数据简报</div>
                    </div>
                    <xt-header :msg='headerMsg'></xt-header>
                </div>
                
                <div class="w_100 flex row j_between mar_t_30" style="height:6rem;">
                    <!--曲线统计图-->
                    <div class="bg_fff h_100 w_60">
                        <xt-qushi :msg='qs'></xt-qushi>
                    </div>
                    <!--列表排行-->
                    <div class="flex col h_100 bg_fff w_40 mar_l_30 over_hide" style="border-radius:5px;">
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
          adminType:(JSON.parse(window.localStorage.userInfo)).rule_type==5?1:2,
          tabIndex:0,
          headerMsg:[
            { title:'合作企业',number:'0',class:'current13'},
            { title:'正在招聘',number:'0',class:'current15'},
            { title:'停止招聘',number:'0',class:'current14'}
          ],
          qs:{
              header_title:['合作企业','正在招聘','停止招聘'],
              data:[],
              dataTxt:[]
          },
          list:{
            title:'合作企业数据排行',
            link:'/home/statistical/statisticalFour/statistical_qyDetail',
            tabIndex:0,
            header:[],
            header01:[
                { class:'v_color01',title:'省级分公司' },
                { class:'v_color02',title:'合作企业' },
                { class:'v_color03',title:'正在招聘' },
                { class:'v_color04',title:'停止招聘' }
            ],
            header02:[
                { class:'v_color01',title:'合作企业' },
                { class:'v_color03',title:'在职员工' }
            ],
            list:[]
          }
          
      }
  },
  methods:{

      get_detail(){
            var THIS = this;
            var data = {
                type:3,
                province:THIS.cityId
            };
            vue_Post(THIS,'index/tongjiIndex',data,callback,1,1,1,1);
            function callback(msg){
                THIS.headerMsg[0].number = msg.jb.zs.num;
                THIS.headerMsg[1].number = msg.jb.zz.num;
                THIS.headerMsg[2].number = msg.jb.tz.num;
                var a = msg.ph;
                THIS.list.list = [];
                if(THIS.adminType==1){//总公司
                    THIS.list.header = THIS.list.header01;
                    for(let i=0;i<a.length;i++){
                        THIS.list.list.push([
                            { class:'v_color01',title:a[i].name  },
                            { class:'v_color02',title:a[i].num_0 },
                            { class:'v_color03',title:a[i].num_1 },
                            { class:'v_color04',title:a[i].num_2 } 
                        ])
                    };
                }else{//分公司
                    THIS.list.header = THIS.list.header02;
                    for(let i=0;i<a.length;i++){
                        THIS.list.list.push([
                            { class:'v_color01',title:a[i].name  },
                            { class:'v_color02',title:a[i].num_0 }
                        ])
                    };
                };
                //趋势图
                THIS.qs.dataTxt = msg.qs.time;
                THIS.qs.data[0] = { title:'合作企业',line_color:'#474747',data:msg.qs.zs };
                THIS.qs.data[1] = { title:'正在招聘',line_color:'#09A895',data:msg.qs.zz };
                THIS.qs.data[2] = { title:'暂停招聘',line_color:'#FF6A4B',data:msg.qs.tz };
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
            var url = THIS.adminType==1?'index/branch_company_rank':'index/branch_company_yuangong';
            vue_Post(THIS,url,data,callback,1,1,1,1);
            function callback(msg){
                var a = msg.list;
                THIS.list.list = [];
                if(THIS.adminType==1){//总公司
                    THIS.list.header = THIS.list.header01;
                    for(let i=0;i<a.length;i++){
                        THIS.list.list.push([
                            { class:'v_color01',title:a[i].name  },
                            { class:'v_color02',title:a[i].num_0 },
                            { class:'v_color03',title:a[i].num_1 },
                            { class:'v_color04',title:a[i].num_2 } 
                        ])
                    };
                }else{//分公司
                    THIS.list.header = THIS.list.header02;
                    for(let i=0;i<a.length;i++){
                        THIS.list.list.push([
                            { class:'v_color01',title:a[i].name  },
                            { class:'v_color02',title:a[i].num_0 }
                        ])
                    };
                };
            }
      }
     

  },
  mounted(){

      this.store.commit('setPageText','当前位置：统计 / 企业统计');
      this.header = this.adminType==1?this.header01:this.header02;
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
