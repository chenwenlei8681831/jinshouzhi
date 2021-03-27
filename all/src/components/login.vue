<template>

  <div class="views bg">

          <div class='box flex col b_s'>
              <div class="bg_fff" style="height:400px;box-shadow:0px 2px 10px 0px rgba(196,212,251,0.5)">
                  <div class="h_60px row flex ">
                      <div class="flex_1 h_100 text_center pointer all_line" style="border-right:none;" :class="show_type==1?'current':''" @click="change_type(1)">
                        <span class="lo_span lo_span01"></span>扫码登录
                      </div>
                      <div class="flex_1 h_100 text_center pointer all_line" :class="show_type==2?'current':''" @click="change_type(2)">
                        <span class="lo_span lo_span02"></span>账号密码登录
                      </div>
                  </div>
                  <div class="flex_1 b_s pad_t_20" v-show="show_type==1">
                      <h1 class="text_center mar_t_10">扫码后点击“确认授权”，即可完成账号登录</h1>
                      <p class="text_center mar_t_10 mar_b_10 font_bold">-- -- -- -- -- -- -- --</p>
                      <div class="bg_box po_r pointer" @click="do_erweima()">
                          <img class="" :src="img" alt="">
                          <div class="po_b b_s" v-show="success">
                              <h1 class="text_center co_fff font16">扫码成功</h1>
                              <p class="text_center co_fff font14 mar_t_10">请在金手指手机端确认登录</p>
                          </div>
                      </div>
                  </div>
                  <div class="bg_fff flex_1 b_s pad_t_20 inp_box" v-show="show_type==2">
                      <el-form class="demo-ruleForm" :model="ruleForm" label-position='left' :rules="rules" ref="ruleForm" >
                          <div class="po_r mar_t_20">
                              <el-form-item class="w_100"  prop="account">
                                  <el-input v-model="ruleForm.account" placeholder="请输入账号" autocomplete="off" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" clearable></el-input>
                              </el-form-item>
                          </div>
                          <div class="po_r mar_t_40">
                              <el-form-item class="w_100"  prop="password">
                                  <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" autocomplete="off" clearable></el-input>
                              </el-form-item>
                          </div>
                          <div class="bogin_btn pointer mar_t_40"  @click="submitForm('ruleForm')">登录</div>
                          <p class="font12 mar_t_10"><span :class="isflag?'current':''" class="c_span " @click="isJz()"></span>记住密码</p>
                      </el-form>
                  </div>
              </div>  
          </div>
        
  </div>

</template>

<script>
var THIS;
export default {
  name: '',
  data(){
    return { 
        isflag:true,
        username:'',
        password:'',
        ws:'',
        img:'',
        show_type:1,
        success:false,
        ruleForm:{
          account:'',
          password:''
        },
        rules:{
          account:[{ required: true, message: '请输入账号',trigger:[] }],
          password:[{ required: true, message: '请输入密码',trigger: [] }]
        },
    }
  },
  methods:{

      login(){
            var data = { 
                username:THIS.ruleForm.account,
                password:THIS.ruleForm.password,
                udid:'123',
                deviceToken:'' 
            };
            vue_commonPost(THIS,'login/login',data,callback,1,1,1);
            function callback(msg){
                  window.localStorage.username = THIS.ruleForm.account;
                  window.localStorage.password = THIS.isflag?THIS.ruleForm.password:'';
                  window.localStorage.tabIndex = 0;
                  window.localStorage.permissions = JSON.stringify(msg.access);
                  THIS.store.commit('setUserInfo',msg.user);
                  THIS.store.commit('setToken',msg.token);
                  window.localStorage.userInfo = JSON.stringify(msg.user);
                  window.localStorage.token = msg.token;
                  THIS.ws.onclose();
                  THIS.$router.replace('/home');
            }; 
      },

      isJz(){
          this.isflag = !this.isflag;
      },

      change_type(type){
        this.show_type = type; 
        if(type==1){
            this.ws.send('{"s":"login/index","appType":"2"}');
        };
      },

      //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log('valid',valid)
          if (valid) {
            THIS.login();
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

      do_erweima(){
          this.ws.send('{"s":"login/index","appType":"2"}');
      }
      
  },
  mounted(){

      THIS = this;
      THIS.show_type = 1;
      $(document).keydown(function(event){
      　　if(event.keyCode==37){
          　	THIS.show_type = 1;
          }else if(event.keyCode==39){
          　	THIS.show_type = 2;
          }else if(event.keyCode==13){
              //
              console.log('执行这里');
          };
      });
      window.localStorage.permissions = [];  //清空权限
      window.localStorage.beforNavIndex = 0;
      window.localStorage.cityId = '';
      // websokt
      THIS.ws = new WebSocket(window.localStorage.ws);

      // 建立 web socket 连接成功触发事件
      THIS.ws.onopen = function() {
          THIS.ws.send('{"s":"login/index","appType":"2"}');
      };

      // 接收服务端数据时触发事件
      THIS.ws.onmessage = function(evt) {
          var data = JSON.parse(evt.data).data;
          console.log('data',data);
          if(data.action=='index'){
              THIS.img = data.url;
              window.Location.href = THIS.img;
          }else if(data.action=='notice'&&data.step==1){
              THIS.success = true;
          }else if(data.action=='notice'&&data.step==2){
              window.localStorage.tabIndex = 0;
              window.localStorage.username = data.user.user.phone;
              window.localStorage.token = data.user.token;
              window.localStorage.userInfo = JSON.stringify(data.user.user);
              THIS.store.commit('setToken',data.user.token);
              THIS.store.commit('setUserInfo',data.user.user);
              //获取权限
              window.localStorage.permissions = JSON.stringify(data.user.access);
              THIS.$router.replace('/home');
          };
          
      };

      //断开连接
      THIS.ws.onclose = function() {//关闭连接
			    console.log("关闭连接");
      };

      THIS.ruleForm.account = window.localStorage.username ;
      THIS.ruleForm.password = window.localStorage.password;

  }
}
</script>

<style scoped>
  .views{
    position: relative;
    background: url(../assets/images/login/bg.png) no-repeat center /100% 100%;
  }
  .box{
    width: 500px;
    height:540px;
    position: absolute; top:50%; left: 50%;
    margin-top:-300px;
    margin-left: -250px;
    padding-top: 140px;
    background: url(../assets/images/logo02.png) no-repeat center 20px /180px;
  }
  .box .h_60px{
    line-height: 60px;
  }
  .box .h_60px .current{
    color: #007DF2;
    border-bottom: 3px solid #007DF2;
  }
  .edit_button{
    display: block;
    margin: 60px auto 0;
  }
  .views{
    height: 100vh;
  }
  .bg_box{
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }
  .bg_box .po_b{
    width: 100%;
    height: 100%;
    background: url(../assets/images/login/success.png) no-repeat center 50px /50px;
    background-color:rgba(0,0,0,0.7);
    left:0;
    top:0;
    z-index: 99;
    color: #fff;
    padding-top: 110px;
  }
  img{
    display: block;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  h1{
    color: #8C8C8C;
    font-size: 16px;
  }
  .inp_box{
    padding: 50px 70px;
  }
  .bogin_btn{
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 4px;
    background: #007DF2;
    color: #fff;
  }
  span.d_block{
    width: 50px;
    text-align: center;
    top: 0;
    left:0;
    line-height: 40px;
    z-index: 999;
  }
  .lo_span{
      display: inline-block;
      width: 16px;
      height: 16px;
      vertical-align: middle;
      margin-right: 5px;
      background:  no-repeat center /100%;
  }
  .lo_span01{
      background-image: url(../assets/images/login/ewm01.png);
  }
  .lo_span02{
      background-image: url(../assets/images/login/pic01.png);
  }
  .current .lo_span01{
      background-image: url(../assets/images/login/ewm.png);
  }
  .current .lo_span02{
      background-image: url(../assets/images/login/pic.png);
  }
  .mar_t_40{
    margin-top: 40px;
  }
</style>
