<template>

          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
                <div class="bg_fff">
                    <bot-header></bot-header>
                    <div class="views_100ch_1">
                        <!--顶部数据-->
                        <div class="pad_l_30 pad_r_30 w_100 header_item h_60px b_s font14">用户列表（{{total}}）</div>
                        <!--输入框、下拉筛选-->
                        <div class="w_100 header_item h_60px b_s pad_r_30 pad_l_30">
                            <div class="f_l w_25 b_s h_100 flex row">
                                <span class="font12">投诉人姓名：</span>
                                <el-input class="flex_1 inp"  v-model="keyword" placeholder="请输入投诉人姓名" clearable></el-input>
                                <div class="clearfix"></div>
                            </div>
                            <div class="f_l w_25 b_s h_100 flex row mar_l_30">
                                <span class="font12">联系电话：</span>
                                <el-input class="flex_1 inp" v-model="phone" placeholder="请输入联系电话" clearable></el-input>
                                <div class="clearfix"></div>
                            </div>
                            <div class="f_l flex row w_25 b_s h_100 mar_l_30">
                                <span class="font12">注册时间：</span>
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
                        </div>
                        <!--列表-->
                        <div class="list">
                            <ol class="list_header list_bg">
                                <li class="h_50px pad_l_20 b_s f_l" style="width:7%">ID</li>
                                <li class="h_50px pad_l_20 b_s f_l">微信昵称</li>
                                <li class="h_50px pad_l_20 b_s f_l">性别</li>
                                <li class="h_50px pad_l_20 b_s f_l">联系电话</li>
                                <li class="h_50px pad_l_20 b_s f_l">现居住地</li>
                                <li class="h_50px pad_l_20 b_s f_l">注册时间</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:13%">操作</li>
                                <div class="clearfix"></div>
                            </ol>
                            <ul class="list_main">
                                <li @click.stop="view(item.id)" v-for="(item,index) in list" :key="index">
                                    <ol :class="index%2==1?'list_bg':''">
                                        <li class="f_l pad_l_20 b_s" style="width:7%"> {{item.id}} </li>
                                        <li class="f_l pad_l_20 b_s" :title="item.username?item.username:'--'">{{item.username?item.username:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s">{{item.sex?((item.sex==1|'男')?'男':'女'):'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.phone?item.phone:'--'">{{item.phone?item.phone:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.address?item.address:'--'">{{(item.province_name+item.city_name+item.area_name)?(item.province_name+item.city_name+item.area_name):'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.createat?item.createat:'--'">{{item.createat?item.createat:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" style="width:13%">
                                            <span v-show="permissions['user.info']==1" class="edit_button w_50 f_l" @click.stop="view(item.id)">查看</span>
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
  name: 'employeesTs',
  data(){
      return {
          keydown_flag:true,
          permissions:'',
          seleteIndex:0,
          page:1,
          count:10,
          total:0,
          keyword:'',
          phone:'',
          timer:'',
          list:[], 
      }
  },
  methods:{


        sub(type){
                THIS.page = 1;
                if(type==2){
                    THIS.keyword = '';
                    THIS.phone = '';
                    THIS.timer = '';
                };
                THIS.getList();
        },

        getList(){
                let createat = '';
                if(THIS.timer){
                    createat = THIS.timer[0]+'|'+THIS.timer[1];
                };
                var data = sign({
                    page:THIS.page,
                    count:THIS.count,
                    keyword:THIS.keyword,
                    createat:createat,
                    phone:THIS.phone
                });
                vue_Post(THIS,'user/list',data,callback,0,0,0,0);
                function callback(msg){
                    THIS.total = msg.total;
                    THIS.list = msg.list;
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

        view(id){
            if(THIS.permissions['user.info']!=1){
                return false;
            };
            THIS.$router.replace('/home/employees/employeesFour/userDetail/'+id);
        },

  },
   mounted(){
        THIS = this;
        THIS.permissions = JSON.parse(window.localStorage.permissions);
        THIS.store.commit('setPageText','当前位置：员工 / 用户列表');
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
        width: 16%;
    }
    .header_item{
        line-height: 60px;
        color: #262626;
    }
</style>
