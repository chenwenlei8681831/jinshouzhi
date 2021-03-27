<template>

          <div class="views h_bottom po_r pad_l_50 pad_r_50 b_s mr_color01">
                <bot-header :link='link'></bot-header>
                <el-form :model="ruleForm" label-position='top' :rules="rules" ref="ruleForm" class="views_100ch_2 demo-ruleForm">
                    <div class="views_100ch_2">
                        <div class="from_box">
                            <div class="from_tltle">基本信息</div>
                            <div class="w_100 b_s pad_l_30 pad_r_30 mar_t_30">
                                <!--基本信息-->
                                <div class="w_100">
                                    <div class="w_100 flex row j_between">
                                        <el-form-item class="w_30" label="运营中心名称" prop="ct_name">
                                            <el-input v-model="ruleForm.ct_name" placeholder="请输入运营中心名称" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item class="w_30" label="运营中心类型" prop="ct_type">
                                            <el-select class="w_100" v-model="ruleForm.ct_type" filterable clearable  placeholder="请选择运营中心类型">
                                                <el-option v-for="(item,index) in qudao_list" :key="index" :label="item.name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item class="w_30" label="所属分公司" prop="ct_ssfgs">
                                            <el-select class="w_100" v-model="ruleForm.ct_ssfgs" filterable  placeholder="请选择所属分公司">
                                                <el-option v-for="(item,index) in branch_list" :key="index" :label="item.title" :value="item.id" clearable></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                    <div class="w_100 flex row j_between">
                                        <el-form-item class="w_30" label="所属地区" prop="address">
                                            <el-cascader class="w_100" :options="address_options"  v-model='ruleForm.address'  filterable placeholder="请选择所属地区" clearable></el-cascader>
                                        </el-form-item>
                                        <el-form-item class="w_30" label="负责人" prop="ct_fzr">
                                            <el-input v-model="ruleForm.ct_fzr" placeholder="请输入负责人" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item class="w_30" label="负责人电话" prop="ct_fzrdh">
                                            <el-input v-model="ruleForm.ct_fzrdh" placeholder="请输入负责人电话" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" clearable></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="w_100 flex row j_between">
                                        <el-form-item class="w_30" label="公司对接人" prop="ct_djr">
                                            <el-input v-model="ruleForm.ct_djr" placeholder="请输入公司对接人" clearable></el-input>
                                        </el-form-item>
                                        <div class="w_30"></div>
                                        <div class="w_30"></div>
                                    </div>
                                </div>
                                <!--门店照片-->
                                <div class="w_100">
                                    <p class="font14" style="line-height:42px;"><span style="color:#F35149;"></span>门头照片（限4张）</p>
                                    <div class="w_100" style="min-height:70px;">
                                        <el-upload
                                            :action="up_imgurl"
                                            :limit=4
                                            list-type="picture-card"
                                            :on-preview="handlePictureCardPreview"
                                            :on-success='upload'
                                            :on-remove='deleteImg'
                                            :file-list="img_value">
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <el-dialog :visible.sync="dialogVisible">
                                            <img width="100%" :src="dialogImageUrl" alt="">
                                        </el-dialog>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="from_box mar_t_30">
                            <div class="from_tltle">开票信息</div>
                            <div class="w_100 b_s pad_l_30 pad_r_30 mar_t_30">
                                <!--开票信息-->
                                <div class="w_100">
                                    <div class="w_100 flex row j_between">
                                        <el-form-item class="w_30" label="收款单位">
                                            <el-input v-model="ruleForm.ct_skdw" placeholder="请输入收款单位" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item class="w_30" label="开户行">
                                            <el-input v-model="ruleForm.ct_khh" placeholder="请输入开户行" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item class="w_30" label="法人名称">
                                            <el-input v-model="ruleForm.fr_name" placeholder="请输入法人名称" clearable></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="w_100 flex row j_between">
                                        <el-form-item class="w_30" label="银行卡账号">
                                            <el-input v-model="ruleForm.ct_account" placeholder="请输入登录账号" clearable></el-input>
                                        </el-form-item>
                                    </div>
                                </div>
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
          link:'',
          //上传图片开始
          up_imgurl:'',
          dialogImageUrl: '',
          dialogVisible: false,
          img_value:[],  //赋值
          //上传图片结束
          //表单验证
          ruleForm:{
              ct_name:'',
              ct_type:'',
              address:'',
              ct_fzr:'',
              ct_fzrdh:'',
              ct_ssfgs:'',
              ct_djr:'',
              ct_skdw:'',
              ct_khh:'',
              fr_name:'',
              ct_account:'',
              imgArr:[],
          },
          rules:{
              ct_name:[{ required: true, message: '请输入运营中心名称', trigger: [] }],
              ct_type:[{ required: true, message: '请选择运营中心类型', trigger: [] }],
              ct_fzr:[{ required: true, message: '请输入负责人姓名', trigger: [] }],
              ct_fzrdh:[{ required: true, message: '请输入负责人电话', trigger: [] }],
              ct_fzrdh:[{ required: true, message: '请输入负责人电话', trigger: [] }],
              address:[{ required: true, message: '请选择所属地区', trigger: [] }],
              ct_ssfgs:[{ required: true, message: '请选择所属分公司', trigger: [] }],
              ct_djr:[{ required: true, message: '请输入收对接人', trigger: [] }],
              ct_skdw:[{ required: true, message: '请输入收款单位', trigger: [] }],
              ct_khh:[{ required: true, message: '请输入开户行', trigger: [] }],
              fr_name:[{ required: true, message: '请输入法人名称', trigger: [] }],
              ct_account:[{ required: true, message: '请输入登录账号', trigger: [] }],
          },
          address_options:[],
          //配置文件
          qudao_list:[],
          branch_list:[],
      }
  },
  methods:{

      get_address(){
          var THIS = this;
          if(window.localStorage.get_address){
              //格式化省市区数据
              var obj = JSON.parse(window.localStorage.get_address);
              THIS.address_options = obj;
          }else{
              get_address(THIS,callback);
              function callback(msg){
                  window.localStorage.get_address = JSON.stringify(msg);
                  //格式化省市区数据
                  var obj = JSON.parse(window.localStorage.get_address);
                  THIS.address_options = obj;
              };
          }
          
      },

      get_detail(){
            var THIS = this;
            var data = {
                centerid:THIS.id
            };
            vue_Post(THIS,'center/details',data,callback,1,1,0,1);
            function callback(msg){
                //配置文件
                THIS.qudao_list = msg.center_qudao;
                THIS.branch_list = msg.branch_info;
                //详情
                if(THIS.id){
                    //照片
                    for(let i=0;i<msg.info.center_path.length;i++){
                        msg.info.center_path[i] = msg.info.center_path[i].path
                    };
                    THIS.ruleForm = {
                        ct_name:msg.info.center_name,
                        ct_type:msg.info.center_qudao,
                        imgArr:msg.info.center_path,
                        address:[msg.info.province,msg.info.city,msg.info.area],
                        ct_fzr:msg.info.leader,
                        ct_fzrdh:msg.info.leaderphone,
                        ct_ssfgs:msg.info.branch_cid,
                        ct_djr:msg.info.contacter,
                        ct_skdw:msg.info.jiesuan_danwei,
                        ct_khh:msg.info.khh,
                        fr_name:msg.info.faren,
                        ct_account:msg.info.jxh
                    };
                    THIS.img_value = [];
                    for(let i=0;i<msg.info.center_path.length;i++){
                        THIS.img_value.push({url:msg.info.center_path[i],name:''});
                    };
                };
            }; 
      },

      //上传图片
      upload(event, file, fileList){
          var THIS = this;
          if(event.code==1){
              THIS.ruleForm.imgArr.push(event.data.picture[0].url);
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

      //查看大图
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      //删除图片
      deleteImg(file, fileList){
          this.ruleForm.imgArr = [];
          for(let i=0;i<fileList.length;i++){
              this.ruleForm.imgArr.push(fileList[i].url)
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
          this.img_value = [];
          this.$refs[formName].resetFields();
      },

      submit_from(){
            var THIS = this;
            for(let i=0;i<THIS.ruleForm.imgArr.length;i++){
                THIS.ruleForm.imgArr[i] = {'path':THIS.ruleForm.imgArr[i]};
            };
            var data = {
                centerid:THIS.id,
                center_name:THIS.ruleForm.ct_name,
                center_qudao:THIS.ruleForm.ct_type,
                province:THIS.ruleForm.address[0]?THIS.ruleForm.address[0]:0,
                city:THIS.ruleForm.address[1]?THIS.ruleForm.address[1]:0,
                area:THIS.ruleForm.address[2]?THIS.ruleForm.address[2]:0,
                img_path:JSON.stringify(THIS.ruleForm.imgArr),
                leader:THIS.ruleForm.ct_fzr,
                leaderphone:THIS.ruleForm.ct_fzrdh,
                branch_cid:THIS.ruleForm.ct_ssfgs,
                contacter:THIS.ruleForm.ct_djr,
                jiesuan_danwei:THIS.ruleForm.ct_skdw,
                khh:THIS.ruleForm.ct_khh,
                faren:THIS.ruleForm.fr_name,
                jxh:THIS.ruleForm.ct_account
            };
            vue_Post(THIS,'center/add',data,callback,1,1,1,1);
            function callback(msg){
                THIS.$message({
                    type: 'success',
                    message: THIS.id?'编辑成功':'创建成功',
                    dangerouslyUseHTMLString:true
                });
                THIS.$router.replace('/home/store/storeOne/storeList');
            }; 
      }

  },
   mounted(){

      this.store.commit('setPageText','当前位置：门店 / 创建运营中心');
      this.up_imgurl = window.localStorage.commonhost+'upload/uploadFile';
      this.id = this.$route.params.id?this.$route.params.id:'';
      this.get_detail();
      this.get_address();

  }
}
</script>

<style>
   
</style>
