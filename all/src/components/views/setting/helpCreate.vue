<template>

         <div class="views h_bottom po_r pad_l_50 pad_r_50 b_s mr_color01">
                <bot-header :link='link'></bot-header>
                <el-form :model="ruleForm" label-position='left' :rules="rules" ref="ruleForm" class="views_100ch_2 demo-ruleForm">
                    <div class="from_box flex j_center">
                        <div class="b_s pad_l_30 pad_r_30 mar_t_30" style="width:780px;">
                            <div class="w_100 flex row j_between">
                                <p class="font14" style="width:100px;line-height:32px;"><span style="color:#F35149;">*</span>消息标题</p>
                                <el-form-item class="flex_1" label="" prop="title">
                                    <el-input v-model="ruleForm.title" clearable placeholder="请输入消息标题"></el-input>
                                </el-form-item>
                            </div>
                            <!--富文本编辑器-->
                            <div class="w_100 flex row mar_t_30" style="margin-bottom:60px">
                                <p class="font14" style="width:100px;line-height:42px;"><span style="color:#F35149;">*</span>内容详情</p>
                                <quill-editor 
                                    class="flex_1"
                                    style="height:200px;width:calc(100% - 100px);"
                                    v-model="content"
                                    ref="myQuillEditor" 
                                    :options="editorOption"
                                ></quill-editor>
                            </div>
                            <div class="w_100" style="height:100px"></div>
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
import { quillEditor } from 'vue-quill-editor';
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction
    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],
    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['link', 'image'],
    ['clean']
  ]

export default {
  components:{
    botHeader,
    submitBtn,
    quillEditor
  },
  name: '',
  data(){
      return {
          id:'',
          isBack:true,
          link:'/home/setting/settingOne/helpList',
           //富文本编辑器
          editorOption:{
                modules:{
                    toolbar:[
                        //['bold','italic','strike','image','underline',{ 'color': [] }],关闭富文本插入图片
                        ['bold','italic','strike','image','underline',{ 'color': [] }]
                    ]
                }
          },
          content:'',
          ruleForm:{
              title:''
          },
          rules:{
              title:[{ required: true, message: '请输入标题', trigger: [] }]
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

      //清空表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.content = '';
      },

      submit_from(){
            var THIS = this;
            var data = {
                title:THIS.ruleForm.title,
                content:THIS.content
            };
            vue_Post(THIS,'help/add',data,callback,1,1,1,1);
            function callback(msg){
                THIS.$message({
                    type: 'success',
                    message: '添加成功',
                    dangerouslyUseHTMLString:true
                });
                THIS.$router.replace('/home/setting/settingOne/helpList');
            }; 
      },
     

  },
   mounted(){

      this.store.commit('setPageText','当前位置：设置/ 添加内容');
      $('.ql-editor').attr('data-placeholder','请输入...');

  }
}
</script>

<style scoped>
 
</style>
