<template>

          <div class="views h_bottom  pad_l_50 pad_r_50 b_s mr_color01">
                <bot-header :link='link'></bot-header>
                <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" class="views_100ch_2 demo-ruleForm">
                    <div class="views_100ch_2">
                            <div class="from_box mar_t_30">
                                <div class="from_tltle">基本信息</div>
                                <div class="w_40 b_s pad_l_30 pad_r_30" style="margin:30px auto;">
                                    <div class="w_100">
                                        <div class="w_100">
                                            <el-form-item class="w_100 flex col" label="上传安装包">
                                                <el-upload
                                                    accept=".apk"
                                                    :headers="{token:token}"
                                                    :action="up_url"
                                                    :limit=1
                                                    :on-change="upChange"
                                                    :on-remove='upRemove'
                                                    :file-list="fileList"
                                                    :auto-upload='false'>
                                                    <el-button size="small" type="primary">上传apk</el-button>
                                                </el-upload>
                                            </el-form-item>
                                            <el-form-item class="w_100" label="版本号" prop="version">
                                                <el-input v-model="ruleForm.version" placeholder="请输入版本号" ></el-input>
                                            </el-form-item>
                                           <el-form-item class="w_100" label="更新内容" prop="content">
                                                <el-input  type="textarea" :autosize="{ minRows: 6}"  v-model="ruleForm.content" placeholder="请输入更新内容"></el-input>
                                            </el-form-item>
                                            <el-form-item  label="强制更新" prop="is_force">
                                                <el-radio-group  v-model="ruleForm.is_force">
                                                    <el-radio :label="1">是</el-radio>
                                                    <el-radio :label="0">否</el-radio>  
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item  label="设备类型" prop="device_type">
                                                <el-radio-group  v-model="ruleForm.device_type">
                                                    <el-radio :label="'android'">安卓(android)</el-radio>
                                                    <el-radio :label="'ios'">苹果(ios)</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                            <el-form-item class="row j_between flex" style="padding:0 30%;">
                                                <el-button type="primary" size='medium' @click="submitForm('ruleForm')">提交</el-button>
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
import botHeader from '../../components/bot-header/bot-header';
export default {
  components:{
    botHeader
  },
  name: '',
  data(){
      return {
            link:'/home/setting/settingThree/versionList',
            up_url: window.localStorage.commonhost+'upload/uploadFile',
            token:window.localStorage.token?window.localStorage.token:'',
            fileList:[],
            ruleForm:{      
                filepath:'',
                version:'',
                content:'',
                is_force:1,
                device_type:'android'
            },
            rules:{
              filepath:[{ required: true, message: '请上传安装包', trigger: [] }],
              version:[{ required: true, message: '请输入版本号', trigger: [] }],
              content:[{ required: true, message: '请输入更新内容', trigger: [] }],
              is_force:[{ required: true, message: '请选择是否必传', trigger: [] }],
              device_type:[{ required: true, message: '请选择设备类型', trigger: [] }],
          },
      }
  },
  methods:{

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

        submit_from(){
                var THIS = this;
                var data = {
                    id:THIS.id,
                    ver:THIS.ruleForm.version,
                    url:THIS.ruleForm.filepath,
                    content:THIS.ruleForm.content,
                    is_update:1,
                    is_force:THIS.ruleForm.is_force,
                    type:1,
                    device_type:THIS.ruleForm.device_type
                };
                vue_Post(THIS,'version/upload',data,callback,1,1,1,1);
                function callback(msg){
                    THIS.$message({
                        type: 'success',
                        message: '创建成功',
                        dangerouslyUseHTMLString:true
                    });
                    THIS.$router.replace(THIS.link);
                }; 
        },

        upRemove(){
            this.ruleForm.filepath = '';
        },

        upChange(event, file, fileList){
            this.get_token_up(file[0].raw);
        },

        get_token_up(file){
          var THIS = this;
          var data = { 
              token:window.localStorage.token,
              type:'apk'
            };
          vue_commonPost(THIS,'upload/getToken',data,callback,0,0,0,0);
          function callback(msg){
                var token = msg.token;
                var files = file;
                var key = msg.key;
                var putExtra = { fname: "", params: {} };
                var config = {
                    useCdnDomain: true,
                    region: null
                };
                var observer = {
                    next(res){},
                    error(err){}, 
                    complete(res){
                        console.log('上传成功',res);
                        THIS.ruleForm.filepath = res.key;
                    }
                };
                qiniu.upload(files, key, token, putExtra, config).subscribe(observer); // 上传开始
          };
        },

        get_detail(){
            var THIS = this;
            var data = { 
                id:THIS.id 
            };
            vue_Post(THIS,'version/details',data,callback,1,1,0,1);
            function callback(msg){
                THIS.fileList = [{name: msg.info.url,url: msg.info.url}];
                THIS.ruleForm = {
                    filepath:msg.info.url,
                    version:msg.info.ver,
                    content:msg.info.content,
                    is_force:parseInt(msg.info.is_force),
                    device_type:msg.info.device_type
                };
            };
      },

  },
   mounted(){

      this.store.commit('setPageText','当前位置：设置 / 上传版本');
      this.id = this.$route.params.id?this.$route.params.id:'';
      if(this.id){ this.get_detail() };


  }
}
</script>

<style scoped>
 
</style>
