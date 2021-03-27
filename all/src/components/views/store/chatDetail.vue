<template>


            <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
                <div class="bg_fff">
                    <bot-header :link='link'></bot-header>
                    <div class="views_100ch_1 pad_all_30">
                        <div class="ct_title flex row j_between">
                                <span>{{tname}}({{list.length?list.length:0}})</span>
                                <div v-show="permissions['center.addteammembers']==1" class="base_btn_co01 pointer" @click="add_em('-1')">
                                    <span style=" font-size:20px;line-height:26px;">+</span>添加群成员
                                </div>
                        </div>
                        <div class="flex col mar_t_30">
                            <ol class="w_100 row flex h_50px line_50px li_bg">
                                <li class="flex_1 pad_l_30">群成员</li>     
                                <li class="flex_1 pad_l_30">联系电话</li>
                                <li class="flex_1 pad_l_30">成员身份</li>
                                <li class="flex_1 pad_l_30">操作</li>
                            </ol>
                            <ul class="w_100">
                                <li class="w_100">
                                    <ol class="row flex h_50px line_50px list_item"  v-for="(item,index) in list" :key="index">
                                        <li class="flex_1 pad_l_30" :class="index%2==1?'li_bg':''">{{item.name?item.name:'--'}}</li>
                                        <li class="flex_1 pad_l_30" :class="index%2==1?'li_bg':''">{{item.phone?item.phone:'--'}}</li>
                                        <li class="flex_1 pad_l_30" :class="index%2==1?item.class+' li_bg':item.class">{{item.role_type_name?item.role_type_name:'--'}}</li>
                                        <li v-if="item.role_type!=1" class="flex_1 pad_l_30 pointer" :class="index%2==1?'li_bg':''" >
                                            <span v-show="permissions['center.setmanager']==1" class="base_btn_co01 mar_r_30" @click="set_type(item.uid,item.role_type)">{{item.role_type==2?'移除管理员':'设为管理员'}}</span>
                                            <span v-show="permissions['center.delmember']==1" class="base_btn_co02" @click="deletes(item.uid)">移出群聊</span>
                                        </li>
                                        <li v-else class="flex_1 pad_l_30"></li>
                                    </ol>
                                </li>
                            </ul>
                        </div>
                        <p class="font14 text_center list_co0" style="line-height:50px" v-if="list.length==0">无人员数据</p>
                    </div>
                </div>
                <el-dialog title="添加成员"  :before-close='close' :closeOnClickModal='false' :visible.sync="show_flag" width="480px" >
                      <div class="content alert_gj">
                          <el-form ref="ruleForm" label-width="80px" :model="ruleForm" :rules="rules">
                              <div class="flex col">
                                    <el-form-item class="w_100" label="选择账号" prop="account">
                                        <el-select class="w_100" v-model="ruleForm.account" remote :remote-method='search_account' filterable  placeholder="请选择账号" clearable>
                                            <el-option v-for="(item,index) in accountArr" :key="index" :label="item.lable" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item class="w_100" label="成员身份" prop="type">
                                        <el-radio-group  v-model="ruleForm.type" prop="type">
                                            <el-radio :label="3">普通成员</el-radio>
                                            <el-radio :label="2">群管理员</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                              </div>
                          </el-form>
                      </div>
                      <span slot="footer" class="w_100 dialog-footer">
                          <el-button @click="gj_btnClikc(1)">取 消</el-button>
                          <el-button @click="gj_btnClikc(2)" type="primary">确 定</el-button>
                      </span>
                </el-dialog>
            </div>
  
</template>

<script>
var THIS;
import botHeader from '../../components/bot-header/bot-header';
export default {
    components:{
        botHeader
    },
    name: '',
    data(){
        return {
            show_flag:false,
            permissions:'',
            id:'',
            tname:'',
            ywyid:'',
            type:'',
            link:'/home/store/storeTwo/chatList',
            list:[],
            msg:{},
            accountArr:[],
            ruleForm:{
                account:'',
                type:''
            },
            rules:{
                account:[{ required: true, message: '请选择成员账号', trigger: [] }],
                type:[{ required: true, message: '请选择群成员身份', trigger: [] }]
            },
            isBack:true
        }
    },
    methods:{
        
            get_detail(){
                    var data = {
                        id:THIS.id
                    };
                    vue_Post(THIS,'center/detailsTeam',data,callback,1,1,1,0);
                    function callback(msg){
                        THIS.msg = msg.info;
                        THIS.list = msg.list;
                        THIS.tname = msg.tname;
                        THIS.list.map(item=>{
                            item.class = item.role_type==1?'list_co03':(item.role_type==2?'list_co05':'list_co01');
                        });
                    }; 
            },

            deletes(id){
                THIS.$confirm('确定移除群聊吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                }).then(() => {
                    THIS.deletesFunc(id);
                }).catch(() => {});
            },

            deletesFunc(id){
                var data = { 
                    member:id ,
                    id:THIS.id
                };
                vue_Post(THIS,'center/delMember',data,callback,1,1,1,1);
                function callback(msg){
                        THIS.$message({
                            type: 'success',
                            message: '操作成功!',
                            dangerouslyUseHTMLString:true
                        });
                        THIS.get_detail();
                }; 
            },

            close(){
                this.show_flag = false;
                this.ruleForm = {name:'',phone:'',juese:[],password:''};
                this.$refs['ruleForm'].resetFields();
            },

            gj_btnClikc(type){
                if(type==1){
                    THIS.show_flag = false;
                    THIS.ruleForm = {phone:'',type:''};
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
                    id:THIS.id,
                    member:THIS.ruleForm.account,
                    role_type:THIS.ruleForm.type
                });
                vue_Post(THIS,'center/addTeamMembers',data,callback,1,1,1,0);
                function callback(msg){
                    THIS.get_detail();
                    THIS.$message({
                        type: 'success',
                        message: '添加成功!',
                        dangerouslyUseHTMLString:true
                    });
                    THIS.show_flag = false;
                    THIS.ruleForm = {phone:'',type:''};
                    THIS.$refs['ruleForm'].resetFields();
                }; 
            },

            set_type(id,type){
                let text = type==2?'确定移除群管理员吗？':'确定设为群管理员吗？';
                THIS.$confirm(text, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                }).then(() => {
                    THIS.set_typeFunc(id,type);
                }).catch(() => {});
            },

            set_typeFunc(id,type){
                var data = { 
                    member:id,
                    id:THIS.id,
                    type:type==2?3:2
                };
                vue_Post(THIS,'center/setManager',data,callback,1,1,1,0);
                function callback(msg){
                        THIS.$message({
                            type: 'success',
                            message: '操作成功!',
                            dangerouslyUseHTMLString:true
                        });
                        THIS.get_detail();
                }; 
            },

            add_em(id){
                THIS.show_flag = true;
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


    },
    mounted(){
            THIS = this;
            THIS.store.commit('setPageText','当前位置：门店 / 群聊详情');
            THIS.permissions = JSON.parse(window.localStorage.permissions);
            THIS.id = THIS.$route.params.id;
            THIS.type = THIS.$route.params.type;
            THIS.get_detail();
            THIS.search_account('');

    }
}
</script>

<style scoped>

</style>
