<template>


          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
              <div class="bg_fff">
                  <bot-header :link='link'></bot-header>
                  <div class="pad_all_30">
                      <div class="ct_title">评论信息</div>
                      <div class="flex row mar_t_30 baseInfo pad_b_20">
                          <div class="w_50 flex col" style="margin:0 auto;">
                              <div class="flex_1 flex col pad_l_20 pl">
                                  <div class="flex_1 font14">
                                      ID：
                                      {{msg.id}}
                                    </div>
                                  <div class="flex_1 font14">
                                      员工姓名：
                                      {{msg.username}}
                                    </div>
                                  <div class="flex_1 font14">
                                      联系电话：
                                      {{msg.phone}}
                                    </div>
                                  <div class="flex_1 font14">
                                      所在企业：
                                      {{msg.realtitle}}
                                    </div>
                                  <div class="flex_1 font14">
                                      评价驻厂：
                                      {{msg.zhuchang}}
                                    </div>
                                  <div class="flex_1 font14">
                                      评价内容：
                                      {{msg.content}}
                                    </div>
                                  <div class="flex_1 font14">
                                      评分：
                                      {{msg.star}}
                                    </div>
                                  <div class="flex_1 font14">
                                      评价时间：
                                      {{msg.createat}}
                                    </div>
                              </div>
                              <span class="base_btn pl_btn" @click="deletes(msg.id)">删除评价</span>
                          </div>
  
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
          id:'',
          zhuchangid:'',
          link:'',
          msg:{},
          isBack:true
      }
  },
  methods:{
     
      get_detail(){
            var THIS = this;
            var data = {
                commentsid:THIS.id
            };
            vue_Post(THIS,'comments/details',data,callback,1,1,1,1);
            function callback(msg){
                THIS.msg = msg;
            }; 
      },

      deletes(id){
          var THIS= this;
          THIS.id = id;
          THIS.$confirm('确定删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info',
          }).then(() => {
              THIS.deleteFunc();
          }).catch(() => {});
      },

      deleteFunc(){
            var THIS = this;
            var data = sign({ commentsid:THIS.id });
            vue_Post(THIS,'comments/delete',data,callback,1,1,1,1);
            function callback(msg){
                THIS.$message({
                    type: 'success',
                    message: '删除成功!',
                    dangerouslyUseHTMLString:true
                });
                THIS.isBack = false;
                THIS.$router.replace(THIS.link);
            }; 
      }

  },
   mounted(){  

      this.store.commit('setPageText','当前位置：驻厂 / 评价详情');
      this.id = this.$route.params.id?this.$route.params.id:'';
      this.zhuchangid = this.$route.params.zhuchangid?this.$route.params.zhuchangid:'';
      this.get_detail();
      this.link = '/home/zhuchang/zhuchangOne/zhuchangDatile/'+this.zhuchangid;

  }
  
}
</script>

<style scoped>
    .ct_title{
        padding-left: 30px;
        background: url(../../../assets/images/appraise.png) no-repeat left center /20px;
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
   
</style>
