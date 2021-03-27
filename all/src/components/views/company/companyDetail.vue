<template>


          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
              <div class="bg_fff">
                  <bot-header :link='link'></bot-header>
                  <div class="views_100ch_1 pad_all_30">
                      <div class="ct_title">基本信息</div>
                      <div class="w_100 mar_t_30">
                            <div class="w_100 mar_b_30">
                                <div class="line_30px pad_r_20 w_333 b_s s_l f_l font15 pointer">
                                    <span class="color_span">企业真实名称:</span> {{msg.realtitle}}
                                </div>
                                <div class="line_30px pad_r_20 w_333 b_s s_l f_l font15 pointer">
                                    <span class="color_span">社会信用代码:</span> {{msg.xy_code}}
                                </div>
                                <div class="line_30px pad_r_20 w_333 b_s s_l f_l font15 pointer">
                                    <span class="color_span">所属行业:</span>  {{msg.industry_name}}
                                </div>
                                <div class="clearfix"></div>
                            </div>
                            <div class="w_100 mar_b_30">
                                <p class="font15 color_span">企业简介：</p>
                                <p class="mar_t_10 font15">{{msg.profile}} </p>
                            </div>
                            <div class="w_100 mar_b_30">
                                <div class="line_30px pad_r_20 w_333 b_s s_l f_l font15 pointer">
                                    <span class="color_span">所属分公司:</span> {{msg.branch_title}}
                                </div>
                                <div class="line_30px pad_r_20 w_333 b_s s_l f_l font15 pointer"></div>
                                <div class="line_30px pad_r_20 w_333 b_s s_l f_l font15 pointer"></div>
                                <div class="clearfix"></div>
                            </div>
                      </div>
                      <div class="ct_title">开票信息</div>
                      <div class="w_100 mar_t_30">
                            <div class="w_100 mar_b_30">
                                <div class="line_30px pad_r_20 w_333 b_s s_l f_l font15 pointer">
                                    <span class="color_span">签单公司:</span> {{msg.qiandan_danwei}}
                                </div>
                                <div class="line_30px pad_r_20 w_666 b_s s_l f_l font15 pointer">
                                    <span class="color_span">开票信息:</span> {{msg.qiandan_info}}
                                </div>
                                <div class="line_30px pad_r_20 w_333 b_s s_l f_l font15 pointer"></div>
                                <div class="clearfix"></div>
                            </div>
                      </div>
                      <!--管理工厂-->
                      <div class="w_50">
                            <div  class="ct_title mar_t_30">驻厂信息</div>
                            <div  class="flex col mar_t_30">
                                <ol class="w_100 row flex h_50px line_50px li_bg">
                                    <li class="flex_1 pad_l_30">驻厂姓名</li>
                                    <li class="flex_1 pad_l_30">联系电话</li>
                                </ol>
                                <ul class="w_100">
                                    <li class="w_100">
                                        <ol class="co03 row flex h_50px line_50px list_item" :class="index%2==1?'li_bg':''"  v-for="(item,index) in zhuchangArr" :key="index">
                                                <li class="font14 flex_1 pad_l_30">{{item.name?item.name:'--'}}</li>
                                                <li class="font14 flex_1 pad_l_30">{{item.phone?item.phone:'--'}}</li>
                                        </ol>
                                    </li>
                                </ul>
                            </div>
                            <p class="font14 text_center list_co0" style="line-height:50px" v-if="zhuchangArr.length==0">暂无数据</p>
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
          link:'/home/company/companyOne/companyList',
          msg:{},
          zhuchangArr:[]
      }
  },
  methods:{

      //获取详情
      get_detail(){
            var THIS = this;
            var data = {
                companyid:THIS.id
            };
            vue_Post(THIS,'company/addPreInfo',data,callback,1,1,1,1);
            function callback(msg){
                THIS.msg = msg.info;
                THIS.zhuchangArr = msg.info.zhuchang_list;
            };
      },

  },
   mounted(){

      this.store.commit('setPageText','企业 / 企业详情');
      this.id = this.$route.params.id?this.$route.params.id:'';
      this.get_detail();

  },
  beforeDestroy(){
      this.store.commit('setPageText','当前位置：企业 / 企业列表');
  }
}
</script>

<style scoped>
   .color_span{
       color: #8C8C8C;
   }
   .li_bg{
       background:rgba(250,250,250,1);
   }
</style>
