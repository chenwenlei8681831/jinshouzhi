<template>

          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
                <div class="bg_fff">
                    <bot-header></bot-header>
                    <div class="views_100ch_1">
                        <!--顶部数据-->
                        <div class="pad_l_30 pad_r_30 w_100 header_item h_60px b_s font14">
                            招工消息列表（{{total}}）
                        </div>
                        <!--输入框、下拉筛选-->
                        <div class="flex row w_100 header_item h_60px b_s pad_r_30 pad_l_30">
                            <div class="flex_1  b_s h_100 flex row">
                                <span class="font12">消息标题：</span>
                                <el-input class="flex_1 inp"  v-model="keyword" placeholder="请输入消息标题" clearable></el-input>
                                <div class="clearfix"></div>
                            </div>
                            <div class="flex_1  b_s h_100 flex row mar_l_30">
                                <span class="font12">招工企业：</span>
                                <el-select class="flex_1" v-model="company" remote :remote-method='search_company' clearable filterable  placeholder="请选择招工企业">
                                    <el-option v-for="(item,index) in conpamy_Arr" :key="index" :label="item.realtitle" :value="item.id"></el-option>
                                </el-select>
                            </div>
                            <div class="w_25 flex row  b_s h_100 mar_l_30">
                                <span class="font12">发布时间：</span>
                                <el-date-picker
                                        class="flex_1"
                                        v-model="timer"
                                        value-format="yyyy-MM-dd"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                                <div class="clearfix"></div>
                            </div>
                            <div class="flex_1  b_s h_100 mar_l_30">
                                    <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff" style="line-height:30px">查询</span>
                                    <span @click="sub(2)" class="f_l mar_l_30 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff" style="line-height:30px">重置</span>
                                    <div class="clearfix"></div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <!--列表-->
                        <div class="list">
                            <ol class="list_header list_bg">
                                <li class="h_50px pad_l_20 b_s f_l" style="width:7%">ID</li>
                                <li class="h_50px pad_l_20 b_s f_l">消息标题</li>
                                <li class="h_50px pad_l_20 b_s f_l">招工企业</li>
                                <li class="h_50px pad_l_20 b_s f_l">发布时间</li>
                                <li class="h_50px pad_l_20 b_s f_l">发布人</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:13%">操作</li>
                                <div class="clearfix"></div>
                            </ol>
                            <ul class="list_main">
                                <li @click.stop="view(1,item.id)" v-for="(item,index) in list" :key="index">
                                    <ol :class="index%2==1?'list_bg':''">
                                        <li class="f_l pad_l_20 b_s" style="width:7%">
                                            {{item.id}}
                                        </li>
                                        <li class="f_l pad_l_20 b_s" :title="item.title?item.title:'--'">{{item.title?item.title:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.realtitle?item.realtitle:'--'">{{item.realtitle?item.realtitle:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.createat?item.createat:'--'">{{item.createat?item.createat:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.name?item.name:'--'">{{item.name?item.name:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" style="width:13%">
                                            <span v-show="permissions['msg.msginfowithsystem']==1" class="edit_button w_333 f_l" @click.stop="view(1,item.id)">查看</span>
                                            <span v-show="permissions['msg.msgdeletewithsystem']==1" class="edit_button w_333 f_l list_co02" @click.stop="view(2,item.id)">删除</span>
                                        </li>
                                        <div class="clearfix"></div>
                                    </ol>
                                </li>
                            </ul>
                            <!--分页-->
                            <div class="page_footer b_s w_100 h_60px">
                                <el-pagination
                                    class="f_r"
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="page"
                                    :page-sizes="[10, 20, 30, 40]"
                                    :page-size=count
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total=total>
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
var THIS;
export default {
  components:{
      botHeader,
  },
  name: 'zgMessage',
  data(){
      return {
          keydown_flag:true,
          id:'',
          permissions:'',
          page:1,
          count:10,
          total:0,
          conpamy_Arr:[],
          company:'',
          keyword:'',
          timer:'',
          list:[]
      }
  },
  methods:{

      sub(type){
            THIS.page = 1;
            if(type==2){
                THIS.keyword = '';
                THIS.timer = '';
                THIS.company = '';
            };
            THIS.getList();
      },

      getList(){
            var createat_star = '';
            var createat_end = '';
            if(THIS.timer){
                createat_star = THIS.timer[0];
                createat_end = THIS.timer[1];
            };
            var data = sign({
                page:THIS.page,
                count:THIS.count,
                keyword:THIS.keyword,
                createat_star:createat_star,
                createat_end:createat_end,
                companyid:THIS.company,
                typeid:'3',
                send_uid:''
            });
            vue_Post(THIS,'msg/msgListWithSystem',data,callback,1,1,0,1);
            function callback(msg){
                  THIS.total = msg.total;
                  THIS.list = msg.list;
                  for(let i=0;i<THIS.list.length;i++){
                      var aa = THIS.list[i].createat
                  };
            }; 
      },

      handleCurrentChange(val){
          THIS.page = val;
          THIS.getList();
      },

      handleSizeChange(val) {
          THIS.count = val;
          THIS.page = 1;
          THIS.getList();
      },

      view(type,id){
          if(type==1&&THIS.permissions['msg.msginfowithsystem']==1){
              this.$router.replace('/home/message/messageThree/zgMessageDetail/'+id);
          }else if(type==2){
              THIS.$confirm('确定删除吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning',
              }).then(() => {
                  THIS.deleteFunc(id);
              }).catch(() => {});
          };
      },

      deleteFunc(id){
            var data = sign({
                notice_id:id,
                typeid:3
            });
            vue_Post(THIS,'msg/msgDeleteWithSystem',data,callback,1,1,1,1);
            function callback(msg){
                THIS.getList();
                THIS.$message({
                    type: 'success',
                    message: '删除成功!',
                    dangerouslyUseHTMLString:true
                });
            }; 
      },

      //搜索工厂
      search_company(msg){
            var data = {
                keyword:msg
            };
            vue_indexPost(THIS,'company/companySearchList',data,callback,1,0,0,0);
            function callback(msg){
                THIS.conpamy_Arr = msg.list;
            };

      },

  },
   mounted(){
        THIS = this;
        THIS.permissions = JSON.parse(window.localStorage.permissions);
        THIS.store.commit('setPageText','当前位置：消息 / 招工消息');
        THIS.getList();
        THIS.search_company('');
        $(document).keydown(function(event){
        　　if(event.keyCode==13&&THIS.keydown_flag){
            　	THIS.getList();
            };
        });
  },
  destroyed() {
      THIS.keydown_flag = false;
    },
}
</script>

<style scoped>
    .list_header li,.list_main ol li{
        width: 20%;
    }
    .header_item{
        line-height: 60px;
        color: #262626;
    }
</style>
