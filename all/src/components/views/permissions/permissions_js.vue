<template>
        <div class="views pad_l_50 pad_r_50 b_s mr_color01">
          <div class="bg_fff">
                <bot-header></bot-header>
                <div class="views_100ch_1">
                    <!--顶部选项-->
                    <div class="pad_l_30 pad_r_30 w_100 header_item h_60px b_s font14">
                            角色列表
                    </div>
                    <!--下载、上传-->
                    <div v-show="permissions['admin.addposition']==1" class="w_100 header_item h_60px b_s font14 pad_l_30">
                        <span @click="edit_js('-1')" class="f_l search_btn search_btn01 3_btn b_s pad_r_20 pointer bg_blue co_fff">创建</span>
                        <div class="clearfix"></div>
                    </div>
                    <!--列表-->
                    <div class="list">
                        <ol class="list_header">
                            <li class="h_50px pad_l_20 b_s f_l" style="width:7%">ID</li>
                            <li class="h_50px pad_l_20 b_s f_l">角色名称</li>
                            <li class="h_50px pad_l_20 b_s f_l">角色身份</li>
                            <li class="h_50px pad_l_20 b_s f_l">职能描述</li>
                            <li class="h_50px pad_l_20 b_s f_l">所属分公司</li>
                            <li class="h_50px pad_l_20 b_s f_l">添加时间</li>
                            <li class="h_50px pad_l_20 b_s f_l" style="width:18%">操作</li>
                            <div class="clearfix"></div>
                        </ol>
                        <ul class="list_main">
                            <li class="" v-for="(item,index) in list" :key="index">
                                <ol :class="index%2==1?'list_bg':''">
                                    <li class="f_l pad_l_20 b_s" style="width:7%">{{item.position_id}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.position_name?item.position_name:'--'">{{item.position_name?item.position_name:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :class="item.rule_auth==0?'color_ss':'list_co03 '" :title="item.rule_auth==0?'员工':'管理员'">{{item.rule_auth==0?'员工':'管理员'}}</li>
                                    <li class="f_l pad_l_20 b_s" :class="item.position_describe?item.position_describe:'--'">{{item.position_describe?item.position_describe:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :class="item.branch_name?item.branch_name:'--'">{{item.branch_name?item.branch_name:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.add_time?item.add_time:'--'">{{item.add_time?item.add_time:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s flex row" style="width:18%">
                                        <span v-show="permissions['admin.positionaccess']==1" class="edit_button flex_2" @click="setting(item.position_id)">权限设置</span>
                                        <span v-show="permissions['admin.addposition']==1" class="edit_button flex_1" @click="edit_js(index)">编辑</span>
                                        <span v-show="permissions['admin.delposition']==1" class="edit_button flex_1 list_co02" @click="deletes(item.position_id)">删除</span>
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
          <el-dialog title="创建角色" :before-close='close'  :visible.sync="show_flag" width="440px" >
                <div class="content alert_gj">
                    <el-form ref="ruleForm" label-width="80px" :model="ruleForm" :rules="rules">
                        <div class="flex col">
                            <el-form-item class="w_100" label="角色名称" prop="name">
                                <el-input v-model="ruleForm.name" placeholder="请输入角色名称"></el-input>
                            </el-form-item>
                            <el-form-item class="w_100"  label="身份" prop="shenfen">
                                <el-radio-group  v-model="ruleForm.shenfen">
                                    <el-radio :label="1">管理员</el-radio>
                                    <el-radio :label="0">员工</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item class="w_100" label="职能描述" prop="miaoshu">
                                <el-input type="textarea" v-model="ruleForm.miaoshu" placeholder="请输入职能描述"></el-input>
                            </el-form-item>
                            <el-form-item class="w_100" label="分公司">
                                <el-select class="w_100" v-model="ruleForm.company" placeholder="请选择所属分公司">
                                  <el-option v-for="(item,index) in fen_company" :key="index" :label="item.title" :value="item.id"></el-option>
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
        </div>
</template>

<script>
var THIS;
import botHeader from '../../components/bot-header/bot-header';
import tabCar from '../../components/list/tab-car.vue';
import downLoad from '../../components/list/down-load.vue';
export default {
  components:{
      botHeader,
      tabCar,
      downLoad
  },
  name: 'permissions_js',
  data(){
      return {
          id:'',
          permissions:'',
          page:1,
          count:10,
          total:0,
          list:[],
          show_flag:false,
          fen_company:[],
          ruleForm:{
              name:'',
              shenfen:'',
              miaoshu:'',
              company:''
          },
          rules:{
              name:[{ required: true, message: '请输入角色名称', trigger: [] }],
              shenfen:[{ required: true, message: '请选择身份', trigger: [] }],
              miaoshu:[{ required: true, message: '请输入职位描述', trigger: [] }],
          }
      }
  },
  methods:{

      getList(){
            var THIS = this;
            var data = sign({
                page:THIS.page,
                count:THIS.count
            });
            vue_Post(THIS,'admin/position',data,callback,1,1,0,1);
            function callback(msg){
                THIS.total = msg.total;
                THIS.list = msg.list;
            }; 
      },

      get_detail(){
            var THIS = this;
            var data = sign({
                page:THIS.page,
                count:THIS.count
            });
            vue_Post(THIS,'admin/position',data,callback,1,1,0,1);
            function callback(msg){
                THIS.total = msg.total;
                THIS.list = msg.list;
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

      edit_js(index){
          var THIS = this;
          THIS.show_flag = true;
          if(index!='-1'){
              THIS.id = THIS.list[index].position_id;
              THIS.ruleForm = {
                  name:THIS.list[index].position_name,
                  shenfen:THIS.list[index].rule_auth,
                  miaoshu:THIS.list[index].position_describe,
                  company:THIS.list[index].branch_cid
              };
          }else if(index=='-1'){
              THIS.id = '';
          };
      },

      gj_btnClikc(type){
          if(type==1){
              this.show_flag = false;
              this.ruleForm = {name:'',shenfen:'',miaoshu:'',company:''};
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
            this.ruleForm = {name:'',shenfen:'',miaoshu:'',company:''};
            this.$refs['ruleForm'].resetFields();
      },

      submit_from(){
            var THIS = this;
            var data = sign({
                position_id:THIS.id?THIS.id:'',
                position_name:THIS.ruleForm.name,
                position_describe:THIS.ruleForm.miaoshu,
                rule_auth:THIS.ruleForm.shenfen,
                branch_cid:THIS.ruleForm.company
            });
            vue_Post(THIS,'admin/addPosition',data,callback,1,1,1,1);
            function callback(msg){
                THIS.getList();
                THIS.$message({
                    type: 'success',
                    message: '操作成功!',
                    dangerouslyUseHTMLString:true
                });
                THIS.show_flag = false;
                THIS.ruleForm = {name:'',shenfen:'',miaoshu:'',company:''};
                THIS.$refs['ruleForm'].resetFields();
            }; 
      },

      get_fencompany(){
            var THIS = this;
            vue_Post(THIS,'admin/branch',{},callback,0,0,0,0);
            function callback(msg){
                THIS.fen_company = msg.list;
            }; 
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
                position_id:id
            });
            vue_Post(THIS,'admin/delPosition',data,callback,1,1,0,1);
            function callback(msg){
                THIS.getList();
                THIS.$message({
                    type: 'success',
                    message: '删除成功!',
                    dangerouslyUseHTMLString:true
                });
            }; 
      },

      setting(id){
          this.$router.replace('/home/permissions/permissions_jsOne/permissions_jsDetail/'+id);
      }

  },
   mounted(){
      THIS = this;
      this.store.commit('setPageText','当前位置：权限 / 角色管理');
      THIS.permissions = JSON.parse(window.localStorage.permissions);
      this.getList();
      this.get_fencompany();

  }
}
</script>

<style scoped>
    .list_header li,.list_main ol li{
        width: 15%;
    }
    .zc_img{
        width:40px;
        height:40px;
        border-radius: 50%;
        overflow: hidden;
        margin: 5px 0;
        background: url(../../../assets/images/moren01.png) no-repeat center /100%;
    }
    .color_ss{
      color:rgba(24,144,255,1);
    }
</style>
