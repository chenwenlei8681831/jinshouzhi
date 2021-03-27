<template>


          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
              <div class="bg_fff">
                  <bot-header :link='link'></bot-header>
                  <div class="pad_all_30">
                      <div class="ct_title">操作日志详情</div>
                      <div class="flex row mar_t_30 baseInfo pad_b_20">
                          <div class="w_50 flex col" style="margin:0 auto;">
                              <div class="flex_1 flex col pad_l_20 pl">
                                  <div class="flex_1 font14"><span class="span_color">ID：</span>{{msg.id}}</div>
                                  <div class="flex_1 font14"><span class="span_color">操作人员：</span>{{msg.operate_user?msg.operate_user:'--'}}</div>
                                  <div class="flex_1 font14"><span class="span_color">操作类型：</span>{{msg.operate?msg.operate:'--'}}</div>
                                  <div class="flex_1 font14"><span class="span_color">操作内容：</span>{{msg.content?msg.content:'--'}}</div>
                                  <div class="flex_1 font14"><span class="span_color">操作IP：</span>{{msg.ip?msg.ip:'--'}}</div>
                                  <div class="flex_1 font14"><span class="span_color">操作时间：</span>{{msg.operate_time?msg.operate_time:'--'}}</div>
                                  <div class="flex w_100 row a_start">
                                       <div class="item_left line_height_40 span_color">数据变动：</div>
                                       <div class="item_right flex_1 flex col">
                                            <div class="list_co08 font14 line_height_40 worp" v-for="(item,index) in list">{{(index+1)+' : '+item.change_data}}</div>
                                       </div>
                                  </div>
                              </div>
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
          link:'/home/permissions/permissionsThree/permissions_rz',
          msg:{},
          list:[],
      }
  },
  methods:{
     
      get_detail(){
            var data = {};
            THIS.vue_Get(THIS,'admin/operation/'+THIS.id,data,callback,1,1,1,1);
            function callback(msg){
                THIS.msg = msg.operation;
                THIS.list = msg.change_datas;
                THIS.list.map(item=>{
                    item.change_data = item.change_data.replace(/->/g,"  --->  ");
                });
            }; 
      },


     
  },
   mounted(){
        THIS = this;
        THIS.store.commit('setPageText','当前位置：权限 / 操作日志');
        THIS.id = THIS.$route.params.id?THIS.$route.params.id:'';
        THIS.get_detail();

  },
  
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
    .line_height_40{
        line-height: 40px;
    }
    .item_left{
        width:100px;
    }
</style>
