<template>


          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
              <div class="bg_fff">
                  <bot-header :link='link'></bot-header>
                  <div class="views_100ch_1 pad_all_30">
                      <div class="ct_title">基本信息</div>
                      <div class="flex row b_line mar_t_30 baseInfo pad_b_20">
                          <div class="flex_1 flex col" style="height:100px">
                              <div class="flex_1 flex row">
                                  <img v-if="msg.picture" class="d_block b_radius50" style="width:100px;height:100px;" :src="msg.picture" alt="">
                                  <div v-else class="moren d_block b_radius50" style="width:100px;height:100px;"></div>
                                  <div class="flex_1 flex col pad_l_20">
                                      <div class="flex_1 font14"><span class="span_color">ID：</span>{{msg.id}}</div>
                                      <div class="flex_1 font14"><span class="span_color">联系电话：</span>{{msg.phone?msg.phone:'--'}}</div>
                                      <div class="flex_1 font14"><span class="span_color">入职时间：</span>{{msg.createat?msg.createat:'--'}}</div>
                                  </div>
                              </div>
                          </div>
                          <div class="flex_1 flex col" style="height:100px">
                              <div class="flex_1 flex col pad_l_20">
                                  <div class="flex_1 font14"><span class="span_color">驻厂姓名：</span>{{msg.name?msg.name:'--'}}</div>
                                  <div class="flex_1 font14"><span class="span_color">性别：</span>{{msg.sex_name?msg.sex_name:'--'}}</div>
                                  <div class="flex_1 font14"></div>
                              </div>
                          </div>
                          <div class="flex col" style="width:180px;height:100px">
                              <div class="top h_40px flex row j_between">
                                  <span class="d_block base_btn base_btn_co01 pointer font14" @click="edit(id)">编辑</span>
                                  <span class="d_block base_btn base_btn_co01 pointer mar_l_30 font14" style="width:140px;" @click="setting_password()">重置登录密码</span>
                              </div>    
                          </div>
                      </div>

                      <div class="ct_title mar_t_30"><span class="d_l_block mar_r_10" style="width:6px;height:6px;border-radius:50%;background:#F4514A;"></span>代办事项</div>
                      <div class="flex b_line mar_t_30 pad_b_20">
                          <div class="qt_box flex row">
                              <div class="h_100 flex_1 b_s">
                                  <h1 class="text_center co01">
                                      <span class=" d_l_block  v_img"></span>
                                      待接收员工
                                  </h1>
                                  <p class="text_center moren_co font12">{{msg.daiban_num.dj?msg.daiban_num.dj:0}}人</p>
                              </div>
                              <div class="h_100 flex_1 b_s">
                                  <h1 class="text_center co02">
                                      <span class=" d_l_block  v_img"></span>
                                      待办理入职
                                  </h1>
                                  <p class="text_center moren_co font12">{{msg.daiban_num.db?msg.daiban_num.db:0}}人</p>
                              </div>
                              <div class="h_100 flex_1 b_s">
                                  <h1 class="text_center co01">
                                      <span class=" d_l_block  v_img"></span>
                                      待签署合同
                                  </h1>
                                  <p class="text_center moren_co font12">{{msg.daiban_num.dq?msg.daiban_num.dq:0}}人</p>
                              </div>
                              <div class="h_100 flex_1 b_s">
                                  <h1 class="text_center co02" style="">
                                      <span class=" d_l_block v_img"></span>
                                      待完善信息
                                  </h1>
                                  <p class="text_center moren_co font12">{{msg.daiban_num.ws?msg.daiban_num.ws:0}}人</p>
                              </div>
                          </div>
                      </div>

                      <div class="ct_title mar_t_30">统计信息</div>
                      <div class="flex b_line mar_t_30 pad_b_20">
                          <div class="tj_box flex row">
                              <div class="h_100 flex_1 b_s">
                                  <h1 class="text_center co01" style="font-weight:bold;">{{msg.total_zaizhi_count}}人</h1>
                                  <p class="text_center moren_co font14">在职员工</p>
                              </div>
                              <div class="h_100 flex_1 b_s">
                                  <h1 class="text_center co02" style="font-weight:bold;">{{msg.suggestion_count}}次</h1>
                                  <p class="text_center moren_co font14">被投诉次数</p>
                              </div>
                              <div class="h_100 flex_1 b_s">
                                  <h1 class="text_center co04" style="font-weight:bold;">{{msg.comments_star}}分</h1>
                                  <p class="text_center moren_co font14">平均评分</p>
                              </div>
                              <div class="h_100 flex_1 b_s">
                                  <h1 class="text_center co05" style="font-weight:bold;">{{msg.total_comments_count}}人</h1>
                                  <p class="text_center moren_co font14">评价人数</p>
                              </div>
                          </div>
                      </div>

                      <!--管理工厂-->
                      <div  class="ct_title mar_t_30">
                            管理工厂({{companyArr.length?companyArr.length:0}})
                      </div>
                      <div  class="flex col mar_t_30">
                          <ol class="w_100 row flex h_50px line_50px li_bg">
                              <li class="flex_1 pad_l_30">企业名称</li>
                              <li class="flex_1 pad_l_30">岗位名称</li>
                              <li class="flex_1 pad_l_30">在职员工</li>
                          </ol>
                          <ul class="w_100">
                              <li class="w_100">
                                  <ol class="co03 row flex h_50px line_50px list_item" :class="index%2==1?'li_bg':''"  v-for="(item,index) in companyArr" :key="index">
                                        <li class="font14 flex_1 pad_l_30">{{item.realtitle?item.realtitle:'--'}}</li>
                                        <li class="font14 flex_1 pad_l_30">{{item.realtitle?item.realtitle:'--'}}</li>
                                        <li class="font14 flex_1 pad_l_30">{{item.zaizhicount?item.zaizhicount:'0'}}人</li>
                                  </ol>
                              </li>
                          </ul>
                      </div>
                      <p class="font14 text_center list_co0" style="line-height:50px" v-if="companyArr.length==0">暂无数据</p>

                      <!--评价列表-->
                      <div  class="flex row j_between ct_title mar_t_30 mar_b_30 b_s pad_l_30 pad_r_30">
                          <span class="">评价记录</span>
                          <div class="flex row">
                              <el-input class="flex_1 inp"  v-model="pj_keyword" placeholder="请输入员工姓名" clearable></el-input>
                              <span class="font14 pointer mar_l_20 list_co05" style="line-height:30px;" @click="search(1)">查询</span>
                          </div>
                      </div>
                      <div class="list b_s pad_l_30 pad_r_30">
                            <ol class="list_header flex row">
                                <li class="h_50px pad_l_20 b_s flex_1 text_center">员工姓名</li>
                                <li class="h_50px pad_l_20 b_s flex_1 text_center">所属企业</li>
                                <li class="h_50px pad_l_20 b_s flex_1 text_center">评价内容</li>
                                <li class="h_50px pad_l_20 b_s flex_1 text_center">评分</li>
                                <li class="h_50px pad_l_20 b_s flex_1 text_center">评价时间</li>
                                <li class="h_50px pad_l_20 b_s flex_1 text_center">操作</li>
                                <div class="clearfix"></div>
                            </ol>
                            <ul class="list_main">
                                <li class="" v-for="(item,index) in pj_list" :key="index">
                                    <ol class="flex row">
                                        <li class="f_l pad_l_20 b_s text_center flex_1" :title="item.username?item.username:'--'">{{item.username?item.username:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s text_center flex_1" :title="item.realtitle?item.realtitle:'--'">{{item.realtitle?item.realtitle:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s text_center flex_1" :title="item.dis?item.dis:'--'">{{item.dis?item.dis:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s text_center flex_1" :title="item.star?item.star:'--'">{{item.star?item.star:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s text_center flex_1" :title="item.createat?item.createat:'--'">{{item.createat?item.createat:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s text_center flex_1"><span class="list_co05" @click="view(item.id,1)">查看</span></li>
                                        <div class="clearfix"></div>
                                    </ol>
                                </li>
                            </ul>
                            <!--分页-->
                            <div class="page_footer b_s w_100 h_60px">
                                <el-pagination
                                    class="f_r"
                                    @size-change="pj_handleSizeChange"
                                    @current-change="pj_handleCurrentChange"
                                    :current-page="pj_currentPage"
                                    :page-sizes="[10, 20, 30, 40]"
                                    :page-size=pj_count
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total=pj_total>
                                </el-pagination>
                                <div class="clearfix"></div>
                            </div>
                      </div>

                      <!--投诉列表-->
                      <div  class="flex row j_between ct_title mar_t_30 mar_b_30 b_s pad_l_30 pad_r_30">
                            <span class="">投诉记录</span>
                            <div class="flex row">
                                <el-input class="flex_1 inp"  v-model="ts_keyword" placeholder="请输入员工姓名" clearable></el-input>
                                <span class="font14 pointer mar_l_20 list_co05" style="line-height:30px;" @click="search(2)">查询</span>
                            </div>
                      </div>
                      <div class="list b_s pad_l_30 pad_r_30">
                            <ol class="list_header flex row">
                                <li class="h_50px pad_l_20 b_s f_l flex_1 text_center">投诉人姓名</li>
                                <li class="h_50px pad_l_20 b_s f_l flex_1 text_center">联系电话</li>
                                <li class="h_50px pad_l_20 b_s f_l flex_1 text_center">所属企业</li>
                                <li class="h_50px pad_l_20 b_s f_l flex_1 text_center">投诉内容</li>
                                <li class="h_50px pad_l_20 b_s f_l flex_1 text_center">投诉时间</li>
                                <li class="h_50px pad_l_20 b_s f_l flex_1 text_center">操作</li>
                                <div class="clearfix"></div>
                            </ol>
                            <ul class="list_main">
                                <li class="" v-for="(item,index) in ts_list" :key="index">
                                    <ol class="flex row">
                                        <li class="f_l pad_l_20 b_s flex_1 text_center" :title="item.username?item.username:'--'">{{item.username?item.username:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s flex_1 text_center" :title="item.phone?item.phone:'--'">{{item.phone?item.phone:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s flex_1 text_center" :title="item.realtitle?item.realtitle:'--'">{{item.realtitle?item.realtitle:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s flex_1 text_center" :title="item.dis?item.dis:'--'">{{item.dis?item.dis:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s flex_1 text_center" :title="item.createat?item.createat:'--'">{{item.createat?item.createat:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s text_center flex_1"><span class="list_co05" @click="view(item.id,2)">查看</span></li>
                                        <div class="clearfix"></div>
                                    </ol>
                                </li>
                            </ul>
                            <!--分页-->
                            <div class="page_footer b_s w_100 h_60px">
                                <el-pagination
                                    class="f_r"
                                    @size-change="ts_handleSizeChange"
                                    @current-change="ts_handleCurrentChange"
                                    :current-page="ts_currentPage"
                                    :page-sizes="[10, 20, 30, 40]"
                                    :page-size=ts_count
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total=ts_total>
                                </el-pagination>
                                <div class="clearfix"></div>
                            </div>
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
          link:'/home/zhuchang/zhuchangOne/zhuchangList',
          companyArr:[],
          msg:{daiban_num:{}},
          //评价记录
          pj_keyword:'',
          pj_page:1,
          pj_count:10,
          pj_total:0,
          pj_currentPage:0,
          pj_list:[],
          //投诉记录
          ts_keyword:'',
          ts_page:1,
          ts_count:10,
          ts_total:0,
          ts_currentPage:0,
          ts_list:[],
      }
  },
  methods:{

      get_detail(){
            var THIS = this;
            var data = {
                zhuchangid:THIS.id,
            };
            vue_Post(THIS,'zhuchang/details',data,callback,1,1,0,1);
            function callback(msg){
                THIS.msg = msg.info;
                THIS.companyArr = msg.company_list;
            }; 
      },

      pj_getList(){
            var THIS = this;
            var data = sign({
                page:THIS.pj_page,
                count:THIS.pj_count,
                keyword:THIS.pj_keyword,
                zhuchangid:THIS.id
            });
            vue_Post(THIS,'comments/list',data,callback,1,1,0,0);
            function callback(msg){
                  THIS.pj_list = msg.list;
                  THIS.pj_total = msg.total;
                  for(let i=0;i<THIS.pj_list.length;i++){
                      THIS.pj_list[i].createat = THIS.pj_list[i].createat?THIS.pj_list[i].createat.split(' ')[0]:'--';
                  };
            }; 
      },

      ts_getList(){
          var THIS = this;
          var data = {
              zhuchangid:THIS.id,
              keyword:THIS.ts_keyword,
              page:THIS.ts_page,
              count:THIS.ts_count,
          };
          vue_Post(THIS,'suggestion/list',data,callback,1,0,0,0);
          function callback(msg){
              THIS.ts_list = msg.list;
              THIS.ts_total = msg.total;
          }; 
      },

      pj_handleCurrentChange(val){
        this.pj_page = val;
        this.pj_getList();
      },

      pj_handleSizeChange(val) {
        this.pj_count = val;
        this.pj_page = 1;
        this.pj_getList();
      },

      ts_handleCurrentChange(val){
        this.ts_page = val;
        this.ts_getList();
      },

      ts_handleSizeChange(val) {
        this.ts_count = val;
        this.ts_page = 1;
        this.ts_getList();
      },

      edit(id){
          this.$router.replace('/home/zhuchang/zhuchangOne/zhuchangEdit/'+id);
      },

      view(id,type){
          if(type==1){
              this.$router.replace('/home/zhuchang/zhuchangOne/pingjiaDatile/'+id+'/'+this.id);
          }else{
              this.$router.replace('/home/zhuchang/zhuchangOne/tousuDatile/'+id+'/'+this.id);
          };
      },

      search(type){
          if(type==1){
             this.pj_getList(); 
          }else{
             this.ts_getList();
          };
      },

      setting_password(){
          var THIS = this;
          THIS.$confirm('重置后密码会以短信的形式发给对方，确定重置吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            THIS.set_Func();
          }).catch(() => {});
      },

      set_Func(){
          var THIS = this;
          var data = {
              uid:THIS.id,
          };
          vue_Post(THIS,'admin/resetPassword',data,callback,1,0,0,0);
          function callback(msg){
                THIS.$message({
                    type: 'success',
                    message: '操作成功!',
                    dangerouslyUseHTMLString:true
                });
          }; 
      }

  },
   mounted(){

      this.store.commit('setPageText','当前位置：驻厂 / 驻厂详情');
      this.id = this.$route.params.id;
      this.get_detail();
      this.pj_getList();
      this.ts_getList();

  },
  beforeDestroy(){
      this.store.commit('setPageText','当前位置：驻厂 / 驻厂列表');
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
       color: #068778;
   }
   .co02{
       color: #F4514A;
   }
   .co03{
       color: #595959;
   }
   .co04{
       color: #F7A54D;
   }
   .co05{
       color: #198AF3;
   }
   .qt_box{
        width: 560px;
        height: 100px;
        border-radius: 6px;
        padding-bottom: 20px;
   }
   .qt_box .flex_1{
       padding: 10px 0;
       line-height: 30px;
       margin-right:20px;
       box-shadow:0px 2px 6px 0px rgba(196,212,251,0.5);
   }
   .qt_box .flex_1 h1{
       height:40px;
       line-height: 40px;
       color: #595959;
       font-size: 14px;
   }
   .qt_box .flex_1 p{
       height:40px;
       line-height: 40px;
       font-size: 16px;
       color: #595959;
   }
   .tj_box{
        width: 480px;
        height: 80px;
        border-radius: 6px;
        padding-bottom: 20px;
        box-shadow:0px 2px 6px 0px rgba(207,228,255,0.4);
   }
   .tj_box .flex_1{
       padding: 10px 0;
       line-height: 30px;
   }
   .tj_box .flex_1 h1{
       height:30px;
       line-height: 30px;
   }
   .tj_box .flex_1 p{
       height:30px;
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
       background: url(../../../assets/images/moren01.png) no-repeat center /100%;
   }
   .zp_moren{
       height: 80px;
       border-radius: 10px;
       background: #ccc;
   }
   .v_img{
       width:16px;
       height:16px;
       vertical-align: middle;
       background: no-repeat center /100%;
   }
   .qt_box .h_100:nth-child(1) .v_img{
       background-image:url(../../../assets/images/zhuchang/img01.png) ;
   }
   .qt_box .h_100:nth-child(2) .v_img{
       background-image:url(../../../assets/images/zhuchang/img02.png) ;
   }
   .qt_box .h_100:nth-child(3) .v_img{
       background-image:url(../../../assets/images/zhuchang/img03.png) ;
   }
   .qt_box .h_100:nth-child(4) .v_img{
       background-image:url(../../../assets/images/zhuchang/img04.png) ;
   }
</style>
