<template>


          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
              <div class="bg_fff">
                  <bot-header :link='link'></bot-header>
                  <div class="views_100ch_1 pad_all_30">
                      <div class="ct_title mar_t_30">报名人信息</div>
                      <div class="flex row b_line mar_t_30 pad_b_20 shoukuan">
                          <div class="flex_1  h_60px flex pad_r_20 pointer"><span class="">员工姓名: </span>{{msg.username}}</div>
                          <div class="flex_1  h_60px flex pad_r_20 pointer"><span class="">联系电话: </span>{{msg.phone}}</div>
                          <div class="flex_1  h_60px flex pad_r_20 pointer"><span class="">运营中心: </span>{{msg.center_name}}</div>
                      </div>

                      <div class="ct_title mar_t_30">报名记录</div>
                      <div class="flex col mar_t_30 b_line pad_b_30">
                          <ol class="w_100 row flex h_50px line_50px li_bg">
                              <li class="flex_2 pad_l_30">报名企业</li>
                              <li class="flex_2 pad_l_30">所在地区</li>
                              <li class="flex_1 pad_l_30">报名时间</li>
                          </ol>
                          <ul class="w_100">
                              <li class="w_100">
                                  <ol class="row flex h_50px line_50px list_item"  v-for="(item,index) in list" :key="index">
                                        <li class="flex_2 pad_l_30 pointer" :class="index%2==1?'li_bg':''" :title="item.realtitle?item.realtitle:'--'">{{item.realtitle?item.realtitle:'--'}}</li>
                                        <li class="flex_2 pad_l_30 pointer" :class="index%2==1?'li_bg':''" :title="item.address?item.address:'--'">{{item.address?item.address:'--'}}</li>
                                        <li class="flex_1 pad_l_30 pointer" :class="index%2==1?'li_bg':''" :title="item.enroll_time?item.enroll_time:'--'">{{item.enroll_time?item.enroll_time:'--'}}</li>
                                  </ol>
                              </li>
                          </ul>
                      </div>

                      <div v-if="type==1" class="ct_title mar_t_30">处理信息</div>
                      <div v-if="type==1" class="flex row mar_t_30 pad_b_20 shoukuan">
                          <div class="flex_1  h_60px flex pad_r_20 pointer"><span class="">处理信息: </span>{{msg.mark}}</div>
                          <div class="flex_1  h_60px flex pad_r_20 pointer"><span class="">处理时间: </span>{{msg.handling_time}}</div>
                          <div class="flex_1  h_60px flex pad_r_20 pointer"></div>
                      </div>
                  </div>
              </div>
          </div>
  
</template>

<script>
import botHeader from '../../components/bot-header/bot-header';
export default {
  components:{
    botHeader
  },
  name: '',
  data(){
      return {
          id:'',
          type:'',
          link:'/home/apply/applyOne/applyList',
          list:[],
          msg:{}
      }
  },
  methods:{
     
      get_detail(){
            var THIS = this;
            var data = {
                id:THIS.id
            };
            vue_Post(THIS,'enroll/details',data,callback,1,1,1,1);
            function callback(msg){
                THIS.msg = msg;
                THIS.list = msg.enroll_record;
            }; 
      },

  },
   mounted(){

      this.store.commit('setPageText','当前位置：报名 / 报名详情');
      this.id = this.$route.params.id?this.$route.params.id:'';
      this.type = this.$route.params.type;
      this.get_detail();

  }
}
</script>

<style scoped>
   .shoukuan{
       color: #262626;
   } 
   .shoukuan span{
       color: #8C8C8C;
   }
   .li_bg{
       background:rgba(250,250,250,1);
   }
   .baseInfo >div:nth-child(1) .top{
       background: url(../../../assets/images/stor.png) no-repeat left center /22px;
   }
   .base_btn{
       width: 70px;
       height: 30px;
       line-height: 30px;
       text-align: center;
       border-radius: 3px;
       border: 1px solid;
   }
   .base_btn_co01{
       color: #007DF2;
       border-color: #007DF2;
   }
   .base_btn_co02{
       color: #F4514A;
       border-color: #F4514A;
   }
</style>
