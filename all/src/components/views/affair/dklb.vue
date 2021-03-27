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
                            <span class="font12">申请人姓名：</span>
                            <el-input class="flex_1 inp"  v-model="keyword" placeholder="请输入申请人姓名" clearable></el-input>
                            <div class="clearfix"></div>
                        </div>
                        <div class="w_25 flex row b_s h_100 mar_l_30">
                            <span class="font12">申请时间：</span>
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
                        <div class="flex_1 b_s h_100 mar_l_30">
                                <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff" style="line-height:36px">查询</span>
                                <span @click="sub(2)" class="f_l mar_l_30 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff" style="line-height:36px">重置</span>
                                <div class="clearfix"></div>
                        </div>
                        <div class="flex_1 b_s h_100 mar_l_30"></div>
                    </div>
                    <!--列表-->
                    <div class="list">
                        <ol class="list_header">
                            <li class="h_50px pad_l_20 b_s f_l" style="width:7%">ID</li>
                            <li class="h_50px pad_l_20 b_s f_l">申请人</li>
                            <li class="h_50px pad_l_20 b_s f_l">代扣金额</li>
                            <li class="h_50px pad_l_20 b_s f_l">申请时间</li>
                            <li class="h_50px pad_l_20 b_s f_l">审核人</li>
                            <li class="h_50px pad_l_20 b_s f_l">申请状态</li>
                            <li class="h_50px pad_l_20 b_s f_l" style="width:13%">操作</li>
                            <div class="clearfix"></div>
                        </ol>
                        <ul class="list_main">
                            <li  @click="view(item.id)" v-for="(item,index) in list" :key="index">
                                <ol :class="index%2==1?'list_bg':''">
                                    <li class="f_l pad_l_20 b_s" style="width:7%">
                                        {{item.id}}
                                    </li>
                                    <li class="f_l pad_l_20 b_s" :title="item.name?item.name:'--'">{{item.name?item.name:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="(item.money?item.money:0)+'元'">{{item.money?item.money:0}}元</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.createat?item.createat:'--'">{{item.createat?item.createat:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.verify_name?item.verify_name:'--'">{{item.verify_name?item.verify_name:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :class="item.status==0?'list_co03 ':(item.status==1?'list_co01':'list_co02')">
                                        {{item.status==0?'待审核 ':(item.status==1?'已通过':'未通过')}}
                                    </li>
                                    <li class="f_l pad_l_20 b_s" style="width:13%">
                                        <span v-show="permissions['daikou.details']==1" class="edit_button w_100 f_l" @click="view(item.id)">查看</span>
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
import tabCar from '../../components/list/tab-car.vue';
var THIS;
export default {
  components:{
      botHeader,
      tabCar
  },
  name: 'dklb',
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
          seleteArr:[
              {name:'待审核',number:'',type:0},
              {name:'已通过',number:'',type:1},
              {name:'已拒绝',number:'',type:2}
          ],
          list:[]

      }
  },
  methods:{

        selete(index){
            THIS.seleteIndex = index;
            THIS.page  = 1;
            THIS.getList();
        },

        sub(type){
                THIS.page = 1;
                if(type==2){
                    THIS.keyword = '';
                    THIS.timer = '';
                };
                THIS.getList();
        },

        //获取列表
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
                    status:THIS.seleteIndex,
                    createat_star:createat_star,
                    createat_end:createat_end
                });
                vue_Post(THIS,'daikou/list',data,callback,1,1,1,1);
                function callback(msg){
                    THIS.list = msg.list;
                    THIS.total = msg.total;
                    THIS.seleteArr[0].number = msg.ds_total?msg.ds_total:0;
                    THIS.seleteArr[1].number = msg.ty_total?msg.ty_total:0;
                    THIS.seleteArr[2].number = msg.jj_total?msg.jj_total:0;
                    for(let i=0;i<THIS.list.length;i++){
                        THIS.list[i].createat = THIS.list[i].createat?THIS.list[i].createat.split(' ')[0]:'--';
                    };
                }; 
        },

        view(id){
            if(THIS.permissions['daikou.details']!=1){
                return false;
            };
            THIS.$router.replace('/home/affair/affairThree/dklbDetail/'+id);
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
        THIS.permissions = JSON.parse(window.localStorage.permissions);
        THIS.store.commit('setPageText','当前位置：事务 / 代扣列表');
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
</style>
