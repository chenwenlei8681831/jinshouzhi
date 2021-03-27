<template>

          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
              <div class="bg_fff">
                  <bot-header :link='link'></bot-header>
                  <div class="pad_all_30">
                      <div class="ct_title">基本信息</div>
                      <div class="flex row mar_t_30 baseInfo pad_b_20">
                          <div class="flex_1 flex col" style="height:140px">
                              <div class="flex_1 flex row">
                                    <img v-if="msg.picture" class="d_block b_radius50" style="width:100px;height:100px;" :src="msg.picture" alt="">
                                    <div v-else class="moren d_block b_radius50" style="width:100px;height:100px;"></div>
                                    <div class="flex_1 flex col pad_l_20">
                                        <div class="flex_1 font14"><span class="span_color">ID：</span>{{msg.id}}</div>
                                        <div class="flex_1 font14"><span class="span_color">性别：</span>{{msg.sex?((msg.sex==1|'男')?'男':'女'):'--'}}</div>
                                        <div class="flex_1 font14"><span class="span_color">出生日期：</span>{{msg.birthday?msg.birthday:'--'}}</div>
                                        <div class="flex_1 font14"><span class="span_color">推荐奖金额：</span>{{msg.bonus?msg.bonus:'0'}}元</div>
                                    </div>
                              </div>
                          </div>
                          <div class="flex_1 flex col" style="height:140px">
                                <div class="flex_1 flex col pad_l_20">
                                    <div class="flex_1 font14"><span class="span_color">微信昵称：</span>{{msg.name?msg.name:'--'}}</div>
                                    <div class="flex_1 font14"><span class="span_color">联系电话：</span>{{msg.phone?msg.phone:'--'}}</div>
                                    <div class="flex_1 font14"><span class="span_color">现居住地：</span>{{(msg.province_name+msg.city_name+msg.area_name)?msg.province_name+msg.city_name+msg.area_name:'--'}}</div>
                                    <div class="flex_1 font14"><span class="span_color">注册时间：</span>{{msg.createat?msg.createat:'--'}}</div>
                                </div>
                          </div>
                          <div class="flex" style="width:180px;"></div>
                      </div>
                  </div>
              </div>
          </div>
  
</template>

<script>
var THIS;
import botHeader from '../../components/bot-header/bot-header';
export default {
  components:{
    botHeader
  },
  name: '',
  data(){
      return {
          isSelf:1,
          msg:'',
          id:'',
          link:'/home/employees/employeesFour/userList'
      }
  },
  methods:{

      get_detail(){
            var data = {
                id:THIS.id
            };
            vue_Post(THIS,'user/info',data,callback,1,1,1,0);
            function callback(msg){
                THIS.msg = msg.info;
            }; 
      },

      edit(id,type){
          THIS.$router.replace('/home/employees/employeesFour/userList/'+id);
      },
      

  },
   mounted(){

        THIS = this;
        THIS.store.commit('setPageText','当前位置：员工 / 员工详情');
        THIS.id = THIS.$route.params.id;
        THIS.get_detail();

  },
  beforeDestroy(){
      THIS.store.commit('setPageText','当前位置：员工 / 用户列表');
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
   .qt_box{
        width: 240px;
        height: 80px;
        border:1px solid rgba(241, 241, 241, 1);
        box-shadow:0px 2px 6px 0px rgba(207,228,255,0.4);
        border-radius: 6px;
   }
   .qt_box .flex_1{
       padding: 10px 0;
       line-height: 30px;
   }
   .zp_box{
        width: 80px;
        height: 110px;
   }
   .zp_box img{
       height: 80px;
       border-radius: 10px;
   }
   .zp_box p{
       height: 20px;
       line-height: 20p;
       margin-top: 10px;
       color: #8C8C8C;
       font-size: 12px;
   }
   .moren{
       background: url(../../../assets/images/moren01.png) no-repeat center /100% 100%;
   }
   .zp_moren{
       height: 80px;
       border-radius: 10px;
       background: url(../../../assets/images/moren.png) no-repeat center /100% 100%;
   }
</style>
