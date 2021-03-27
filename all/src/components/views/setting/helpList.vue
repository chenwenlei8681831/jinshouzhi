<template>

          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
                <div class="bg_fff">
                    <bot-header></bot-header>
                    <div class="views_100ch_1">
                        <!--顶部数据-->
                        <div class="pad_l_30 pad_r_30 w_100 header_item h_60px b_s font14">帮助中心列表（{{total}}）</div>
                        <!--输入框、下拉筛选-->
                        <div class="flex row w_100 header_item h_60px b_s pad_r_30 pad_l_30">
                            <div class="flex_1 b_s h_100 flex row">
                                <span class="font12">标题：</span>
                                <el-input class="flex_1 inp"  v-model="keyword" placeholder="请输入标题" clearable></el-input>
                                <div class="clearfix"></div>
                            </div>                            
                            <div class="flex_1 b_s h_100 mar_l_30">
                                    <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff" style="line-height:30px">查询</span>
                                    <span @click="sub(2)" class="f_l mar_l_30 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff" style="line-height:30px">重置</span>
                                    <div class="clearfix"></div>
                            </div>
                            <div class="flex_1 b_s h_100 mar_l_30"></div>
                            <div class="flex_1 b_s h_100 mar_l_30"></div>
                        </div>
                        <!--下载、上传-->
                        <div v-show="permissions['help.add']==1" class="w_100 header_item h_60px b_s font14">
                            <span @click="add()" class="f_l search_btn search_btn01 3_btn b_s pad_r_20 pointer bg_blue co_fff">创建</span>
                            <div class="clearfix"></div>
                        </div>
                        <!--列表-->
                        <div class="list">
                            <ol class="list_header list_bg">
                                <li class="h_50px pad_l_20 b_s f_l" style="width:7%">ID</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:40%">标题</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:40%">发布时间</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:13%;">操作</li>
                                <div class="clearfix"></div>
                            </ol>
                            <ul class="list_main">
                                <li  v-for="(item,index) in list" :key="index">
                                    <ol :class="index%2==1?'list_bg':''">
                                        <li class="h_50px pad_l_20 f_l b_s" style="width:7%">{{item.id}}</li>
                                        <li class="h_50px pad_l_20 f_l b_s" style="width:40%" :title="item.title?item.title:'--'">{{item.title?item.title:'--'}}</li>
                                        <li class="h_50px pad_l_20 f_l b_s" style="width:40%" :title="item.createat?item.createat:'--'">{{item.createat?item.createat:'--'}}</li>
                                        <li class="h_50px pad_l_20 f_l b_s" style="width:13%;">
                                            <span v-show="permissions['help.edit']==1" class="edit_button w_333 f_l" @click="view(1,item.id)">编辑</span>
                                            <span v-show="permissions['help.delete']==1" class="edit_button w_333 f_l list_co02" @click="view(2,item.id)">删除</span>
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
  name: 'companyList',
  data(){
      return {
          keydown_flag:true,
          permissions:'',
          id:'',
          page:1,
          count:10,
          total:0,
          keyword:'',
          list:[]
      }
  },
  methods:{

      sub(type){
            this.page = 1;
            if(type==2){
                this.keyword = '';
            };
            this.getList();
      },

      getList(){
            var THIS = this;
            var data = sign({
                page:THIS.page,
                count:THIS.count,
                keyword:THIS.keyword,
            });
            vue_Post(THIS,'help/list',data,callback,1,1,1,1);
            function callback(msg){
                  THIS.total = msg.total;
                  THIS.list = msg.list;
            }; 
      },

      handleCurrentChange(val){
          this.page = val;
          this.getList();
      },

      handleSizeChange(val) {
          this.count = val;
          this.page = 1;
          this.getList();
      },
  
      add(){
          THIS.$router.push('/home/setting/helpCreate');
      },

      view(type,id){
            var THIS = this;
            if(type==1){
                this.$router.replace('/home/setting/settingOne/helpEdit/'+id);
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
            var THIS = this;
            var data = sign({ id:id });
            vue_Post(THIS,'help/delete',data,callback,1,1,1,1);
            function callback(msg){
                THIS.getList();
                THIS.$message({
                    type: 'success',
                    message: '删除成功!',
                    dangerouslyUseHTMLString:true
                });
            }; 
      },


  },
   mounted(){
        THIS = this;
        THIS.permissions = JSON.parse(window.localStorage.permissions);
        THIS.store.commit('setPageText','当前位置：设置 / 帮助中心');
        THIS.getList();
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
    .header_item{
        line-height: 60px;
        color: #262626;
    }
</style>
