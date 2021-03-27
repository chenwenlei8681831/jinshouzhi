<template>


          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
              <div class="bg_fff">
                  <bot-header :link='link'></bot-header>
                  <div class="pad_all_30">
                      <div class="ct_title">借支详情</div>
                      <div class="flex row mar_t_30 baseInfo pad_b_20">
                          <div class="flex_1 flex col">
                              <div class="flex_1 flex row">
                                  <div class="flex_1 flex col pad_l_50 pl">
                                      <div class="flex_1 font14"><span class="span_color">ID：</span>{{msg.id}}</div>
                                      <div class="flex_1 font14"><span class="span_color">运营中心：</span>{{msg.center_name?msg.center_name:'--'}}</div>
                                      <div class="flex_1 font14"><span class="span_color">借支金额：</span>{{msg.money?msg.money:'--'}}元</div>
                                      <div class="flex_1 font14"><span class="span_color">申请时间：</span>{{msg.applytime?msg.applytime:'--'}}</div>
                                      <div class="flex_1 font14"><span class="span_color">审核人：</span>{{msg.zhuchang_name?msg.zhuchang_name:'--'}}</div>
                                  </div>
                              </div>
                          </div>
                          <div class="flex_1 flex col">
                              <div class="flex_1 flex col pad_l_50 pl">
                                  <div class="flex_1 font14"><span class="span_color">借款人：</span>{{msg.name?msg.name:'--'}}</div>
                                  <div class="flex_1 font14"><span class="span_color">所在企业：</span>{{msg.realtitle?msg.realtitle:'--'}}</div>
                                  <div class="flex_1 font14"><span class="span_color">借支理由：</span>{{msg.reason?msg.reason:'--'}}</div>
                                  <div class="flex_1 font14"><span class="span_color">申请状态：</span><span :class="msg.status==0?'list_co03':(msg.status==1?'list_co01':'list_co02')">{{msg.status_name?msg.status_name:'--'}}</span></div>
                                  <div class="flex_1 font14"></div>
                              </div>
                          </div>
                          <div class="flex col" style="width:180px;"></div>
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
          link:'/home/affair/affairOne/jzlb',
          msg:''
      }
  },
  methods:{
     
      get_detail(){
            var THIS = this;
            var data = {
                jzid:THIS.id
            };
            vue_Post(THIS,'jiezhi/details',data,callback,1,1,1,1);
            function callback(msg){
                THIS.msg = msg;
            }; 
      },

  },
   mounted(){
      this.store.commit('setPageText','当前位置：事务 / 借支详情');
      this.id = this.$route.params.id?this.$route.params.id:'';
      this.get_detail();
  },
  beforeDestroy(){
      this.store.commit('setPageText','当前位置：事务 / 借支列表');
  }
}
</script>

<style scoped>
 
   .base_btn{
       width: 70px;
       height: 30px;
       line-height: 30px;
       text-align: center;
       border-radius: 3px;
       border: 1px solid;
   }
   .moren_co{
       color: #595959;
   }
   .co01{
       color: #198AF3;
   }
   .co02{
       color: #F4514A;
   }
   .co03{
       color: #595959;
   }
   .base_btn_co01{
       color: #007DF2;
       border-color: #007DF2;
   }
   .base_btn_co02{
       color: #F4514A;
       border-color: #F4514A;
   }
    .pl .flex_1{
        height: 40px;
        line-height: 40px;
        cursor: pointer;
    }
</style>
