<template>

          <div class="views h_bottom po_r pad_l_50 pad_r_50 b_s mr_color01">
                <bot-header :link='link'></bot-header>
                <el-form :model="ruleForm" label-position='top' :rules="rules" ref="ruleForm" class="views_100ch_2 demo-ruleForm">
                    <div class="from_box">
                        <div class="from_tltle">基本信息</div>
                        <div class="w_100 b_s pad_l_30 pad_r_30 mar_t_30">
                            <div class="w_100 flex row j_between">
                                <el-form-item class="w_30" label="姓名" prop="name">
                                    <el-input v-model="ruleForm.name" placeholder="请输入姓名" clearable></el-input>
                                </el-form-item>
                                <el-form-item class="w_30" label="手机号" prop="phone">
                                    <el-input v-model="ruleForm.phone" placeholder="请输入手机号" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" clearable></el-input>
                                </el-form-item>
                                <div class="w_30">
                                    <el-form-item  label="性别" prop="sex">
                                        <el-radio-group  v-model="ruleForm.sex">
                                            <el-radio :label="1">男</el-radio>
                                            <el-radio :label="2">女</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="w_100 flex row j_between mar_t_30" >
                                <el-form-item class="w_30" label="身份证号"  prop="idcard">
                                    <el-input v-model="ruleForm.idcard" placeholder="请输入身份证号" maxlength="18" clearable></el-input>
                                </el-form-item>
                                <el-form-item class="w_30" label="户籍地址" prop="address">
                                    <el-input v-model="ruleForm.address" placeholder="请输入户籍地址" clearable></el-input>
                                </el-form-item>
                                <el-form-item class="w_30" label="入职状态" prop="status" >
                                    <el-radio-group  v-model="ruleForm.status">
                                        <el-radio :label="1">在职</el-radio>
                                        <el-radio :label="2">离职</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </div>

                            <!--员工类型：社会工/学生工-->
                            <div class="w_100 flex row j_between mar_t_30">
                                <el-form-item class="w_30" label="员工类型" prop="type" >
                                    <el-select class="w_100" v-model="ruleForm.type" clearable filterable placeholder="请选择员工类型">
                                        <el-option label="社会工" :value="1"></el-option>
                                        <el-option label="学生工" :value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                                <div class="w_30"></div>
                                <div class="w_30"></div>
                               
                            </div>

                            <!--图片-->
                            <div class="w_100 mar_b_10 flex row j_between">
                                <div class="w_60">
                                    <div style="width:148px;height:190px;" class="mar_r_30 f_l">
                                        <p class="font14" style="line-height:42px;"><span style="color:#F35149;"></span>身份证正面照</p>
                                        <div class="w_100 over_hide" style="height:148px;">
                                            <el-upload
                                                :action="up_imgurl"
                                                :limit=1
                                                list-type="picture-card"
                                                :on-preview="handlePictureCardPreview01"
                                                :on-success='upload01'
                                                :file-list="img_value01">
                                                <i class="el-icon-plus"></i>
                                            </el-upload>
                                            <el-dialog :visible.sync="dialogVisible01">
                                                <img width="100%" :src="dialogImageUrl01" alt="">
                                            </el-dialog>
                                        </div>
                                    </div>
                                    <div style="width:148px;height:190px;" class="mar_r_30 f_l">
                                        <p class="font14" style="line-height:42px;"><span style="color:#F35149;"></span>身份证反面照</p>
                                        <div class="w_100 over_hide" style="height:148px;">
                                            <el-upload
                                                :action="up_imgurl"
                                                :limit=1
                                                list-type="picture-card"
                                                :on-preview="handlePictureCardPreview02"
                                                :on-success='upload02'
                                                :file-list="img_value02">
                                                <i class="el-icon-plus"></i>
                                            </el-upload>
                                            <el-dialog :visible.sync="dialogVisible02">
                                                <img width="100%" :src="dialogImageUrl02" alt="">
                                            </el-dialog>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="w_30">
                                    <div style="width:148px;height:190px;" class="mar_r_30 f_l">
                                        <p class="font14" style="line-height:42px;">员工头像</p>
                                        <div class="w_100 over_hide" style="height:148px;">
                                            <el-upload
                                                :action="up_imgurl"
                                                :limit=1
                                                list-type="picture-card"
                                                :on-preview="handlePictureCardPreview03"
                                                :on-success='upload03'
                                                :file-list="img_value03">
                                                <i class="el-icon-plus"></i>
                                            </el-upload>
                                            <el-dialog :visible.sync="dialogVisible03">
                                                <img width="100%" :src="dialogImageUrl03" alt="">
                                            </el-dialog>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="w_100 flex row j_between">
                                <el-form-item class="w_30" label="所属工厂"  prop="company"> 
                                    <el-select class="w_100" v-model="ruleForm.company" remote :remote-method='search_company' filterable  placeholder="请选择所属工厂" clearable>
                                        <el-option v-for="(item,index) in conpamy_Arr" :key="index" :label="item.realtitle" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="w_30" label="所属运营中心" prop="center">
                                    <el-select class="w_100" v-model="ruleForm.center" remote :remote-method='search_center' filterable  placeholder="请选择所属运营中心" clearable>
                                        <el-option v-for="(item,index) in center_Arr" :key="index" :label="item.center_name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="w_30" label="选择业务员(选填)">
                                    <el-select class="w_100" v-model="ruleForm.ywy" filterable  placeholder="请选择业务员" clearable>
                                        <el-option v-for="(item,index) in ywy_Arr" :key="index" :label="item.yewuyuan_name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>

                            <div class="w_100 flex row j_between">
                                <div class="w_30">
                                    <el-form-item  label="身份证是否为本人">
                                        <el-radio-group  v-model="ruleForm.isme">
                                            <el-radio :label="1">是</el-radio>
                                            <el-radio :label="2">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </div>
                                <div class="w_30">
                                    <el-form-item  label="入职时间"  prop="ruzhiTime">
                                        <el-date-picker
                                            style="width:100%!important;"
                                            value-format="yyyy-MM-dd"
                                            v-model="ruleForm.ruzhiTime"
                                            type="date"
                                            placeholder="选择入职时间">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                                <el-form-item class="w_30" label="入职宿舍">
                                    <el-input v-model="ruleForm.sushe" placeholder="请输入入职宿舍" clearable></el-input>
                                </el-form-item>
                            </div>

                            <div v-if="ruleForm.isme==2" class="w_100 flex row j_between">
                                <el-form-item class="w_30" label="入职姓名">
                                    <el-input v-model="ruleForm.rz_name" placeholder="请输入入职姓名" clearable></el-input>
                                </el-form-item>
                                <el-form-item class="w_30" label="入职身份证">
                                    <el-input v-model="ruleForm.rz_idcard" placeholder="请输入入职身份证" maxlength="18"  clearable></el-input>
                                </el-form-item>
                                <div class="w_30">
                                    <el-form-item  label="入职性别">
                                        <el-radio-group  v-model="ruleForm.rz_sex">
                                            <el-radio :label="1">男</el-radio>
                                            <el-radio :label="2">女</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </div>
                            </div>

                            <div v-show="ruleForm.isme==2" class="w_100 flex row j_between">
                                
                                <el-form-item class="w_30" label="入职户籍地址">
                                    <el-input v-model="ruleForm.rz_address" placeholder="请输入入职户籍地址" clearable></el-input>
                                </el-form-item>
                                <div class="w_30"></div>
                                <div class="w_30"></div>
                                
                            </div>

                            <div class="w_100 flex row j_between" v-if="ruleForm.status==2">
                                <div class="w_30" >
                                    <el-form-item  label="离职时间" prop="lizhiTime">
                                        <el-date-picker
                                            style="width:100%!important;"
                                            value-format="yyyy-MM-dd"
                                            v-model="ruleForm.lizhiTime"
                                            type="date"
                                            placeholder="选择离职时间">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                                <div class="w_30" v-if="ruleForm.status==2">
                                    <el-form-item class="w_100" label="离职类型" prop="lizhi_type">
                                        <el-select class="w_100" v-model="ruleForm.lizhi_type" filterable  placeholder="请选择离职类型" clearable>
                                            <el-option  label="正常离职" :value="1"></el-option>
                                            <el-option  label="自离" :value="2"></el-option>
                                            <el-option  label="辞退" :value="3"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div class="w_30">
                                    <el-form-item class="w_100"  label="离职理由"  prop="liyou">
                                        <el-input  type="textarea" v-model="ruleForm.liyou" placeholder="请输入离职理由"></el-input>
                                    </el-form-item>
                                </div>
                            </div>

                            <div class="w_100 flex row j_between mar_t_30">
                                <el-form-item class="from_textarea_120px w_65"  label="备注信息(选填)">
                                    <el-input  type="textarea" v-model="ruleForm.mark" placeholder="请输入备注信息"></el-input>
                                </el-form-item>
                            </div>

                        </div>
                    </div>
                    <div class="from_box mar_t_30">
                        <div class="from_tltle">银行卡信息</div>
                        <div class="w_100 b_s pad_l_30 pad_r_30 mar_t_30">
                            <div class="w_100 flex row j_between">
                                <el-form-item class="w_30" label="银行卡号">
                                    <el-input v-model="ruleForm.yh_code" placeholder="请输入银行卡号" oninput="value=value.replace(/[^\d]/g,'')" maxlength="19" clearable></el-input>
                                </el-form-item>
                                <el-form-item class="w_30" label="开户行">
                                    <el-input v-model="ruleForm.yh_khh" placeholder="请输入开户行" clearable></el-input>
                                </el-form-item>
                                <el-form-item class="w_30" label="持卡人姓名">
                                    <el-input v-model="ruleForm.yh_name" placeholder="请输入开户行" clearable></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                </el-form>
                <div class="po_b po_bottom bg_fff h_60px w_100">
                    <submit-btn @submitForm='submitForm' @resetForm='resetForm'></submit-btn>
                </div>
          </div>
  
</template>

<script>
var THIS;
import botHeader from '../../components/bot-header/bot-header';
import submitBtn from '../../components/form-submit/submit-btn';
export default {
  components:{
    botHeader,
    submitBtn
  },
  name: '',
  computed: {
      watchCenter() {
          return this.ruleForm.center;
      },
  },
  watch: {
      watchCenter() {
          this.get_ywy();
      }
  },
  data(){
      return {
          id:'',
          link:'/home/employees/employeesOne/employeesList',
          //表单验证
          ruleForm:{
                name:'',
                sex:'',
                c_name:'',
                phone:'',
                idcard:'',
                address:'',
                ywy:'',
                center:'',
                company:'',
                sushe:'',
                ruzhiTime:'',
                lizhiTime:'',
                status:'',
                lizhi_type:'',
                liyou:'',
                mark:'',
                yh_code:'',
                yh_khh:'',
                yh_name:'',
                imgArr01:[],
                imgArr02:[],
                imgArr03:[],
                type:'',
                isme:1,
                rz_sex:1,
                rz_name:'',
                rz_idcard:'',
                rz_address:'',
          },
          rules:{
              name:[{ required: true, message: '请输入姓名', trigger: [] }],
              phone:[{ required: true, message: '请输入手机号', trigger: [] }],
              sex:[{ required: true, message: '请选择性别', trigger: [] }],
              idcard:[{ required: true, message: '请输入身份证号', trigger: [] }],
              address:[{ required: true, message: '请输入户籍地址', trigger: [] }],
              type:[{ required: true, message: '请选项员工类型', trigger: [] }],
              status:[{ required: true, message: '请选项入职状态', trigger: [] }],
              center:[{ required: true, message: '请选择所属运营中心', trigger: [] }],
              company:[{ required: true, message: '请选择所属工厂', trigger: [] }],
              yh_code:[{ required: true, message: '请输入银行卡号', trigger: [] }],
              yh_khh:[{ required: true, message: '请输入开户行', trigger: [] }],
              lizhi_type:[{ required: true, message: '请选择离职类型', trigger: [] }],
              ruzhiTime:[{ required: true, message: '请选择入职时间', trigger: [] }],
              lizhiTime:[{ required: true, message: '请选择离职时间', trigger: [] }],
              liyou:[{ required: true, message: '请输入离职理由', trigger: [] }],
          },
          //上传图片开始
            up_imgurl:'',
            //01
            dialogImageUrl01: '',
            dialogVisible01: false,
            img_value01:[],  //赋值
            //02
            dialogImageUrl02: '',
            dialogVisible02: false,
            img_value02:[],  //赋值
            //03
            dialogImageUrl03: '',
            dialogVisible03: false,
            img_value03:[],  //赋值
          //上传图片结束
          center_Arr:[],
          center_Arr_beifen:[],
          conpamy_Arr:[],
          conpamy_Arr_beifen:[],
          ywy_Arr:[],
          isBack:true,
      }
  },
  methods:{

      get_detail(){
            var data = {
                yuangongid:THIS.id,
                type:THIS.type==3?2:1
            };
            vue_Post(THIS,'yuangong/details',data,callback,1,0,1,0);
            function callback(msg){
                THIS.ruleForm = {
                    name:msg.name,
                    sex:msg.sex_value?parseInt(msg.sex_value):'',
                    c_name:msg.former_name,
                    phone:msg.phone,
                    idcard:msg.real_idcard_show,
                    address:msg.real_idcard_address,
                    center:msg.centerid,
                    company:msg.companyid,
                    ywy:msg.yewuyuanid?parseInt(msg.yewuyuanid):'',
                    sushe:msg.room,
                    ruzhiTime:msg.ruzhiat,
                    lizhiTime:msg.lizhiat,
                    status:msg.status,
                    lizhi_type:parseInt(msg.lizhitype),
                    liyou:msg.lizhireason,
                    mark:msg.mark,
                    yh_code:msg.bankno,
                    yh_khh:msg.bankname,
                    yh_name:msg.bankaccount,
                    isme:msg.use_type?msg.use_type:1,
                    rz_sex:msg.use_sex,
                    rz_name:msg.use_name,
                    rz_idcard:msg.use_idcard,
                    rz_address:msg.use_address,
                    imgArr01:msg.use_idcardzm_name?[msg.use_idcardzm_name]:[],
                    imgArr02:msg.use_idcardfm_name?[msg.use_idcardfm_name]:[],
                    imgArr03:msg.picture?[msg.picture]:[],
                    type:msg.sflb?parseInt(msg.sflb):''
                };
                THIS.img_value01 = msg.use_idcardzm_name?[{url:msg.use_idcardzm_name,name:''}]:[];
                THIS.img_value02 = msg.use_idcardfm_name?[{url:msg.use_idcardfm_name,name:''}]:[];
                THIS.img_value03 = msg.picture?[{url:msg.picture,name:''}]:[];
                //工厂，运营中心配置文件
                THIS.center_Arr = msg.center_list;
                THIS.center_Arr_beifen = msg.center_list;
                THIS.conpamy_Arr = msg.company_list;
                THIS.conpamy_Arr_beifen = msg.company_list;
                //获取业务员
                THIS.get_ywy();
            }; 
      },

      //提交表单
      submitForm(formName) {
            var THIS = this;
            this.$refs[formName].validate((valid) => {
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
      },

      //清空表单
      resetForm(formName) {
          this.img_value01 = [];
          this.img_value02 = [];
          this.img_value03 = [];
          this.img_value04 = [];
          this.$refs[formName].resetFields();
      },

      submit_from(){
            var THIS = this;
            if(THIS.ruleForm.isme==1){
                THIS.ruleForm.rz_sex =''
                THIS.ruleForm.rz_name='';
                THIS.ruleForm.rz_idcard='';
                THIS.ruleForm.rz_address='';
            };
            //转化时间
            if(THIS.ruleForm.status==2){
                THIS.ruleForm.lizhiTime =  THIS.ruleForm.lizhiTime?THIS.ruleForm.lizhiTime:'';
            }else{
                THIS.ruleForm.lizhiTime = '';
            };
            THIS.ruleForm.ruzhiTime = THIS.ruleForm.ruzhiTime?THIS.ruleForm.ruzhiTime:'';
            var data = {
                id:THIS.id,
                sex:THIS.ruleForm.sex,
                name:THIS.ruleForm.name,
                former_name:THIS.ruleForm.c_name,
                phone:THIS.ruleForm.phone,
                real_idcard_address:THIS.ruleForm.address,
                yewuyuanid:THIS.ruleForm.ywy,
                centerid:THIS.ruleForm.center,
                companyid:THIS.ruleForm.company,
                room:THIS.ruleForm.sushe,
                status:THIS.ruleForm.status,
                ruzhiat:THIS.ruleForm.ruzhiTime,
                lizhiat:THIS.ruleForm.status==1?'':THIS.ruleForm.lizhiTime,
                ruzhiat:THIS.ruleForm.ruzhiTime,
                lizhitype:THIS.ruleForm.status==1?'':THIS.ruleForm.lizhi_type,
                lizhireason:THIS.ruleForm.status==1?'':THIS.ruleForm.liyou,
                mark:THIS.ruleForm.mark,
                bankno:THIS.ruleForm.yh_code,
                bankname:THIS.ruleForm.yh_khh,
                bankaccount:THIS.ruleForm.yh_name,
                use_idcardzm:THIS.ruleForm.imgArr01[0]?THIS.ruleForm.imgArr01[0]:'',
                use_idcardfm:THIS.ruleForm.imgArr02[0]?THIS.ruleForm.imgArr02[0]:'',
                picture:THIS.ruleForm.imgArr03[0]?THIS.ruleForm.imgArr03[0]:'',
                sflb:THIS.ruleForm.type,
                real_info_type:THIS.ruleForm.isme,
                use_name:THIS.ruleForm.rz_name,
                real_idcard:THIS.ruleForm.idcard,           //真实
                use_idcard:THIS.ruleForm.rz_idcard,
                use_address:THIS.ruleForm.rz_address,
                use_sex:THIS.ruleForm.rz_sex,
            };
            vue_Post(THIS,'yuangong/edit',data,callback,1,1,1,1);
            function callback(msg){
                THIS.$message({
                    type: 'success',
                    message: '编辑成功',
                    dangerouslyUseHTMLString:true
                });
                THIS.isBack = false;
                THIS.$router.replace(THIS.link);
            }; 
      },

      //上传图片01正面
      upload01(event, file, fileList){
          var THIS = this;
          if(event.code==1){
              THIS.ruleForm.imgArr01 = [];
              THIS.ruleForm.imgArr01.push(event.data.picture[0].url);
          }else if(event.code=='-999'){
              layout(THIS);
          }else{
              THIS.$message({
					type: 'error',
					message: event.msg,
					dangerouslyUseHTMLString:true
			  });
          };
      },
      handlePictureCardPreview01(file) {
        this.dialogImageUrl01 = file.url;
        this.dialogVisible01 = true;
      },


      //上传图片02反面
      upload02(event, file, fileList){
          var THIS = this;
          if(event.code==1){
              THIS.ruleForm.imgArr02 = [];
              THIS.ruleForm.imgArr02.push(event.data.picture[0].url);
          }else if(event.code=='-999'){
              layout(THIS);
          }else{
              THIS.$message({
					type: 'error',
					message: event.msg,
					dangerouslyUseHTMLString:true
			  });
          };
      },
      handlePictureCardPreview02(file) {
        this.dialogImageUrl02 = file.url;
        this.dialogVisible02 = true;
      },

      //上传图片03员工头像
      upload03(event, file, fileList){
          var THIS = this;
          if(event.code==1){
              THIS.ruleForm.imgArr03 = [];
              THIS.ruleForm.imgArr03.push(event.data.picture[0].url);
          }else if(event.code=='-999'){
              layout(THIS);
          }else{
              THIS.$message({
					type: 'error',
					message: event.msg,
					dangerouslyUseHTMLString:true
			  });
          };
      },
      handlePictureCardPreview03(file) {
        this.dialogImageUrl03 = file.url;
        this.dialogVisible03 = true;
      },

      //搜索运营中心
      search_center(msg){
            if(msg){
                var data = {
                    keyword:msg
                };
                vue_indexPost(THIS,'center/centerSearchList',data,callback,1,0,1,0);
                function callback(msg){
                    THIS.ruleForm.ywy = '';
                THIS.center_Arr = msg.list;
                }
            }else{
                THIS.ruleForm.ywy = '';
                THIS.center_Arr = THIS.center_Arr_beifen;
            };
      },

      //搜索工厂
      search_company(msg){
            var THIS = this;
            if(msg){
                var data = {
                    keyword:msg
                };
                vue_indexPost(THIS,'company/companySearchList',data,callback,1,0,1,0);
                function callback(msg){
                    THIS.conpamy_Arr = msg.list;
                }
            }else{
                THIS.conpamy_Arr = THIS.conpamy_Arr_beifen;
            };
      },

      //业务员
      get_ywy(){
          var THIS = this;
          if(THIS.ruleForm.center){
              var data = {
                  centerid:THIS.ruleForm.center,
                  page:1,
                  count:100
              };
              vue_indexPost(THIS,'center/centerAccountSearchList',data,callback,1,0,1,0);
              function callback(msg){
                  THIS.ruleForm.ywy = '';
                  THIS.ywy_Arr = msg.list;
              }
          }else{
              THIS.ywy_Arr = [];
          };
      }
      
    },
    mounted(){
        THIS = this;
        THIS.store.commit('setPageText','当前位置：员工 / 员工编辑');
        THIS.up_imgurl = window.localStorage.commonhost+'upload/uploadFile';
        THIS.id = THIS.$route.params.id?THIS.$route.params.id:'';
        THIS.get_detail();

    },
    beforeRouteLeave(to, from, next){//删除：清除缓存页面缓存  返回：缓存上一页面
        if(!this.isBack){
            to.meta.keepAlive = false; 
        }else{
            to.meta.keepAlive = true; 
        }
        next();
    },
    beforeDestroy(){
      this.store.commit('setPageText','当前位置：员工 / 员工列表');
    },
}
</script>

<style scoped>
   
</style>
