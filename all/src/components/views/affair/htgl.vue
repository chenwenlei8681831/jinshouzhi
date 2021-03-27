<template>
        <div class="views pad_l_50 pad_r_50 b_s mr_color01">
          <div class="bg_fff">
                <bot-header></bot-header>
                <div class="views_100ch_1">
                    <!--顶部选项-->
                    <tab-car @selete='selete' :seleteArr='seleteArr' :seleteIndex='seleteIndex'></tab-car>
                    <!--输入框、下拉筛选-->
                    <div class="flex row w_100 header_item h_60px b_s pad_r_30 pad_l_30">
                        <div class="flex_1 b_s h_100 flex row">
                            <span class="font12">员工姓名：</span>
                            <el-input class="flex_1 inp"  v-model="keyword" placeholder="请输入员工姓名" clearable></el-input>
                            <div class="clearfix"></div>
                        </div>
                        <div class="flex_1 b_s h_100 mar_l_30">
                                <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff" style="line-height:36px">查询</span>
                                <span @click="sub(2)" class="f_l mar_l_30 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff" style="line-height:36px">重置</span>
                                <div class="clearfix"></div>
                        </div>
                        <div class="flex_1 b_s h_100 mar_l_30"></div>
                        <div class="flex_1 b_s h_100 mar_l_30"></div>
                    </div>
                    <!--列表-->
                    <div class="list">
                        <ol class="list_header" :class="seleteIndex==1?'status_2':''">
                            <li class="h_50px pad_l_20 b_s f_l" style="width:7%">ID</li>
                            <li class="h_50px pad_l_20 b_s f_l">员工姓名</li>
                            <li class="h_50px pad_l_20 b_s f_l">运营中心</li>
                            <li class="h_50px pad_l_20 b_s f_l">驻厂人员</li>
                            <li class="h_50px pad_l_20 b_s f_l">所在企业</li>
                            <li class="h_50px pad_l_20 b_s f_l">签署状态</li>
                            <li class="h_50px pad_l_20 b_s f_l" style="width:13%">{{seleteIndex==0?'签署期限':'签署时间'}}</li>
                            <li class="h_50px pad_l_20 b_s f_l" v-if="seleteIndex==1" style="width:15%">操作</li>
                            <div class="clearfix"></div>
                        </ol>
                        <ul class="list_main">
                            <li v-for="(item,index) in list" :key="index">
                                <ol :class="seleteIndex==1?(index%2==1?'status_2 list_bg':'status_2'):(index%2==1?'list_bg':'')">
                                    <li class="f_l pad_l_20 b_s" style="width:7%">
                                        {{item.id}}
                                    </li>
                                    <li class="f_l pad_l_20 b_s" :title="item.username?item.username:'--'">{{item.username?item.username:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.center_name?item.center_name:'--'">{{item.center_name?item.center_name:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.zhuchang_name?item.zhuchang_name:'--'">{{item.zhuchang_name?item.zhuchang_name:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.realtitle?item.realtitle:'--'">{{item.realtitle?item.realtitle:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :class="item.p_status=='未签署'?'list_co02':'list_co01'">{{item.p_status}}</li>
                                    <li class="f_l pad_l_20 b_s" v-if="seleteIndex==0" style="width:13%" :class="item.is_signat_date==0?'list_co01':'list_co02'">{{item.is_signat_date==0?'剩余':'超出'}}{{item.createat}}天</li>
                                    <li class="f_l pad_l_20 b_s" v-else style="width:13%">{{item.createat}}</li>
                                    <li class="f_l pad_l_20 b_s flex row po_r" v-if="seleteIndex==1" style="width:15%">
                                        <div class="demo-image__preview flex_1">
                                            <span v-show="permissions['agreement.showimg']==1" @click="onPreview(index)" class="po_b pad_l_20 bg_fff look_pic font14" style="z-index:99;width:100%;height:100;top:0;left:0;color: #007DF2;">查看合同照</span>
                                        </div>
                                    </li>
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
                        <!--预览图片-->
                        <el-image-viewer
                            v-if="showViewer"
                            :on-close="closeViewer"
                            :url-list="previewImages" />
                    </div>
                </div>
          </div>
        </div>
</template>

<script>
import botHeader from '../../components/bot-header/bot-header';
import tabCar from '../../components/list/tab-car.vue';
import downLoad from '../../components/list/down-load.vue';
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
var THIS;
export default {
  components:{
      botHeader,
      tabCar,
      downLoad,
      ElImageViewer
  },
  name: 'companyJobList',
  data(){
      return {
          keydown_flag:true,
          permissions:'',
          showViewer:false,
          previewImages: [],
          img01:'',
          img02:'',
          seleteIndex:0,
          page:1,
          count:10,
          total:0,
          xingzhi:'',
          keyword:'',
          seleteArr:[
              {name:'未签署',number:'0',type:0},
              {name:'已签署',number:'0',type:1}
          ],
          list:[],
          
      }
  },
  methods:{

      selete(index){
          THIS.seleteIndex = index;
          THIS.page  = 1;
          THIS.getList();
      },

      sub(type){
            THIS.page = 1;
            if(type==2){
                THIS.keyword = '';
            };
            THIS.getList();
      },

      //获取列表
      getList(){
            var data = sign({
                page:THIS.page,
                count:THIS.count,
                keyword:THIS.keyword,
                p_status:THIS.seleteIndex==0?2:3
            });
            vue_Post(THIS,'agreement/list',data,callback,1,1,1,1);
            function callback(msg){
                 THIS.list = msg.list;
                 THIS.total = msg.total;
                 THIS.seleteArr[0].number = msg.dq_total?msg.dq_total:0;
                 THIS.seleteArr[1].number = msg.yq_total?msg.yq_total:0;
                 if(THIS.seleteIndex==1){
                     for(let i=0;i<THIS.list.length;i++){
                         THIS.list[i].createat = THIS.list[i].createat?THIS.list[i].createat.split(' ')[0]:'--';
                     };
                 };
                 for(let i=0;i<THIS.list.length;i++){
                        THIS.list[i].showViewer = false;
                        THIS.list[i].url = THIS.list[i].sign?THIS.list[i].sign:(THIS.list[i].yuangong_sign?THIS.list[i].yuangong_sign:'');
                        THIS.list[i].srcList = [];
                        if(THIS.list[i].sign){
                            THIS.list[i].srcList.push(THIS.list[i].sign);
                        };
                        if(THIS.list[i].yuangong_sign){
                            THIS.list[i].srcList.push(THIS.list[i].yuangong_sign);
                        };
                 };
            }; 
      },

      onPreview(index) {
            THIS.showViewer = true;
            THIS.previewImages = THIS.list[index].srcList;
      },

      closeViewer(){
            THIS.showViewer = false;
            THIS.previewImages = [];
      },

      view(id){
          THIS.$router.replace('/home/affair/affairOne/jzlbDetail/'+id);
      },

      handleCurrentChange(val){
          THIS.page = val;
          THIS.getList();
      },

      handleSizeChange(val) {
          THIS.count = val;
          THIS.page = 1;
          THIS.getList();
      },

      view_pic(index,id){
          var data = sign({ id:id });
          vue_Post(THIS,'agreement/showImg',data,callback,1,1,1,1);
          function callback(msg){
                THIS.list[index].url = msg.sign?msg.sign:(msg.yuangong_sign?msg.yuangong_sign:'');
                THIS.list[index].srcList = [msg.sign,msg.yuangong_sign];
                console.log(THIS.list[index].url);
                console.log(THIS.list[index].srcList);

          }; 
      }

      

  },
   mounted(){
        THIS = this;
        THIS.permissions = JSON.parse(window.localStorage.permissions);
        THIS.store.commit('setPageText','当前位置：事务 / 合同管理');
        THIS.getList();
        $(document).keydown(function(event){
        　　if(event.keyCode==13&&THIS.keydown_flag){
            　	THIS.getList();
            };
        });
  },
  destroyed() {
      THIS.keydown_flag = false;
    },
}
</script>

<style scoped>
    .list_header li,.list_main ol li{
        width: 16%;
    }
    .list_header.status_2 li,.list_main ol.status_2 li{
        width: 13%;
    }
</style>
