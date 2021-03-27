<template>


          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
              <div class="bg_fff">
                  <bot-header :link='link'></bot-header>
                  <div class="pad_all_30">
                      <div class="ct_title">评论信息</div>
                      <div class="flex row mar_t_30 baseInfo pad_b_20">
                          <div class="w_50 flex col" style="margin:0 auto;">
                              <div class="flex_1 flex col pad_l_20 pl">
                                  <div class="flex_1 font14"><span class="span_color">ID：</span>{{msg.id}}</div>
                                  <div class="flex_1 font14"><span class="span_color">员工姓名：</span>{{msg.username}}</div>
                                  <div class="flex_1 font14"><span class="span_color">联系电话：</span>{{msg.phone}}</div>
                                  <div class="flex_1 font14"><span class="span_color">所在企业：</span>{{msg.realtitle}}</div>
                                  <div class="flex_1 font14"><span class="span_color">评价驻厂：</span>{{msg.zhuchang}}</div>
                                  <div class="flex_1 font14"><span class="span_color">评价内容：</span>{{msg.content}}</div>
                                  <div class="flex_1 font14"><span class="span_color">评分：</span>{{msg.star}}</div>
                                  <div class="flex_1 font14"><span class="span_color">评价时间：</span>{{msg.createat}}</div>
                              </div>
                              <span v-show="permissions['comments.delete']==1" class="base_btn pl_btn" @click="deletes(msg.id)">删除评价</span>
                          </div>
  
                      </div>

                  </div>
              </div>
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
          permissions:'',
          link:'/home/employees/employeesTwo/employeesPj',
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
              type: 'warning',
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
       THIS = this;
       THIS.store.commit('setPageText','当前位置：员工 / 员工评价');
       THIS.permissions = JSON.parse(window.localStorage.permissions);
       THIS.id = THIS.$route.params.id?THIS.$route.params.id:'';
       THIS.get_detail();

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
