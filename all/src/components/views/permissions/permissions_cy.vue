<template>
        <div class="views pad_l_50 pad_r_50 b_s mr_color01">
          <div class="bg_fff">
                <bot-header></bot-header>
                <div class="views_100ch_1">
                    <!--顶部选项-->
                    <div class="pad_l_30 pad_r_30 w_100 header_item h_60px b_s font14">成员列表</div>
                    <!--输入框、下拉筛选-->
                    <div class="flex row w_100 header_item h_60px b_s pad_r_30 pad_l_30">
                        <div class="flex_1 b_s h_100 flex row">
                            <span class="font12">成员姓名：</span>
                            <el-input class="flex_1 inp"  v-model="keyword" placeholder="请输入成员姓名" clearable></el-input>
                            <div class="clearfix"></div>
                        </div>
                        <div class="flex_1 b_s h_100 flex row mar_l_30">
                                <span class="font12">选择角色：</span>
                                <el-select class="flex_1" v-model="jsid" filterable clearable remote :remote-method='getJsArr' placeholder="请选择角色">
                                    <el-option v-for="(item,index) in jsArr" :key="index"  :label="item.position_name" :value="item.position_id"></el-option>
                                </el-select>
                        </div>
                        <div class="flex_1 b_s h_100 mar_l_30">
                                <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff" style="line-height:36px">查询</span>
                                <span @click="sub(2)" class="f_l mar_l_30 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff" style="line-height:36px">重置</span>
                                <div class="clearfix"></div>
                        </div>
                        <div class="flex_1 b_s h_100 mar_l_30"></div>
                    </div>
                    <!--创建-->
                    <div v-show="permissions['admin.addadmin']==1" class="w_100 header_item h_60px b_s font14">
                        <span @click="edit_js('-1')" class="f_l search_btn search_btn01 3_btn b_s pad_r_20 pointer bg_blue co_fff">创建</span>
                        <div class="clearfix"></div>
                    </div>
                    <!--列表-->
                    <div class="list">
                        <ol class="list_header">
                            <li class="h_50px pad_l_20 b_s f_l" style="width:7%">ID</li>
                            <li class="h_50px pad_l_20 b_s f_l">成员姓名</li>
                            <li class="h_50px pad_l_20 b_s f_l">登录账号</li>
                            <li class="h_50px pad_l_20 b_s f_l">所属角色</li>
                            <li class="h_50px pad_l_20 b_s f_l">添加时间</li>
                            <li class="h_50px pad_l_20 b_s f_l">最近登录时间</li>
                            <li class="h_50px pad_l_20 b_s f_l" style="width:13%">操作</li>
                            <div class="clearfix"></div>
                        </ol>
                        <ul class="list_main">
                            <li class="" v-for="(item,index) in list" :key="index">
                                <ol :class="index%2==1?'list_bg':''">
                                    <li class="f_l pad_l_20 b_s" style="width:7%">{{item.uid}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.name?item.name:'--'">{{item.name?item.name:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.phone?item.phone:'--'">{{item.phone?item.phone:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.position_name?item.position_name:'--'">{{item.position_name?item.position_name:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.create_time?item.create_time:'--'">{{item.create_time?item.create_time:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.last_login?item.last_login:'--'">{{item.last_login?item.last_login:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s flex row" style="width:13%">
                                        <span v-show="permissions['admin.addadmin']==1" class="edit_button flex_1" @click="edit_js(item.uid)">编辑</span>
                                        <span v-show="permissions['admin.deladmin']==1" class="edit_button flex_1 list_co02" @click="deletes(item.uid)">删除</span>
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
                <el-dialog title="添加成员"  :before-close='close' :closeOnClickModal='false' :visible.sync="show_flag" width="480px" >
                      <div class="content alert_gj">
                          <el-form ref="ruleForm" label-width="80px" :model="ruleForm" :rules="rules">
                              <div class="flex col">
                                  <el-form-item class="w_100" label="成员姓名" prop="name">
                                      <el-input v-model="ruleForm.name" placeholder="请输入成员姓名"></el-input>
                                  </el-form-item>
                                  <el-form-item class="w_100" label="登录账号" prop="account">
                                      <el-input v-model="ruleForm.account" placeholder="请输入手机号"></el-input>
                                  </el-form-item>
                                  <el-form-item class="w_100" label="所属角色" prop="juese">
                                      <el-select class="w_100" v-model="ruleForm.juese" multiple remote :remote-method='search_getJsArr' placeholder="请选择所属角色">
                                            <el-option v-for="(item,index) in jueseArr" :key="index" :label="item.name" :value="item.id"></el-option>
                                      </el-select>
                                  </el-form-item>
                                  <el-form-item class="w_100" label="登录密码">
                                      <el-input v-model="ruleForm.password" placeholder="请输入密码(不修改密码可不填)"></el-input>
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
  name: 'zhuchangList',
  data(){
      return {
          keydown_flag:true,
          permissions:'',
          page:1,
          count:10,
          total:0,
          keyword:'',
          jsid:'',
          jsArr:[],
          list:[],
          show_flag:false,
          jueseArr:[],
          ruleForm:{
              name:'',
              account:'',
              juese:[],
              password:''
          },
          rules:{
              name:[{ required: true, message: '请输入成员姓名', trigger: 'blur' }],
              juese:[{ required: true, message: '请选择角色', trigger: 'blur' }],
              account:[{ required: true, message: '请输入登录账号', trigger: 'blur' }]
          }
      }
  },
  methods:{


        sub(type){
                this.page = 1;
                if(type==2){
                    this.keyword = '';
                    this.jsid = '';
                };
                this.getList();
        },

        getList(){
                var THIS = this;
                var data = sign({
                    page:THIS.page,
                    count:THIS.count,
                    keyword:THIS.keyword,
                    position_id:THIS.jsid
                });
                vue_Post(THIS,'admin/adminList',data,callback,1,1,0,1);
                function callback(msg){
                    THIS.total = msg.total;
                    THIS.list = msg.list;
                    for(let i=0;i<THIS.list.length;i++){
                        THIS.list[i].status = THIS.list[i].status==1?true:false;
                    };
                }; 
        },

        getJsArr(keyword){
                var THIS = this;
                var data = sign({
                    page:THIS.page,
                    count:THIS.count,
                    keyword:keyword
                });
                vue_Post(THIS,'admin/position',data,callback,1,1,0,0);
                function callback(msg){
                    THIS.jsArr = [];
                    for(let i=0;i<msg.list.length;i++){
                        THIS.jsArr.push({position_name:msg.list[i].position_name,position_id:msg.list[i].position_id});
                    };
                }; 
        },

        search_getJsArr(keyword){
                var THIS = this;
                var data = sign({
                    page:THIS.page,
                    count:THIS.count,
                    keyword:keyword
                });
                vue_Post(THIS,'admin/position',data,callback,1,1,0,0);
                function callback(msg){
                    THIS.jueseArr = [];
                    for(let i=0;i<msg.list.length;i++){
                        THIS.jueseArr.push({position_name:msg.list[i].position_name,position_id:msg.list[i].position_id});
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

        view(type,id){
          if(type==1){
              this.$router.replace('/home/zhuchang/zhuchangOne/zhuchangDatile/'+id);
          }else if(type==2){
              this.$router.replace('/home/zhuchang/zhuchangCreate/'+id);
          };
        },

        down(type){
                var THIS = this;
                if(type==1){
                    THIS.$router.replace(THIS.downobj.addLink);
                }
        },

        deletes(id){
                var THIS = this;
                THIS.$confirm('确定删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    THIS.deleteFunc(id);
                }).catch(() => {});
        },

        deleteFunc(id){
                var THIS = this;
                var data = sign({
                    uid:id
                });
                vue_Post(THIS,'admin/delAdmin',data,callback,1,1,0,1);
                function callback(msg){
                    THIS.getList();
                    THIS.$message({
                        type: 'success',
                        message: '删除成功!',
                        dangerouslyUseHTMLString:true
                    });
                }; 
        },

        edit_js(id){
            var THIS = this;
            THIS.show_flag = true;
            if(id!='-1'){
                THIS.id = id;
                THIS.get_detail();
            };
        },

        get_detail(){
            var THIS = this;
            var data = sign({
                uid:THIS.id?THIS.id:''
            });
            vue_Post(THIS,'admin/adminInfo',data,callback,0,0,0,1);
            function callback(msg){
                //详情
                if(THIS.id){
                    THIS.ruleForm = {
                        name:msg.info.name,
                        account:msg.info.phone,
                        juese:msg.info.position_ids,
                        password:''
                    };
                }else{
                    //列表
                    THIS.jueseArr = [];
                    for(let i=0;i<msg.list.length;i++){
                        THIS.jueseArr.push({name:msg.list[i].position_name,id:msg.list[i].position_id})
                    };
                    THIS.ruleForm = {
                        name:'',
                        account:'',
                        juese:[],
                        password:''
                    };
                };
            }; 
        },

        gj_btnClikc(type){
            if(type==1){
                this.show_flag = false;
                this.ruleForm = {name:'',account:'',juese:[],password:''};
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

        close(){
              this.show_flag = false;
              this.ruleForm = {name:'',account:'',juese:[],password:''};
              this.$refs['ruleForm'].resetFields();
        },

        submit_from(){
            var THIS = this;
            var data = sign({
                uid:THIS.id?THIS.id:'',
                username:THIS.ruleForm.name,
                account:THIS.ruleForm.account,
                position_ids:JSON.stringify(THIS.ruleForm.juese),
                password:THIS.ruleForm.password
            });
            vue_Post(THIS,'admin/addAdmin',data,callback,1,1,1,1);
            function callback(msg){
                THIS.getList();
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


  },
   mounted(){
        THIS = this;
        THIS.permissions = JSON.parse(window.localStorage.permissions);
        THIS.store.commit('setPageText','当前位置：驻厂 / 驻厂列表');
        THIS.getList();
        THIS.getJsArr('');
        THIS.get_detail();
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
    .zc_img{
        width:40px;
        height:40px;
        border-radius: 50%;
        overflow: hidden;
        margin: 5px 0;
        background: url(../../../assets/images/moren01.png) no-repeat center /100%;
    }
</style>
