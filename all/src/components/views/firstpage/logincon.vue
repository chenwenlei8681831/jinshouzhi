<template>

          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
                <div class="bg_fff">
                    <bot-header></bot-header>
                    <div class="views_100ch_1">
                        <!--顶部数据-->
                        <div class="pad_l_30 pad_r_30 w_100 header_item h_60px b_s font14">
                            登录日志（{{total}}）
                        </div>
                        <!--列表-->
                        <div class="list">
                            <ol class="list_header list_bg">
                                <li class="text_center h_50px pad_l_20 b_s f_l">类型</li>
                                <li class="text_center h_50px pad_l_20 b_s f_l">时间</li>
                                <li class="text_center h_50px pad_l_20 b_s f_l">IP</li>
                                <li class="text_center h_50px pad_l_20 b_s f_l">地区</li>
                                <li class="text_center h_50px pad_l_20 b_s f_l">设备</li>
                                <div class="clearfix"></div>
                            </ol>
                            <ul class="list_main">
                                <li  v-for="(item,index) in list" :key="index">
                                    <ol :class="index%2==1?'list_bg':''">
                                        <li class="text_center f_l pad_l_20 b_s" :title="item.channel_type">{{item.channel_type}}</li>
                                        <li class="text_center f_l pad_l_20 b_s" :title="item.create_time">{{item.create_time}}</li>
                                        <li class="text_center f_l pad_l_20 b_s" :title="item.ip">{{item.ip}}</li>
                                        <li class="text_center f_l pad_l_20 b_s" :title="item.address">{{item.address}}</li>
                                        <li class="text_center f_l pad_l_20 b_s" :title="item.device_type">{{item.device_type}}</li>
                                        <div class="clearfix"></div>
                                    </ol>
                                </li>
                            </ul>
                            <!--分页-->
                            <div class="page_footer b_s w_100 h_60px">
                                <el-pagination
                                    class="f_r"
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="page"
                                    :page-sizes="[10, 20, 30, 40]"
                                    :page-size=count
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total=total>
                                </el-pagination>
                                <div class="clearfix"></div>
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
      botHeader,
  },
  name: '',
  data(){
      return {
          id:'',
          page:1,
          count:10,
          total:0,
          list:[]
      }
  },
  methods:{

      getList(){
            var THIS = this;
            var data = sign({
                page:THIS.page,
                count:THIS.count,
            });
            vue_Post(THIS,'index/loginRecord',data,callback,1,1,1,1);
            function callback(msg){
                  THIS.total = msg.total;
                  THIS.list = msg.list;
            }; 
      },

      handleCurrentChange(val){
          this.page = val;
          this.getList();
      },

      handleSizeChange(val) {
          this.count = val;
          this.page = 1;
          this.getList();
      },

     

  },
   mounted(){

      this.store.commit('setPageText','当前位置：首页 / 登录日志');
      this.getList();
      
  }
}
</script>

<style scoped>
    .list_header li,.list_main ol li{
        width: 20%;
    }
    .header_item{
        line-height: 60px;
        color: #262626;
    }
</style>
