<template>
        <div class="views pad_l_50 pad_r_50 b_s mr_color01">
          <div class="bg_fff">
                <bot-header></bot-header>
                <div class="views_100ch_1">
                    <!--顶部选项-->
                    <tab-car @selete='selete' :seleteArr='seleteArr' :seleteIndex='seleteIndex'></tab-car>
                    <!--输入框、下拉筛选-->
                    <div class="flex row w_100 header_item h_60px b_s pad_r_30 pad_l_30">
                        <div class="flex_1 b_s h_100 flex row">
                            <span class="font12">员工姓名：</span>
                            <el-input class="flex_1 inp" v-model="keyword" placeholder="请输入员工姓名" clearable></el-input>
                            <div class="clearfix"></div>
                        </div>
                        <div class="flex_1 b_s h_100 flex row mar_l_30">
                            <span class="font12">联系电话：</span>
                            <el-input class="flex_1 inp"  v-model="phone" placeholder="请输入联系电话" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" clearable></el-input>
                            <div class="clearfix"></div>
                        </div>
                        <div class="flex_1 b_s h_100 mar_l_30">
                                <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff" style="line-height:36px">查询</span>
                                <span @click="sub(2)" class="f_l mar_l_30 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff" style="line-height:36px">重置</span>
                                <div class="clearfix"></div>
                        </div>
                        <div class="flex_1 b_s h_100 flex row mar_l_30"></div>
                    </div>
                    <!--列表-->
                    <div class="list">
                        <ol class="list_header flex row">
                            <li class="h_50px pad_l_20 b_s" style="width:7%">ID</li>
                            <li class="h_50px pad_l_20 b_s flex_1">姓名</li>
                            <li class="h_50px pad_l_20 b_s flex_1">联系电话</li>
                            <li class="h_50px pad_l_20 b_s flex_1">运营中心</li>
                            <li class="h_50px pad_l_20 b_s flex_1">入职企业</li>
                            <li class="h_50px pad_l_20 b_s flex_1">所属驻厂</li>
                            <li class="h_50px pad_l_20 b_s flex_1">{{seleteIndex==0?'预计到厂时间':'待办时间'}}</li>
                            <li class="h_50px pad_l_20 b_s" style="width:13%">操作</li>
                        </ol>
                        <ul class="list_main">
                            <li @click.stop="view(item.id)" v-for="(item,index) in list" :key="index">
                                <ol :class="index%2==1?'list_bg':''" class="flex row">
                                    <li class="pad_l_20 b_s" style="width:7%">{{item.id}}</li>
                                    <li class="flex_1 pad_l_20 b_s" :title="item.name?item.name:'--'">{{item.name?item.name:'--'}}</li>
                                    <li class="flex_1 pad_l_20 b_s" :title="item.phone?item.phone:'--'">{{item.phone?item.phone:'--'}}</li>
                                    <li class="flex_1 pad_l_20 b_s" :title="item.center_name?item.center_name:'--'">{{item.center_name?item.center_name:'--'}}</li>
                                    <li class="flex_1 pad_l_20 b_s" :title="item.company_name?item.company_name:'--'">{{item.company_name?item.company_name:'--'}}</li>
                                    <li class="flex_1 pad_l_20 b_s" :title="item.zhuchang_name?item.zhuchang_name:'--'">{{item.zhuchang_name?item.zhuchang_name:'--'}}</li>
                                    <li v-if="seleteIndex==0" class="flex_1 pad_l_20 b_s" :title="item.reach_time?item.reach_time:'--'">{{item.reach_time?item.reach_time:'--'}}</li>
                                    <li v-else class="flex_1 pad_l_20 b_s" :class="item.reach_time_status==1?'list_co02':'list_co01'">{{item.reach_time_status==1?'超出天数:':'剩余天数:'}}{{item.reach_time?item.reach_time:0}}天</li>
                                    <li class="pad_l_20 b_s" style="width:13%">
                                        <span v-show="permissions['centerflow.newflowdetails']==1" class="edit_button w_100 f_l" @click.stop="view(item.id)">查看</span>
                                    </li>
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
import tabCar from '../../components/list/tab-car.vue';
var THIS;
export default {
  components:{
      botHeader,
      tabCar
  },
  name: 'yglb',
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
          seleteArr:[
              {name:'待接收员工',number:'0',type:0},
              {name:'待入职员工',number:'0',type:1}
          ],
          list:[],
          
      }
  },
  methods:{

      sub(type){
            THIS.page = 1;
            if(type==2){
                THIS.keyword = '';
                THIS.phone = '';
            };
            THIS.getList();
      },

      selete(index){
          THIS.seleteIndex = index;
          THIS.page  = 1;
          THIS.getList();
      },

      getList(){
            var data = sign({
                page:THIS.page,
                count:THIS.count,
                keyword:THIS.keyword,
                phone:THIS.phone,
                status:THIS.seleteIndex==0?1:2
            });
            vue_Post(THIS,'centerflow/newFlowList',data,callback,1,1,1,1);
            function callback(msg){
                THIS.list = msg.list;
                THIS.total = msg.total;
                THIS.seleteArr[0].number = msg.dj_total?msg.dj_total:0;
                THIS.seleteArr[1].number = msg.dr_total?msg.dr_total:0;
            }; 
      },

      view(id){
          if(THIS.permissions['centerflow.newflowdetails']!=1){
              return false;
          };
          var type = THIS.seleteIndex==0?1:2;
          THIS.$router.replace('/home/affair/affairFour/yglbDetail/'+id+'/'+type);
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

  },
   mounted(){
        THIS = this;
        THIS.store.commit('setPageText','当前位置：事务 / 员工列表');
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
        width: 20%;
    }
    .zc_img{
        width:40px;
        height:40px;
        border-radius: 50%;
        overflow: hidden;
        margin: 5px 0;
        background: url(../../../assets/images/moren01.png) no-repeat center /100%;
    }
</style>
