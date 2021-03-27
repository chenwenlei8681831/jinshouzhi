<template>

          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
                <div class="bg_fff">
                    <bot-header></bot-header>
                    <div class="views_100ch_1">
                        <!--顶部数据-->
                        <div class="pad_l_30 pad_r_30 w_100 header_item h_60px b_s font14">员工评价列表（{{total}}）</div>
                        <!--输入框、下拉筛选-->
                        <div class="w_100 header_item h_60px b_s pad_r_30 pad_l_30">
                            <div class="f_l w_25 b_s h_100 flex row">
                                <span class="font12">企业名称：</span>
                                <el-input class="flex_1 inp"  v-model="keyword" placeholder="请输入企业名称" clearable></el-input>
                                <div class="clearfix"></div>
                            </div>
                            <div class="f_l flex row w_25 b_s h_100 mar_l_30">
                                <span class="font12">创建时间：</span>
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
                            <div class="f_l w_200px b_s h_100 mar_l_30">
                                    <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff" style="line-height:30px">查询</span>
                                    <span @click="sub(2)" class="f_r font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff" style="line-height:30px">重置</span>
                                    <div class="clearfix"></div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <!--列表-->
                        <div class="list">
                            <ol class="list_header list_bg">
                                <li class="h_50px pad_l_20 b_s f_l" style="width:7%">ID</li>
                                <li class="h_50px pad_l_20 b_s f_l">员工姓名</li>
                                <li class="h_50px pad_l_20 b_s f_l">联系电话</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:15%">所属企业</li>
                                <li class="h_50px pad_l_20 b_s f_l">评价驻厂</li>
                                <li class="h_50px pad_l_20 b_s f_l">评分</li>
                                <li class="h_50px pad_l_20 b_s f_l">评价时间</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:13%">操作</li>
                                <div class="clearfix"></div>
                            </ol>
                            <ul class="list_main">
                                <li @click.stop="view(1,item.id)" v-for="(item,index) in list" :key="index">
                                    <ol :class="index%2==1?'list_bg':''">
                                        <li class="f_l pad_l_20 b_s" style="width:7%">{{item.id}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.username?item.username:'--'">{{item.username?item.username:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.phone?item.phone:'--'">{{item.phone?item.phone:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" style="width:15%" :title="item.realtitle?item.realtitle:'--'">{{item.realtitle?item.realtitle:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.zhuchang_name?item.zhuchang_name:'--'">{{item.zhuchang_name?item.zhuchang_name:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.star?item.star:'--'">{{item.star?item.star:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.createat">{{item.createat}}</li>
                                        <li class="f_l pad_l_20 b_s" style="width:13%">
                                            <span v-show="permissions['comments.details']==1" class="edit_button w_50 f_l" @click.stop="view(1,item.id)">查看</span>
                                            <span v-show="permissions['comments.delete']==1" class="edit_button w_50 f_l list_co02" @click.stop="view(2,item.id)">删除</span>
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
  name: 'employeesPj',
  data(){
      return {
          keydown_flag:true,
          permissions:'',
          seleteIndex:0,
          page:1,
          count:10,
          total:0,
          keyword:'',
          timer:'',
          list:[],
          downobj:{
              addLink:'/home/company/companyCreate'
          }

      }
  },
  methods:{

        sub(type){
                THIS.page = 1;
                if(type==2){
                    THIS.keyword = '';
                    THIS.timer = '';
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
                    createat_end:createat_end
                });
                vue_Post(THIS,'comments/list',data,callback,1,1,1,1);
                function callback(msg){
                    THIS.total = msg.total;
                    THIS.list = msg.list;
                    for(let i=0;i<THIS.list.length;i++){
                        THIS.list[i].createat = THIS.list[i].createat?THIS.list[i].createat.split(' ')[0]:'--';
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
            if(type==1&&THIS.permissions['comments.details']==1){
                THIS.$router.replace('/home/employees/employeesTwo/employeespJDetail/'+id);
            }else if(type==2){
                    THIS.id = id;
                    THIS.$confirm('确定删除吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'info',
                    }).then(() => {
                        THIS.deleteFunc(status);
                    }).catch(() => {});
            };
        },

        deleteFunc(){
                var data = sign({ commentsid:THIS.id });
                vue_Post(THIS,'comments/delete',data,callback,1,1,1,1);
                function callback(msg){
                    THIS.getList();
                    THIS.$message({
                        type: 'success',
                        message: '删除成功!',
                        dangerouslyUseHTMLString:true
                    });
                }; 
        },

        down(type){
                if(type==1){
                    THIS.$router.replace(THIS.downobj.addLink);
                }
        }

  },
   mounted(){
        THIS = this;
        THIS.store.commit('setPageText','当前位置：员工 / 员工评价');
        THIS.permissions = JSON.parse(window.localStorage.permissions);
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
    .list_header li,.list_main ol li{
        width: 13%;
    }
    .header_item{
        line-height: 60px;
        color: #262626;
    }
</style>
