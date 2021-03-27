<template>
        <div class="views pad_l_50 pad_r_50 b_s mr_color01">
          <div class="bg_fff">
                <bot-header></bot-header>
                <div class="views_100ch_1">
                    <!--顶部选项-->
                    <div class="pad_l_30 pad_r_30 w_100 header_item h_60px b_s font14">
                        不发列表（{{total}}）
                    </div>
                    <!--输入框、下拉筛选-->
                    <div class="flex row w_100 header_item h_60px b_s pad_r_30 pad_l_30">
                        <div class="flex_1 flex row" label="所属企业">
                                <span class="font12">选择企业：</span>
                                <el-select class="flex_1" remote :remote-method='search_company' v-model="company" filterable clearable placeholder="请选择所属企业">
                                    <el-option v-for="(item,index) in companyArr" :key="index" :label="item.realtitle" :value="item.id"></el-option>
                                </el-select>
                        </div>
                        <div class="flex_1 b_s h_100 flex row mar_l_30">
                                <span class="font12">补发月份：</span>
                                <el-date-picker
                                    class="flex_1"
                                    style="width: 100%;"
                                    v-model="timer"
                                    value-format="yyyy-MM"
                                    type="month"
                                    placeholder="补发月份">
                                </el-date-picker>
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
                        <ol class="list_header">
                            <li class="h_50px pad_l_20 b_s f_l" style="width:12%">ID</li>
                            <li class="h_50px pad_l_20 b_s f_l">企业名称</li>
                            <li class="h_50px pad_l_20 b_s f_l">结算单位</li>
                            <li class="h_50px pad_l_20 b_s f_l">工资月份</li>
                            <li class="h_50px pad_l_20 b_s f_l" style="width:13%">操作</li>
                            <div class="clearfix"></div>
                        </ol>
                        <ul class="list_main">
                            <li class="" v-for="(item,index) in list" :key="index">
                                <ol :class="index%2==1?'list_bg':''">
                                    <li class="f_l pad_l_20 b_s" style="width:12%">{{item.id}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.companyname?item.companyname:'--'">{{item.companyname?item.companyname:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.kpdw_info?item.kpdw_info:'--'">{{item.kpdw_info?item.kpdw_info:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.year+'-'+item.month">{{item.year+'-'+item.month}}</li>
                                    <li class="f_l pad_l_20 b_s" style="width:13%">
                                        <span class="edit_button w_100 f_l" @click="view(item.jiesuan_id)">查看</span>
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
  name: 'replacementList',
  data(){
      return {
            keydown_flag:true,
            page:1,
            count:10,
            total:0,
            timer:'',
            companyArr:[],
            company:'',
            list:[],
      }
  },
  methods:{

        sub(type){
                THIS.page = 1;
                if(type==2){
                    THIS.company = '';
                    THIS.timer = '';
                };
                THIS.getList();
        },

        getList(){
                var data = sign({
                    page:THIS.page,
                    count:THIS.count,
                    status:'3',
                    companyid:THIS.company,
                    time:THIS.timer
                });
                vue_Post(THIS,'jiesuan/fafang_list',data,callback,1,1,1,1);
                function callback(msg){
                    THIS.list = msg.list;
                    THIS.total = msg.total_nofa;
                    for(let i=0;i<THIS.list.length;i++){
                        THIS.list[i].month = parseInt(THIS.list[i].month)<10?('0'+THIS.list[i].month):THIS.list[i].month;
                    };
                }; 
        },

        view(id){
            THIS.$router.replace('/home/financial/nosendOne/nosendDetail/'+id);
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

        //获取企业列表
        search_company(msg){
                var data = {
                    keyword:msg
                };
                vue_indexPost(THIS,'company/companySearchList',data,callback,0,0,0,0);
                function callback(msg){
                    THIS.companyArr = msg.list;
                }; 
        },


  },
   mounted(){
        THIS = this;
        THIS.store.commit('setPageText','当前位置：财务 / 不发列表');
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
        width: 25%;
    }
</style>
