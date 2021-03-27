<template>
        <div class="views pad_l_50 pad_r_50 b_s mr_color01">
          <div class="bg_fff">
                <bot-header></bot-header>
                <div class="views_100ch_1">
                    <!--顶部选项-->
                    <div class="pad_l_30 pad_r_30 w_100 header_item h_60px b_s font14">操作日志（{{total}}）</div>
                    <!--输入框、下拉筛选-->
                    <div class="w_100 header_item h_60px b_s pad_r_30 pad_l_30">
                        <div class="f_l w_25 b_s h_100 flex row" label="操作类型">
                            <span class="font12">操作类型：</span>
                            <el-select class="flex_1" v-model="cz_type" filterable clearable placeholder="请选择操作类型：">
                                <el-option v-for="(item,index) in typeArr" :key="index" :label="item.title" :value="item.id"></el-option>
                            </el-select>
                        </div>
                        <div class="f_l w_25 b_s h_100 flex row mar_l_30">
                            <span class="font12">操作内容：</span>
                            <el-input class="flex_1 inp" v-model="keyword" placeholder="请输入操作内容" clearable></el-input>
                            <div class="clearfix"></div>
                        </div>
                        <div class="f_l w_25 b_s h_100 flex row mar_l_30">
                            <span class="font12">操作日期：</span>
                            <el-date-picker
                                    class="flex_1 w_25"
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
                            <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff" style="line-height:36px">查询</span>
                            <span @click="sub(2)" class="f_l mar_l_20 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff" style="line-height:36px">重置</span>
                            <div class="clearfix"></div>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <!--下载、上传-->
                    <div v-show="permissions['operations.export']==1" class="w_100 header_item h_60px b_s font14">
                            <span @click="dao_choose(1)" class="f_l search_btn search_btn02 3_btn b_s pad_r_20 pointer all_line">全部导出</span>
                            <span @click="dao_choose(2)" class="f_l search_btn search_btn03 3_btn b_s pad_r_20 pointer all_line">批量导出</span>
                            <div class="clearfix"></div>
                    </div>
                    <!--列表-->
                    <div class="list">
                        <ol class="list_header flex row">
                            <li @click="choose(1000)" class="h_50px pad_l_20 b_s f_l" style="width:10%"><span class="c_span" :class="allFlag?'current':''"></span>ID</li>
                            <li class="h_50px pad_l_20 b_s flex_1">操作人员</li>
                            <li class="h_50px pad_l_20 b_s flex_1">操作类型</li>
                            <li class="h_50px pad_l_20 b_s flex_1">操作内容</li>
                            <li class="h_50px pad_l_20 b_s flex_1">IP地址</li>
                            <li class="h_50px pad_l_20 b_s flex_1">操作时间</li>
                            <li class="h_50px pad_l_20 b_s" style="width:10%">操作</li>
                        </ol>
                        <ul class="list_main">
                            <li @click="view(item.id,item.operate_type)" v-for="(item,index) in list" :key="index">
                                <ol class="flex row" :class="index%2==1?'list_bg':''">
                                    <li @click.stop="choose(index)" class="pad_l_20 b_s" style="width:10%">
                                        <span :class="item.flag?'current':''" class="c_span"></span>{{item.id}}
                                    </li>
                                    <li class="pad_l_20 b_s flex_1" :title="item.operate_user?item.operate_user:'--'">{{item.operate_user?item.operate_user:'--'}}</li>
                                    <li class="pad_l_20 b_s flex_1" :title="item.operate?item.operate:'--'">{{item.operate?item.operate:'--'}}</li>
                                    <li class="pad_l_20 b_s flex_1" :title="item.content?item.content:'--'">{{item.content?item.content:'--'}}</li>
                                    <li class="pad_l_20 b_s flex_1" :title="item.ip?item.ip:'--'">{{item.ip?item.ip:'--'}}</li>
                                    <li class="pad_l_20 b_s flex_1" :title="item.operate_time?item.operate_time:'--'">{{item.operate_time?item.operate_time:'--'}}</li>
                                    <li class="pad_l_20 b_s" style="width:10%">
                                        <span v-show="permissions['operation.{id}(get)']==1" class="edit_button w_50" @click.stop="view(item.id,item.operate_type)">查看</span>
                                    </li>
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
import botHeader from '../../components/bot-header/bot-header';
import tabCar from '../../components/list/tab-car.vue';
import downLoad from '../../components/list/down-load.vue';
var THIS;
export default {
  components:{
      botHeader,
      tabCar,
      downLoad
  },
  name: 'permissions_rz',
  data(){
      return {
          keydown_flag:true,
          permissions:'',
          page:1,
          count:10,
          total:0,
          keyword:'',
          timer:'',
          list:[],
          downobj:{
              addLink:'/home/zhuchang/zhuchangCreate'
          },
          //批量导表
          allFlag:false,
          isAll:false,
          //类型
          typeArr:[],
          cz_type:'',
      }
  },
  methods:{

        sub(type){
                THIS.page = 1;
                if(type==2){
                    THIS.keyword = '';
                    THIS.timer = '';
                    THIS.cz_type='';
                };
                THIS.getList();
        },

        getList(){
                let ruzhiat_star = '';
                let ruzhiat_end = '';
                if(THIS.timer){
                    ruzhiat_star =THIS.timer[0];
                    ruzhiat_end = THIS.timer[1];
                };
                var data = sign({
                    content:THIS.keyword,
                    current_page:THIS.page,
                    per_page:THIS.count,
                    start_date:ruzhiat_star,
                    end_date:ruzhiat_end,
                    operate:THIS.cz_type
                });
                THIS.vue_Get(THIS,'admin/operations',data,callback,1,1,0,1);
                function callback(msg){
                    THIS.list = msg.operation_list.data;
                    THIS.total = msg.operation_list.total;
                    THIS.typeArr = [];
                    for(var key in msg.operation_types){
                        let obj = { id:key, title:msg.operation_types[key]};
                        THIS.typeArr.push(obj);
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

        view(id,type){
            if(THIS.permissions['operation.{id}(get)']!=1){
                return false;
            };
            if(type==1){
                    THIS.$router.replace('/home/permissions/permissionsThree/permissions_rzDetail/'+id);
            }else{
                    THIS.$message({
                        type: 'warning',
                        message: '该数据无修改内容，无法查看!',
                        dangerouslyUseHTMLString:true
                    });
            };
            
        },

        choose(index){
            if(index==1000){//全选
                THIS.allFlag = !THIS.allFlag;
                for(let i=0;i<THIS.list.length;i++){
                    THIS.list[i].flag = THIS.allFlag;
                };
            }else{//单选
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
            var bb = window.localStorage.host+'operations/export?token='
                +window.localStorage.token
                +'&ids='+ids
                +'operate='+THIS.cz_type
                +'&content='+THIS.keyword
                +'&start_date='+createat_star
                +'&end_date='+createat_end;
            window.location.href = bb;
        },


  },
   mounted(){
      THIS = this;
      THIS.permissions = JSON.parse(window.localStorage.permissions);
      THIS.store.commit('setPageText','当前位置：权限 / 操作日志');
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
