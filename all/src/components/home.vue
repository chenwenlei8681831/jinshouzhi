<template>
  <div class="content">

            <el-header class="header pad_none f_x w_100" :class="colorArr[colorIndex]">
                  <div class="logo f_l h_100"></div>
                  <!--菜单顶部选项-->
                  <div class="nav_title f_l h_100" 
                      :class="tabIndex==index?'current':''" 
                      @click="change_tab(index)"
                      v-for="(item,index) in msg" 
                      :key="index"
                      v-show="permissions[item.title]==1">
                      {{item.title}}
                  </div>

                  <!--顶部右边:退出-->
                  <div @click="login_out" class="list_co02 f_r h_100 big_btn font12" style="width:60px">退出</div>
                  <!--信息-->
                  <div class="mar_l_30 r_home f_r b_s h_100 big_btn big_btn01 po_r text_btn over_hide">
                      <img class="v_img d_l_block mar_r_10" v-if="user.headimgurl" :src="user.headimgurl" alt="">
                      <span v-else class="v_img d_l_block mar_r_10">A</span>
                      {{user.username?user.username:'--'}}
                      <div class="accountInfo_box po_x bg_fff b_s pad_all_20">
                          <span class="sjx d_block po_b"></span>
                          <div class="b_line title font14 flex row j_between">
                              <div class="flex_1 font14">
                                  <img class="v_img d_l_block mar_r_10" v-if="user.headimgurl" :src="user.headimgurl" alt="">
                                  <span v-else class="v_img d_l_block mar_r_10">A</span>
                                  {{user.username?user.username:'--'}}
                              </div>
                               <p class="font14">{{user.rule?user.rule:'身份未知'}}</p>
                          </div>
                          <p class="font14 b_s s_l mar_t_10"><span>本次登录时间</span>：{{user.the_login_time?user.the_login_time:'--'}}</p>
                          <p class="font14 b_s s_l"><span>登录地区</span>：{{user.address?user.address:'--'}}</p>
                          <p class="font14 b_s s_l"><span>上次登录时间</span>：{{user.last_login_time?user.last_login_time:'--'}}</p>
                      </div>
                  </div>
                  <!--颜色-->
                  <div class="f_r h_100 big_btn big_btn02 color_change">
                      <div class="color_box po_x bg_fff b_s ">
                          <span class="sjx d_block po_b"></span>
                          <div @click="change_color(index)" class="f_l color_item" v-for="(item,index) in colorArr" :key="index" :class="item"></div>
                          <div class="clearfix"></div>
                      </div>
                  </div>
                  <!--消息-->
                  <div class="f_r h_100 big_btn big_btn03 gn_change po_r ">
                      <span class="po_b yuan"
                          v-show="messageList[0].number!=0||
                                  messageList[1].number!=0||
                                  messageList[2].number!=0||
                                  messageList[3].number!=0||
                                  messageList[4].number!=0||
                                  messageList[5].number!=0">
                      </span>
                      <div class="gn_box po_x bg_fff b_s pad_all_20">
                          <span 
                            class="sjx d_block po_b"
                          ></span>
                          <ul class="b_s pad_l_20 pad_r_20 flex row worp j_between">
                              <li @click="xx_to_view(item.index,item.itemIndex,item.sonIndex,item.permissions,m_index)" v-for="(item,m_index) in messageList" :key="m_index" class="w_45">{{item.title}}<span :class="item.number?'co_red':''">（{{item.number}}）</span></li>
                          </ul>
                      </div>
                  </div>
                  <!--5-->
                  <div class="f_r h_100 big_btn big_btn05 text_btn flex" @click="show_gj">
                      <span class="d_block flex_1 text_right s_l">{{cityName?cityName:'请选择'}}</span>
                  </div>
                  <div class="clearfix"></div>

            </el-header>
            
            <el-container class="container">
                <el-aside class="nav bg_fff b_s margin_bottom" style="width:2.5rem;">
                    <div v-for="(item,index) in msg[tabIndex].son" :key="index">
                        <div class="son_title w_100 h_50px">{{item.title}}</div>
                        <div class="" @click="da_nav_item">
                            <router-link v-show="permissions[small_item.permissions]==1" class="nav_item" v-for="(small_item,small_index) in item.list" :key="small_index" :to="small_item.url">{{small_item.title}}</router-link>
                        </div>
                    </div>
                </el-aside>
                <div class="scroll_bar views_box w_100 margin_bottom">
                    <router-view></router-view>
                </div>
            </el-container>

            <!--选择省份-->
            <el-dialog title="切换省份"  width="500px" :closeOnClickModal='false'  :visible.sync="show_flag"  >
                <div>
                    <el-form label-width="80px" >
                        <div class="flex row j_between">
                            <el-form-item class="w_100" label="切换省份">
                                <el-select class="w_100" v-model="city" filterable placeholder="请选择省份">
                                    <el-option v-for="(item,index) in cityArr" :key="index" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </el-dialog>

  </div>
</template>

<script>
var THIS;
export default {
  name: '',
  computed: {
        watchNavIndex() {
            return this.store.state.navIndex;
        },
        watchCity() {
            return this.city;
        },
  },
  watch:{
        watchNavIndex(index) {
            THIS = this;
            THIS.tabIndex = index;
            window.localStorage.tabIndex = index;
        },
        watchCity(msg) {
            THIS = this;
            window.localStorage.cityId = msg;
            console.log(32132132131,msg)
            console.log(window.localStorage.cityId);
            THIS.store.commit('setCityId',msg);
            for(let i=0;i<THIS.cityArr.length;i++){
                if(THIS.cityArr[i].id==THIS.city){
                    THIS.cityName = THIS.cityArr[i].name;
                    window.cityId = THIS.cityArr[i].id;
                }
            };
            THIS.show_flag = false;
        },
  },
  data (){
    return {
        user:{},
        //切换省份
        show_flag:false,
        city:'',
        cityName:'',
        cityArr:[],
        //权限
        permissions:'', 
        tabIndex:window.localStorage.tabIndex?window.localStorage.tabIndex:0,
        pageText:this.store.state.pageText,
        msg: this.store.state.navmsg,
        colorIndex:window.localStorage.colorIndex?window.localStorage.colorIndex:0,
        colorArr:['bg_color01','bg_color02','bg_color03','bg_color04','bg_color05','bg_color06','bg_color07','bg_color08'],
        messageNum:50,
        messageList:[
          { title:'系统通知',number:0,index:7,itemIndex:0,sonIndex:0,permissions:'msg.msglistwithsystem' },
          { title:'员工动态',number:0,index:7,itemIndex:0,sonIndex:1,permissions:'msg.msglistwithflow' },
          { title:'招工信息',number:0,index:7,itemIndex:0,sonIndex:2,permissions:'msg.msglistwithsystem' },
          { title:'借支消息',number:0,index:6,itemIndex:0,sonIndex:0,permissions:'jiezhi.list' },
          { title:'代扣消息',number:0,index:6,itemIndex:1,sonIndex:0,permissions:'daikou.list' },
          { title:'投诉消息',number:0,index:4,itemIndex:0,sonIndex:2,permissions:'suggestion.list' },
        ],
        
    }
  },
  methods:{

      change_tab(index){
          var THIS = this;
          //保存上一层index
          window.localStorage.beforNavIndex = THIS.tabIndex;
          THIS.tabIndex = index;
          THIS.store.commit('setNavIndex',index);
          window.localStorage.tabIndex = index;
          THIS.$router.push(THIS.msg[THIS.tabIndex].son[0].list[0].url);
      },

      change_color(index){
          this.colorIndex =index;
          window.localStorage.colorIndex = index;
      },

      login_out(){
          var THIS = this;
          THIS.$confirm('确定退出登录吗, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
              THIS.$message({
                  type: 'success',
                  message: '退出成功!',
                  dangerouslyUseHTMLString:true
              });
              THIS.login_outFunc();
              window.localStorage.token = '';
              window.localStorage.userInfo = '';
              THIS.store.commit('setToken','');
              THIS.store.commit('setUserInfo','');
              THIS.cleartoken();
              THIS.$router.replace('/login');
          }).catch(() => {
            THIS.$message({
              type: 'success',
              message: '已取消',
              dangerouslyUseHTMLString:true
            });          
          }); 
      },

      login_outFunc(){
            var THIS = this;
            var data = {
                token : window.localStorage.token
            };
            vue_commonPost(THIS,'login/logout',data,callback,0,0,0,0);
            function callback(msg){}; 
      },

      show_gj(){
          this.show_flag = true;
      },

      gj_btnClikc(type){
          var THIS = this;
          if(type==0){
              THIS.city = ''
          }else if(type==1){
              THIS.city = ''
          }else if(type==2){
              THIS.city = ''
          };
          THIS.show_flag = false;
      },  

      cleartoken(){
            var THIS = this;
            var data = {};
            vue_commonPost(THIS,'login/logout',data,callback,0,0,0,0);
            function callback(msg){
                //
            }; 
      },

      //获取消息数/省份
      get_messageNumber(){
            var data = {};
            vue_Post(THIS,'msg/index',data,callback,0,0,0,0);
            function callback(msg){
                for(let i=0;i<6;i++){
                    THIS.messageList[i].number = msg.list[i].unread;
                };
                THIS.cityArr = msg.provinces;
                if(window.localStorage.cityId){
                    THIS.city = parseInt(window.localStorage.cityId);
                }else{
                    THIS.cityName = msg.provinces[0].name;
                    THIS.city = msg.provinces[0].id;
                };
            };
      },

      //消息
      xx_to_view(index,itemIndex,sonIndex,permissions,m_index){
          var THIS = this;
          if(!index){//未开通功能
              THIS.$confirm('功能暂未开通，请耐心等待...', '提示', {
                confirmButtonText: '确定',
                type: 'warning',
              })
          }else if(index==100){//解绑
              THIS.$emit('jiebang');
          }else{//快捷操作
              if(THIS.permissions[permissions]==1){
                  THIS.messageList[m_index].number = 0;
                  window.localStorage.beforNavIndex = THIS.tabIndex;
                  THIS.store.commit('setNavIndex',index);
                  THIS.$router.push(THIS.msg[index].son[itemIndex].list[sonIndex].url);
              }else{//暂无操作权限
                  THIS.$confirm('暂无操作权限...', '提示', {
                      confirmButtonText: '确定',
                      type: 'warning',
                  })
              };
          };
      },

      da_nav_item(){
          window.localStorage.beforNavIndex = this.tabIndex;
      }
      
  },
  mounted(){

      THIS = this;
      THIS.permissions = JSON.parse(window.localStorage.permissions);
      THIS.user = JSON.parse(window.localStorage.userInfo);
      THIS.get_messageNumber();
      //监听浏览器返回事件
      window.addEventListener("popstate", function(e) {
          THIS.store.commit('setNavIndex',window.localStorage.beforNavIndex);
      }, false);
      
  },
};
</script>


<style scoped>
  .content{
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    margin: 0;
    color: #000;
    overflow: hidden;
  }
  .header{
    height: 0.64rem!important;
  }
  .header .logo{
      width: 2.5rem;
      background: url(../assets/images/logo.png) no-repeat 0.3rem center /1.3rem;
  }
  .nav_title{
      width: 0.8rem;
      height: 0.64rem;
      line-height: 0.64rem;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
      color: #262626;
  }
  .nav_title.current{
    color: #007DF2;
    background:rgba(0,125,242,0.1);
  }
  .header .big_btn{
    width: 20px;
    line-height: 0.64rem;
    cursor: pointer;
    background: no-repeat center /18px;
    font-size: 14px;
    color: #262626;
    padding: 0 15px;
  }
  .big_btn.big_btn01{
      width: 100px!important;
      padding: 0;
  }
  .big_btn.big_btn02{
    background-image: url(../assets/images/firstpage/yf.png) ;
  }
  .big_btn.big_btn03{
    background-image: url(../assets/images/firstpage/message.png) ;
  }
  .big_btn.big_btn04{
    background-image: url(../assets/images/firstpage/nav01.png) ;
  }
  .big_btn.big_btn05{
      margin: 0 10px 0 0;
      padding-right: 20px;
      background:url(../assets/images/firstpage/tagger.png) no-repeat right center /18px;
  }
  .container{
    box-sizing: border-box;
  }
  .son_title{
    color: #007DF2;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    box-sizing: border-box;
    padding-left: 20px;
    /*background: url(../assets/images/bottom_arrow01.png) no-repeat right 10px center /12px;*/
  }
  .son_title.current{
    background-image: url(../assets/images/top_arrow01.png);
  }
  .nav{
    height: 100vh;
    padding-top: 0.64rem;
  }
  .nav a{
    display: block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    box-sizing: border-box;
    padding-left: 40px;
    color: #333;
  }
  .nav a.router-link-active{
    color: #409EFF;
    background:rgba(0,125,242,0.1);
  }
  .nav_icon{
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.05rem;
    width: 0.24rem;
    height: 0.24rem;
    text-align: center;
    font-size: 0.18rem;
    border: red 0.01rem solid;
    box-sizing: border-box;
  } 
  .views_box{
    width: calc(100% - 2.56rem);
    height: 100vh;
    box-sizing: border-box;
    background: #F4F9FF;
    overflow: auto;
    padding-top: 0.64rem;
  }
  .nav_item.current{
    color: red;
  }
  .sjx{
    width: 20px;
    height: 10px;
    left: 10px;
    top: -9px;
    background: url(../assets/images/firstpage/trangle.png) no-repeat center /100%;
  }
  .color_box{
    width: 360px;
    height: 180px;
    top: 0.6rem;
    right: 0.6rem;
    z-index: 999;
    border-radius: 10px;
    display: none;
    box-shadow:0px 2px 10px 0px rgba(207,228,255,0.7);
  }
  .color_box .sjx{
    left: 162px;
  }
  .color_item{
      width: 60px;
      height: 60px;
      margin: 15px;
      cursor: pointer;
  }
  .color_change:hover .color_box{
    display: block;
  }
  .accountInfo_box{
    width: 360px;
    top: 0.6rem;
    right: 0.6rem;
    z-index: 999;
    border-radius: 10px;
    display: none;
    box-shadow:0px 2px 10px 0px rgba(207,228,255,0.7);
  }
  .accountInfo_box .sjx{
    left: 240px;
  }
  .accountInfo_box .title{
    height:40px;
    line-height: 40px;
    color: #262626;
  }
  .accountInfo_box p{
    height:32px;
    line-height: 32px;
    color: #262626;
  }
  .accountInfo_box p span{
    color: #8C8C8C;
  }
  .gn_box{
    width: 360px;
    top: 0.6rem;
    right: 0.6rem;
    z-index: 999;
    border-radius: 10px;
    display: none;
    box-shadow:0px 2px 10px 0px rgba(207,228,255,0.7);
  }
  .gn_box .sjx{
    left: 112px;
  }
  .big_btn01:hover .accountInfo_box{
    display: block;
  }
  .gn_change:hover .gn_box{
    display: block;
  }
  .gn_box ul li{
    line-height: 32px;
    font-size: 14px;
  }
  .co_red{
    color: #F35149;
  }
  .left_line{
    width: 4px;
    height: 20px;
    background: green;
    left: 0;
    top: 15px;
  }
  .info_box{
    width: 5rem;
    height: 3rem;
    top: 0.6rem;
    right: 0;
    z-index: 999;
    display: none;
  }
  .big_btn:hover .info_box{
    display: block;
  }
  .circle{
    right: 0.1rem;
    top: 0.1rem;
    font-size: 0.18rem;
  }
  .f_x{
      left: 0;
      top: 0;
  }
  .text_btn{
    width: 70px!important;
  }
  .r_home{
    padding-left: 24px;
    color: #262626;
  }
  .big_btn01 .v_img{
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    border-radius: 50%;
    vertical-align: middle;
    color: #fff;
    background-color: #5DB1FF;
  }
  .yuan{
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: red;
    left: 50%;
    top: 50%;
    margin-top: -10px;
    margin-left: 4px;
  }
</style>
