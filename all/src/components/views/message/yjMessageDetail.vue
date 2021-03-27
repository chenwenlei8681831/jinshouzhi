<template>


          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
              <div class="bg_fff"> 
                    <bot-header :link='link'></bot-header>
                    <div class="pad_all_30">
                        <div class="ct_title">反馈详情</div>
                        <div class="flex row mar_t_30 baseInfo pad_b_20">
                            <div class="w_50 flex col" style="margin:0 auto;">
                                <div class="flex_1 flex col pad_l_20 pl">
                                    <div class="flex_1 font14"><span class="span_color">ID：</span>{{msg.id?msg.id:'--'}}</div>
                                    <div class="flex_1 font14"><span class="span_color">反馈内容：</span>{{msg.content}}</div>
                                    <div class="flex_1 font14">
                                        <span class="span_color">联系图片：</span>
                                        <img class="picture mar_l_20" v-for="(item,index) in msg.pictures" :key="index" :src="item" alt="">
                                    </div>
                                    <div class="flex_1 font14"><span class="span_color">反馈人：</span>{{msg.username}}</div>
                                    <div class="flex_1 font14"><span class="span_color">反馈时间：</span>{{msg.createat}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
              </div>
          </div>
  
</template>

<script>
import botHeader from '../../components/bot-header/bot-header';
var THIS;
export default {
  components:{
    botHeader
  },
  name: '',
  data(){
      return {
          link:'/home/message/messageFour/yjMessage',
          msg:{
              pictures:[]
          }
      }
  },
  methods:{
     
        get_detail(){
                var data = { suggestionid:THIS.id };
                vue_Post(THIS,'suggestion/details2',data,callback,0,0,0,0);
                function callback(msg){
                    THIS.msg = msg.info;
                    THIS.msg.pictures = msg.info.pictures?msg.info.pictures.split(','):'';
                }; 
        },

  },
   mounted(){
        THIS = this;
        THIS.store.commit('setPageText','消息 / 系统消息详情');
        THIS.id = THIS.$route.params.id?THIS.$route.params.id:'';
        THIS.get_detail();

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
   .pl .flex_1{
        line-height: 40px;
        cursor: pointer;
    }
    .pl_btn{
        color: #F4514A;
        border-color: #F4514A;
        border-radius: 3px;
        margin: 20px auto;
        cursor: pointer;
        font-size: 14px;
    }
    .ct_title {
        padding-left: 30px;
        background: url(../../../assets/images/problem.png) no-repeat left center /20px;
    }
    .picture{
        width: 1rem;
        height:1rem;
    }
</style>
