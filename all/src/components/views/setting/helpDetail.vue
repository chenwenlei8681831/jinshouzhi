<template>


          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
              <div class="bg_fff"> 
                  <bot-header :link='link'></bot-header>
                  <div class="views_100ch_1 pad_all_30">
                      <div class="mar_t_30 baseInfo pad_b_20" style="width:700px;margin:0 auto;">
                          <div class="title">{{msg.title}}</div>
                          <div class="info flex row">
                              <span>发布人：{{msg.name}}</span>
                              <span class="mar_l_30">发布时间：{{msg.createat}}</span>
                          </div>
                          <div id="v_content" class="over_hide"></div>
                      </div>
                  </div>
              </div>
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
          link:'/home/message/messageOne/xtMessage',
          msg:{}
      }
  },
  methods:{
     
      get_detail(){
            var THIS = this;
            var data = {
                notice_id:THIS.id
            };
            vue_Post(THIS,'msg/msgInfoWithSystem',data,callback,1,1,1,1);
            function callback(msg){
                THIS.msg = msg;
                $('#v_content').html(msg.content);
            }; 
      },

  },
   mounted(){

      this.store.commit('setPageText','消息 / 系统消息详情');
      this.id = this.$route.params.id?this.$route.params.id:'';
      this.get_detail();

  },
  beforeDestroy(){
      this.store.commit('setPageText','当前位置：消息 / 系统消息');
  }
}
</script>

<style scoped>
   .title{
       font-size: 24px;
       line-height: 50px;
       color: #262626;
   }
   .info{
       height: 30px;
       line-height: 30px;
       font-size: 14px;
       color: #8C8C8C;
   }
   .content{
       white-space: pre-line;
   }
</style>
