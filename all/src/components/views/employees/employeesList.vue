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
                                <span class="font12">所属企业：</span>
                                <el-select class="flex_1" remote :remote-method='search_company' v-model="company_value" filterable clearable placeholder="请选择所属企业">
                                    <el-option v-for="(item,index) in company" :key="index" :label="item.realtitle" :value="item.id"></el-option>
                                </el-select>
                                <div class="clearfix"></div>
                            </div>
                            <div class="flex_1 b_s h_100 flex row mar_l_20">
                                <span class="font12">员工姓名：</span>
                                <el-input class="flex_1 inp"  v-model="formLabelAlign.name" placeholder="请输入员工姓名" clearable></el-input>
                                <div class="clearfix"></div>
                            </div>
                            <div class="w_25 flex row b_s h_100 mar_l_20">
                                <span class="font12">{{seleteIndex==1?'在职':'录入'}}时间：</span>
                                <el-date-picker
                                        class="flex_1"
                                        v-model="searchObj.timer"
                                        value-format="yyyy-MM-dd"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                                <div class="clearfix"></div>
                            </div>
                            <div class="flex_1 b_s h_100 mar_l_30">
                                    <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff h_100" style="line-height:30px">查询</span>
                                    <span @click="sub(2)" class="f_l mar_l_30 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff h_100" style="line-height:30px">重置</span>
                                    <div class="clearfix"></div>
                            </div>
                        </div>
                        <!--下载、上传-->
                        <div v-show="permissions['yuangong.export']==1" class="w_100 header_item h_60px b_s font14">
                                <span @click="dao_choose(1)" class="f_l search_btn search_btn02 3_btn b_s pad_r_20 pointer all_line">全部导出</span>
                                <span @click="dao_choose(2)" class="f_l search_btn search_btn03 3_btn b_s pad_r_20 pointer all_line">批量导出</span>
                                <span @click="dao_choose(3)" v-show="seleteIndex==0" class="f_l search_btn search_btn04 3_btn b_s pad_r_20 pointer all_line">导出在职记录</span>
                                <span class="gj_search f_r pointer" @click="show_gj()">高级搜索</span>
                                <div class="clearfix"></div>
                        </div>
                        <!--列表-->
                        <div class="list">
                            <ol class="list_header">
                                <li @click="choose(1000)" class="h_50px pad_l_20 b_s f_l" style="width:10%"><span class="c_span" :class="allFlag?'current':''"></span>ID</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:8%">真实姓名</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:8%">入职姓名</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:5%">性别</li>
                                <li class="h_50px pad_l_20 b_s f_l">联系电话</li>
                                <li class="h_50px pad_l_20 b_s f_l"  style="width:16%;">所属企业</li>
                                <li class="h_50px pad_l_20 b_s f_l">运营中心</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:14%;">户籍地址</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:6%">状态</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:13%">操作</li>
                                <div class="clearfix"></div>
                            </ol>
                            <ul class="list_main">
                                <li @click="view(2,item.id)" v-for="(item,index) in list" :key="index">
                                    <ol :class="index%2==1?'list_bg':''">
                                        <li @click.stop="choose(index)" class="f_l pad_l_20 b_s" style="width:10%">
                                            <span :class="item.flag?'current':''" class="c_span"></span>{{item.id}}
                                        </li>
                                        <li class="f_l pad_l_20 b_s" style="width:8%" :title="item.name?item.name:'--'">{{item.name?item.name:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" style="width:8%" :title="item.use_name?item.use_name:'--'">{{item.use_name?item.use_name:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" style="width:5%" :title="item.sex?item.sex:'--'">{{item.sex?item.sex:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.phone?item.phone:'--'">{{item.phone?item.phone:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.realtitle?item.realtitle:'--'" style="width:16%;">{{item.realtitle?item.realtitle:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.center_name?item.center_name:'--'">{{item.center_name?item.center_name:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.use_address?item.use_address:'--'" style="width:14%;">{{item.use_address?item.use_address:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" style="width:6%" :title="item.status==1?'在职':'离职'" :class="item.status==1?'list_co01':'list_co02'">{{item.status==1?'在职':'离职'}}</li>
                                        <li class="f_l pad_l_20 b_s" style="width:13%">
                                            <span class="edit_button w_50 f_l" @click.stop="view(1,item.id)">编辑</span>
                                            <span class="edit_button w_50 f_l" @click.stop="view(2,item.id)">查看</span>
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
            <el-dialog title="高级搜索"  :visible.sync="show_flag" :closeOnClickModal='false' width="700px">
                    <div class="content alert_gj">
                        <el-form label-width="80px" :model="formLabelAlign">
                            <div class="flex row j_between">
                                <el-form-item class="w_50" label="员工姓名">
                                    <el-input v-model="formLabelAlign.name" placeholder="请输入员工姓名"></el-input>
                                </el-form-item>
                                <el-form-item class="w_50"  label="员工性别">
                                    <el-radio-group  v-model="formLabelAlign.sex">
                                        <el-radio :label="0">不限</el-radio>
                                        <el-radio :label="1">男</el-radio>
                                        <el-radio :label="2">女</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </div>
                            <div class="flex row j_between">
                                <el-form-item class="w_50" label="联系电话">
                                    <el-input class="w_100 inp"  v-model="formLabelAlign.phone" placeholder="请输入联系电话" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" clearable></el-input>
                                </el-form-item>
                                <el-form-item class="w_50"  label="运营中心">
                                    <el-select class="w_100" remote :remote-method='search_center' v-model="formLabelAlign.center" filterable clearable placeholder="请选择所属运营中心">
                                    <el-option v-for="(item,index) in center" :key="index" :label="item.center_name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="flex row j_between">
                                <el-form-item class="w_50" label="户籍地址">
                                    <el-cascader
                                        class="w_100"
                                        :options="address_options"
                                        v-model='formLabelAlign.address'
                                        :props="{ checkStrictly: true }"
                                        collapse-tags
                                        clearable
                                        filterable>
                                    </el-cascader>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <span slot="footer" class="w_100 dialog-footer">
                        <span @click="gj_btnClikc(0)" class="pointer f_l gj_search_resetbtn">重置搜索条件</span>
                        <el-button @click="gj_btnClikc(1)">取 消</el-button>
                        <el-button @click="gj_btnClikc(2)" type="primary">确 定</el-button>
                    </span>
            </el-dialog>
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
  name: 'employeesList',
  data(){
      return {
          keydown_flag:true,
          permissions:'',
          seleteIndex:0,
          page:1,
          count:10,
          total:0,
          zaixian:'',
          industry_id:'',
          jxfs:'',
          xingzhi:'',
          downobj:{},
          searchObj:{
              timer:'',
          },
          seleteArr:[
              {name:'员工总数',number:'0',type:0},
              {name:'在职员工',number:'0',type:1},
              {name:'离职员工',number:'0',type:2},
              {name:'共享员工',number:'0',type:3}
          ],
          list:[],
          //高级搜索
          show_flag:false,
          company:[],
          company_value:'',
          center:[],
          address_options:[],
          formLabelAlign:{
              name:'',
              phone:'',
              sex:0,
              center:'',
              address:[]
          },
          //批量导表
          allFlag:false,
          isAll:false
      }
  },
  methods:{

        selete(index){
            this.seleteIndex = index;
            this.page  = 1;
            this.getList();
        },

        sub(type){
                THIS.page = 1;
                if(type==2){
                    THIS.searchObj = {
                        timer:'',
                    };
                    THIS.formLabelAlign = {
                        name:'',
                        phone:'',
                        sex:0,
                        company:'',
                        center:'',
                        address:''
                    };
                    THIS.company_value = '';
                };
                THIS.getList();
        },

        getList(){
                var ruzhiat_star = '';
                var ruzhiat_end = '';
                if(THIS.searchObj.timer){
                    ruzhiat_star =THIS.searchObj.timer[0];
                    ruzhiat_end = THIS.searchObj.timer[1];
                };
                var data = sign({
                    page:THIS.page,
                    count:THIS.count,
                    status:THIS.seleteIndex,
                    keyword:THIS.formLabelAlign.name,
                    phone:THIS.formLabelAlign.phone,
                    ruzhiat_star:ruzhiat_star,
                    ruzhiat_end:ruzhiat_end,
                    sex:THIS.formLabelAlign.sex,
                    company_id:THIS.company_value,
                    center_id:THIS.formLabelAlign.center,
                    area:THIS.formLabelAlign.address.length>0?THIS.formLabelAlign.address.join('|'):''
                });
                vue_Post(THIS,'yuangong/list',data,callback,1,1,1,1);
                function callback(msg){
                    THIS.list = msg.list;
                    THIS.total = msg.total;
                    THIS.seleteArr[0].number = msg.zs_total;
                    THIS.seleteArr[1].number = msg.zz_total;
                    THIS.seleteArr[2].number = msg.lz_total;
                    THIS.seleteArr[3].number = msg.gx_total;
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
            if(type==1){
                this.$router.replace('/home/employees/employeesOne/employeesEdit/'+id+'/'+this.seleteIndex);
            }else if(type==2){
                this.$router.replace('/home/employees/employeesOne/employeesDetail/'+id+'/'+this.seleteIndex);
            };
        },

        show_gj(){
            this.show_flag = true;
        },

        gj_btnClikc(type){
            if(type==0){
                THIS.formLabelAlign = {
                    name:'',
                    sex:0,
                    company:'',
                    center:'',
                    address:''
                }
            }else if(type==1){
                THIS.show_flag = false;
                THIS.formLabelAlign = {
                    name:'',
                    sex:0,
                    company:'',
                    center:'',
                    address:''
                }
            }else if(type==2){
                THIS.show_flag = false;
                THIS.page = 1;
                THIS.getList();
            };
        },

        search_center(msg){
                var data = {
                    keyword:msg
                };
                vue_indexPost(THIS,'center/centerSearchList',data,callback,0,0,0,0);
                function callback(msg){
                    THIS.center = msg.list;
                }; 
        },

        search_company(msg){
                var data = {
                    keyword:msg
                };
                vue_indexPost(THIS,'company/companySearchList',data,callback,0,0,0,0);
                function callback(msg){
                    THIS.company = msg.list;
                }; 
        },

        get_address(){
            if(window.localStorage.get_address){
                //格式化省市区数据
                var obj = JSON.parse(window.localStorage.get_address);
                THIS.address_options = obj;
            }else{
                get_address(THIS,callback);
                function callback(msg){
                    window.localStorage.get_address = JSON.stringify(msg);
                    //格式化省市区数据
                    var obj = JSON.parse(window.localStorage.get_address);
                    THIS.address_options = obj;
                };
            }
            
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
                            THIS.downLode('',1);
                        }).catch(() => {});
                    };
            }else if(type==2){//批量
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
                            THIS.downLode(ids.join('|'),1);
                        }).catch(() => {});
                    };
            }else if(type==3){//全部历史记录
                THIS.$confirm('确定导出在职记录数据吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    THIS.downLode('',2);
                }).catch(() => {});
            };
        },

        downLode(ids,type){
                var status = type==2?4:THIS.seleteIndex;
                var aa = THIS.formLabelAlign;
                var ruzhiat_star='';
                var ruzhiat_end='';
                if(THIS.searchObj.timer){
                    ruzhiat_star = THIS.searchObj.timer[0];
                    ruzhiat_end = THIS.searchObj.timer[1];
                };                                 //yuangong/export
                var bb = window.localStorage.host+'company/yuangongExport?token='
                    +window.localStorage.token
                    +'&ids='+ids
                    +'&keyword='+(aa.name?aa.name:'')
                    +'&phone='+(aa.phone?aa.phone:'')
                    +'&ruzhiat_star='+ruzhiat_star
                    +'&ruzhiat_end='+ruzhiat_end
                    +'&sex='+(aa.sex?aa.sex:'')
                    +'&company_id='+(THIS.company_value?THIS.company_value:'')
                    +'&center_id='+aa.center
                    +'&area='+(aa.address.length>0?aa.address.join('|'):'')
                    +'&status='+status;
                window.location.href = bb;
        },


    },
    mounted(){
            THIS = this;
            THIS.store.commit('setPageText','当前位置：员工 / 员工列表');
            THIS.permissions = JSON.parse(window.localStorage.permissions);
            if(THIS.$route.params.id){
                var name = THIS.$route.params.name;
                var id = THIS.$route.params.id;
                THIS.formLabelAlign.center = parseInt(id);
                THIS.search_center(name);
            }else{
                THIS.search_center('');
            };
            THIS.getList();
            THIS.search_company('');
            THIS.get_address();
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
    .el-input__inner{
        padding-left:15px!important;
    }
</style>
