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
                            <span @click="do_down()" class="flex yangbiao b_s pointer text_height_center">下载样表</span>
                        </div>
                        <!--输入框、下拉筛选-->
                        <div class="flex row w_100 header_item h_60px b_s pad_r_30 pad_l_30">
                            <div class="flex_1 flex row" label="所属企业">
                                    <span class="font12">选择企业：</span>
                                    <el-select class="flex_1" remote :remote-method='search_company' v-model="company" filterable clearable placeholder="请选择所属企业">
                                        <el-option v-for="(item,index) in companyArr" :key="index" :label="item.realtitle" :value="item.id"></el-option>
                                    </el-select>
                            </div>
                            <div class="flex_1 mar_l_30 flex row" label="所属企业">
                                    <span class="font12">结算单位：</span>
                                    <el-select class="flex_1" v-model="danwei" filterable clearable placeholder="请选择结算单位">
                                        <el-option v-for="(item,index) in danweiArr" :key="index" :label="item.danwei" :value="item.id"></el-option>
                                    </el-select>
                            </div>
                            <div class="flex_1 b_s h_100 mar_l_30">
                                    <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff h_100" style="line-height:30px">查询</span>
                                    <span @click="sub(2)" class="f_l mar_l_30 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff h_100" style="line-height:30px">重置</span>
                                    <div class="clearfix"></div>
                            </div>
                            <div class="flex_1 b_s h_100 mar_l_30"></div>
                        </div>
                        <!--上传工资结算表-->
                        <div class="w_100 header_item h_60px b_s font14">
                            <span @click="up_load" class="search_btn up_load 3_btn b_s pad_r_20 pointer all_line f_l do_btn font14">上传工资结算表</span>
                            <div class="clearfix"></div>
                        </div>
                        <!--列表-->
                        <div class="flex_1 flex row">
                            <div class="flex_1 h_100 list">
                                <ol class="list_header">
                                <li class="h_50px pad_l_20 b_s f_l" style="width:5%">ID</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:8%;">工资月份</li>
                                <li class="h_50px pad_l_20 b_s f_l">企业名称</li>
                                <li class="h_50px pad_l_20 b_s f_l">结算单位</li>
                                <li class="h_50px pad_l_20 b_s f_l">更新时间</li>
                                <li class="h_50px pad_l_20 b_s f_l">员工总数</li>
                                <li class="h_50px pad_l_20 b_s f_l">总金额(元)</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:8%;">状态</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:16%;">表格下载</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:13%">操作</li>
                                <div class="clearfix"></div>
                                </ol>
                                <ul class="list_main">
                                    <li class="" v-for="(item,index) in list" :key="index">
                                        <ol :class="index%2==1?'list_bg':''">
                                            <li @click="choose(index)" class="f_l pad_l_20 b_s" style="width:5%">{{item.id}}</li>
                                            <li class="f_l pad_l_20 b_s" style="width:8%;" :title="item.year+'-'+item.month">{{item.year+'-'+item.month}}</li>
                                            <li class="f_l pad_l_20 b_s" :title="item.companyname?item.companyname:'--'">{{item.companyname?item.companyname:'--'}}</li>
                                            <li class="f_l pad_l_20 b_s" :title="item.kpdw_info?item.kpdw_info:'--'">{{item.kpdw_info?item.kpdw_info:'--'}}</li>
                                            <li class="f_l pad_l_20 b_s" :title="item.createat?item.createat:'--'">{{item.createat?item.createat:'--'}}</li>
                                            <li class="f_l pad_l_20 b_s flex col">
                                                <div class="flex_1 font13 h_5">原表：{{item.total_count?item.total_count:0}}</div>
                                                <div class="flex_1 font13 h_5 cor03">核对：{{item.system_total_count?item.system_total_count:0}}</div>
                                            </li>
                                            <li class="f_l pad_l_20 b_s flex col">
                                                <div class="flex_1 font13 h_5">原表：{{item.total_money?item.total_money:0}}</div>
                                                <div class="flex_1 font13 h_5 cor03">核对：{{item.system_total_money?item.system_total_money:0}}</div>
                                            </li>
                                            <li class="f_l pad_l_20 b_s" style="width:8%;" :class="item.jiesuan_status==0?'cor02':'cor01'" :title="item.jiesuan_status==0?'异常':(item.jiesuan_status==1?'正常':(item.jiesuan_status==2?'驻厂已定稿':'工资单已定稿'))" @click="yichang(item.jiesuan_status,item.problem,item.id)">{{item.jiesuan_status==0?'异常':(item.jiesuan_status==1?'正常':(item.jiesuan_status==2?'驻厂已定稿':'工资单已定稿'))}}</li>
                                            <li class="f_l flex pad_l_20 b_s" style="width:16%;">
                                                <!--异常-->
                                                <div v-if="item.jiesuan_status==0" class="flex row worp j_between a_center flex_1">
                                                    <span @click="down_load(0,item.id)" class="w_45 down_btn font13">初表</span>
                                                </div>
                                                <!--正常-->
                                                <div v-else class="flex row worp j_between flex_1">
                                                    <span @click="down_load(0,item.id)" class="w_45 mar_t_3 down_btn font13">初表</span>
                                                    <span @click="down_load(1,item.id)" class="w_45 mar_t_3 down_btn font13">绩效表</span>
                                                    <span @click="down_load(2,item.id)" class="w_45 mar_t_3 down_btn font13">工资表</span>
                                                    <span @click="down_load(3,item.id)" class="w_45 mar_t_3 down_btn font13">驻厂管理费</span>
                                                </div>      
                                            </li>
                                            <li class="f_l pad_l_20 b_s" style="width:13%;" :class="item.tag_show?'show':''">
                                                <span v-if="item.jiesuan_status==0" class="cor04 font13 " @click="fuhe(item.id)">复核</span>
                                                <span v-if="(item.jiesuan_status==1)" class="cor05 font13 ">等待驻厂定稿</span>
                                                <span v-if="(item.jiesuan_status==2)" @click="dinggao(item.id)" class=" font13 cor04">定稿</span>
                                                <div v-if="(item.jiesuan_status==3)" class="cor04 font13 dinggao_tag b_s font15" @click="choose_tag(index)">
                                                    {{(item.isfafang==0?'未回款未发放':(item.isfafang==1?'已回款未发放':(item.isfafang==2?'已回款已发放':'未回款已垫付')))}}<span class="sjx d_l_block"></span>
                                                    <div class="tag_item bg_fff flex col">
                                                        <span @click="cli_space(0)" class="flex_1 font14 text_height_line_center h_2_5">未回款未发放</span>
                                                        <span @click="cli_space(1)" class="flex_1 font14 text_height_line_center h_2_5">已回款未发放</span>
                                                        <span @click="cli_space(3)" class="flex_1 font14 text_height_line_center h_2_5">未回款已垫付</span>
                                                        <span @click="cli_space(2)" class="flex_1 font14 text_height_line_center h_2_5">已回款已发放</span>
                                                    </div>
                                                </div>
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
                    <div class="space w_100 h_100" v-show="index_show" @click="cli_space('-1')"></div>
                    <el-dialog title="上传工资结算表"  :before-close='close02'  :visible.sync="show_flag" :closeOnClickModal='false' width="400px" >
                            <el-form :model="up_ruleForm" label-width="100px" :rules="up_rules" label-position='left' ref="up_ruleForm" class="demo-ruleForm">
                                    <el-form-item label="选择企业" prop="company">
                                            <el-select class="flex_1" style="width: 100%;" v-model="up_ruleForm.company" @change='change_company' clearable filterable  remote :remote-method='up_search_company' placeholder="企业名称">
                                                <el-option v-for="(item,index) in up_companyArr" :key="index" :label="item.realtitle" :value="item.id"></el-option>
                                            </el-select>
                                    </el-form-item>
                                    <el-form-item label="公式名称">
                                        <el-input class="flex_1" v-model="up_ruleForm.gs_name" placeholder="公式名称" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="公式内容">
                                        <el-input class="flex_1" v-model="up_ruleForm.gs_content" placeholder="公式内容" clearable></el-input>
                                    </el-form-item>
                                    <p class="font13 cor04 mar_b_10">标准公式样例 E:E = A:A * B:B + C:C - D:D</p>
                                    <el-form-item class="w_100 mar_b_10" label="工资时间" prop="timer">
                                        <el-date-picker
                                            style="width: 100%;"
                                            v-model="up_ruleForm.timer"
                                            value-format="yyyy-MM"
                                            type="month"
                                            placeholder="工资时间">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="初始结算表" prop="file">
                                        <div class="up_box flex row pad_l_10 b_s font14 list_co07 s_l" style="width: 100%;">
                                            <span class="b_s s_l file_name_text" :class="up_ruleForm.file_name?'list_co05':''">{{up_ruleForm.file_name?up_ruleForm.file_name:'请上传初始结算表'}}</span>
                                            <span @click="clear_file" v-show="up_ruleForm.file_name" class="clear_file pointer"></span>
                                            <el-upload
                                                class="upload-demo"
                                                ref="upload"
                                                accept=".xls,.xlsx"
                                                :headers="{token:token}"
                                                :action="up_host+'jiesuan/preUpload'"
                                                :on-success = "upSuccess"
                                                :on-error = "upError"
                                                :file-list="fileList"
                                                :show-file-list = "false"
                                                :limit=1
                                                name='file'>
                                                <el-button class="el_button" slot="trigger" size="small" type="primary"></el-button>
                                            </el-upload>
                                        </div>
                                    </el-form-item>
                                    <div class="h_40px flex row b_s j_between" style="padding-left:60px;padding-right:60px;">
                                        <span @click="from_btn(0)" class="up_btn up_btn01 font14 text_height_center pointer">取消上传</span>
                                        <span @click="from_btn(1)" class="up_btn up_btn02 font14 text_height_center pointer">确认上传</span>
                                    </div> 
                            </el-form>
                    </el-dialog>
                    <el-dialog title="异常列表"  :visible.sync="show_flag02" :closeOnClickModal='false' width="600px" >
                            <ul class="yc_content mar_b_20 views_100ch_1">
                                <li v-for="(v_item,v_index) in yc_list" :key="v_index" class="w_100 flex row j_between font14 b_line mar_b_10 b_s pad_r_10">
                                    <p class="flex_1 mar_r_30 font14"><span>{{v_item.content}}</span><span class="list_co02">{{v_item.pro_info?('  (异常员工名单：'+v_item.pro_info+')'):''}}</span></p> <span class="list_co05">所属角色 : {{v_item.username}}</span>
                                </li>
                            </ul>
                            <div class="h_40px flex row b_s j_between" style="padding-left:150px;padding-right:150px;">
                                <span @click="yc_btn(0)" class="up_btn up_btn01 font14 text_height_center pointer">关闭</span>
                                <span @click="yc_btn(1)" class="up_btn up_btn02 font14 text_height_center pointer">发送异常通知</span>
                            </div>
                    </el-dialog>
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
        },
        fileList(value){
            console.log('文件',value);
        }
  },
  data(){
      return {
            keydown_flag:true,
            id:'',
            type:1,                 //1:正式表   2:预览表
            canSend:2,              //1:可以发布 2：不能发布
            token:window.localStorage.token?window.localStorage.token:'',
            up_host: window.localStorage.host,
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
            danweiArr:[],
            danwei:'',
            up_flag:false,
            send_flag:false,
            totalmoney:'',
            list_left:[],
            list:[],
            fileList:[],
            index:0,             //标记选择的项
            index_show:false,
            show_flag:false,
            show_flag02:false,   //异常
            //上传工资结算表
            up_companyArr:[],
            yc_list:[],
            up_ruleForm:{
                company:'',
                gs_name:'',
                gs_content:'',
                timer:'',
                file:'',
                file_name:''
            },
            up_rules:{
                company:[{ required: true, message: '企业必选', trigger: [] }],
                gs_name:[{ required: true, message: '名称必选', trigger: [] }],
                gs_content:[{ required: true, message: '内容必填', trigger: [] }],
                timer:[{ required: true, message: '工资时间必选', trigger: [] }],
                file:[{ required: true, message: '结算表必传', trigger: [] }],
                js_type:[{ required: true, message: '结算类型', trigger: [] }]
            },
            
      }
  },
  methods:{

        sub(type){
                THIS.page = 1;
                if(type==2){
                    THIS.keyword = '';
                    THIS.company = '';
                };
                THIS.getList();
        },

        getList(){
                var data = sign({
                    page:THIS.page,
                    count:THIS.count,
                    kpdw_id:THIS.danwei,
                    companyid:THIS.company,
                    year:THIS.year,
                    month:THIS.monthArr[THIS.monthIndex],

                });
                vue_Post(THIS,'jiesuan/jiesuan_list',data,callback,1,1,1,0);
                function callback(msg){
                    THIS.list = msg.list;
                    for(let i=0;i<THIS.list.length;i++){
                        THIS.list[i].tag_show = false;
                    };
                    THIS.total = msg.total;
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
            THIS.$router.replace('/home/financial/jxOne/jxDetail/'+id);
        },

        close02(){
            THIS.show_flag = false;
            THIS.$refs['up_ruleForm'].resetFields(); 
            THIS.up_ruleForm = {
                company:'',
                gs_id:'',
                gs_name:'',
                gs_content:'',
                timer:'',
                file:'',
                file_name:''
            };
            THIS.fileList = [];
        },

        do_item(index){
            THIS.monthIndex = index;
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

        //获取企业列表
        up_search_company(msg){
                var data = {
                    keyword:msg
                };
                vue_indexPost(THIS,'company/companySearchList',data,callback,0,0,0,0);
                function callback(msg){
                    THIS.up_companyArr = msg.list;
                }; 
        },

        //获取结算单位
        get_danwei(){
                vue_commonPost(THIS,'site/getSiteInfo',{name:'kaipiao_info'},callback,0,0,0,0);
                function callback(msg){
                    THIS.danweiArr = msg[0].kaipiao_info;
                }; 
        },

        up_load(){
            THIS.show_flag = true;
        },

        submitUpload() {
            this.$refs.upload.submit();
        },

        handleSuccess(){
            this.type = 2;
            this.getList();
        },

        //发布
        sendFile(){
            vue_Post(THIS,'finance/saveToJixiao',{},callback,1,1,1,1);
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

        //选择标签
        choose_tag(index){
            THIS.index = index;
            THIS.id = THIS.list[index].id;
            THIS.list[index].tag_show = true;
            THIS.index_show = true;
            var aa = THIS.list;
            THIS.list = [];
            THIS.list = aa;
        },

        cli_space(type){
            THIS.index_show = false;
            THIS.list[THIS.index].tag_show = false;
            if(type!='-1'){
                THIS.set_tag(type);
            };
        },

        set_tag(status){
            var data = {
                id  : THIS.id,
                status : status
            }
            vue_Post(THIS,'jiesuan/jiesuan_fafang_status',data,callback,1,1,1,0);
            function callback(msg){
                THIS.getList();
                THIS.index_show = false;
                THIS.$message({
                    type: 'success',
                    message: '标记成功!',
                    dangerouslyUseHTMLString:true
                });
            }; 
        },

        down_load(index,id){
            var url = '';
            if(index==0){//初表
                url = 'jiesuan/chubiaoExport';
            }else if(index==1){//绩效表
                url = 'jiesuan/jixiaoExport';
            }else if(index==2){//工资表
                url = 'jiesuan/gongziExport';
            }else if(index==3){//驻厂管理费
                url = 'jiesuan/zhuchangManageExport';
            };
            var bb = window.localStorage.host+url+'?token='
                    +window.localStorage.token
                    +'&id='+id;
            window.location.href = bb;
        },

        upSuccess(event, file, fileList){
            if(file.response.code==1){
                THIS.$message({
                    type: 'success',
                    message: '上传成功!',
                    dangerouslyUseHTMLString:true
                });
                THIS.up_ruleForm.file = JSON.stringify(file.response.data.file);
                THIS.up_ruleForm.file_name = file.name;
            }else{
                THIS.upError();
            };
        },

        upError(){
                THIS.$message({
                    type: 'error',
                    message: '上传失败，请检查文件类型!',
                    dangerouslyUseHTMLString:true
                });
                THIS.fileList = [];
        },

        //查看异常
        yichang(status,msg,id){
            if(status==0){
                THIS.show_flag02 = true;
                THIS.yc_list = msg;
                for(let i=0;i<THIS.yc_list.length;i++){
                    THIS.yc_list[i].pro_info = THIS.yc_list[i].pro_info?THIS.yc_list[i].pro_info.join('、'):'';
                };
                THIS.id = id;
            };
        },

        //操作异常窗口按钮
        yc_btn(type){
            if(type==0){
                THIS.show_flag02 = false;
            }else if(type==1){
                THIS.send_tz(THIS.id);
            };
        },

        //发送异常通知
        send_tz(){
            var data = {
                id  : THIS.id
            };
            vue_Post(THIS,'jiesuan/sendNotifyMsg',data,callback,1,1,1,0);
            function callback(msg){
                THIS.$message({
                    type: 'success',
                    message: '发送通知成功!',
                    dangerouslyUseHTMLString:true
                });
            }; 
        },

        //复核
        fuhe(id){
            THIS.$confirm('确定复核吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                var data = {
                    id  : id
                };
                vue_Post(THIS,'jiesuan/re_check',data,callback,1,1,1,0);
                function callback(msg){
                    THIS.$message({
                        type: 'success',
                        message: '复核成功!',
                        dangerouslyUseHTMLString:true
                    });
                    THIS.getList();
                }; 
            }).catch(() => {});
        },

        from_btn(type){
            if(type==0){
                THIS.close02();
            }else if(type==1){
                THIS.$refs['up_ruleForm'].validate((valid) => {
                    if (valid) {
                        THIS.submit_func();
                    } else {
                        THIS.$message({
                            type: 'warning',
                            message: '请将必填项完善后再提交',
                            dangerouslyUseHTMLString:true
                        });
                        return false;
                    }
                })
            }
        },

        //提交
        submit_func(){
                var data = {
                    year  : THIS.up_ruleForm.timer.split('-')[0],
                    month  : THIS.up_ruleForm.timer.split('-')[1],
                    companyid  : THIS.up_ruleForm.company,
                    gongshi  : THIS.up_ruleForm.gs_content,
                    file  : THIS.up_ruleForm.file,
                    force  : 1
                };
                vue_Post(THIS,'jiesuan/uploadjiesuan',data,callback,1,1,1,0);
                function callback(msg){
                    THIS.$message({
                        type: 'success',
                        message: '提交成功!',
                        dangerouslyUseHTMLString:true
                    });
                    THIS.year = THIS.up_ruleForm.timer.split('-')[0];
                    for(let i=0;i<THIS.monthArr.length;i++){
                        if(THIS.monthArr[i] ==  THIS.up_ruleForm.timer.split('-')[1]){
                            THIS.monthIndex = i;
                        };
                    };
                    THIS.close02();
                    THIS.getList();
                }; 
        },

        change_company(res){
            THIS.get_gs(res);
        },

        //获取公式
        get_gs(id){
                var data = {
                    companyid  : id,
                    page : 1,
                    count : 20
                };
                vue_Post(THIS,'jiesuan/gongshi_list',data,callback,1,1,1,0);
                function callback(msg){
                    var data = msg.list;
                    if(data.length>0){
                        THIS.up_ruleForm.gs_name = data[0].name;
                        THIS.up_ruleForm.gs_content = data[0].gongshi;
                    };
                }; 
        },

        //定稿
        dinggao(id){
            THIS.$confirm('确定定稿吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                var data = {
                    id  : id
                };
                vue_Post(THIS,'jiesuan/jiesuan_dinggao',data,callback,1,1,1,0);
                function callback(msg){
                    THIS.$message({
                        type: 'success',
                        message: '定稿成功!',
                        dangerouslyUseHTMLString:true
                    });
                    THIS.getList();
                }; 
            }).catch(() => {});
        },

        do_down(){
            var bb = window.localStorage.host+'finance/jeisuanTempExport?token='
                + window.localStorage.token;
            window.location.href = bb;
        },

        clear_file(){
            THIS.fileList = [];
            THIS.up_ruleForm.file_name = '';
        }
     

  },
   mounted(){
       
        THIS = this;
        THIS.store.commit('setPageText','当前位置：财务 / 绩效列表');
        THIS.search_company('');
        THIS.up_search_company('');
        THIS.get_danwei();
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
        width: 10%;
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
    .cor01{
        color: #48C322;
    }
    .cor02{
        color: #F4514A;
        text-decoration: underline;
    }
    .cor03{
        color: #FF931F;
    }
    .cor04{
        color: #007DF2;
    }
    .cor05{
        color: #8C8C8C;
    }
    .h_5{
        height: 25px;
        line-height: 25px;
    }
    .dinggao_tag{
        height: 50px;
        position: relative;
    }
    .sjx{
        width: 18px;
        height: 18px;
        margin-left: 5px;
        vertical-align: middle;
        background: url(../../../assets/images/sjx.png) no-repeat center /18px;
    }
    .tag_item{
        width: 90%;
        height: 136px;
        position: absolute; top: 50px; left: 0;
        z-index: 9999;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        border: 1px solid #E4E7ED;
        overflow: visible;
    }
    .h_2_5{
        height: 34px;
        line-height: 34px;
        color: #606266;
        padding-left: 5px;
    }
    .h_2_5:hover{
        background-color: #F5F7FA;
    }
    .show{
        overflow: visible!important;
    }
    .space{
        position: fixed; top: 0; left: 0;
        z-index: 999;
    }
    .down_btn{
        text-align: center;
        line-height: 22px;
        height: 22px;
        border-radius: 3px;
        background: rgba(0, 125, 242, 0.1);
        color: #007DF2;
    }
    .mar_t_3{
        margin-top: 3px;
    }
    .up_load{
        color: #fff;
        background: url(../../../assets/images/upload01.png) no-repeat left 10px center /16px;
        background-color: #007DF2;
    }
    .mar_b_0{
        margin-bottom: 0!important;
    }
    .el-form .el-form-item__content{
        width: calc(100% - 100px)!important;
    }
    .file_name_text{
        display: block;
        line-height: 32px;
        overflow: hidden;
        white-space: nowrap;
        width: 190px!important;
    }
    .up_box{
        height: 32px;
        position: relative;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        padding-right: 40px;
    }
    .el_button{
        position:absolute; top: 1px; right: 0;
        display: block;
        width: 40px;
        height: 30px;
        background: url(../../../assets/images/upload02.png) no-repeat center /60%;
        background-color: #E5F2FE;
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
    .yc_content{
        height: 300px;
        overflow: auto;
    }
    .yc_content li{
        line-height: 30px;
    }
    .upload-demo{
        position:absolute; top: -1px; right: 0;
        display: block;
        width: 40px;
        height: 32px;
        background-color: #E5F2FE;
    }
    .yangbiao{
        padding: 5px 10px;
        background: #007DF1;
        color: #fff;
        border-radius: 3px;
        font-size: 14px;
    }
    .clear_file{
        width: 24px;
        background: url(../../../assets/images/delete.png) no-repeat center /18px;
    }
</style>
