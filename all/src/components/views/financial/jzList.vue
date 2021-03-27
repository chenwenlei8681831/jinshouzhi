<template>
        <div class="views pad_l_50 pad_r_50 b_s mr_color01">
            <div class="bg_fff">
                <bot-header class="vv_c"></bot-header>
                <div class="views_100ch_1">
                    <!--顶部选项-->
                    <tab-car @selete='selete' :seleteArr='seleteArr' :seleteIndex='seleteIndex'></tab-car>
                    <!--输入框、下拉筛选-->
                    <div class="flex row w_100 header_item h_60px b_s pad_r_30 pad_l_30">
                        <div class="flex_1 b_s h_100 flex row">
                            <span class="font12">员工姓名：</span>
                            <el-input class="flex_1 inp"  v-model="keyword" placeholder="请输入员工姓名" clearable></el-input>
                            <div class="clearfix"></div>
                        </div>
                        <div class="flex_1 mar_l_30 flex row" label="所属企业">
                            <span class="font12">选择企业：</span>
                            <el-select class="flex_1" remote :remote-method='search_company' v-model="company" filterable clearable placeholder="请选择所属企业">
                                <el-option v-for="(item,index) in companyArr" :key="index" :label="item.realtitle" :value="item.id"></el-option>
                            </el-select>
                        </div>
                        <div class="w_25 flex row b_s h_100 mar_l_20">
                            <span class="font12">{{seleteIndex==2?'结清时间':'申请时间'}}：</span>
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
                    </div>
                    <!--批量发放、批量还款、导表-->
                    <div class="w_100 header_item h_60px b_s font14">
                        <!--发放-->
                        <span v-show="seleteIndex==0&&permissions['finance.jiezhiextend']==1" @click="fafang_choose()" class="f_l search_btn search_btn02 3_btn b_s pad_r_20 pointer all_line do_btn" style="font-size:14px">批量发放</span>
                        <!--还款-->
                        <span v-show="seleteIndex==1&&permissions['finance.jiezhiback']==1" @click="huankuan_choose()" class="f_l search_btn 3_btn b_s pad_r_20 pointer all_line do_btn" style="font-size:14px">批量还款</span>
                        <span v-show="permissions['finance.borrowingexport']==1" @click="dao_choose(1)" class="f_l search_btn search_btn02 3_btn b_s pad_r_20 pointer all_line">全部导出</span>
                        <span v-show="permissions['finance.borrowingexport']==1" @click="dao_choose(2)" class="f_l search_btn search_btn03 3_btn b_s pad_r_20 pointer all_line">批量导出</span>
                        <div class="clearfix"></div>
                    </div>
                    <!--列表-->
                    <div class="list">
                        <ol class="list_header" :class="seleteIndex==0?'current01':(seleteIndex==1?'current02':'current03')">
                            <li @click="choose(1000)" class="h_50px pad_l_20 b_s f_l" style="width:9%"><span class="c_span" :class="allFlag?'current':''"></span>ID</li>
                            <li class="h_50px pad_l_20 b_s f_l">借款人</li>
                            <li class="h_50px pad_l_20 b_s f_l">所在企业</li>
                            <li class="h_50px pad_l_20 b_s f_l">{{seleteIndex==0?'通过时间':(seleteIndex==1?'发放时间':'结清时间')}}</li>
                            <li class="h_50px pad_l_20 b_s f_l">{{seleteIndex==0?'借支金额':(seleteIndex==1?'发放金额':'结清金额')}}</li>
                            <li class="h_50px pad_l_20 b_s f_l" v-if="seleteIndex==1">待还金额</li>
                            <li class="h_50px pad_l_20 b_s f_l" v-show="seleteIndex==1">还款金额</li>
                            <li class="h_50px pad_l_20 b_s f_l">状态</li>
                            <li v-show="seleteIndex==0||seleteIndex==1" style="width:11%;" class="h_50px pad_l_20 b_s f_l caozuo">操作</li>
                            <div class="clearfix"></div>
                        </ol>
                        <ul class="list_main">
                            <li class="" v-for="(item,index) in list" :key="index">
                                <ol :class="seleteIndex==0?(index%2==1?'list_bg current01':'current01'):(seleteIndex==1?(index%2==1?'list_bg current02':'current02'):(index%2==1?'list_bg current03':'current03'))">
                                    <li @click="choose(index)" class="f_l pad_l_20 b_s" style="width:9%">
                                        <span :class="item.flag?'current':''" class="c_span"></span>{{item.id}}
                                    </li>
                                    <li class="h_50px pad_l_20 b_s f_l" :title="item.name?item.name:'--'">{{item.name?item.name:'--'}}</li>
                                    <li class="h_50px pad_l_20 b_s f_l" :title="item.realtitle?item.realtitle:'--'">{{item.realtitle?item.realtitle:'--'}}</li>
                                    <li v-if="seleteIndex==0" class="h_50px pad_l_20 b_s f_l" :title="item.agreeat?item.agreeat:'--'">{{item.agreeat?item.agreeat:'--'}}</li>
                                    <li v-if="seleteIndex==1" class="h_50px pad_l_20 b_s f_l" :title="item.fafangat?item.fafangat:'--'">{{item.fafangat?item.fafangat:'--'}}</li>
                                    <li v-if="seleteIndex==2" class="h_50px pad_l_20 b_s f_l" :title="item.jieqingat?item.jieqingat:'--'">{{item.jieqingat?item.jieqingat:'--'}}</li>
                                    <li class="h_50px pad_l_20 b_s f_l" :title="item.money?item.money:'0'+'元'">{{item.money?item.money:'0'}}元</li>
                                    <li v-if="seleteIndex==1" class="h_50px pad_l_20 b_s f_l" :title="item.daihuan_money?item.daihuan_money:'0'+'元'">{{item.daihuan_money?item.daihuan_money:'0'}}元</li>
                                    <li class="h_50px pad_l_20 b_s f_l"  v-show="seleteIndex==1">
                                          <input class="current" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入" v-model="item.xianzai_money">
                                    </li>
                                    <li class="h_50px pad_l_20 b_s f_l" :class="seleteIndex==0?'list_co02':(seleteIndex==1?'list_co03':'list_co01')">{{seleteIndex==0?'未发放':(seleteIndex==1?'已发放':'已结清')}}</li>
                                    <li  style="width:11%;" v-show="seleteIndex==0||seleteIndex==1" class="f_l pad_l_20 b_s flex row caozuo" >
                                        <span v-if="seleteIndex==0&&permissions['finance.jiezhiextend']==1" class="edit_button flex_1" @click="view(1,item.id,index)">发放</span>
                                        <span v-if="seleteIndex==1&&permissions['finance.jiezhiback']==1" class="edit_button flex_1" @click="view(2,item.id,index)">还款</span>
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
import botHeader from '../../components/bot-header/bot-header';
import tabCar from '../../components/list/tab-car.vue';
var THIS;
export default {
  components:{
      botHeader,
      tabCar
  },
  name: '',
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
            allFlag:false,
            seleteArr:[
                {name:'未发放',number:'0',type:0},
                {name:'已发放',number:'0',type:1},
                {name:'已结清',number:'0',type:2},
            ],
            list:[],
            huankuan_status:0,
            companyArr:[],
            company:''
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

        selete(index){
            THIS.seleteIndex = index;
            THIS.allFlag = false;
            THIS.page  = 1;
            THIS.getList();
        },

        getList(){
                var timer = '';
                if(THIS.timer){
                    timer = THIS.timer[0]+'|'+THIS.timer[1];
                };
                var data = sign({
                    isfafang:THIS.seleteIndex,
                    page:THIS.page,
                    count:THIS.count,
                    applytime:timer,
                    keyword:THIS.keyword,
                    companyid:THIS.company
                });
                vue_Post(THIS,'finance/jiezhiList',data,callback,0,0,0,1);
                function callback(msg){
                    THIS.allFlag = false;
                    THIS.list = msg.list;
                    THIS.total = msg.total;
                    THIS.seleteArr[0].number = msg.wf_total?msg.wf_total:0;
                    THIS.seleteArr[1].number = msg.yf_total?msg.yf_total:0;
                    THIS.seleteArr[2].number = msg.jq_total?msg.jq_total:0;
                    for(let i=0;i<THIS.list.length;i++){
                        THIS.list[i].xianzai_money = '';
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

        view(type,id,index){
            var text = type==1?'发放':'还款';
            THIS.$confirm('确定'+text+'吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                if(type==1){
                    THIS.fafangFunc(id);
                }else if(type==2){
                    var value = id+'_'+THIS.list[index].xianzai_money;
                    THIS.huankuanFunc(value);
                };
            }).catch(() => {});
        },

        fafang_choose(){
            var ids = [];
            for(let i=0;i<THIS.list.length;i++){
                if(THIS.list[i].flag){
                    ids.push(THIS.list[i].id);
                };
            };
            if(ids.length>0){
                THIS.$confirm('选中'+ids.length+'个员工，确定批量发放吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    THIS.fafangFunc(ids.join('|'));
                }).catch(() => {});
                
            }else{
                THIS.$message({
                    type: 'warning',
                    message: '请先勾选需要发放的员工!',
                    dangerouslyUseHTMLString:true
                });
            };
        },

        fafangFunc(id){
            var data = { id:id };
            vue_Post(THIS,'finance/jiezhiExtend',data,callback,1,1,1,1);
            function callback(msg){
                THIS.getList();
                THIS.$message({
                    type: 'success',
                    message: '发放成功!',
                    dangerouslyUseHTMLString:true
                });
            }; 
        },

        huankuan_choose(){
            var value = [];
            for(let i=0;i<THIS.list.length;i++){
                if(THIS.list[i].flag){
                    value.push(THIS.list[i].id+'_'+THIS.list[i].xianzai_money);
                };
            };
            if(value.length>0){
                THIS.$confirm('选中'+value.length+'个员工，确定批量还款吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    THIS.huankuanFunc(value.join('|'));
                }).catch(() => {});    
            }else{
                THIS.$message({
                    type: 'warning',
                    message: '请先勾选需要还款的员工!',
                    dangerouslyUseHTMLString:true
                });
            };
        },

        huankuanFunc(value){
            var data = { value:value };
            vue_Post(THIS,'finance/jiezhiBack',data,callback,1,1,1,1);
            function callback(msg){
                THIS.getList();
                THIS.$message({
                    type: 'success',
                    message: '还款成功!',
                    dangerouslyUseHTMLString:true
                });
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
                var applytime='';
                if(THIS.timer){
                    applytime = THIS.timer[0]+'|'+THIS.timer[1];
                };
                var bb = window.localStorage.host+'finance/borrowingExport?token='
                    +window.localStorage.token
                    +'&ids='+ids
                    +'&keyword='+(THIS.keyword?THIS.keyword:'')
                    +'&applytime='+applytime
                    +'&companyid='+THIS.company
                    +'&isfafang='+THIS.seleteIndex;
                window.location.href = bb;
        },

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
            THIS.permissions = JSON.parse(window.localStorage.permissions);
            THIS.store.commit('setPageText','当前位置：财务 / 借支管理');
            THIS.search_company('');
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
    
    .list_header.current01 li,.list_main ol.current01 li{
        width: 16%;
    }
    .list_header.current02 li,.list_main ol.current02 li{
        width: 11%;
    }
    .list_header.current03 li,.list_main ol.current03 li{
        width: 18%;
    }
    .w_100{
        width: 100%!important;
    }
    .search_btn.do_btn{
      background: #007DF2!important;
      color: #fff!important;
      text-align: center!important;
      padding: 0 0.2rem!important;
    }
    .search_btn.do_btn.current{
      background: none!important;
      color: #8C8C8C!important;
      border-color: #D9D9D9!important;
    }
    li input{
      display: block;
      width: 80px;
      height: 32px;
      margin: 9px 0;
      color: #595959;
      font-size: 12px;
      border-radius: 5px;
      box-sizing: border-box;
      padding-left: 5px;
      background: none;
    }
    li input.current{
      border: 1px solid #007DF2;
    }
</style>
