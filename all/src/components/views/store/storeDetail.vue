<template>


            <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
                <div class="bg_fff">
                    <bot-header :link='link'></bot-header>
                    <div class="views_100ch_1 pad_all_30">
                        <div class="ct_title">基本信息</div>
                        <div class="flex row b_line mar_t_30 baseInfo pad_b_20">
                            <div class="flex_1 flex col" style="height:240px">
                                <div class="top h_40px pad_l_50 line_40px mar_b_20">{{msg.center_name?msg.center_name:'--'}}</div>
                                <div class="flex_1 flex row">
                                    <img class="img d_block h_100" v-if="msg.img" style="width:180px;height:180px;" :src="msg.img" alt="">
                                    <div class="img d_block h_100" v-else></div>
                                    <div class="flex_1 flex col pad_l_20">
                                        <div class="flex_1 font14"><span style="color:#8C8C8C;">ID：</span>{{msg.id}}</div>
                                        <div class="flex_1 font14"><span style="color:#8C8C8C;">负责人：</span>{{msg.leader}}</div>
                                        <div class="flex_1 font14"><span style="color:#8C8C8C;">结算比例：</span>{{msg.jiesuanbili?msg.jiesuanbili:1}}(默认为1)</div>
                                        <div class="flex_1 font14"><span style="color:#8C8C8C;">公司对接人：</span>{{msg.contacter}}</div>
                                        <div class="flex_1 font14"><span style="color:#8C8C8C;">创建时间：</span>{{msg.create?msg.create:'--'}}</div>
                                        <div class="flex_1 font14"><span style="color:#8C8C8C;">状态：</span><span :class="msg.status==1?'list_co01':'list_co02'">{{msg.status==1?'正在运营':'已冻结'}}</span></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex_1 flex col" style="height:240px">
                                <div class="top h_40px mar_b_20"></div>
                                <div class="flex_1 flex col pad_l_20">
                                    <div class="flex_1 font14"><span style="color:#8C8C8C;">运营中心类型：</span>{{msg.qudao_name}}</div>
                                    <div class="flex_1 font14"><span style="color:#8C8C8C;">负责人电话：</span>{{msg.leaderphone}} </div>
                                    <div class="flex_1 font14"><span style="color:#8C8C8C;">所属分公司：</span>{{msg.branch_title}}</div>
                                    <div class="flex_1 font14"><span style="color:#8C8C8C;">所在地区：</span>{{msg.address}}</div>
                                    <div class="flex_1 font14 s_l"><span style="color:#8C8C8C;line-height:20px;">详细地址：</span>{{msg.xx_address?msg.xx_address:'--'}}</div>
                                    <div class="flex_1 font14"></div>
                                </div>
                            </div>
                            <div class="flex_1 flex col" style="height:240px">
                                <div class="b_s mar_b_20" style="height:40px;padding:4px; ">
                                    <span v-show="permissions['center.lock']==1" class="f_r d_block base_btn base_btn_co02 pointer font14 mar_l_20" @click="dongjie()">{{type==0?'解冻':'冻结'}}</span>
                                    <span v-show="permissions['center.add']==1" class="f_r d_block base_btn base_btn_co01 pointer font14" @click="edit()">编辑</span>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="flex_1 flex row">
                                    <div class="flex col flex_1 text_center"></div>
                                    <div class="flex col text_center" style="width:90px;">
                                        <div @click="to_employees" class="flex_1 pointer">在职员工</div>
                                        <div @click="to_employees" class="flex_1 pointer" style="font-weight:bold;color:#F7A54D;">{{msg.zaizhi_yuangong_total?msg.zaizhi_yuangong_total:0}}人</div>
                                        <div class="flex_1"></div>
                                        <div class="flex_1"></div>
                                    </div>
                                    <div class="flex col text_center" style="width:90px;">
                                        <div class="flex_1">录入员工</div>
                                        <div class="flex_1" style="font-weight:bold;color:#068778;">{{msg.num_hired?msg.num_hired:0}}人</div>
                                        <div class="flex_1"></div>
                                        <div class="flex_1"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ct_title mar_t_30">收款信息</div>
                        <div class="flex row b_line mar_t_30 pad_b_20 shoukuan">
                            <div class="flex_2  h_60px flex pad_r_20 pointer">
                                <span class="">收款单位: </span>{{msg.jiesuan_danwei?msg.jiesuan_danwei:'未完善'}}
                            </div>
                            <div class="flex_2  h_60px flex pad_r_20 pointer">
                                <span class="">开户行: </span>{{msg.khh?msg.khh:'未完善'}}
                            </div>
                            <div class="flex_1  h_60px flex pad_r_20 pointer">
                                <span class="">法人: </span>{{msg.faren?msg.faren:'未完善'}}
                            </div>
                            <div class="flex_2  h_60px flex pad_r_20 pointer">
                                <span class="">账号: </span>{{msg.jxh_name?msg.jxh_name:'未完善'}}
                            </div>
                        </div>
                        <div class="ct_title mar_t_30 flex row j_between">
                                <span>运营人员({{msg.center_yewuyuan_total?msg.center_yewuyuan_total:0}})</span>
                                <div class="base_btn_co01 pointer" v-show="permissions['center.edit']==1" @click="add_em('-1')">
                                    <span style=" font-size:20px;line-height:26px;">+</span>添加运营人员
                                </div>
                        </div>
                        <div class="flex col mar_t_30">
                            <ol class="w_100 row flex h_50px line_50px li_bg">
                                <li class="flex_1 pad_l_30">姓名</li>
                                <li class="flex_1 pad_l_30">手机号码</li>
                                <li class="flex_1 pad_l_30">角色</li>
                                <li class="flex_1 pad_l_30">操作</li>
                            </ol>
                            <ul class="w_100">
                                <li class="w_100">
                                    <ol class="row flex h_50px line_50px list_item"  v-for="(item,index) in list" :key="index">
                                            <li class="flex_1 pad_l_30" :class="index%2==1?'li_bg':''">{{item.username?item.username:'--'}}</li>
                                            <li class="flex_1 pad_l_30" :class="index%2==1?'li_bg':''">{{item.phone?item.phone:'--'}}</li>
                                            <li class="flex_1 pad_l_30" :class="index%2==1?'li_bg':''">{{item.rule_auth?item.rule_auth:'--'}}</li>
                                            <li class="flex_1 pad_l_30 pointer" :class="index%2==1?'li_bg':''" >
                                                <span v-show="permissions['center.resetpassword']==1" class="base_btn_co01 mar_r_30" @click="setting_password(item.id)">重置密码</span>
                                                <span v-show="permissions['center.edit']==1" class="base_btn_co01 mar_r_30" @click="add_em(item.id)">编辑</span>
                                                <span v-show="permissions['center.delete']==1" class="base_btn_co02" @click="deletes(item.id)">删除</span>
                                            </li>
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
                                    <el-form-item class="w_100" label="成员姓名" prop="name">
                                        <el-input v-model="ruleForm.name" clearable placeholder="请输入成员姓名"></el-input>
                                    </el-form-item>
                                    <el-form-item class="flex_1" label="选择角色" prop="juese">
                                        <el-select class="w_100" v-model="ruleForm.juese" clearable filterable  placeholder="请选择角色">
                                            <el-option label='业务员' :value="0"></el-option>
                                            <el-option label='管理员' :value="1"></el-option>
                                            <el-option label='工头' :value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item class="w_100" label="手机号码" prop="phone">
                                        <el-input maxlength="11" oninput="value=value.replace(/[^\d]/g,'')" clearable v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>
                                    </el-form-item>
                                    <el-form-item class="w_100" label="登录密码">
                                        <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
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
                id:'',
                permissions:'',
                ywyid:'',
                type:'',
                link:'/home/store/storeOne/storeList',
                list:[],
                msg:{},
                ruleForm:{
                    name:'',
                    juese:'',
                    phone:'',
                    password:''
                },
                rules:{
                    name:[{ required: true, message: '请输入姓名', trigger: [] }],
                    phone:[{ required: true, message: '请输入手机号', trigger: [] }],
                    juese:[{ required: true, message: '请选择角色', trigger: [] }]
                },
                isBack:true
        }
    },
    methods:{
        
            get_detail(){
                    var data = {
                        centerid:THIS.id
                    };
                    vue_Post(THIS,'center/details',data,callback,1,1,1,1);
                    function callback(msg){
                        THIS.msg = msg.info;
                        THIS.msg.center_yewuyuan_total = msg.center_yewuyuan_total;
                        THIS.msg.img = msg.info.center_path.length>0?msg.info.center_path[0].path:'';
                        THIS.list = msg.center_yewuyuan_list;
                    }; 
            },

            dongjie(){
                THIS.$confirm('确定操作吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    THIS.dongjieFunc(status);
                }).catch(() => {});
            },

            dongjieFunc(){
                    var data = sign({
                        centerid:THIS.id,
                        status:THIS.type==0?1:0
                    });
                    vue_Post(THIS,'center/lock',data,callback,1,1,1,1);
                    function callback(msg){
                        THIS.isBack = false;
                        THIS.$message({
                            type: 'success',
                            message: '操作成功!',
                            dangerouslyUseHTMLString:true
                        });
                    }; 
            },

            edit(){
                this.$router.replace('/home/store/storeOne/storeEdit/'+this.id);
            },

            setting_password(id){
                THIS.$confirm('重置后密码会以短信的形式发给对方，确定重置吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    THIS.set_Func(id);
                }).catch(() => {});
            },

            set_Func(id){
                var data = { uid:id };
                vue_Post(THIS,'center/resetPassword',data,callback,1,1,1,1);
                function callback(msg){
                        THIS.$message({
                            type: 'success',
                            message: '操作成功!',
                            dangerouslyUseHTMLString:true
                        });
                }; 
            },

            deletes(id){
                THIS.$confirm('确定删除吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                }).then(() => {
                    THIS.deletesFunc(id);
                }).catch(() => {});
            },

            deletesFunc(id){
                var data = { id:id ,centerid:THIS.id};
                vue_Post(THIS,'center/delete',data,callback,1,1,1,1);
                function callback(msg){
                        THIS.$message({
                            type: 'success',
                            message: '操作成功!',
                            dangerouslyUseHTMLString:true
                        });
                        THIS.get_detail();
                }; 
            },

            get_ywy_detail(){
                    var data = {
                        id:THIS.ywyid
                    };
                    vue_Post(THIS,'center/yewuyuanDetails',data,callback,1,1,1,1);
                    function callback(msg){
                        THIS.ruleForm = {
                            name:msg.username,
                            juese:parseInt(msg.rule_auth),
                            phone:msg.phone,
                            password:''
                        };
                    }; 
            },

            //添加运营人员
            add_em(id){
                THIS.show_flag = true;
                THIS.ywyid = '';
                if(id!='-1'){
                    THIS.ywyid = id;
                    THIS.get_ywy_detail();
                };
            },

            close(){
                this.show_flag = false;
                this.ruleForm = {name:'',phone:'',juese:[],password:''};
                this.$refs['ruleForm'].resetFields();
            },

            gj_btnClikc(type){
                if(type==1){
                    this.show_flag = false;
                    this.ruleForm = {name:'',phone:'',juese:[],password:''};
                    this.$refs['ruleForm'].resetFields();
                }else if(type==2){
                    var THIS = this;
                    this.$refs['ruleForm'].validate((valid) => {
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
                    id:THIS.ywyid?THIS.ywyid:'',
                    centerid:THIS.id,
                    username:THIS.ruleForm.name,
                    phone:THIS.ruleForm.phone,
                    auth:THIS.ruleForm.juese,
                    password:THIS.ruleForm.password
                });
                vue_Post(THIS,'center/edit',data,callback,1,1,1,1);
                function callback(msg){
                    THIS.get_detail();
                    THIS.$message({
                        type: 'success',
                        message: '操作成功!',
                        dangerouslyUseHTMLString:true
                    });
                    THIS.show_flag = false;
                    THIS.ruleForm = {name:'',account:'',juese:[],password:''};
                    THIS.$refs['ruleForm'].resetFields();
                }; 
            },

            to_employees(){
                window.localStorage.beforNavIndex = 2;
                THIS.store.commit('setNavIndex',4);
                THIS.$router.push('/home/employees/employeesOne/employeesList/'+THIS.msg.center_name+'/'+THIS.id);
            }


    },
    mounted(){
            THIS = this;
            THIS.store.commit('setPageText','当前位置：门店 / 运营中心详情');
            THIS.id = THIS.$route.params.id;
            THIS.type = THIS.$route.params.type;
            THIS.permissions = JSON.parse(window.localStorage.permissions);
            THIS.get_detail();

    },
    beforeDestroy(){
        this.store.commit('setPageText','当前位置：门店 / 运营中心列表');
    },
    beforeRouteLeave(to, from, next){//删除：清除缓存页面缓存  返回：缓存上一页面
            if(!this.isBack){
                to.meta.keepAlive = false; 
            }else{
                to.meta.keepAlive = true; 
            }
            next();
    }
}
</script>

<style scoped>
   .shoukuan{
       color: #262626;
   } 
   .shoukuan span{
       color: #8C8C8C;
   }
   .li_bg{
       background:rgba(250,250,250,1);
   }
   .baseInfo >div:nth-child(1) .top{
       background: url(../../../assets/images/stor.png) no-repeat left center /22px;
   }
   .base_btn{
       width: 70px;
       height: 30px;
       line-height: 30px;
       text-align: center;
       border-radius: 3px;
       border: 1px solid;
   }
   .base_btn_co01{
       color: #007DF2;
       border-color: #007DF2;
   }
   .base_btn_co02{
       color: #F4514A;
       border-color: #F4514A;
   }
   div.img{
       width:180px;
       height:180px;
       overflow: hidden;
       background: url(../../../assets/images/moren.png) no-repeat center /100% 100%;
   }
</style>
