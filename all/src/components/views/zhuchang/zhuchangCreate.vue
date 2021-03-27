<template>

          <div class="views h_bottom  pad_l_50 pad_r_50 b_s mr_color01">
                <bot-header></bot-header>
                <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" class="views_100ch_2 demo-ruleForm">
                    <div class="views_100ch_2">
                        <div class="from_box mar_t_30">
                            <div class="from_tltle">基本信息</div>
                            <div class="w_40 b_s pad_l_30 pad_r_30" style="margin:30px auto;">
                                <div class="w_100">
                                    <div class="w_100 flex col j_between">
                                        <el-form-item class="w_100" label="驻厂姓名" prop="zc_name">
                                            <el-input v-model="ruleForm.zc_name" placeholder="请输入驻厂姓名"></el-input>
                                        </el-form-item>
                                        <el-form-item class="w_100" label="登录账号(手机号)" prop="zc_phone">
                                            <el-input v-model="ruleForm.zc_phone" placeholder="请输入登录账号" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11"></el-input>
                                        </el-form-item>
                                        <el-form-item class="w_100" label="选择企业" prop="company">
                                            <el-select class="w_100 d_b_line" v-model="ruleForm.company" remote :remote-method='search_company' clearable filterable  placeholder="请选择企业">
                                                <el-option v-for="(item,index) in companyArr" :key="index" :label="item.realtitle" :value="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item  label="性别" prop="zc_sex">
                                            <el-radio-group  v-model="ruleForm.zc_sex">
                                                <el-radio :label="1">男</el-radio>
                                                <el-radio :label="2">女</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item class="row j_between flex" style="padding:0 30%;">
                                            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                                        </el-form-item>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-form>
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
            id:'',
            sex:1,
            ruleForm:{
                zc_name:'',
                zc_phone:'',
                company:'',
                zc_sex:''
            },
            rules:{
                zc_name:[{ required: true, message: '请输入驻厂姓名', trigger: [] }],
                zc_phone:[{ required: true, message: '请输入登录账号(手机号)', trigger: [] }],
                zc_sex:[{ required: true, message: '请选择性别', trigger: [] }],
                company:[{ required: true, message: '请选择企业', trigger: [] }],
            },
            companyArr:[],
      }
  },
  methods:{

      //提交表单
      submitForm(formName) {
          THIS.$refs[formName].validate((valid) => {
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
        THIS.$refs[formName].resetFields();
      },

      get_detail(){
            var data = { zhuchangid:THIS.id };
            vue_Post(THIS,'zhuchang/details',data,callback,1,1,0,1);
            function callback(msg){
                THIS.ruleForm = {
                    zc_name:msg.info.name,
                    zc_phone:msg.info.phone,
                    zc_sex:msg.info.sex
                };
                THIS.sex = msg.info.sex;
            };
      },

      submit_from(){
            var data = {
                zhuchangid:THIS.id,
                name:THIS.ruleForm.zc_name,
                phone:THIS.ruleForm.zc_phone,
                companyid:THIS.ruleForm.company,
                sex:THIS.ruleForm.zc_sex
            };
            vue_Post(THIS,'zhuchang/add',data,callback,1,1,1,1);
            function callback(msg){
                THIS.$message({
                    type: 'success',
                    message: THIS.id?'编辑成功':'创建成功',
                    dangerouslyUseHTMLString:true
                });
                THIS.$router.replace('/home/zhuchang/zhuchangOne/zhuchangList');
            }; 
      },

      //获取企业
      search_company(msg){
            var data = {
                keyword:msg,
                type:1
            };
            vue_indexPost(THIS,'company/companySearchList',data,callback,1,0,0,0);
            function callback(msg){
                THIS.companyArr = msg.list;
            }
      },

  },
   mounted(){
       THIS = this;
       THIS.store.commit('setPageText','当前位置：驻厂 / 创建驻厂');
       THIS.id = THIS.$route.params.id?THIS.$route.params.id:'';
       if(THIS.id){ THIS.get_detail() };
       THIS.search_company('');

  }
}
</script>

<style scoped>
 
</style>
