<template>


          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
              <div class="bg_fff">
                  <bot-header :link='link'></bot-header>
                  <div class="pad_all_30">
                      <div class="ct_title current">投诉信息</div>
                      <div class="b_line flex row mar_t_30 baseInfo pad_b_20">
                          <div class="flex_1 flex col">
                              <div class="flex_1 flex row">
                                  <div class="flex_1 flex col pad_l_50 pl">
                                      <div class="flex_1 font14">ID：{{msg.id}}</div>
                                      <div class="flex_1 font14">联系电话：{{msg.phone}}</div>
                                      <div class="flex_1 font14">投诉驻厂：{{msg.zhuchangname}}</div>
                                      <div class="flex_1 font14">投诉内容：{{msg.content}}</div>
                                  </div>
                              </div>
                          </div>
                          <div class="flex_1 flex col">
                              <div class="flex_1 flex col pad_l_50 pl">
                                  <div class="flex_1 font14">员工姓名：{{msg.username}}</div>
                                  <div class="flex_1 font14">所在企业：{{msg.companyname}}</div>
                                  <div class="flex_1 font14">投诉时间：{{msg.createat}}</div>
                                  <div class="flex_1 font14"></div>
                              </div>
                          </div>
                          <div class="flex col" style="width:180px;">
                              <div class="top h_40px flex row j_between">
                                  <span class="d_block base_btn base_btn_co01 font14 pointer" @click="send_btn()">回复Ta</span>
                                  <span class="d_block base_btn base_btn_co02 font14 pointer" @click="deletes(msg.id)">删除投诉</span>
                              </div>
                          </div>
                      </div>
                      <div class="ct_title mar_t_30">回复内容</div>
                      <ul class="pad_l_30">
                          <li class="mar_t_20 mar_b_20 font14" :class="item.isself==0?'isme':'ishe'" v-for="(item,index) in replys" :key="index">
                              <span class="f_l hf_span">{{item.isself==0?'回复Ta的':'Ta回复的'}}：</span>
                              <p class="f_l hf_p">{{item.content}}</p>
                              <span class="f_r timer">{{item.createat}}</span>
                              <div class="clearfix"></div>
                          </li>
                      </ul>
                      <p class="font14 text_center list_co0" style="line-height:50px" v-if="replys.length==0">暂无数据</p>
                  </div>
              </div>
              <el-dialog title="回复Ta"  :visible.sync="show_flag" width="700px" >
                    <el-input class="w_100" 
                        style="line-height:30px;"  
                        type="textarea" v-model="send_content"
                        :autosize="{ minRows: 6}" 
                        placeholder="请输入回复内容">
                    </el-input>
                    <span slot="footer" class="flex j_center w_100 dialog-footer">
                        <el-button  @click="send()" type="primary">发送回复</el-button>
                    </span>
              </el-dialog>
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
          replys:[],
          isBack:true,
          //弹窗回复
          show_flag:false,
          send_content:''
      }
  },
  methods:{
     
      get_detail(){
            var THIS = this;
            var data = {
                suggestionid:THIS.id
            };
            vue_Post(THIS,'suggestion/details',data,callback,1,1,1,1);
            function callback(msg){
                THIS.msg = msg.info;
                THIS.replys = msg.replys;
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
            var data = sign({ suggestionid:THIS.id });
            vue_Post(THIS,'suggestion/delete',data,callback,1,1,1,1);
            function callback(msg){
                THIS.$message({
                    type: 'success',
                    message: '删除成功!',
                    dangerouslyUseHTMLString:true
                });
                THIS.isBack = false;
                THIS.$router.replace(THIS.link);
            }; 
      },

      send_btn(){
          this.show_flag = true;
      },

      send(){
            var THIS = this;
            var data = sign({ 
                id:THIS.id ,
                content: THIS.send_content
            });
            vue_Post(THIS,'suggestion/reply',data,callback,1,1,1,1);
            function callback(msg){
                THIS.$message({
                    type: 'success',
                    message: '评论成功!',
                    dangerouslyUseHTMLString:true
                });
                THIS.isBack = false;
                THIS.show_flag = false;
                THIS.send_content = '';
                THIS.get_detail();
            }; 
      }

  },
   mounted(){

      this.store.commit('setPageText','当前位置：驻厂 / 投诉详情');
      this.id = this.$route.params.id?this.$route.params.id:'';
      this.zhuchangid = this.$route.params.zhuchangid?this.$route.params.zhuchangid:'';
      this.get_detail();
      this.link = '/home/zhuchang/zhuchangOne/zhuchangDatile/'+this.zhuchangid;

  }
}
</script>

<style scoped>
 
    .ct_title.current{
        padding-left: 30px;
        background: url(../../../assets/images/tousu.png) no-repeat left center /20px;
    }
    .pl .flex_1{
        height: 40px;
        line-height: 40px;
        cursor: pointer;
    }
    .bg_color{
        background: #FCFCFC!important;
    }
    ul li .f_l,ul li .f_r{
        line-height: 30px;
        color: #595959;
    }
    .base_btn_co01{
        color: #007DF2;
        border-color: #007DF2;
    }
    .base_btn_co02{
        color: #F4514A;
        border-color: #F4514A;
    }
    .hf_p{
        width: 500px;
    }
    .isme .hf_p{
        color: #8C8C8C;
    }
    .ishe .hf_span{
        color: #8C8C8C;
    }
    .isme .timer{
        color: #8C8C8C;
    }
</style>
