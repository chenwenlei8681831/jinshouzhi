<template>
        <div class="views pad_l_50 pad_r_50 b_s mr_color01">
            <div class="bg_fff">
                <bot-header :link='link'></bot-header>
                <div class="views_100ch_1">
                    <!--顶部选项-->
                    <div class="pad_l_30 pad_r_30 w_100 header_item h_60px b_s font14">
                        {{company?company:'--'}}
                    </div>
                    <!--输入框、下拉筛选-->
                    <div class="w_100 flex header_item h_60px b_s pad_r_30 pad_l_30">
                        <div class="f_l w_25 b_s h_100 flex row">
                            <span class="font12">员工姓名：</span>
                            <el-input class="flex_1 inp"  v-model="keyword" placeholder="请输入员工姓名" clearable></el-input>
                            <div class="clearfix"></div>
                        </div>
                        <div class="f_l w_25 b_s h_100 flex row mar_l_30">
                            <span class="font12">联系电话：</span>
                            <el-input class="flex_1 inp"  v-model="phone" placeholder="请输入驻厂电话" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" clearable></el-input>
                            <div class="clearfix"></div>
                        </div>
                        <div class="flex_1 f_l w_200px b_s h_100 mar_l_30">
                            <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff" style="line-height:36px">查询</span>
                            <span @click="sub(2)" class="f_l mar_l_20 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff" style="line-height:36px">重置</span>
                            <div class="clearfix"></div>
                        </div>
                        <div class="flex_1 b_s h_100 mar_l_30"></div>
                    </div>
                    <!--列表-->
                    <div class="list">
                        <ol class="list_header">
                            <li class="h_50px pad_l_20 b_s f_l" style="width:7%">ID</li>
                            <li class="h_50px pad_l_20 b_s f_l">员工姓名</li>
                            <li class="h_50px pad_l_20 b_s f_l">联系电话</li>
                            <li class="h_50px pad_l_20 b_s f_l">补发月份</li>
                            <li class="h_50px pad_l_20 b_s f_l">补发薪资(元)</li>
                            <li v-if="type==2" class="h_50px pad_l_20 b_s f_l" style="width:13%">补发时间</li>
                            <li v-else class="h_50px pad_l_20 b_s f_l" style="width:13%">操作</li>
                            <div class="clearfix"></div>
                        </ol>
                        <ul class="list_main">
                            <li class="" v-for="(item,index) in list" :key="index">
                                <ol :class="index%2==1?'list_bg':''">
                                    <li class="f_l pad_l_20 b_s" style="width:7%">{{item.id}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.name?item.name:'--'">{{item.name?item.name:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.phone?item.phone:'--'">{{item.phone?item.phone:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.year+'-'+item.month">{{item.year+'-'+item.month}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.shifa_price?item.shifa_price:'--'">{{item.shifa_price?item.shifa_price:'--'}}</li>
                                    <li v-if="type==2" class="f_l pad_l_20 b_s" style="width:13%" :title="item.bufa_time?item.bufa_time:'--'">{{item.bufa_time?item.bufa_time:'--'}}</li>
                                    <li v-else class="f_l pad_l_20 b_s" style="width:13%">
                                        <span @click="bufa_btn(1,item.id)" class="edit_button w_50 f_l">已补发</span>
                                        <span @click="bufa_btn(2,item.id)" class="edit_button w_50 f_l list_co02">已退回</span>
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
var THIS;
import botHeader from '../../components/bot-header/bot-header';
import tabCar from '../../components/list/tab-car.vue';
import downLoad from '../../components/list/down-load.vue';
export default {
  components:{
      botHeader,
      tabCar,
      downLoad
  },
  name: '',
  data(){
      return {
          id:'',
          type:'',
          link:'/home/financial/replacementOne/replacementList',
          page:1,
          count:10,
          total:0,
          keyword:'',
          phone:'',
          company:'',
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

        getList(){
                var data = sign({
                    page:THIS.page,
                    count:THIS.count,
                    jiesuan_id:THIS.id,
                    name:THIS.keyword,
                    phone:THIS.phone,
                    status:THIS.type
                });
                vue_Post(THIS,'jiesuan/fafang_detail_list',data,callback,1,1,1,0);
                function callback(msg){
                    THIS.total = msg.total;
                    THIS.list = msg.list;
                    THIS.company = msg.companyname;
                    for(let i=0;i<THIS.list.length;i++){
                        THIS.list[i].month = parseInt(THIS.list[i].month)<10?'0'+parseInt(THIS.list[i].month):parseInt(THIS.list[i].month);
                    };
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

        bufa_btn(type,id){
            THIS.$confirm(type==1?'确定标记已补发吗?':'确定标记已退回吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                var url = '';
                if(type==1){//已补发
                    url = 'jiesuan/bufa'
                }else if(type==2){//已退回
                    url = 'jiesuan/bufa_back'
                };
                var data = sign({
                        detail_id : id
                    });
                vue_Post(THIS,url,data,callback,1,1,1,0);
                function callback(msg){
                    THIS.$message({
                        type: 'success',
                        message: '标记成功!',
                        dangerouslyUseHTMLString:true
                    });
                    THIS.getList();
                }; 
            }).catch(() => {});
        }

  },
   mounted(){
        THIS = this;
        THIS.store.commit('setPageText','当前位置：财务 / 列表详情');
        THIS.id = THIS.$route.params.id?THIS.$route.params.id:'';
        THIS.type = THIS.$route.params.type==0?1:2;
        THIS.getList();
        $(document).keydown(function(event){
        　　if(event.keyCode==13){
            　	THIS.getList();
            };
        });
  },
  beforeDestroy(){
      this.store.commit('setPageText','当前位置：财务 / 补发列表');
  }
}
</script>

<style scoped>
    .list_header li,.list_main ol li{
        width: 20%;
    }
    .up_btn{
        width: 90px;
        height:  32px;
        border-radius: 4px;
    }
    .up_btn01{
        border: 1px solid #D9D9D9;
        background: #fff;
        color: #595959;
    }
    .up_btn02{
        background: #007DF2;
        color: #fff;
    }
    .cor04{
        color: #007DF2;
    }
</style>
