<template>

          <div class="views h_bottom po_r pad_l_50 pad_r_50 b_s mr_color01">
                <bot-header :link='link'></bot-header>
                <el-form :model="ruleForm" label-position='top' :rules="rules" ref="ruleForm" class="views_100ch_2 demo-ruleForm">
                    <div class="from_box">
                        <div class="from_tltle">基本信息</div>
                        <div class="w_100 b_s pad_l_30 pad_r_30 mar_t_30">
                            <div class="w_100 flex row j_between">
                                <el-form-item class="w_30" label="企业真实名称" prop="re_name">
                                    <el-input v-model="ruleForm.re_name" placeholder="请输入企业真实名称" clearable></el-input>
                                </el-form-item>
                                <el-form-item class="w_30" label="社会信用代码" prop="code">
                                    <el-input v-model="ruleForm.code" placeholder="请输入社会信用代码" clearable></el-input>
                                </el-form-item>
                                <el-form-item class="w_30" label="所属行业" prop="hangye" >
                                    <el-select class="w_100" v-model="ruleForm.hangye" clearable filterable placeholder="请选择所属行业">
                                        <el-option v-for="(item,index) in hangye_info" :key="index" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="w_100 flex row j_between mar_t_30">
                                <el-form-item class="from_textarea_240px w_45"  label="企业简介" prop="jianjie">
                                    <el-input  type="textarea" v-model="ruleForm.jianjie" placeholder="请输入企业简介"></el-input>
                                </el-form-item>
                                <el-form-item class="from_textarea_240px w_45"  label="备注">
                                    <el-input  type="textarea" v-model="ruleForm.mark" placeholder="请输入备注"></el-input>
                                </el-form-item>
                            </div>
                            <el-form-item class="w_30" label="所属分公司" prop="fen_company">
                                <el-select class="w_100" v-model="ruleForm.fen_company" filterable clearable placeholder="请选择所属分公司">
                                  <el-option v-for="(item,index) in fen_company" :key="index"  :label="item.title" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="from_box mar_t_30">
                        <div class="from_tltle">开票信息</div>
                        <div class="w_100 b_s pad_l_30 pad_r_30 mar_t_30">
                            <el-form-item class="w_30" label="签单公司" prop="qd_company">
                                <el-select class="w_100" v-model="ruleForm.qd_company" filterable clearable placeholder="请选择签单公司">
                                  <el-option v-for="(item,index) in kaipiao_info" :key="index" :label="item.danwei" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="from_box mar_t_30">
                        <div class="from_tltle">驻厂信息</div>
                        <div class="w_100 b_s pad_l_30 pad_r_30 mar_t_30">
                            <el-form-item class="w_50" label="选择驻厂">
                                <el-select class="w_100" v-model="ruleForm.zhuchang" multiple filterable clearable placeholder="请选择驻厂">
                                    <el-option v-for="(item,index) in zhuchangArr" :key="index" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
                <div class="po_b po_bottom bg_fff h_60px w_100">
                    <submit-btn @submitForm='submitForm' @resetForm='resetForm'></submit-btn>
                </div>
          </div>
  
</template>

<script>
import botHeader from '../../components/bot-header/bot-header';
import submitBtn from '../../components/form-submit/submit-btn';
export default {
  components:{
    botHeader,
    submitBtn
  },
  name: '',
  data(){
      return {
          id:'',
          link:'/home/company/companyOne/companyList',
          isBack:true,
          zhuchangArr:[],
          fen_company:[],
          hangye_info:[],
          kaipiao_info:[],
          ruleForm:{
              re_name:'',
              code:'',
              hangye:'',
              jianjie:'',
              mark:'',
              fen_company:'',
              qd_company:'',
              zhuchang:''
          },
          rules:{
              re_name:[{ required: true, message: '请输入公司真实名称', trigger: [] }],
              code:[{ required: true, message: '请输入社会信用代码', trigger: [] }],
              hangye:[{ required: true, message: '请选择所属行业', trigger: [] }],
              jianjie:[{ required: true, message: '请输入企业简介', trigger: [] }],
              fen_company:[{ required: true, message: '请选择所属分公司', trigger: [] }],
              qd_company:[{ required: true, message: '请选择签单公司', trigger: [] }],
              zhuchang:[{ required: true, message: '请选择驻厂', trigger: [] }],
          }
      }
  },
  methods:{

      //获取详情
      get_detail(){
            var THIS = this;
            var data = {
                companyid:THIS.id
            };
            vue_Post(THIS,'company/addPreInfo',data,callback,0,0,0,0);
            function callback(msg){
                //配置文件
                THIS.fen_company = msg.fen_company;
                THIS.hangye_info = msg.hangye_info;
                THIS.kaipiao_info = msg.kaipiao_info;
                THIS.zhuchangArr = msg.zhuchang_info;
                //详情
                if(THIS.id){
                    //驻厂
                    var arr = [];
                    var aa = msg.info.zhuchang_list;
                    for(let i=0;i<aa.length;i++){
                        arr.push(aa[i].id);
                    };
                    THIS.ruleForm = {
                        re_name:msg.info.realtitle,
                        code:msg.info.xy_code,
                        hangye:msg.info.industry_id,
                        jianjie:msg.info.profile,
                        mark:msg.info.mark,
                        fen_company:msg.info.branch_cid,
                        qd_company:msg.info.qiandan_id,
                        zhuchang:arr
                    };
                };
                
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
          this.$refs[formName].resetFields();
      },

      submit_from(){
            var THIS = this;
            var data = {
                companyid:THIS.id,
                company_name:THIS.ruleForm.re_name,
                xy_code:THIS.ruleForm.code,
                industry_id:THIS.ruleForm.hangye,
                profile:THIS.ruleForm.jianjie,
                mark:THIS.ruleForm.mark,
                branch_cid:THIS.ruleForm.fen_company,
                qiandan_id:THIS.ruleForm.qd_company,
                zhuchangid:THIS.ruleForm.zhuchang.join('|')
            };
            vue_Post(THIS,'company/releaseCompanyAdd',data,callback,1,1,1,1);
            function callback(msg){
                THIS.$message({
                    type: 'success',
                    message: THIS.id?'编辑成功':'创建成功',
                    dangerouslyUseHTMLString:true
                });
                THIS.isBack = false;
                THIS.$router.replace('/home/company/companyOne/companyList');
            }; 
      }
      
  },
   mounted(){

      this.store.commit('setPageText','当前位置：企业 / 编辑企业');
      this.id = this.$route.params.id?this.$route.params.id:'';
      this.get_detail();

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
   
</style>
