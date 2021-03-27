<template>

          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
              <div class="bg_fff">
                  <bot-header :link='link'></bot-header>
                  <div class="views_100ch_1 pad_all_30">
                      <div class="ct_title">基本信息</div>
                      <div class="flex row b_line mar_t_30 baseInfo pad_b_20">
                          <div class="flex_1 flex col" style="height:350px">
                              <div class="flex_1 flex row">
                                    <img v-if="picture" class="d_block b_radius50" style="width:100px;height:100px;" :src="picture" alt="">
                                    <div v-else class="moren d_block b_radius50" style="width:100px;height:100px;"></div>
                                    <div class="flex_1 flex col pad_l_20">
                                        <div v-for="(item,index) in left" :key="index" class="flex_1 font14">
                                            <span class="span_color">{{item.title}}</span>{{item.value}}
                                        </div>
                                    </div>
                              </div>
                          </div>
                          <div class="flex_1 flex col" style="height:350px">
                                <div class="flex_1 flex col pad_l_20">
                                    <div @click="view_img(index)" v-for="(item,index) in right" :key="index" class="flex_1 font14">
                                        <span class="span_color">{{item.title}}</span>
                                        <span class="pointer" :class="index==7?'list_co05':''">{{item.value}}</span>
                                    </div>
                                </div>
                          </div>
                          <div class="flex col" style="width:180px;height:270px">
                          </div>
                      </div>

                      <div class="flex row">
                          <div class="flex_1">
                                <div class="ct_title mar_t_30">身份证照片</div>
                                <div class="flex row  b_line mar_t_30 pad_b_20">
                                    <div class="zp_box  mar_r_30" v-for="(item,index) in zpArr_left" :key="index">
                                        <!--<img v-if="item.val" class="w_100" :src="item.val" alt="">-->
                                        <div v-if="item.val" class="w_100 demo-image__preview">
                                            <el-image 
                                                style="height: 60px;width:100%"
                                                :src="item.val" 
                                                :preview-src-list="srcList01">
                                            </el-image>
                                        </div>
                                        <div v-else class="zp_moren"></div>
                                        <p class="w_100 text_center">{{item.title}}</p>
                                    </div>
                                </div>
                          </div>
                          <div class="flex_1"></div>
                      </div>

                  </div>
              </div>
              <!--预览图片-->
              <el-image-viewer
                v-if="showViewer"
                :on-close="closeViewer"
                :url-list="previewImages" />
          </div>
  
</template>

<script>
var THIS;
import botHeader from '../../components/bot-header/bot-header';
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
export default {
  components:{
    botHeader,
    ElImageViewer
  },
  name: '',
  data(){
      return {
          id:'',
          type:'',
          picture:'',
          link:'/home/affair/affairFour/yglb',
          zpArr_left:[],
          srcList01:[],
          left:[],
          right:[],
          dc_img:'',
          showViewer:false,
          previewImages : [],
      }
  },
  methods:{

      get_detail(){
            var data = {
                yuangongid:THIS.id,
            };
            vue_Post(THIS,'centerflow/newFlowDetails',data,callback,1,1,1,0);
            function callback(msg){
                THIS.picture = msg.picture;
                if(THIS.type==1){//1待接收、2待入职、
                    THIS.left = [
                        { title:'ID：',value:msg.id },
                        { title:'性别：',value:msg.sex_name?msg.sex_name:'--' },
                        { title:'出生日期：',value:msg.birthday?msg.birthday:'--' },
                        { title:'身份证号码：',value:msg.idcard?msg.idcard:'--' },
                        { title:'备注信息：',value:msg.mark?msg.mark:'--' },
                        { title:'运营中心：',value:msg.center_name?msg.center_name:'--' },
                        { title:'发送时间：',value:msg.send_time?msg.send_time:'--' },
                        { title:'状态：', value:msg.status==1?'待接收':(msg.status==2?'待入职':'待定') },
                        { title:'',value:'' }
                    ];
                    THIS.right = [
                        { title:'员工姓名：',value:msg.name?msg.name:'--' },
                        { title:'联系电话：',value:msg.phone?msg.phone:'--' },
                        { title:'户籍所在地：',value:msg.address?msg.address:'--' },
                        { title:'曾用名：',value:msg.former_name?msg.former_name:'--' },
                        { title:'入职企业：',value:msg.realtitle?msg.realtitle:'--' },
                        { title:'所属业务员：',value:msg.yewuyuan_name?msg.yewuyuan_name:'--' },
                        { title:'预计到厂时间：',value:msg.reach_time?msg.reach_time:'--' },
                        { title:'驻厂人员：',value:msg.zhuchang_name?msg.zhuchang_name:'--' },
                        { title:'',value:'' }
                    ];
                }else{
                    THIS.left = [
                        { title:'ID：',value:msg.id },
                        { title:'性别：',value:msg.sex_name?msg.sex_name:'--' },
                        { title:'出生日期：',value:msg.birthday?msg.birthday:'--' },
                        { title:'身份证号码：',value:msg.idcard?msg.idcard:'--' },
                        { title:'备注信息：',value:msg.mark?msg.mark:'--' },
                        { title:'运营中心：',value:msg.center_name?msg.center_name:'--' },
                        { title:'发送时间：',value:msg.send_time?msg.send_time:'--' },
                        { title:'接收时间：',value:msg.reach_time?msg.reach_time:'--' },
                        { title:'状态：', value:msg.status==1?'待接收':(msg.status==2?'待入职':'待定') }
                    ];
                    THIS.right = [
                        { title:'员工姓名：',value:msg.name?msg.name:'--' },
                        { title:'联系电话：',value:msg.phone?msg.phone:'--' },
                        { title:'户籍所在地：',value:msg.address?msg.address:'--' },
                        { title:'曾用名：',value:msg.former_name?msg.former_name:'--' },
                        { title:'入职企业：',value:msg.realtitle?msg.realtitle:'--' },
                        { title:'所属业务员：',value:msg.yewuyuan_name?msg.yewuyuan_name:'--' },
                        { title:'驻厂人员：',value:msg.zhuchang_name?msg.zhuchang_name:'--' },
                        { title:'到厂图片：',value:msg.profit?'查看图片':'无到厂图片' },
                        { title:'',value:'' }
                    ];
                    THIS.dc_img = msg.profit;
                };
                //身份证照片
                THIS.zpArr_left[0] = {title:'身份证人像面',val:msg.use_idcardzm_name};
                THIS.zpArr_left[1] = {title:'身份证国徽面',val:msg.use_idcardfm_name};
                THIS.srcList01 = [];
                if(msg.use_idcardzm_name){
                    THIS.srcList01.push(THIS.msg.use_idcardzm_name);
                };
                if(msg.use_idcardfm_name){
                    THIS.srcList01.push(THIS.msg.use_idcardfm_name);
                };
            }; 
      },

      closeViewer(){
            THIS.showViewer = false;
            THIS.previewImages = [];
      },

      view_img(index){
          if(index!=7||!THIS.dc_img){
              return false;
          };
          THIS.showViewer = true;
          THIS.previewImages = [THIS.dc_img];
      },


  },
   mounted(){
        THIS = this;
        THIS.store.commit('setPageText','当前位置：事务 / 员工详情');
        THIS.id = THIS.$route.params.id;
        THIS.type = THIS.$route.params.type;
        THIS.get_detail();

  },

}
</script>

<style scoped>
   .shoukuan{
       color: #262626;
   } 
   .shoukuan span{
       color: #8C8C8C;
   }
   .li_bg{
       background:rgba(250,250,250,1);
   }
   .baseInfo >div:nth-child(1) .top{
       background: url(../../../assets/images/stor.png) no-repeat left center /22px;
   }
   .base_btn{
       width: 70px;
       height: 30px;
       line-height: 30px;
       text-align: center;
       border-radius: 3px;
       border: 1px solid;
   }
   .moren_co{
       color: #595959;
   }
   .co01{
       color: #198AF3;
   }
   .co02{
       color: #F4514A;
   }
   .co03{
       color: #595959;
   }
   .base_btn_co01{
       color: #007DF2;
       border-color: #007DF2;
   }
   .qt_box{
        width: 240px;
        height: 80px;
        border:1px solid rgba(241, 241, 241, 1);
        box-shadow:0px 2px 6px 0px rgba(207,228,255,0.4);
        border-radius: 6px;
   }
   .qt_box .flex_1{
       padding: 10px 0;
       line-height: 30px;
   }
   .zp_box{
        width: 80px;
        height: 110px;
   }
   .zp_box img{
       height: 80px;
       border-radius: 10px;
   }
   .zp_box p{
       height: 20px;
       line-height: 20p;
       margin-top: 10px;
       color: #8C8C8C;
       font-size: 12px;
   }
   .moren{
       background: url(../../../assets/images/moren01.png) no-repeat center /100% 100%;
   }
   .zp_moren{
       height: 80px;
       border-radius: 10px;
       background: url(../../../assets/images/moren.png) no-repeat center /100% 100%;
   }
</style>
