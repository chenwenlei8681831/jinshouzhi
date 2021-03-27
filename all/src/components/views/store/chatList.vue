<template>

          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
                <div class="bg_fff">
                    <bot-header></bot-header>
                    <div class="views_100ch_1">
                        <!--输入框、下拉筛选-->
                        <div class="flex row w_100 header_item h_60px b_s pad_r_30 pad_l_30">
                                <div class="flex_1 b_s h_100 flex row">
                                    <span class="font12">群聊名称：</span>
                                    <el-input class="flex_1 inp"  v-model="name" placeholder="请输入群聊名称" clearable></el-input>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="flex_1 b_s h_100 flex row mar_l_30">
                                    <span class="font12">成员联系电话：</span>
                                    <el-input class="flex_1 inp"  v-model="phone" placeholder="请输入成员联系电话" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" clearable></el-input>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="flex_1 b_s h_100 mar_l_30">
                                        <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff" style="line-height:36px">查询</span>
                                        <span @click="sub(2)" class="f_l mar_l_30 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff" style="line-height:36px">重置</span>
                                        <div class="clearfix"></div>
                                </div>
                                <div class="flex_1 b_s h_100 flex row"></div>
                        </div>
                        <!--下载、上传-->
                        <div v-show="permissions['center.addteam']==1" class="w_100 header_item h_60px b_s font14">
                            <span @click="add_em('-1')" class="f_l search_btn search_btn01 3_btn b_s pad_r_20 pointer bg_blue co_fff">创建</span>
                            <div class="clearfix"></div>
                        </div>
                        <!--列表-->
                        <div class="list">
                            <ol class="list_header">
                                <li class="h_50px pad_l_20 b_s f_l" style="width:7%">ID</li>
                                <li class="h_50px pad_l_20 b_s f_l">群聊名称</li>
                                <li class="h_50px pad_l_20 b_s f_l">群管理员</li>
                                <li class="h_50px pad_l_20 b_s f_l">联系电话</li>
                                <li class="h_50px pad_l_20 b_s f_l pointer" @click="paixu">群人数<span class="paixu" :class="paixuIndex==0?'':(paixuIndex==1?'current01':'current02')"></span></li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:21%">操作</li>
                                <div class="clearfix"></div>
                            </ol>
                            <ul class="list_main">
                                <li @click.stop="view(item.id)" v-for="(item,index) in list" :key="index">
                                    <ol :class="index%2==1?'list_bg':''">
                                        <li class="f_l pad_l_20 b_s" style="width:7%">{{item.id}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.tname?item.tname:'--'">{{item.tname?item.tname:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.name?item.name:'--'">{{item.name?item.name:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.phone?item.phone:'--'">{{item.phone?item.phone:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.num_1?item.num_1:'0'">{{item.num_1?item.num_1:'0'}}人</li>
                                        <li class="f_l pad_l_20 b_s flex row" style="width:21%">
                                            <span v-show="permissions['center.addteam']==1" class="edit_button flex_1" @click.stop="add_em(item.id)">编辑</span>
                                            <span v-show="permissions['center.detailsteam']==1" class="edit_button flex_1" @click.stop="view(item.id)">查看</span>
                                            <span v-show="permissions['center.removetram']==1" class="edit_button flex_2 list_co02" @click.stop="deletes(item.id)">解散群组</span>
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
                <el-dialog title="创建群聊" :before-close='close' :closeOnClickModal='false' :visible.sync="show_flag" width="480px" >
                    <div class="content alert_gj">
                        <el-form ref="ruleForm" label-width="80px" :model="ruleForm" :rules="rules">
                            <div class="flex col">
                                <el-form-item class="w_100" label="运营中心" prop="center">
                                    <el-select class="w_100" v-model="ruleForm.center" remote :remote-method='search_center' filterable  placeholder="请选择所属运营中心" clearable>
                                        <el-option v-for="(item,index) in center_Arr" :key="index" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="w_100" label="群名称" prop="name">
                                    <el-input clearable v-model="ruleForm.name" placeholder="请输入群名称"></el-input>
                                </el-form-item>
                                <el-form-item class="w_100" label="群成员" prop="yewuyuan">
                                    <el-select class="w_100" v-model="ruleForm.yewuyuan" multiple filterable placeholder="请选择群成员" clearable>
                                        <el-option v-for="(item,index) in ywy_Arr" :key="index" :label="item.yewuyuan_name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="w_100" label="选择群主" prop="admin">
                                    <el-select class="w_100" v-model="ruleForm.admin" remote :remote-method='search_account' filterable  placeholder="请选择群主" clearable>
                                        <el-option v-for="(item,index) in accountArr" :key="index" :label="item.lable" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <span slot="footer" class="w_100 dialog-footer">
                        <el-button @click="gj_btnClikc(1)">取 消</el-button>
                        <el-button @click="gj_btnClikc(2)" type="primary">确 定</el-button>
                    </span>
                </el-dialog>
                <el-dialog title="修改群名称" :before-close='edit_close' :closeOnClickModal='false' :visible.sync="edit_show_flag" width="480px" >
                    <div class="content alert_gj">
                        <el-form ref="edit_ruleForm" label-width="80px" :model="edit_ruleForm" :rules="edit_rules">
                            <div class="flex col">
                                <el-form-item class="w_100" label="群名称" prop="name">
                                    <el-input clearable v-model="edit_ruleForm.edit_name" placeholder="请输入群名称"></el-input>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                    <span slot="footer" class="w_100 dialog-footer">
                        <el-button @click="edit_btnClikc(1)">取 消</el-button>
                        <el-button @click="edit_btnClikc(2)" type="primary">确 定</el-button>
                    </span>
                </el-dialog>
          </div>
  
</template>

<script>
var THIS;
import botHeader from '../../components/bot-header/bot-header';
var THIS;
export default {
    components:{ 
      botHeader 
    },
    name: 'chatList',
    computed: {
        watchCenter() {
            return this.ruleForm.center;
        },
    },
    watch: {
        watchCenter() {
            this.ruleForm.name = this.ruleForm.center?this.ruleForm.center.split(' : ')[1]:'';
            this.get_ywy();
        }
    },
    data(){
        return {
                keydown_flag:true,
                id:'',
                permissions:'',
                page:1,
                count:10,
                total:0,
                name:'',
                phone:'',
                list:[],
                paixuIndex:0,         //0:正常  1：升序  2：降序
                show_flag:false,
                center_Arr:[],
                ywy_Arr:[],
                accountArr:[],
                ruleForm:{
                    center:'',
                    yewuyuan:'',
                    admin:'',
                    name:''
                },
                rules:{
                    center:[{ required: true, message: '请选择所属运营中心', trigger: [] }],
                    yewuyuan:[{ required: true, message: '请选择运营中心负责人', trigger: [] }],
                    admin:[{ required: true, message: '请选择群主', trigger: [] }],
                    name:[{ required: true, message: '请输入群名称', trigger: [] }],
                },
                edit_show_flag:false,
                edit_ruleForm:{
                    edit_name:''
                },
                edit_rules:{
                    edit_name:[{ required: true, message: '请输入群名称', trigger: [] }],
                },
        }
    },
    methods:{

            view(id){
                if(THIS.permissions['center.detailsteam']!=1){
                    return false;
                };
                THIS.$router.replace('/home/store/storeTwo/chatDetail/'+id);
            },

            sub(type){
                THIS.page = 1;
                if(type==2){
                    THIS.name = '';
                    THIS.phone = [];
                };
                THIS.getList();
            },

            getList(){
                var data = sign({
                    page:THIS.page,
                    count:THIS.count,
                    keyword:THIS.name,
                    phone:THIS.phone,
                    desc:THIS.paixuIndex==1?'ASC':(THIS.paixuIndex==2?'DESC':'')
                });
                vue_Post(THIS,'center/listTeam',data,callback,1,1,0,1);
                function callback(msg){
                    THIS.total = msg.total;
                    THIS.list = msg.list;
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

            deletes(id){
                THIS.$confirm('确定解散群聊吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                }).then(() => {
                    THIS.deletesFunc(id);
                }).catch(() => {});
            },

            deletesFunc(id){
                var data = { 
                    id:id
                };
                vue_Post(THIS,'center/removeTram',data,callback,1,1,1,1);
                function callback(msg){
                        THIS.$message({
                            type: 'success',
                            message: '解散成功!',
                            dangerouslyUseHTMLString:true
                        });
                        THIS.getList();
                }; 
            },

            add_em(id){
                if(id!='-1'){
                    THIS.edit_show_flag = true;
                    THIS.get_chat_detail(id);
                }else{
                    THIS.show_flag = true;
                };
            },

            add(){
                window.localStorage.beforNavIndex = THIS.tabIndex;
                THIS.$router.push(THIS.downobj.addLink);
            },

            paixu(){
                //正常=>升序=>降序=>正常
                if(THIS.paixuIndex==0){
                    THIS.paixuIndex = 1
                }else if(THIS.paixuIndex==1){
                    THIS.paixuIndex = 2
                }else if(THIS.paixuIndex==2){
                    THIS.paixuIndex = 0
                };
                THIS.getList();
            },

            close(){
                THIS.show_flag = false;
                THIS.ruleForm = {name:'',center:'',yewuyuan:'',admin:''};
                THIS.$refs['ruleForm'].resetFields();
            },

            get_chat_detail(id){
                THIS.id = id;
                var data = sign({
                    id : id
                });
                vue_Post(THIS,'center/detailsTeam',data,callback,1,1,1,1);
                function callback(msg){
                    THIS.edit_ruleForm = {
                        edit_name:msg.tname
                    };
                }; 
            },

            gj_btnClikc(type){
                if(type==1){
                    THIS.show_flag = false;
                    THIS.ruleForm = {name:'',phone:'',juese:[],password:''};
                    THIS.$refs['ruleForm'].resetFields();
                }else if(type==2){
                    THIS.$refs['ruleForm'].validate((valid) => {
                        if (valid) {
                            THIS.submit_from();
                        } else {
                            THIS.$message({
                                type: 'warning',
                                message: '请将必填项完善后再提交',
                                dangerouslyUseHTMLString:true
                            });
                            return false;
                        }
                    });
                };
            },

            submit_from(){
                var data = sign({
                    tname : THIS.ruleForm.name,
                    members: JSON.stringify(THIS.ruleForm.yewuyuan),
                    centerid: THIS.ruleForm.center?THIS.ruleForm.center.split(' : ')[0]:'',
                    uid : THIS.ruleForm.admin,
                });
                vue_Post(THIS,'center/addTeam',data,callback,1,1,1,1);
                function callback(msg){
                    THIS.$message({
                        type: 'success',
                        message: '操作成功!',
                        dangerouslyUseHTMLString:true
                    });
                    THIS.close();
                    THIS.getList();
                }; 
            },

            search_center(msg){
                    var data = {
                        keyword:msg
                    };
                    vue_indexPost(THIS,'center/centerSearchList',data,callback,0,0,0,0);
                    function callback(msg){
                        THIS.center_Arr = msg.list;
                        THIS.center_Arr.map(item=>{
                            item.label  = item.center_name;
                            item.value = item.id+' : '+item.center_name;
                        })
                    };
            },

            get_ywy(){
                if(THIS.ruleForm.center){
                    var data = {
                        centerid:THIS.ruleForm.center?THIS.ruleForm.center.split(' : ')[0]:'',
                        rule_auth:1,
                        page:1,
                        count:100
                    };
                    vue_indexPost(THIS,'center/centerAccountSearchList',data,callback,1,0,1,0);
                    function callback(msg){
                        THIS.ywy_Arr = [];
                        THIS.ruleForm.yewuyuan = '';
                        THIS.ywy_Arr = msg.list;
                    }
                }else{
                    THIS.ruleForm.yewuyuan = '';
                    THIS.ywy_Arr = [];
                };
            },

            search_account(msg){
                var data = {
                    keyword:msg
                };
                vue_indexPost(THIS,'index/getAccidList',data,callback,0,0,0,0);
                function callback(msg){
                    THIS.accountArr = msg.list;
                    THIS.accountArr.map(item=>{
                        item.lable = item.username+' : '+item.phone;
                        item.value = item.uid;
                    });
                };
            },

            edit_btnClikc(type){
                if(type==1){
                    THIS.edit_show_flag = false;
                    THIS.edit_ruleForm = { edit_name:'' };
                    THIS.$refs['edit_ruleForm'].resetFields();
                }else if(type==2){
                    THIS.$refs['edit_ruleForm'].validate((valid) => {
                        if (valid) {
                            THIS.edit_submit_from();
                        } else {
                            THIS.$message({
                                type: 'warning',
                                message: '请将必填项完善后再提交',
                                dangerouslyUseHTMLString:true
                            });
                            return false;
                        }
                    });
                };
            },

            edit_close(){
                THIS.edit_show_flag = false;
                THIS.edit_ruleForm = { edit_name:'' };
                THIS.$refs['edit_ruleForm'].resetFields();
            },

            edit_submit_from(){
                var data = sign({
                    id:THIS.id,
                    tname : THIS.edit_ruleForm.edit_name
                });
                vue_Post(THIS,'center/addTeam',data,callback,1,1,1,1);
                function callback(msg){
                    THIS.$message({
                        type: 'success',
                        message: '操作成功!',
                        dangerouslyUseHTMLString:true
                    });
                    THIS.edit_close();
                    THIS.getList();
                }; 
            },
        

    },
    mounted(){
        THIS = this;
        THIS.store.commit('setPageText','当前位置：门店 / 群聊列表');
        THIS.permissions = JSON.parse(window.localStorage.permissions);
        THIS.getList();
        THIS.search_center('');
        THIS.search_account('');
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
        width: 18%;
    }
</style>
