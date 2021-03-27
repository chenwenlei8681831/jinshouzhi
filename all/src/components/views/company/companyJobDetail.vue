<template>


          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
              <div class="bg_fff">
                  <bot-header :link='link'></bot-header>
                  <div class="views_100ch_1 pad_all_30">
                        <!--基本信息-->
                        <div class="jb_title01 jb_title b_s mar_b_10 font16">基本信息</div>
                        <div class="w_100 flex row b_line baseInfo pad_b_20">
                            <div class="" style="width:240px;">
                                <img class="image" v-if="picture.length>0" :src="picture[0].path_name" alt="">
                                <div v-else class="image current"></div>
                            </div>
                            <div class="flex_1 pad_l_30">
                                <p class="p1 font18 color_mr">{{msg.realtitle?msg.realtitle:'--'}}</p>
                                <p class="p1 font18 list_co02 mar_t_10">{{msg.xzfwdown?msg.xzfwdown:'0'}}-{{msg.xzfwup?msg.xzfwup:'0'}}元</p>
                                <p class="p2 font14 color_mr mar_t_10">{{msg.industry_id_name?msg.industry_id_name:'--'}} | {{msg.city_name?msg.city_name:'--'}} | {{msg.area_name?msg.area_name:'--'}}</p>
                                <ul class="mar_t_20">
                                    <li class="bq_item f_l" v-for="(item,index) in welfare_tag" :key="index">{{item}}</li>
                                    <div class="clearfix"></div>
                                </ul>
                                <div class="row flex mar_t_20">
                                    <span class="title_span01 product">主营产品：</span>
                                    <p class="flex_1 font14" style="line-height:20px;color:#595959;">{{msg.product?msg.product:'--'}}</p>
                                </div>
                                <div class="row flex mar_t_20">
                                    <span class="title_span01 address">详细地址：</span>
                                    <p class="flex_1 font14" style="line-height:20px;color:#595959;">{{msg.address?msg.address:'--'}}</p>
                                </div>
                                <div class="row flex mar_t_20">
                                    <span class="title_span01 jobdetail">企业简介：</span>
                                    <p class="flex_1 font14" style="line-height:20px;color:#595959;">{{msg.profile?msg.profile:'--'}}</p>
                                </div>
                            </div>
                            <div class="b_s" style="width:240px;padding-left:120px;">
                                <p class="text_right" :class="msg.zaixian==1?'list_co01':'list_co02'">{{msg.zaixian==1?'正在招聘':'暂停招聘'}}</p>
                                <div class="mar_t_30">
                                    <p class="text_right font14">{{yizhao}}/{{msg.number}}</p>
                                    <div class="jindu_line mar_t_10 po_r">
                                        <div class="item" :class="msg.zaixian==1?'':'current'" :style="{width:jindu}"></div>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </div>
                        <!--开票信息-->
                        <div class="jb_title02a jb_title b_s mar_b_10 font16 mar_t_20">开票信息</div>
                        <div class="flex row mar_t_20">
                            <div class="flex_1 pad_b_20 flex row">
                                <span class="title_span02">开票单位：</span><p class="font14 flex_1">{{msg.qiandan_danwei?msg.qiandan_danwei:'--'}}</p>
                            </div>
                        </div>
                        <div class="flex row b_line">
                            <div class="flex_1 pad_b_20 flex row">
                                <span class="title_span02">开票信息：</span><p class="font14 flex_1">{{msg.qiandan_info?msg.qiandan_info:'--'}}</p>
                            </div>
                        </div>
                        <!--绩效结算-->
                        <div class="jb_title02b jb_title b_s mar_b_10 font16 mar_t_20">财务结算</div>
                        <div class="flex row mar_t_20">
                            <div class="flex_1 pad_b_20 flex row">
                                <span class="title_span02">企业真实名称：</span><p class="font14 flex_1">{{msg.realtitle?msg.realtitle:'--'}}</p>
                            </div>
                        </div>
                        <div class="flex row">
                            <div class="flex_1 pad_b_20 flex row">
                                <span class="title_span02">结算方式：</span><p class="font14 flex_1">{{msg.hsfs_name?msg.hsfs_name:'--'}}{{msg.hsfs_name=='系统核算'?('  -  '+msg.jxfs_name):''}}</p>
                            </div>
                        </div>
                        <div v-if="(msg.hsfs_name=='系统核算')" class="flex row">
                            <div class="flex_1 pad_b_20 flex row">
                                <span class="title_span02">系统结算备注：</span><p class="font14 flex_1">{{msg.jiesuan_mark2?msg.jiesuan_mark2:'--'}}</p>
                            </div>
                        </div>
                        <div class="flex row">
                            <!--系统核算:同工同酬-->
                            <div v-if="(msg.hsfs_name=='系统核算')&&(msg.jxfs_name=='同工同酬')" class="flex_1 pad_b_20 flex col js_show w_100">
                                <!--社会工-->
                                <div>
                                    <p class="mar_b_10 font14">社会工:</p>
                                    <ol class="flex row li_header">
                                        <li v-for="(item,index) in tg_shehui_obj" :key="index" class="text_all_center li_border flex_1 font14">{{item.title}}</li>
                                    </ol>
                                    <ul class="flex row li_bodyer">
                                        <li v-for="(item,index) in tg_shehui_obj" :key="index" class="text_all_center li_item li_border flex_1 font14">{{item.value?item.value:'--'}}</li>
                                    </ul>
                                </div>
                                <!--学生工-->
                                <div class="mar_t_30">
                                    <p class="mar_b_10 font14">学生工:</p>
                                    <ol class="flex row li_header">
                                        <li v-for="(item,index) in tg_xuesheng_obj" :key="index" class="text_all_center li_border flex_1 font14">{{item.title}}</li>
                                    </ol>
                                    <ul class="flex row li_bodyer">
                                        <li v-for="(item,index) in tg_xuesheng_obj" :key="index" class="text_all_center li_item li_border flex_1 font14">{{item.value?item.value:'--'}}</li>
                                    </ul>
                                </div>
                            </div>
                            <!--系统核算:小时工-->
                            <div v-else-if="(msg.hsfs_name=='系统核算')&&(msg.jxfs_name=='小时工')" class="flex_1 pad_b_20 flex col js_show w_100">
                                <jxDetail :obj='xs_shehui_obj' type='社会工'></jxDetail>
                                <jxDetail :obj='xs_xuesheng_obj' type='学生工' class="mar_t_30"></jxDetail>
                            </div>
                            <div v-else class="flex_1 pad_b_20 flex row">
                                <span class="title_span02">绩效结算备注：</span><p class="font14 flex_1">{{msg.jiesuan_mark?msg.jiesuan_mark:'--'}}</p>
                            </div>
                        </div>
                        <!--招聘岗位-->
                        <div class="jb_title02 jb_title b_s mar_b_10 font16 mar_t_20">招聘岗位</div>
                        <div class="flex row mar_t_20">
                            <div class="w_25 b_s pad_r_20 flex row">
                                <span class="title_span02">工作岗位：</span><p class="font14 flex_1">{{msg.gangwei_name?msg.gangwei_name:'--'}}</p>
                            </div>
                            <div class="w_25 b_s pad_r_20 flex row">
                                <span class="title_span02">工作性质：</span><p class="font14 flex_1">{{msg.xingzhi_name?msg.xingzhi_name:'--'}}</p>
                            </div>
                            <div class="w_25 b_s pad_r_20 flex row">
                                <span class="title_span02">招聘人数：</span><p class="font14 flex_1">{{msg.number?msg.number:'0'}}人</p>
                            </div>
                            <div class="w_25 b_s pad_r_20 flex row">
                                <span class="title_span02">年龄要求：</span><p class="font14 flex_1">{{msg.age?msg.age:'--'}}</p>
                            </div>
                        </div>
                        <div class="flex row mar_t_20">
                            <div class="w_25 b_s pad_r_20 flex row">
                                <span class="title_span02">招聘期限：</span><p class="font14 d_l_block flex_1">{{msg.zhaopinqixian?msg.zhaopinqixian:'--'}} 至 {{msg.zhaopinqixian_end?msg.zhaopinqixian_end:'--'}}</p>
                            </div>
                            <div class="w_75 b_s pad_r_20 flex row">
                                <span class="title_span02">入职材料准备：</span><p class="font14 d_l_block flex_1">{{msg.zhengjian?msg.zhengjian:'--'}}</p>
                            </div>
                        </div>
                        <div class="flex row mar_t_20 pad_b_20">
                            <div class="w_100 b_s pad_r_20 ">
                                <span class="title_span02">体检费用及流程：</span><p class="font14 d_l_block">{{msg.tijian?msg.tijian:'--'}}</p>
                            </div>
                        </div>
                        <div class="flex row b_line pad_b_20">
                            <div class="w_100 b_s pad_r_20 ">
                                <span class="title_span02">其他说明：</span><p class="font14 d_l_block">{{msg.zhaopin_other?msg.zhaopin_other:'--'}}</p>
                            </div>
                        </div>
                        <!--薪资待遇-->
                        <div class="jb_title03 jb_title b_s mar_b_10 font16 mar_t_20">薪资待遇</div>
                        <div class="flex row mar_t_20">
                            <div class="w_25 b_s pad_r_20 flex row">
                                <span class="title_span02">计薪方式：</span><p class="font14 flex_1">{{msg.jxfs_name?msg.jxfs_name:'--'}}</p>
                            </div>
                            <div class="w_25 b_s pad_r_20 flex row">
                                <span class="title_span02">发薪时间：</span><p class="font14 flex_1">每月{{msg.gzjs?msg.gzjs:'--'}}号</p>
                            </div>
                            <div class="w_25 b_s pad_r_20 flex row">
                                <span class="title_span02">发薪银行：</span><p class="font14 flex_1">{{msg.default_bankname_name?msg.default_bankname_name:'--'}}</p>
                            </div>
                            <div class="w_25 b_s pad_r_20 flex row">
                                <span class="title_span02">结算起始日：</span><p class="font14 flex_1">每月{{msg.start_date?msg.start_date:'--'}}号</p>
                            </div>
                        </div>
                        <div class="flex row mar_t_20 pad_b_20">
                            <div class="w_100 b_s pad_r_20  flex row">
                                <span class="title_span02">结算终止日：</span><p class="font14 flex_1">每月{{msg.end_date?msg.end_date:'--'}}日</p>
                            </div>
                        </div>
                        <div class="flex row b_line pad_b_20">
                            <div class="w_100 b_s pad_r_20 ">
                                <span class="title_span02">其他说明：</span><p class="font14 d_l_block">{{msg.xinzi_other?msg.xinzi_other:'--'}}</p>
                            </div>
                        </div>
                        <!--食宿福利-->
                        <div class="jb_title04 jb_title b_s mar_b_10 font16 mar_t_20">食宿福利</div>
                        <div class="flex row mar_t_20">
                            <div class="w_50 b_s pad_r_20 flex row">
                                <span class="title_span02">伙食情况：</span><p class="font14 flex_1">{{msg.jctj?msg.jctj:'--'}}</p>
                            </div>
                            <div class="w_50 pad_b_20 flex row">
                                <span class="title_span02">住宿情况：</span><p class="font14 flex_1">{{msg.zstj?msg.zstj:'--'}}</p>
                            </div>
                        </div>
                        <div class="flex row">
                            <div class="w_50 b_s pad_r_20  flex row">
                                <span class="title_span02">社保福利：</span><p class="font14 flex_1">{{msg.djbx?msg.djbx:'--'}}</p>
                            </div>
                            <div class="w_50 b_s pad_r_20  flex row">
                                <span class="title_span02">车费报销：</span><p class="font14 flex_1">{{msg.cfbx?msg.cfbx:'--'}}</p>
                            </div>
                        </div>
                        <div class="flex row mar_t_20 pad_b_20">
                            <div class="w_100 b_s pad_r_20  flex row">
                                <span class="title_span02">生活费预支：</span><p class="font14 flex_1">{{msg.shfyz?msg.shfyz:'0'}}元</p>
                            </div>
                        </div>
                        <div class="flex row b_line pad_b_20">
                            <div class="w_100 b_s pad_r_20 ">
                                <span class="title_span02">其他说明：</span><p class="font14 d_l_block">{{msg.other?msg.other:'--'}}</p>
                            </div>
                        </div>
                        <!--其他信息-->
                        <div class="jb_title05 jb_title b_s mar_b_10 font16 mar_t_20 mar_t_20">其他信息</div>
                        <div class="flex row" v-for="(item,index) in zhuchangArr" :key="index">
                            <div class="w_25 b_s pad_r_20 flex row">
                                <span class="title_span02">驻厂{{index+1}}姓名：</span><p class="font14 flex_1">{{item.name}}</p>
                            </div>
                            <div class="w_25 pad_b_20 flex row">
                                <span class="title_span02">驻厂{{index+1}}电话：</span><p class="font14 flex_1">{{item.phone}}</p>
                            </div>
                            <div class="w_25 b_s pad_r_20 flex row"></div>
                            <div class="w_25 pad_b_20 flex row"></div>
                        </div>
                        <div class="flex row">
                            <div class="w_25 b_s pad_r_20 flex row">
                                <span class="title_span02">签单人：</span><p class="font14 flex_1">{{msg.qiye_duijie?msg.qiye_duijie:'--'}}</p>
                            </div>
                            <div class="w_25 pad_b_20 flex row">
                                <span class="title_span02">签单人电话：</span><p class="font14 flex_1">{{msg.qiye_duijie_phone?msg.qiye_duijie_phone:'--'}}</p>
                            </div>
                            <div class="w_25 b_s pad_r_20 flex row"></div>
                            <div class="w_25 pad_b_20 flex row"></div>
                        </div>
                  </div>
              </div>
          </div>
  
</template>

<script>
var THIS;
import botHeader from '../../components/bot-header/bot-header';
import jxDetail from './components/jxDetail';
export default {
  components:{
    botHeader,
    jxDetail
  },
  name: '',
  data(){
      return {
          id:'',
          link:'/home/company/companyTwo/companyJobList',
          msg:{},
          welfare_tag:[],
          zhuchangArr:[],
          yizhao:0,
          jindu:'0%',
          picture:[],
          //展示绩效  xs:小时工  tg:同工同酬
          xs_shehui_obj:[],
          xs_xuesheng_obj:[],
          tg_shehui_obj:[],
          tg_xuesheng_obj:[],
      }
  },
  methods:{
     
      get_detail(){
            var data = {
                companyid:THIS.id
            };
            vue_Post(THIS,'company/details',data,callback,1,1,1,0);
            function callback(msg){
                THIS.msg = msg.info;
                for(let i=0;i<msg.info.welfare_tag.length;i++){
                    THIS.welfare_tag.push(msg.info.welfare_tag[i].name);
                };
                THIS.zhuchangArr = msg.info.zhuchang_list;
                THIS.yizhao = parseInt(msg.info.number)-parseInt(msg.info.hasnumber);
                THIS.jindu = Math.floor((THIS.yizhao/parseInt(msg.info.number))*100)+'%';
                THIS.picture = msg.info.picture;
                if((THIS.msg.hsfs_name=='系统核算')&&(THIS.msg.jxfs_name=='同工同酬')){
                    var obj = msg.info.yue_job;
                    //同工同酬&&小时工
                    //社会工
                    var cur01 = obj.shehui;
                    //0:企业全额  1:补差额  2:公司发放
                    var fffs01 = cur01.gz_type==0?'企业全额':(cur01.gz_type==1?'补差额':'公司发放');
                    if(cur01.js_type==1){//按小时
                        THIS.tg_shehui_obj = [
                            { title:'工价类型', value:'社会工' },
                            { title:'计算方式', value:'按小时' },
                            { title:'劳务费', value: (cur01.laowu_price?(cur01.laowu_price+'元'):0) },
                            { title:'绩效', value: (cur01.system_jixiao?(cur01.system_jixiao+'元'):0) },
                            { title:'业务费', value: (cur01.manage_fee?(cur01.manage_fee+'元'):0) },
                            { title:'工资发放方式', value:fffs01 },
                            { title:'企业保底', value:(cur01.company_baoli?cur01.company_baoli+'元':'') },
                            { title:'公司保底', value:(cur01.jsz_baoli?cur01.jsz_baoli+'元':'') }
                        ];
                    }else if(cur01.js_type==2){//按百分比
                        THIS.tg_shehui_obj = [
                            { title:'工价类型', value:'社会工' },
                            { title:'计算方式', value:'按百分比' },
                            { title:'劳务费', value: (cur01.laowu_price?cur01.laowu_price:0)+'%' },
                            { title:'绩效', value: (cur01.system_jixiao?cur01.system_jixiao:0)+'%' },
                            { title:'业务费', value: (cur01.manage_fee?cur01.manage_fee:0)+'%' }
                        ];
                    }else if(cur01.js_type==3){//按全勤天数
                        THIS.tg_shehui_obj = [
                            { title:'工价类型', value:'社会工' },
                            { title:'计算方式', value:'按全勤天数' },
                            { title:'月份类型', value:(cur01.month_type==0?'自然月':'固定月') },
                            { title:'全勤天数', value:(cur01.month_day?cur01.month_day:0) },
                            { title:'劳务费', value: (cur01.laowu_price?(cur01.laowu_price+'元'):'') },
                            { title:'绩效', value: (cur01.system_jixiao?(cur01.system_jixiao+'元'):'') },
                            { title:'业务费', value: (cur01.manage_fee?(cur01.manage_fee+'元'):'') },
                            { title:'工资发放方式', value:fffs01 },
                            { title:'企业保底', value:(cur01.company_baoli?cur01.company_baoli+'元':'') },
                            { title:'公司保底', value:(cur01.jsz_baoli?cur01.jsz_baoli+'元':'') }
                        ];
                    };
                    //学生工
                    var cur02 = obj.xuesheng;
                    //0:企业全额  1:补差额  2:公司发放
                    var fffs01 = cur02.gz_type==0?'企业全额':(cur02.gz_type==1?'补差额':'公司发放');
                    if(cur02.js_type==1){//按小时
                        THIS.tg_xuesheng_obj = [
                            { title:'工价类型', value:'学生工' },
                            { title:'计算方式', value:'按小时' },
                            { title:'劳务费', value: (cur02.laowu_price?(cur02.laowu_price+'元'):0) },
                            { title:'绩效', value: (cur02.system_jixiao?(cur02.system_jixiao+'元'):0) },
                            { title:'业务费', value: (cur02.manage_fee?(cur02.manage_fee+'元'):0) },
                            { title:'工资发放方式', value:fffs01 },
                            { title:'企业保底', value:(cur02.company_baoli?cur02.company_baoli+'元':'') },
                            { title:'公司保底', value:(cur02.jsz_baoli?cur02.jsz_baoli+'元':'') }
                        ];
                    }else if(cur02.js_type==2){//按百分比
                        THIS.tg_xuesheng_obj = [
                            { title:'工价类型', value:'学生工' },
                            { title:'计算方式', value:'按百分比' },
                            { title:'劳务费', value: (cur02.laowu_price?cur02.laowu_price:0)+'%' },
                            { title:'绩效', value: (cur02.system_jixiao?cur02.system_jixiao:0)+'%' },
                            { title:'业务费', value: (cur02.manage_fee?cur02.manage_fee:0)+'%' }
                        ];
                    }else if(cur02.js_type==3){//按全勤天数
                        THIS.tg_xuesheng_obj = [
                            { title:'工价类型', value:'学生工' },
                            { title:'计算方式', value:'按全勤天数' },
                            { title:'月份类型', value:(cur02.month_type==0?'自然月':'固定月') },
                            { title:'全勤天数', value:(cur02.month_day?cur02.month_day:0) },
                            { title:'劳务费', value: (cur02.laowu_price?(cur02.laowu_price+'元'):'') },
                            { title:'绩效', value: (cur02.system_jixiao?(cur02.system_jixiao+'元'):'') },
                            { title:'业务费', value: (cur02.manage_fee?(cur02.manage_fee+'元'):'') },
                            { title:'工资发放方式', value:fffs01 },
                            { title:'企业保底', value:(cur02.company_baoli?cur02.company_baoli+'元':'') },
                            { title:'公司保底', value:(cur02.jsz_baoli?cur02.jsz_baoli+'元':'') }
                        ];
                    };
                }else if((THIS.msg.hsfs_name=='系统核算')&&(THIS.msg.jxfs_name=='小时工')){
                    //小时工
                    THIS.xs_shehui_obj = THIS.msg.shehui_job;
                    for(let i=0;i<THIS.xs_shehui_obj.length;i++){
                        for(let j=0;j<THIS.xs_shehui_obj[i].bumen.length;j++){
                            THIS.xs_shehui_obj[i].bumen[j].condition = THIS.xs_shehui_obj[i].bumen[j].condition?THIS.xs_shehui_obj[i].bumen[j].condition:[{"system_price":"","system_yuangong_price":"","system_jixiao":"","effect_time":""}];
                        };
                    };
                    THIS.xs_xuesheng_obj = THIS.msg.xuesheng_job;
                    for(let i=0;i<THIS.xs_xuesheng_obj.length;i++){
                        for(let j=0;j<THIS.xs_xuesheng_obj[i].bumen.length;j++){
                            THIS.xs_xuesheng_obj[i].bumen[j].condition = THIS.xs_xuesheng_obj[i].bumen[j].condition?THIS.xs_xuesheng_obj[i].bumen[j].condition:[{"system_price":"","system_yuangong_price":"","system_jixiao":"","effect_time":""}];
                        };
                    };
                };
            }; 
      },

  },
   mounted(){
        THIS = this;
        THIS.store.commit('setPageText','企业 / 岗位详情');
        THIS.id = THIS.$route.params.id;
        THIS.get_detail();

  },
  beforeDestroy(){
      THIS.store.commit('setPageText','当前位置：企业 / 岗位列表');
  }
}
</script>

<style scoped>
    .jb_title{
        height: 28px;
        line-height: 28px;
        padding-left: 40px;
        background: no-repeat left center /24px;
    }
    .jb_title01{
        background-image: url(../../../assets/images/jobdetail/title01.png);
    }
    .jb_title02a{
        background-image: url(../../../assets/images/jobdetail/ticket.png);
    }
    .jb_title02b{
        background-image: url(../../../assets/images/jobdetail/account.png);
    }
    .jb_title02{
        background-image: url(../../../assets/images/jobdetail/title02.png);
    }
    .jb_title03{
        background-image: url(../../../assets/images/jobdetail/title03.png);
    }
    .jb_title04{
        background-image: url(../../../assets/images/jobdetail/title04.png);
    }
    .jb_title05{
        background-image: url(../../../assets/images/jobdetail/title05.png);
    }
    .p1{
        line-height: 30px;
    }
    .bq_item{
        font-size: 14px;
        padding: 4px 8px;
        background:rgba(243,243,243,1);
        color: #595959;
        margin-right: 12px;
        margin-bottom: 12px;
        border-radius:2px;
    }
    .title_span01{
        color: #8C8C8C;
        font-size: 14px;
        box-sizing: border-box;
        padding-left: 20px;
        height: 20px;
        line-height: 20px;
        background: url(../../../assets/images/jobdetail/title01.png) no-repeat left center /16px;
    }
    .title_span02{
        color: #8C8C8C;
        font-size: 14px;
        box-sizing: border-box;
        height: 20px;
        line-height: 20px;
    }
    .image{
        display: block;
        width: 240px;
        height: 160px;
    }
    .image.current{
        background: url(../../../assets/images/moren.png) no-repeat center /100%;
    }
    .jindu_line{
        height:6px;
        border-radius: 3px;
        background-color: #F5F5F5;
    }
    .jindu_line .item{
        left: 0;
        top: 0;
        background-color: #48C322;
        height:6px;
        border-radius: 3px;
    }
    .jindu_line .item.current{
        left: 0;
        top: 0;
        background-color: #F4514A;
        height:6px;
        border-radius: 3px;
    }
    .product{
        background-image:url(../../../assets/images/jobdetail/product.png);
    }
    .jobdetail{
        background-image:url(../../../assets/images/jobdetail/introduce.png);
    }
    .address{
        background-image:url(../../../assets/images/jobdetail/adress.png);
    }
    .base_btn_co01{
        width: auto;
        padding-left: 8px;
        padding-right: 8px;
        color: #007DF2;
        border-color: #007DF2;
    }
    .js_show .li_border{
        box-sizing: border-box;
        border: 1px solid #E5E5E5;
    }
    .li_header{
        height: 50px;
        background: #FAFAFA;;
    }
    .li_item{
        height: 50px;
    }
</style>
