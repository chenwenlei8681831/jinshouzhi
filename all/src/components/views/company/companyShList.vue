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
                                <span class="font12">企业名称：</span>
                                <el-input class="flex_1 inp"  v-model="keyword" placeholder="请输入企业名称" clearable></el-input>
                                <div class="clearfix"></div>
                            </div>
                            <div class="flex_1 b_s h_100 flex row mar_l_30">
                                <span class="font12">所在地区：</span>
                                <el-cascader class="flex_1 inp" style="height:auto;"
                                    :options="address_options"
                                    :props="{ checkStrictly: true }"
                                    collapse-tags
                                    v-model="area"
                                    clearable>
                                </el-cascader>
                                <div class="clearfix"></div>
                            </div>
                            <div class="flex_1 flex row b_s h_100 mar_l_30">
                                <span class="font12">创建时间：</span>
                                <el-date-picker
                                        class="flex_1"
                                        v-model="timer"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                                <div class="clearfix"></div>
                            </div>
                            <div class="flex_1 b_s h_100 mar_l_30">
                                    <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff" style="line-height:36px">查询</span>
                                    <span @click="sub(2)" class="f_l mar_l_30 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff" style="line-height:36px">重置</span>
                                    <div class="clearfix"></div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <!--列表-->
                        <div class="list">
                            <ol class="list_header">
                                <li class="h_50px pad_l_20 b_s f_l" style="width:9%">ID</li>
                                <li class="h_50px pad_l_20 b_s f_l">企业名称</li>
                                <li class="h_50px pad_l_20 b_s f_l">所属行业</li>
                                <li class="h_50px pad_l_20 b_s f_l">所在地区</li>
                                <li class="h_50px pad_l_20 b_s f_l">制表人</li>
                                <li class="h_50px pad_l_20 b_s f_l">制表时间</li>
                                <li class="h_50px pad_l_20 b_s f_l">状态</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:13%">操作</li>
                                <div class="clearfix"></div>
                            </ol>
                            <ul class="list_main">
                                <li v-for="(item,index) in list" :key="index">
                                    <ol class="">
                                        <li class="f_l pad_l_20 b_s" style="width:9%">
                                            {{item.id}}
                                        </li>
                                        <li class="f_l pad_l_20 b_s" :title="item.realtitle?item.realtitle:'--'">{{item.realtitle?item.realtitle:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.industry_id?item.industry_id:'--'">{{item.industry_id?item.industry_id:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.address?item.address:'--'">{{item.address?item.address:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.issuer_name?item.issuer_name:'--'">{{item.issuer_name?item.issuer_name:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.createat">{{item.createat}}</li>
                                        <li class="f_l pad_l_20 b_s" :class="item.isstatus==2?'list_co01':(item.isstatus==1?'list_co05':'list_co02')">{{item.isstatus==2?'待审核':(item.isstatus==1?'已通过':'被驳回')}}</li>
                                        <li class="f_l pad_l_20 b_s row flex" style="width:13%">
                                            <span v-if="seleteIndex!=0" class="edit_button flex_1" @click.stop="view(1,item.id)">--</span>
                                            <span v-if="false" class="edit_button flex_1" @click.stop="view(1,item.id)">查看</span>
                                            <span v-if="seleteIndex==0" class="edit_button flex_1" @click.stop="view(2,item.id)">通过</span>
                                            <span v-if="seleteIndex==0" class="list_co02 edit_button flex_1" @click.stop="view(3,item.id)">驳回</span>
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
                                    :current-page="currentPage"
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
            <el-dialog title="驳回理由"  :visible.sync="show_flag" width="700px" >
                    <el-input class="w_100" 
                        style="line-height:30px;"  
                        type="textarea" v-model="send_content"
                        :autosize="{ minRows: 6}" 
                        placeholder="请输入驳回理由">
                    </el-input>
                    <span slot="footer" class="flex j_center w_100 dialog-footer">
                        <el-button  @click="send()" type="primary">提交</el-button>
                    </span>
              </el-dialog>
        </div>
</template>

<script>
import botHeader from '../../components/bot-header/bot-header';
import tabCar from '../../components/list/tab-car.vue';
import downLoad from '../../components/list/down-load.vue';
var THIS;
export default {
  components:{
      botHeader,
      tabCar,
      downLoad
  },
  name: 'companyShList',
  data(){
      return {
          keydown_flag:true,
          seleteIndex:0,
          page:1,
          count:10,
          total:0,
          currentPage:0,
          industry_id:'',
          address_options:[],
          keyword:'',
          timer:'',
          area:'',
          jxfs:'',
          seleteArr:[
              {name:'待审核',number:'200',type:0},
              {name:'已通过',number:'154',type:1},
              {name:'已驳回',number:'60',type:2}
          ],
          list:[],
          show_flag:false,
          send_content:''
      }
  },
  methods:{

      selete(index){
          this.seleteIndex = index;
          this.page  = 1;
          this.getList();
      },

      sub(type){
            this.page = 1;
            if(type==2){
                this.keyword = '';
                this.timer = '';
                this.area = '';
            };
            this.getList();
      },

      //获取列表
      getList(){
            var time = '';
            if(THIS.timer){
                time = to_time(THIS.timer[0])+'|'+to_time(THIS.timer[1]);
            };
            var data = sign({
                type:THIS.seleteIndex==0?2:(THIS.seleteIndex==1?1:3),
                page:THIS.page,
                count:THIS.count,
                keyword:THIS.keyword,
                area:THIS.area,
                createat:time
            });
            vue_Post(THIS,'company/auditedPostList',data,callback,1,1,1,1);
            function callback(msg){
                THIS.list = msg.list;
                THIS.total = msg.total;
                for(let i=0;i<THIS.list.length;i++){
                    THIS.list[i].createat = THIS.list[i].createat?THIS.list[i].createat.split(' ')[0]:'--';
                };
                THIS.seleteArr[0].number = msg.total_1;
                THIS.seleteArr[1].number = msg.total_2;
                THIS.seleteArr[2].number = msg.total_3;
            };  
      },

      //获取城市数据
      get_address(){
          if(window.localStorage.get_address){
              //格式化省市区数据
              var obj = JSON.parse(window.localStorage.get_address);
              THIS.address_options = obj;
          }else{
              get_address(THIS,callback);
              function callback(msg){
                  window.localStorage.get_address = JSON.stringify(msg);
                  //格式化省市区数据
                  var obj = JSON.parse(window.localStorage.get_address);
                  THIS.address_options = obj;
              };
          }
          
      },

      handleCurrentChange(){
          THIS.getList();
      },

      handleSizeChange(val) {
          this.count = val;
      },

      view(type,id){
          THIS.id = id;
          if(type==1){//查看
              THIS.$router.replace('/home/company/companyThree/companyShDetail/'+id);
          }else if(type==2){//通过
                THIS.$confirm('确定通过吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    THIS.passFunc(id);
                }).catch(() => {});
          }else if(type==3){//驳回
              THIS.show_flag = true;
          };
      },

      passFunc(id){
            var data = sign({
                companyid:id,
                status:1
            });
            vue_Post(THIS,'company/releaseStatusAudit',data,callback,1,1,1,1);
            function callback(msg){
                THIS.getList();
                THIS.$message({
                    type: 'success',
                    message: '操作成功!',
                    dangerouslyUseHTMLString:true
                });
            }; 
      },

      send(id){
            var data = sign({ 
                companyid:THIS.id,
                status:3,
                content: THIS.send_content
            });
            vue_Post(THIS,'company/releaseStatusAudit',data,callback,1,1,1,1);
            function callback(msg){
                THIS.$message({
                    type: 'success',
                    message: '操作成功!',
                    dangerouslyUseHTMLString:true
                });
                THIS.show_flag = false;
                THIS.send_content = '';
                THIS.getList();
            }; 
      }



  },
   mounted(){
      THIS = this;
      THIS.store.commit('setPageText','当前位置：企业 / 岗位审核');
      THIS.getList();
      THIS.get_address();
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
        width: 13%;
    }
</style>
