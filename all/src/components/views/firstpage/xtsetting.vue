<template>

          <div class="views">
                <bot-header></bot-header>
                <!--方块-->
                <xt-header :msg='headerMsg'></xt-header>
                <!--办公-->
                <xt-office :dbmsg='dbmsg' :fast='fast' @jiebang='jiebang'></xt-office>
                <!--看板-->
                <xt-kanban :kanban='kanban'></xt-kanban>
                <!--趋势01-->
                <xt-qushi v-if="false" :msg='qs01'></xt-qushi>
                <!--趋势02-->
                <xt-qushi @tabClick02='tabClick02' :msg='qs02'></xt-qushi>

                <!--选择省份-->
                <el-dialog title="解绑设备"  width="500px"  :visible.sync="show_flag" :beforeClose='jb_close' >
                    <div>
                        <el-form label-width="80px" class="pad_b_30">
                            <div class="flex row j_between">
                                <el-input class="flex_1 inp"  v-model="jb_phone" placeholder="请输入电话号码" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" clearable></el-input>
                                <span class="mar_l_30 pointer" style="line-height:32px;font-size:14px;color:#409EFF;" @click="search_phone()">搜索</span>
                            </div>
                        </el-form>
                    </div>
                    <div  class="flex col">
                        <ol class="w_100 row flex h_40px line_40px li_bg ">
                            <li class="flex_1 pad_l_30 font14">姓名</li>
                            <li class="flex_2 pad_l_30 font14">手机号</li>
                            <li class="flex_2 pad_l_30 font14">身份</li>
                            <li class="flex_1 pad_l_30 font14">操作</li>
                        </ol>
                        <ul class="w_100">
                            <li class="w_100">
                                <ol class="co03 row flex h_40px line_40px list_item" :class="index%2==1?'li_bg':''"  v-for="(item,index) in phone_list" :key="index">
                                      <li class="font14 flex_1 pad_l_30 font14 h_40px b_s s_l pointer" :title="item.username?item.username:'--'">{{item.username?item.username:'--'}}</li>
                                      <li class="font14 flex_2 pad_l_30 font14 h_40px b_s s_l pointer" :title="item.phone?item.phone:'--'">{{item.phone?item.phone:'--'}}</li>
                                      <li class="font14 flex_2 pad_l_30 font14 h_40px b_s s_l pointer" :title="item.rule?item.rule:'--'">{{item.rule?item.rule:'--'}}</li>
                                      <li class="font14 flex_1 pad_l_30 font14 h_40px b_s s_l pointer">
                                          <span class="edit_button pointer" @click="do_jb(item.uid)">解绑</span>
                                      </li>
                                </ol>
                            </li>
                        </ul>
                    </div>
                    <p class="font14 text_center list_co0" style="line-height:50px" v-if="phone_list.length==0">暂无数据</p>
                </el-dialog>
          </div>
  
</template>

<script>
var THIS;
import botHeader from '../../components/bot-header/bot-header';
import xtHeader from './components/xt-header';
import xtOffice from './components/xt-office';
import xtKanban from './components/xt-kanban';
import xtQushi from './components/xt-qushi';
export default {
  components:{
    botHeader,
    xtHeader,
    xtOffice,
    xtKanban,
    xtQushi
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
            THIS.get_msg();
        },
  },
  data(){
      return {
          cityId:window.localStorage.cityId?window.localStorage.cityId:'',
          headerMsg:[
            {number:0,index:1,itemIndex:0,sonIndex:0,permissions:'company.releasecompanylist'},
            {number:0,index:2,itemIndex:0,sonIndex:0,permissions:'center.list'},
            {number:0,index:3,itemIndex:0,sonIndex:0,permissions:'zhuchang.list'},
            {number:0,index:4,itemIndex:0,sonIndex:0,permissions:'yuangong.list'},
          ],
          dbmsg:{
            msg1:[
              {title:'待结算绩效',number:0,src:'',index:6,itemIndex:2,sonIndex:0,permissions:'finance.jixiaolist'},
              {title:'待审核代扣',number:0,src:'',index:5,itemIndex:1,sonIndex:0,permissions:'daikou.list'},
              {title:'待审核借支',number:0,src:'',index:5,itemIndex:0,sonIndex:1,permissions:'jiezhi.list'}
            ],
            msg2:[
              {title:'待接收员工',number:10,src:'',index:5,itemIndex:0,sonIndex:0,permissions:'centerflow.zhuchangbacklist'},
              {title:'待入职员工',number:10,src:'',index:5,itemIndex:0,sonIndex:0,permissions:'centerflow.zhuchangbacklist'}
            ],
            msg3:[
              {title:'待处理投诉',number:10,src:'',index:4,itemIndex:0,sonIndex:2,permissions:'suggestion.list'},
              {title:'待处理意见反馈',number:10,src:'',index:4,itemIndex:0,sonIndex:1,permissions:'comments.list'}
            ]
          },
          fast:[
              {title:'录入岗位',index:1,itemIndex:1,sonIndex:1,permissions:'company.add'},
              {title:'结算列表',index:6,itemIndex:3,sonIndex:0,permissions:'finance.jiezhilist'},
              {title:'添加驻厂',index:3,itemIndex:0,sonIndex:1,permissions:'zhuchang.add'},
              {title:'添加运营中心',index:2,itemIndex:0,sonIndex:1,permissions:'center.add'},
              {title:'发布消息',index:7,itemIndex:0,sonIndex:3,permissions:'msg.sendnote'},
              {title:'事务管理',index:5,itemIndex:0,sonIndex:0,permissions:'centerflow.zhuchangbacklist'},
              {title:'报名列表',index:8,itemIndex:0,sonIndex:0,permissions:'enroll.list'},
              {title:'数据统计',index:9,itemIndex:0,sonIndex:0,permissions:'index.tongjiindex'},
              {title:'解绑设备',index:100,itemIndex:0,sonIndex:0,permissions:'msg.sendnote'}
          ],
          kanban:[
              {
                  title:'员工看板', 
                  list:[
                    { number:'0',name:'员工总数',index:4,itemIndex:0,sonIndex:0,permissions:'yuangong.list'},
                    { number:'0',name:'在职员工',index:4,itemIndex:0,sonIndex:0,permissions:'yuangong.list'},
                    { number:'0',name:'离职员工',index:4,itemIndex:0,sonIndex:0,permissions:'yuangong.list'},
                    { number:'0',name:'共享员工',index:4,itemIndex:0,sonIndex:0,permissions:'yuangong.list'}
                  ]
              },
              {
                  title:'驻厂看板', 
                  list:[
                    { number:'0',name:'驻厂总数',index:3,itemIndex:0,sonIndex:0,permissions:'zhuchang.list'},
                    { number:'0',name:'待接收员工',index:5,itemIndex:0,sonIndex:0,permissions:'msg.index'},
                    { number:'0',name:'待办理入职',index:5,itemIndex:0,sonIndex:0,permissions:'msg.index'},
                    { number:'0',name:'待签署合同',index:5,itemIndex:0,sonIndex:2,permissions:'agreement.list'}
                  ]
              },
              {
                  title:'运营中心', 
                  list:[
                    { number:'0',name:'运营中心总数',index:2,itemIndex:0,sonIndex:0,permissions:'center.list'},
                    { number:'0',name:'录入员工',index:5,itemIndex:0,sonIndex:0,permissions:'msg.index'},
                    { number:'0',name:'出发员工',index:4,itemIndex:0,sonIndex:0,permissions:'yuangong.list'},
                    { number:'0',name:'业务员',index:0,itemIndex:0,sonIndex:0,permissions:'index.index'}
                  ]
              },
              {
                  title:'企业看板', 
                  list:[
                    { number:'0',name:'合作企业总数',index:1,itemIndex:0,sonIndex:0,permissions:'company.releasecompanylist'},
                    { number:'0',name:'正在招聘',index:1,itemIndex:1,sonIndex:0,permissions:'company.list'},
                    { number:'0',name:'停止招聘',index:1,itemIndex:1,sonIndex:0,permissions:'company.list'},
                    { number:'',name:''}
                  ]
              }    
          ],
          qs01:{
              type:1,
              id:'quxian01',
              data:{
                line_color:'#FF694B',
                line_bottom_color01:'rgba(255,105,75,0.3)',
                line_bottom_color02:'rgba(255,105,75,0.05)',
                data : ['100','200','130','100','80','100','80','100'],
                dataTxt:['100','200','150','100','80','100','80','100']
              }
          },
          tabIndex02:0,
          qs02:{
              type:2,
              id:'quxian02',
              search:['最近7天','最近15天','最近30天','最近90天'],
              data:{
                line_color:'#007DF1',
                line_bottom_color01:'rgba(0,125,241,0.3)',
                line_bottom_color02:'rgba(0,125,241,0.05)',
                data : [],
                dataTxt:[]
              }
          },
          show_flag:false,
          jb_phone:'',
          phone_list:[]
      }
  },
  methods:{

      get_msg(){
            var data = {
                province:THIS.cityId
            };
            vue_Post(THIS,'index/index',data,callback,1,1,0,0);
            function callback(msg){
                //顶部
                THIS.headerMsg[0].number = msg.total.qy;
                THIS.headerMsg[1].number = msg.total.yy;
                THIS.headerMsg[2].number = msg.total.zc;
                THIS.headerMsg[3].number = msg.total.yg;
                //待办理事件
                THIS.dbmsg.msg1[0].number = 0;
                THIS.dbmsg.msg1[1].number = msg.daichuli.dk;
                THIS.dbmsg.msg1[2].number = msg.daichuli.jz;
                THIS.dbmsg.msg2[0].number = msg.daichuli.js;
                THIS.dbmsg.msg2[1].number = msg.daichuli.rz;
                THIS.dbmsg.msg3[0].number = msg.daichuli.ts;
                THIS.dbmsg.msg3[1].number = msg.daichuli.yj;
                //员工看板
                THIS.kanban[0].list[0].number = msg.yg_num.zs;
                THIS.kanban[0].list[1].number = msg.yg_num.zz;
                THIS.kanban[0].list[2].number = msg.yg_num.lz;
                THIS.kanban[0].list[3].number = msg.yg_num.gx;
                THIS.kanban[1].list[0].number = msg.zc_num.zs;
                THIS.kanban[1].list[1].number = msg.zc_num.dj;
                THIS.kanban[1].list[2].number = msg.zc_num.db;
                THIS.kanban[1].list[3].number = msg.zc_num.dq;
                THIS.kanban[2].list[0].number = msg.yy_num.zs;
                THIS.kanban[2].list[1].number = msg.yy_num.lr;
                THIS.kanban[2].list[2].number = msg.yy_num.cf;
                THIS.kanban[2].list[3].number = msg.yy_num.yw;
                THIS.kanban[3].list[0].number = msg.qy_num.zs;
                THIS.kanban[3].list[1].number = msg.qy_num.zz;
                THIS.kanban[3].list[2].number = msg.qy_num.tz;
            }; 
      },

      tabClick02(index){
          THIS.tabIndex02 = index;
          THIS.get_line_msg();
      },

      get_line_msg(){
            var THIS = this;
            var data = { 
              time:THIS.tabIndex02
            };
            vue_Post(THIS,'index/userStat',data,callback,1,0,1,1);
            function callback(msg){
                THIS.qs02.data.data = msg.num;
                THIS.qs02.data.dataTxt = msg.time;
            };
      },

      jiebang(){
          THIS.jb_phone = '';
          THIS.phone_list = [];
          THIS.show_flag = true;
      },

      search_phone(){
            if(!THIS.jb_phone){
                THIS.$message({
                    type: 'warning',
                    message: '手机号不能为空!',
                    dangerouslyUseHTMLString:true
                });
                return false;
            };
            var data = { 
                phone:THIS.jb_phone
            };
            vue_Post(THIS,'index/searchPhone',data,callback,1,1,1,0);
            function callback(msg){
                THIS.phone_list = msg;
            };
      },

      jb_close(){
          THIS.show_flag = false;
      },

      do_jb(id){
            var data = { 
                uid:id
            };
            vue_Post(THIS,'index/unlockDevice',data,callback,1,1,1,1);
            function callback(msg){
                THIS.$message({
                    type: 'success',
                    message: '解绑成功!',
                    dangerouslyUseHTMLString:true
                });
            };
      }

  },
  mounted(){
      THIS = this;
      THIS.store.commit('setPageText','当前位置：首页 / 系统设置');
      THIS.get_msg();
      THIS.get_line_msg();

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
   .li_bg{
       background:rgba(250,250,250,1);
   }
</style>
