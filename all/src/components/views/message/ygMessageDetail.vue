<template>

          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
              <div class="bg_fff">
                  <bot-header :link='link'></bot-header>
                  <div class="views_100ch_1 pad_all_30">
                      <div class="ct_title">基本信息</div>
                      <div class="flex row b_line mar_t_30 baseInfo pad_b_20">
                          <div class="flex_1 flex col" style="height:350px">
                              <div class="flex_1 flex row">
                                    <img v-if="msg.picture" class="d_block b_radius50" style="width:100px;height:100px;" :src="msg.picture" alt="">
                                    <div v-else class="moren d_block b_radius50" style="width:100px;height:100px;"></div>
                                    <div class="flex_1 flex col pad_l_20">
                                        <div class="flex_1 font14"><span class="span_color">ID：</span>{{msg.id}}</div>
                                        <div class="flex_1 font14"><span class="span_color">性别：</span>{{msg.sex?msg.sex:'--'}}</div>
                                        <div class="flex_1 font14"><span class="span_color">出生日期：</span>{{msg.birthday?msg.birthday:'--'}}</div>
                                        <div class="flex_1 font14"><span class="span_color">身份证号码：</span>{{msg.real_idcard?msg.real_idcard:'--'}}</div>
                                        <div class="flex_1 font14"><span class="span_color">备注信息：</span>{{msg.mark?msg.mark:'--'}}</div>
                                        <div class="flex_1 font14"><span class="span_color">所属业务员：</span>{{msg.yewuyuan_name?msg.yewuyuan_name:'--'}}</div>
                                        <div class="flex_1 font14"><span class="span_color">驻厂人员：</span>{{msg.zhuchang_list}}</div>
                                        <div class="flex_1 font14"><span class="span_color">入职宿舍：</span>{{msg.room?msg.room:'--'}}</div>
                                        <div class="flex_1 font14" v-if="isSelf==2"><span class="span_color">入职性别：</span>{{msg.use_sex?(msg.use_sex==1?'男':'女'):'--'}}</div>
                                        <div class="flex_1 font14" v-if="isSelf==2"><span class="span_color">入职户籍所在地：</span>{{msg.use_address?msg.use_address:'--'}}</div>
                                        <div class="flex_1 font14"><span class="span_color">银行卡号：</span>{{msg.bankno?msg.bankno:'--'}}</div>
                                        <div class="flex_1 font14"><span class="span_color">持卡人姓名：</span>{{msg.bankaccount?msg.bankaccount:'--'}}</div>
                                        <div class="flex_1 font14"><span class="span_color">在职状态：</span><span :class="msg.status_name=='在职'?'list_co01':'list_co02'">{{msg.status_name?msg.status_name:'--'}}</span></div>
                                    </div>
                              </div>
                          </div>
                          <div class="flex_1 flex col" style="height:350px">
                                <div class="flex_1 flex col pad_l_20">
                                    <div class="flex_1 font14"><span class="span_color">员工姓名：</span>{{msg.name?msg.name:'--'}}</div>
                                    <div class="flex_1 font14"><span class="span_color">联系电话：</span>{{msg.phone?msg.phone:'--'}}</div>
                                    <div class="flex_1 font14"><span class="span_color">户籍所在地：</span>{{msg.real_idcard_address?msg.real_idcard_address:'--'}}</div>
                                    <div class="flex_1 font14"><span class="span_color">曾用名：</span>{{msg.former_name?msg.former_name:'--'}}</div>
                                    <div class="flex_1 font14"><span class="span_color">运营中心：</span>{{msg.center_name?msg.center_name:'--'}}</div>
                                    <div class="flex_1 font14"><span class="span_color">所在企业：</span>{{msg.realtitle?msg.realtitle:'--'}}</div>
                                    <div class="flex_1 font14"><span class="span_color">入职时间：</span>{{msg.ruzhiat?msg.ruzhiat:'--'}}</div>
                                    <div class="flex_1 font14" v-if="isSelf==2"><span class="span_color">入职姓名：</span>{{msg.use_name?msg.use_name:'--'}}</div>
                                    <div class="flex_1 font14" v-if="isSelf==2"><span class="span_color">入职身份证号码：</span>{{msg.use_idcard?msg.use_idcard:'--'}}</div>
                                    <div class="flex_1 font14"><span class="span_color">身份类型：</span>{{msg.sflb==1?'社会工':'学生工'}}</div>
                                    <div class="flex_1 font14"><span class="span_color">开户行：</span>{{msg.bankname?msg.bankname:'--'}}</div>
                                    <div class="flex_1 font14" v-if="msg.status_name=='离职'"><span class="span_color">离职时间：</span>{{msg.lizhiat?msg.lizhiat:'--'}}</div>
                                    <div class="flex_1 font14" v-if="msg.status_name!='离职'"></div>
                                </div>
                          </div>
                          <div class="flex col" style="width:180px;height:270px">
                          </div>
                      </div>

                      <div class="ct_title mar_t_30">其他信息</div>
                      <div class="flex b_line mar_t_30 pad_b_20">
                          <div class="qt_box flex row">
                              <div class="h_100 flex_1 b_s">
                                  <h1 class="text_center co01" style="font-weight:bold;">{{msg.zaizhi_day?msg.zaizhi_day:0}}天</h1>
                                  <p class="text_center moren_co font12">在职天数</p>
                              </div>
                              <div class="h_100 flex_1 b_s">
                                  <h1 class="text_center co02" style="font-weight:bold;">待统计</h1>
                                  <p class="text_center moren_co font12">总绩效</p>
                              </div>
                          </div>
                      </div>

                      <div class="flex row">
                          <div class="flex_1">
                                <div class="ct_title mar_t_30">身份证照片</div>
                                <div class="flex row  b_line mar_t_30 pad_b_20">
                                    <div class="zp_box  mar_r_30" v-for="(item,index) in zpArr_left" :key="index">
                                        <div v-if="item.val" class="w_100 demo-image__preview">
                                            <el-image 
                                                style="height: 60px;width:100%"
                                                :src="item.val" 
                                                :preview-src-list="srcList01">
                                            </el-image>
                                        </div>
                                        <div v-else class="zp_moren"></div>
                                        <p class="w_100 text_center">{{item.title}}</p>
                                    </div>
                                </div>
                          </div>
                          <div class="flex_1">
                                <div class="ct_title mar_t_30">合同照片</div>
                                <div class="flex row  b_line mar_t_30 pad_b_20">
                                    <div class="zp_box  mar_r_30" v-for="(item,index) in zpArr_right" :key="index">
                                        <div v-if="item.val" class="w_100 demo-image__preview">
                                            <el-image 
                                                style="height: 60px;width:100%"
                                                :src="item.val" 
                                                :preview-src-list="srcList02">
                                            </el-image>
                                        </div>
                                        <div v-else class="zp_moren"></div>
                                        <p class="w_100 text_center">{{item.title}}</p>
                                    </div>
                                </div>
                          </div>
                      </div>
                      

                      <!--工作时间记录-->
                      <div  class="ct_title mar_t_30">
                            工作记录表
                      </div>
                      <div  class="flex col mar_t_30">
                          <ol class="w_100 row flex h_50px line_50px li_bg">
                              <li class="flex_3 pad_l_30">所属企业</li>
                              <li class="flex_2 pad_l_30">入职时间</li>
                              <li class="flex_2 pad_l_30">离职时间</li>
                              <li class="flex_2 pad_l_30">在职天数</li>
                              <li class="flex_1 pad_l_30">工作状态</li>
                          </ol>
                          <ul class="w_100">
                              <li class="w_100">
                                  <ol class="co03 row flex h_50px line_50px list_item" :class="index%2==1?'li_bg':''"  v-for="(item,index) in work_list" :key="index">
                                        <li class="font14 flex_3 pad_l_30 h_50px b_s s_l">{{item.realtitle?item.realtitle:'--'}}</li>
                                        <li class="font14 flex_2 pad_l_30 h_50px b_s s_l">{{item.ruzhiat?item.ruzhiat:'--'}}</li>
                                        <li class="font14 flex_2 pad_l_30 h_50px b_s s_l">{{item.lizhiat?item.lizhiat:'--'}}</li>
                                        <li class="font14 flex_2 pad_l_30 h_50px b_s s_l">{{item.zaizhi_day?item.zaizhi_day:0}}天</li>
                                        <li class="font14 flex_1 pad_l_30 h_50px b_s s_l" :class="item.status==1?'list_co01':'list_co02'">{{item.status_name?item.status_name:'--'}}</li>
                                  </ol>
                              </li>
                          </ul>
                      </div>
                      <p class="font14 text_center list_co0" style="line-height:50px" v-if="work_list.length==0">暂无数据</p>


                      <!--财务相关-->
                      <div v-if="false" class="ct_title mar_t_30">
                            绩效明细 
                            <el-select class="w_100px mar_l_30" v-model="year"  placeholder="请选择年份">
                                <el-option v-for="(item,index) in yearArr" :key="index" :label="item+'年'" :value="item"></el-option>
                            </el-select>
                      </div>
                      <div v-if="false" class="flex col mar_t_30">
                          <ol class="w_100 row flex h_50px line_50px li_bg">
                              <li class="flex_1 pad_l_30">月份</li>
                              <li class="flex_3 pad_l_30">所属工厂</li>
                              <li class="flex_2 pad_l_30">工时</li>
                              <li class="flex_2 pad_l_30">工价</li>
                              <li class="flex_2 pad_l_30">绩效总额</li>
                          </ol>
                          <ul class="w_100">
                              <li class="w_100">
                                  <ol class="co03 row flex h_50px line_50px list_item" :class="index%2==1?'li_bg':''"  v-for="(item,index) in list" :key="index">
                                        <li class="font14 flex_1 pad_l_30">{{item.month}}</li>
                                        <li class="font14 flex_3 pad_l_30">{{item.company}}</li>
                                        <li class="font14 flex_2 pad_l_30">{{item.workhous}}</li>
                                        <li class="font14 flex_2 pad_l_30">{{item.price}}</li>
                                        <li class="font14 flex_2 pad_l_30">{{item.jixiao}}</li>
                                  </ol>
                              </li>
                          </ul>
                      </div>
                      <p v-if="false&&list.length==0" class="font14 text_center list_co0" style="line-height:50px" >暂无数据</p>

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
          isSelf:1,
          seleteIndex:'',
          link:'/home/message/messageTwo/ygMessage',
          yearArr:['2022','2021','2020','2020','2019','2018','2017','2016'],
          year:'',
          list:[],
          work_list:[],
          msg:{},
          zpArr_left:[],
          zpArr_right:[],
          srcList01:[],
          srcList02:[]
      }
  },
  methods:{

      get_detail(){
            var THIS = this;
            var data = {
                yuangongid:THIS.id,
                type:THIS.type
            };
            vue_Post(THIS,'yuangong/details',data,callback,1,1,1,0);
            function callback(msg){
                THIS.msg = msg;
                THIS.isSelf = msg.use_type==2?2:1;
                var arr = [];
                for(let i=0;i<THIS.msg.zhuchang_list.length;i++){
                    arr[i] = THIS.msg.zhuchang_list[i].name;
                };
                THIS.msg.zhuchang_list = arr.length>0?arr.join('、'):'--';
                //4张照片
                THIS.zpArr_left[0] = {title:'身份证人像面',val:THIS.msg.use_idcardzm_name};
                THIS.zpArr_left[1] = {title:'身份证国徽面',val:THIS.msg.use_idcardfm_name};
                THIS.srcList01 = [];
                if(THIS.msg.use_idcardzm_name){
                    THIS.srcList01.push(THIS.msg.use_idcardzm_name);
                };
                if(THIS.msg.use_idcardfm_name){
                    THIS.srcList01.push(THIS.msg.use_idcardfm_name);
                };
                THIS.zpArr_right[0] = {title:'员工签署照片',val:THIS.msg.sign_name};
                THIS.zpArr_right[1] = {title:'合同照片',val:THIS.msg.agreement_name};
                THIS.srcList02 = [];
                if(THIS.msg.sign_name){
                    THIS.srcList02.push(THIS.msg.sign_name);
                };
                if(THIS.msg.agreement_name){
                    THIS.srcList02.push(THIS.msg.agreement_name);
                };
                //工作记录
                THIS.work_list = msg.record_info;
            }; 
      },
      

  },
   mounted(){

      this.store.commit('setPageText','当前位置：消息 / 员工详情');
      this.id = this.$route.params.id;
      this.type = this.$route.params.type;
      this.get_detail();

  },
  beforeDestroy(){
      this.store.commit('setPageText','当前位置：消息 / 员工动态');
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
