<template>
        <div class="views pad_l_50 pad_r_50 b_s mr_color01">
            <div class="bg_fff">
                    <bot-header></bot-header>
                    <div class="views_100ch_1 flex col">
                        <!--选择年、月-->
                        <div class="flex row j_between w_100 header_item h_60px b_s pad_r_30 pad_l_30">
                            <div class="flex row">
                                <span class="font12">年份筛选：</span>
                                <el-select class="selete_time mar_r_20" v-model="year" filterable  placeholder="请选择年份">
                                    <el-option v-for="(item,index) in yearArr" :key="index" :label="item+'年'" :value="item"></el-option>
                                </el-select>
                                <ul class="flex row">
                                    <li @click="do_item(index)" v-for="(item,index) in monthArr" :key="index" :class="monthIndex==index?'current':''" class="month_item text_center pointer">{{item}}月</li>
                                </ul>
                            </div>
                            <span @click="do_down('-1')" class="flex yangbiao b_s pointer text_height_center">下载样表</span>
                        </div>
                        <!--输入框、下拉筛选-->
                        <div class="flex row w_100 header_item h_60px b_s pad_r_30 pad_l_30">
                            <div class="flex_1 b_s h_100 flex row">
                                <span class="font12">员工姓名：</span>
                                <el-input class="flex_1 inp"  v-model="keyword" placeholder="请输入姓名" clearable></el-input>
                            </div>
                            <div class="flex_1 mar_l_30 flex row" label="所属企业">
                                    <span class="font12">选择企业：</span>
                                    <el-select class="flex_1" remote :remote-method='search_company' v-model="company" filterable clearable placeholder="请选择所属企业">
                                        <el-option v-for="(item,index) in companyArr" :key="index" :label="item.realtitle" :value="item.id"></el-option>
                                    </el-select>
                            </div>
                            <div class="flex_1 b_s h_100 mar_l_30">
                                    <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff h_100" style="line-height:30px">查询</span>
                                    <span @click="sub(2)" class="f_l mar_l_30 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff h_100" style="line-height:30px">重置</span>
                                    <div class="clearfix"></div>
                            </div>
                            <div class="flex_1 b_s h_100 mar_l_30"></div>
                        </div>
                        <!--列表-->
                        <div class="flex_1 flex row">
                            <!--left-->
                            <div class="h_100 flex col" style="width:240px">
                                <div class="left_header flex row">
                                    <!--上传-->
                                    <div @click="do_down(0)" class="current flex_1 text_center font12 b_s top_btn top_btn01 pointer">上传</div>
                                    <!--发布-->
                                    <div @click="do_down(1)" :class="canSend==1?'current':''" class="flex_1 text_center font12 b_s top_btn top_btn02 pointer">发布</div>
                                    <!--下载-->
                                    <div @click="do_down(2)" class="flex_1 text_center font12 b_s top_btn top_btn03 pointer">下载</div>
                                </div>
                                <div class="flex_1 flex po_r scroll_bar" style="overflow: auto">
                                    <ul class="flex_1 left_boder w_100 po_b">
                                        <li class="flex row b_s pad_l_10 pad_r_10">
                                            <div class="flex_1 h_50px font15 b_s s_l text_left pointer">全部</div>
                                            <div class="flex_1 h_50px font15 b_s s_l text_right pointer" :title="totalmoney?totalmoney:0+'元'">{{totalmoney?totalmoney:0}}元</div>
                                        </li>
                                        <li v-for="(item,index) in list_left" :key="index" :class="index%2==0?'current':''" class="flex row b_s pad_l_10 pad_r_10">
                                            <div class="flex_1 h_50px font15 b_s s_l text_left pointer" :title="item.center_name?item.center_name:'--'">{{item.center_name?item.center_name:'--'}}</div>
                                            <div class="flex_1 h_50px font15 b_s s_l text_right pointer" :title="(item.totalmoney?item.totalmoney:'--')+'元'">{{item.totalmoney?item.totalmoney:'--'}}元</div>
                                        </li>
                                    </ul>
                                </div> 
                            </div>
                            <!--right-->
                            <div class="flex_1 h_100 list">
                                <ol class="list_header flex">
                                    <li class="h_50px pad_l_20 b_s s_l flex_1">工资月份</li>
                                    <li class="h_50px pad_l_20 b_s s_l flex_2">在职工厂</li>
                                    <li class="h_50px pad_l_20 b_s s_l flex_1">员工名称</li>
                                    <li class="h_50px pad_l_20 b_s s_l flex_1">工时</li>
                                    <li class="h_50px pad_l_20 b_s s_l flex_1">绩效单价</li>
                                    <li class="h_50px pad_l_20 b_s s_l flex_1">绩效总数</li>
                                    <li class="h_50px pad_l_20 b_s s_l flex_1">运营中心</li>
                                </ol>
                                <ul class="list_main">
                                    <li class="" v-for="(item,index) in list" :key="index">
                                        <ol class="flex" :class="index%2==1?'list_bg':''">
                                            <li class="h_50px pad_l_20 b_s s_l flex_1" :title="item.jxdate_month?item.jxdate_month:'--'">{{item.jxdate_month?item.jxdate_month:'--'}}</li>
                                            <li class="h_50px pad_l_20 b_s s_l flex_2" :title="item.companyname?item.companyname:'--'">{{item.companyname?item.companyname:'--'}}</li>
                                            <li class="h_50px pad_l_20 b_s s_l flex_1" :title="item.name?item.name:'--'">{{item.name?item.name:'--'}}</li>
                                            <li class="h_50px pad_l_20 b_s s_l flex_1" :title="item.workhours?item.workhours:0">{{item.workhours?item.workhours:0}}</li>
                                            <li class="h_50px pad_l_20 b_s s_l flex_1" :title="item.price?item.price:0+'元'">{{item.price?item.price:0}}元</li>
                                            <li class="h_50px pad_l_20 b_s s_l flex_1" :title="item.totalmoney?item.totalmoney:0+'元'">{{item.totalmoney?item.totalmoney:0}}元</li>
                                            <li class="h_50px pad_l_20 b_s s_l flex_1" :title="item.center?item.center:'--'">{{item.center?item.center:'--'}}</li>
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
                    <el-dialog title="上传" :visible.sync="show_flag" :closeOnClickModal='false' width="400px" >
                            <el-upload
                                class="upload-demo"
                                ref="upload"
                                accept=".xls,.xlsx"
                                :headers="{token:token}"
                                :action="up_host+'finance/uploadPreview'"
                                :data="{gz_date:(year+'-'+monthArr[monthIndex])}"
                                :on-success = "upSuccess"
                                :on-error = "upError"
                                :file-list="fileList"
                                :limit=1
                                name='file_content'
                                :auto-upload="false">
                                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确定上传</el-button>
                            </el-upload>
                    </el-dialog>
            </div>
        </div>
</template>

<script>
var THIS;
import botHeader from '../../components/bot-header/bot-header';
import tabCar from '../../components/list/tab-car.vue';
var THIS;
export default {
  components:{
      botHeader,
      tabCar
  },
  name: '',
  watch : {
        year(){
            this.type = 1;
            this.canSend = 2;
            this.getList();
        },
        monthIndex(){
            this.type = 1;
            this.canSend = 2;
            this.getList();
        }
  },
  data(){
      return {
            keydown_flag:true,
            type:1,         //1:正式表   2:预览表
            canSend:2,      //1:可以发布 2：不能发布
            token:window.localStorage.token?window.localStorage.token:'',
            up_host: window.localStorage.host,
            show_flag:false,
            year:'',
            yearArr:[],
            monthIndex:0,
            monthArr:['01','02','03','04','05','06','07','08','09','10','11','12'],
            page:1,
            count:10,
            total:0,
            keyword:'',
            companyArr:[],
            company:'',
            up_flag:false,
            send_flag:false,
            totalmoney:'',
            list_left:[],
            list:[],
            fileList:[]
      }
  },
  methods:{

        sub(type){
                this.page = 1;
                if(type==2){
                    this.keyword = '';
                    this.company = '';
                };
                this.getList();
        },

        getList(){
                var data = sign({
                    page:THIS.page,
                    count:THIS.count,
                    keyword:THIS.keyword,
                    type:THIS.type,
                    companyid:THIS.company,
                    jxdate:THIS.year+'-'+THIS.monthArr[THIS.monthIndex],
                });
                vue_Post(THIS,'finance/jixiaoList',data,callback,1,1,1,1);
                function callback(msg){
                    THIS.list = msg.list;
                    THIS.list_left = msg.center_list;
                    THIS.total = msg.total;
                    THIS.totalmoney = msg.total_jixiao;
                    if(THIS.type==2){//预览表
                        THIS.show_flag = false;
                        THIS.fileList = [];
                        THIS.canSend = 1;
                    }
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

        view(id){
            this.$router.replace('/home/financial/jxOne/jxDetail/'+id);
        },

        do_item(index){
            this.monthIndex = index;
        },

        search_company(msg){
                var THIS = this;
                var data = {
                    keyword:msg
                };
                vue_indexPost(THIS,'company/companySearchList',data,callback,0,0,0,0);
                function callback(msg){
                    THIS.companyArr = msg.list;
                }; 
        },

        kaipiao_info(){
            var THIS = this;
            var aa = THIS.year + '-'+THIS.monthArr[THIS.monthIndex];
            THIS.$router.replace('/home/financial/jxOne/jxKaipiao/'+aa);
        },

        do_down(type){
            if(type=='-1'){//下载样表
                var bb = window.localStorage.host+'finance/performanceExampleDownload?token='
                    +window.localStorage.token;
                window.location.href = bb;
            }else if(type==0){//上传
                THIS.show_flag = true;
            }else if(type==1){//发布
                if(THIS.canSend==1){
                    THIS.$confirm('确定发布吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }).then(() => {
                        THIS.sendFile();
                    }).catch(() => {});
                };
            }else if(type==2){//下载--绩效导出
                var bb = window.localStorage.host+'finance/performanceExport?token='
                    +window.localStorage.token
                    +'&jxdate='+THIS.year
                    +'&jxmonth='+THIS.monthArr[THIS.monthIndex]
                    +'&keyword='+THIS.keyword
                    +'&companyid='+THIS.company;
                window.location.href = bb;
            };
        },

        submitUpload() {
            THIS.$refs.upload.submit();
        },

        upSuccess(event, file, fileList){
            if(file.response.code==1){
                THIS.$message({
                    type: 'success',
                    message: '上传成功!',
                    dangerouslyUseHTMLString:true
                });
                THIS.close02();
                THIS.type = 2;
                THIS.getList();
            }else{
                THIS.upError();
            }
        },

        upError(){
                THIS.$message({
                    type: 'error',
                    message: '上传失败，请检查文件类型!',
                    dangerouslyUseHTMLString:true
                });
                THIS.fileList = [];
        },

        sendFile(){
            vue_Post(THIS,'finance/performanceRelease',{},callback,1,1,1,1);
            function callback(msg){
                THIS.type = 1;
                THIS.getList();
                THIS.$message({
                    type: 'success',
                    message: '发布成功!',
                    dangerouslyUseHTMLString:true
                });
            }; 
        },

        close02(){
            THIS.fileList = [];
            THIS.show_flag = false;
        },

  },
   mounted(){
       
        THIS = this;
        THIS.store.commit('setPageText','当前位置：财务 / 绩效列表');
        THIS.search_company('');
        var date = new Date();
        var y = parseInt(date.getFullYear());
        THIS.year = y;
        THIS.monthIndex = date.getMonth();
        for(let i=2015;i<=y;i++){
            THIS.yearArr.push(i);
        };
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
    .list_header.current li,.list_main ol.current li{
        width: 11%;
    }
    .selete_time{
        width: 120px;
    }
    .month_item{
        width: 50px;
        margin: 0 4px;
        font-size: 14px;
    }
    .month_item.current{
        color: #007DF1;
    }
    .yangbiao{
        padding: 5px 10px;
        background: #007DF1;
        color: #fff;
        border-radius: 3px;
        font-size: 14px;
    }
    .left_header{
        height: 50px;
        background: #278AFF;
    }
    .top_btn{
        padding-top: 30px;
        color: #074c9d;
        background: no-repeat center 10px /16px;
    }
    .top_btn01{
        background-image: url(../../../assets/images/financial/fdown01.png);
    }
    .top_btn02{
        background-image: url(../../../assets/images/financial/fdown02.png);
    }
    .top_btn01.current{
        color: #fff;
        background-image: url(../../../assets/images/financial/fdown01s.png);
    }
    .top_btn02.current{
        color: #fff;
        background-image: url(../../../assets/images/financial/fdown02s.png);
    }
    .top_btn03{
        color: #fff;
        background-image: url(../../../assets/images/financial/fdown04.png);
    }
    .left_boder li{
        height: 50px;
    }
    .left_boder li.current{
        background-color: #f1f8ff;
    }
    .left_boder li >div{
        height: 50px;
        line-height: 50px;
    }
</style>
