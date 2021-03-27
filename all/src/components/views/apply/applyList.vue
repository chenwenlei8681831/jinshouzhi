<template>
        <div class="views pad_l_50 pad_r_50 b_s mr_color01">
            <div class="bg_fff">
                <bot-header></bot-header>
                <div class="views_100ch_1">
                    <!--顶部选项-->
                    <tab-car @selete='selete' :seleteArr='seleteArr' :seleteIndex='seleteIndex'></tab-car>
                    <!--输入框、下拉筛选-->
                    <div class="flex row header_item h_60px b_s pad_r_30 pad_l_30">
                        <div class="flex_1 b_s h_100 flex row">
                            <span class="font12">报名人姓名：</span>
                            <el-input class="flex_1 inp"  v-model="keyword" placeholder="请输入报名人姓名" clearable></el-input>
                        </div>
                        <div class="flex_1 b_s h_100 flex row mar_l_30">
                            <span class="font12">联系电话：</span>
                            <el-input class="flex_1 inp"  v-model="phone" placeholder="请输入联系电话" clearable oninput="value=value.replace(/[^\d]/g,'')" maxlength="11"></el-input>
                        </div>
                        <div class="w_25 flex row b_s h_100 mar_l_30">
                            <span class="font12">报名时间：</span>
                            <el-date-picker
                                    class="flex_1"
                                    v-model="timer"
                                    value-format="yyyy-MM-dd"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                        <div class="flex_1 b_s h_100 mar_l_30">
                                <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff h_100" style="line-height:30px">查询</span>
                                <span @click="sub(2)" class="f_l mar_l_30 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff h_100" style="line-height:30px">重置</span>
                                <div class="clearfix"></div>
                        </div>
                    </div>
                    <!--下载、上传-->
                    <div v-show="permissions['enroll.employeeenrollexport']==1" class="w_100 header_item h_60px b_s font14">
                        <span @click="dao_choose(1)" class="f_l search_btn search_btn02 3_btn b_s pad_r_20 pointer all_line">全部导出</span>
                        <span @click="dao_choose(2)" class="f_l search_btn search_btn03 3_btn b_s pad_r_20 pointer all_line">批量导出</span>
                        <div class="clearfix"></div>
                    </div>
                    <!--列表-->
                    <div class="list">
                        <ol class="list_header">
                            <li @click.stop="choose(1000)" class="h_50px pad_l_20 b_s f_l" style="width:10%"><span class="c_span" :class="allFlag?'current':''"></span>ID</li>
                            <li class="h_50px pad_l_20 b_s f_l">员工姓名</li>
                            <li class="h_50px pad_l_20 b_s f_l">联系电话</li>
                            <li class="h_50px pad_l_20 b_s f_l" style="width:17%;">所在地区</li>
                            <li class="h_50px pad_l_20 b_s f_l" style="width:17%;">报名企业</li>
                            <li class="h_50px pad_l_20 b_s f_l" style="width:13%;">报名时间</li>
                            <li class="h_50px pad_l_20 b_s f_l">状态</li>
                            <li class="h_50px pad_l_20 b_s f_l" style="width:13%">操作</li>
                            <div class="clearfix"></div>
                        </ol>
                        <ul class="list_main">
                            <li @click.stop="view(item.id)" v-for="(item,index) in list" :key="index">
                                <ol :class="index%2==1?'list_bg':''">
                                    <li @click.stop="choose(index)" class="f_l pad_l_20 b_s" style="width:10%">
                                        <span :class="item.flag?'current':''" class="c_span"></span>{{item.id}}
                                    <li class="f_l pad_l_20 b_s" :title="item.username?item.username:'--'">{{item.username?item.username:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.phone?item.phone:'--'">{{item.phone?item.phone:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" style="width:17%;" :title="item.address?item.address:'--'">{{item.address?item.address:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" style="width:17%;" :title="item.realtitle?item.realtitle:'--'">{{item.realtitle?item.realtitle:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" style="width:13%;" :title="item.createat">{{item.createat}}</li>
                                    <li class="f_l pad_l_20 b_s" :class="item.status==0?'list_co02':'list_co01'">{{item.status==0?'未处理':'已处理'}}</li>
                                    <li class="f_l pad_l_20 b_s" style="width:13%">
                                        <span v-show="permissions['enroll.details']==1" class="edit_button w_50 f_l" @click.stop="view(item.id)">查看</span>
                                    </li>
                                    <div class="clearfix"></div>
                                </ol>
                            </li>
                        </ul>
                        <!--分页-->
                        <div class="page_footer b_s w_100 h_60px">
                            <div class="f_l font14" @click="choose(1000)"><span class="c_span" :class="allFlag?'current':''"></span>全选</div>
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
export default {
  components:{
      botHeader,
      tabCar
  },
  name: 'applyList',
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
          downobj:{},
          seleteArr:[
              {name:'待处理',number:'0',type:0},
              {name:'已处理',number:'0',type:1}
          ],
          list:[],
          //批量导表
          allFlag:false,
          isAll:false,
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
                THIS.phone = '';
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
                    phone:THIS.phone,
                    status:THIS.seleteIndex,
                    createat_star:createat_star,
                    createat_end:createat_end
                });
                vue_Post(THIS,'enroll/list',data,callback,1,1,1,1);
                function callback(msg){
                    THIS.list = msg.list;
                    THIS.total = msg.total;
                    THIS.seleteArr[0].number = msg.w_total?msg.w_total:0;
                    THIS.seleteArr[1].number = msg.y_total?msg.y_total:0;
                    for(let i=0;i<THIS.list.length;i++){
                        THIS.list[i].createat = THIS.list[i].enroll_time?THIS.list[i].enroll_time.split(' ')[0]:'--';
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

        view(id){
            if(THIS.permissions['enroll.details']!=1){
                return false;
            };
            THIS.$router.replace('/home/apply/applyOne/applyDetail/'+id+'/'+this.seleteIndex);
        },

        choose(index){
            if(index==1000){//全选
                THIS.allFlag = !THIS.allFlag;
                for(let i=0;i<THIS.list.length;i++){
                    THIS.list[i].flag = THIS.allFlag;
                };
            }else{//单选
                console.log(index);
                THIS.list[index].flag = !THIS.list[index].flag;
                if(!THIS.list[index].flag){
                    THIS.allFlag = false;
                };
                THIS.list = JSON.parse(JSON.stringify(THIS.list));
            };
        },

        dao_choose(type){
            if(type==1){//全部
                    if(THIS.list.length==0){
                        THIS.$message({
                            type: 'warning',
                            message: '没有可以导出的数据!',
                            dangerouslyUseHTMLString:true
                        });
                    }else{
                        THIS.$confirm('确定导出全部数据吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                        }).then(() => {
                            THIS.downLode('');
                        }).catch(() => {});
                    };
            }else{//批量
                    var ids = [];
                    var aa = THIS.list;
                    for(let i=0;i<aa.length;i++){
                        if(aa[i].flag){
                            ids.push(aa[i].id);
                        };
                    };
                    if(ids.length==0){
                        THIS.$message({
                            type: 'warning',
                            message: '请先勾选需要导出的数据!',
                            dangerouslyUseHTMLString:true
                        });
                    }else{
                        THIS.$confirm('选中数据'+ids.length+'条,确定导出吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                        }).then(() => {
                            THIS.downLode(ids.join('|'));
                        }).catch(() => {});
                    };
            };
        },

        downLode(ids){
            var createat_star = '';
            var createat_end = '';
            if(THIS.timer){
                createat_star = THIS.timer[0];
                createat_end = THIS.timer[1];
            };
            var bb = window.localStorage.host+'enroll/employeeEnrollExport?token='
                +window.localStorage.token
                +'&ids='+ids
                +'&keyword='+THIS.keyword
                +'&phone='+THIS.phone
                +'&status='+THIS.seleteIndex
                +'&createat_star='+createat_star
                +'&createat_end='+createat_end;
            window.location.href = bb;
        },

  },
   mounted(){
        THIS = this;
        THIS.permissions = JSON.parse(window.localStorage.permissions);
        THIS.store.commit('setPageText','当前位置：报名 / 报名列表');
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
        width: 10%;
    }
</style>
