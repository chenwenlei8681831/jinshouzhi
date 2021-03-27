<template>

          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
              <div class="bg_fff">
                  <bot-header></bot-header>
                  <div class="views_100ch_1">
                      <!--顶部选项-->
                      <tab-car @selete='selete' :seleteArr='seleteArr' :seleteIndex='seleteIndex'></tab-car>
                      <!--输入框、下拉筛选-->
                      <div class="flex row w_100 header_item h_60px b_s pad_r_30 pad_l_30">
                            <div class="flex_1 b_s h_100 flex row">
                                <span class="font12">运营中心名称：</span>
                                <el-input class="flex_1 inp"  v-model="keyword" placeholder="请输入运营中心名称" clearable></el-input>
                            </div>
                            <div class="flex_1 b_s h_100 flex row mar_l_30">
                                <span class="font12">门店电话：</span>
                                <el-input class="flex_1 inp"  v-model="phone" placeholder="请输入门店电话" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" clearable></el-input>
                                <div class="clearfix"></div>
                            </div>
                            <div class="flex_1 b_s h_100 flex row mar_l_30">
                                <span class="font12">地区筛选：</span>
                                <el-cascader
                                    class="w_100 flex_1"
                                    filterable
                                    :options="address_options"
                                    v-model='address'
                                    :props="{ checkStrictly: true }"
                                    collapse-tags
                                    clearable>
                                </el-cascader>
                            </div>
                            <div class="flex_1 b_s h_100 mar_l_30">
                                    <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff" style="line-height:36px">查询</span>
                                    <span @click="sub(2)" class="f_l mar_l_30 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff" style="line-height:36px">重置</span>
                                    <div class="clearfix"></div>
                            </div>
                      </div>
                      <!--下载、上传-->
                      <div class="w_100 header_item h_60px b_s font14">
                            <span v-show="permissions['center.add']==1" @click="add()" class="f_l search_btn search_btn01 3_btn b_s pad_r_20 pointer bg_blue co_fff">创建</span>
                            <span @click="dao_choose(1)" class="f_l search_btn search_btn02 3_btn b_s pad_r_20 pointer all_line">全部导出</span>
                            <span @click="dao_choose(2)" class="f_l search_btn search_btn03 3_btn b_s pad_r_20 pointer all_line">批量导出</span>
                            <div class="clearfix"></div>
                      </div>
                      <!--列表-->
                      <div class="list">
                          <ol class="list_header">
                              <li @click="choose(1000)" class="h_50px pad_l_20 b_s f_l" style="width:7%"><span class="c_span" :class="allFlag?'current':''"></span>ID</li>
                              <li class="h_50px pad_l_20 b_s f_l">运营中心名称</li>
                              <li class="h_50px pad_l_20 b_s f_l" style="width:16%">所在地区</li>
                              <li class="h_50px pad_l_20 b_s f_l" style="width:10%">负责人</li>
                              <li class="h_50px pad_l_20 b_s f_l">负责人电话</li>
                              <li class="h_50px pad_l_20 b_s f_l pointer" @click="paixu">在职人数<span class="paixu" :class="paixuIndex==0?'':(paixuIndex==1?'current01':'current02')"></span></li>
                              <li class="h_50px pad_l_20 b_s f_l">状态</li>
                              <li class="h_50px pad_l_20 b_s f_l" style="width:13%">操作</li>
                              <div class="clearfix"></div>
                          </ol>
                          <ul class="list_main">
                              <li @click.stop="view(1,item.id,item.status)" v-for="(item,index) in list" :key="index">
                                  <ol :class="index%2==1?'list_bg':''">
                                      <li @click.stop="choose(index)" class="f_l pad_l_20 b_s" style="width:7%">
                                          <span :class="item.flag?'current':''" class="c_span"></span>{{item.id}}
                                      </li>
                                      <li class="f_l pad_l_20 b_s" :title="item.center_name?item.center_name:'--'">{{item.center_name?item.center_name:'--'}}</li>
                                      <li class="f_l pad_l_20 b_s" style="width:16%" :title="item.address?item.address:'--'">{{item.address?item.address:'--'}}</li>
                                      <li class="f_l pad_l_20 b_s" style="width:10%" :title="item.leader?item.leader:'--'">{{item.leader?item.leader:'--'}}</li>
                                      <li class="f_l pad_l_20 b_s" :title="item.leaderphone?item.leaderphone:'--'">{{item.leaderphone?item.leaderphone:'--'}}</li>
                                      <li class="f_l pad_l_20 b_s" :title="item.zaizhi_acount?item.zaizhi_acount:'0'">{{item.zaizhi_acount?item.zaizhi_acount:'0'}}人</li>
                                      <li class="f_l pad_l_20 b_s" :class="item.status==1?'list_co01':'list_co02'">{{item.status==1?'正在运营':'已冻结'}}</li>
                                      <li class="f_l pad_l_20 b_s flex row" style="width:13%">
                                          <span class="edit_button flex_1" v-show="permissions['center.add']==1" @click.stop="view(2,item.id,0)">编辑</span>
                                          <span class="edit_button flex_1" v-show="permissions['center.details']==1" @click.stop="view(1,item.id,item.status)">查看</span>
                                          <span class="edit_button flex_1" v-show="permissions['center.lock']==1" @click.stop="dongjie(item.id,(item.status==0?1:0))" :class="item.status==0?'':'list_co02'">{{item.status==0?'解冻':'冻结'}}</span>
                                      </li>
                                      <div class="clearfix"></div>
                                  </ol>
                              </li>
                          </ul>
                          <!--分页-->
                          <div class="page_footer b_s w_100 h_60px">
                              <div class="f_l font14" @click="choose(1000)"><span class="c_span" :class="allFlag?'current':''"></span>全选</div>
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
import tabCar from '../../components/list/tab-car.vue';
import downLoad from '../../components/list/down-load.vue';
var THIS;
export default {
  components:{
      botHeader,
      tabCar,
      downLoad
  },
  name: 'storeList',
  data(){
      return {
          keydown_flag:true,
          id:'',
          seleteIndex:0,
          permissions:'',
          page:1,
          count:10,
          total:0,
          phone:'',
          list:[],
          keyword:'',
          address_options:[],
          address:[],
          seleteArr:[
              { name:'正在运营',number:'0',type:0 },
              { name:'已冻结',number:'0',type:1 }
          ],
          downobj:{
              addLink:'/home/store/storeCreate'
          },
          //批量导表
          allFlag:false,
          isAll:false,
          //排序
          paixuIndex:0,         //0:正常  1：升序  2：降序
      }
  },
  methods:{

      selete(index){
          THIS.seleteIndex = index;
          THIS.page  = 1;
          THIS.getList();
      },
      
      view(type,id,status){
          if(THIS.permissions['center.details']!=1){
              return false;
          };
          if(type==1){
              THIS.$router.replace('/home/store/storeOne/storeDetail/'+id+'/'+status);
          }else if(type==2){
              THIS.$router.push('/home/store/storeOne/storeEdit/'+id);
          };
      },

      sub(type){
            THIS.page = 1;
            if(type==2){
                THIS.keyword = '';
                THIS.address = [];
            };
            THIS.getList();
      },

      getList(){
            var data = sign({
                page:THIS.page,
                count:THIS.count,
                phone:THIS.phone,
                keyword:THIS.keyword,
                area:THIS.address.join('|'),
                type:THIS.seleteIndex==0?1:0,
                zaizhi_desc:THIS.paixuIndex==1?'ASC':(THIS.paixuIndex==2?'DESC':'')
            });
            vue_Post(THIS,'center/list',data,callback,1,1,1,1);
            function callback(msg){
                  THIS.total = msg.total;
                  THIS.list = msg.list;
                  THIS.seleteArr[0].number = msg.total_1;
                  THIS.seleteArr[1].number = msg.total_2;
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

      dongjie(id,status){
          var THIS = this;
          THIS.id = id;
          THIS.$confirm('确定操作吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            THIS.dongjieFunc(status);
          }).catch(() => {});
      },

      dongjieFunc(status){
            var THIS = this;
            var data = sign({
                centerid:THIS.id,
                status:status
            });
            vue_Post(THIS,'center/lock',data,callback,1,1,1,1);
            function callback(msg){
                THIS.getList();
                THIS.$message({
                    type: 'success',
                    message: '操作成功!',
                    dangerouslyUseHTMLString:true
                });
            }; 
      },

      add(){
            var THIS = this;
            window.localStorage.beforNavIndex = THIS.tabIndex;
            THIS.$router.push(THIS.downobj.addLink);
      },

      //选择导出项
      choose(index){
          if(index==1000){//全选
              THIS.allFlag = !THIS.allFlag;
              for(let i=0;i<THIS.list.length;i++){
                THIS.list[i].flag = THIS.allFlag;
              };
          }else{//单选
              console.log(index);
              THIS.list[index].flag = !THIS.list[index].flag;
              if(!THIS.list[index].flag){
                  THIS.allFlag = false;
              };
              THIS.list = JSON.parse(JSON.stringify(THIS.list));
          };
      },

      dao_choose(type){
        if(type==1){//全部
                if(THIS.list.length==0){
                    THIS.$message({
                        type: 'warning',
                        message: '没有可以导出的数据!',
                        dangerouslyUseHTMLString:true
                    });
                }else{
                    THIS.$confirm('确定导出全部数据吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }).then(() => {
                        THIS.downLode('');
                    }).catch(() => {});
                };
        }else{//批量
                var ids = [];
                var aa = THIS.list;
                for(let i=0;i<aa.length;i++){
                    if(aa[i].flag){
                        ids.push(aa[i].id);
                    };
                };
                if(ids.length==0){
                    THIS.$message({
                        type: 'warning',
                        message: '请先勾选需要导出的数据!',
                        dangerouslyUseHTMLString:true
                    });
                }else{
                    THIS.$confirm('选中数据'+ids.length+'条,确定导出吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }).then(() => {
                        THIS.downLode(ids.join('|'));
                    }).catch(() => {});
                };
        };
      },

      downLode(ids){
                var bb = window.localStorage.host+'center/export?token='
                    +window.localStorage.token
                    +'&ids='+ids
                    +'&type='+(THIS.seleteIndex==0?1:0)
                    +'&keyword='+THIS.keyword
                    +'&area='+(THIS.address.length>0?THIS.address.join('|'):'')
                    +'&phone='+THIS.phone;
                window.location.href = bb;
      },

      //获取城市数据
      get_address(){
          var THIS = this;
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

      //排序
      paixu(){
          //正常=>升序=>降序=>正常
          if(this.paixuIndex==0){
              this.paixuIndex = 1
          }else if(this.paixuIndex==1){
              this.paixuIndex = 2
          }else if(this.paixuIndex==2){
              this.paixuIndex = 0
          };
          this.getList();
      },

      

  },
   mounted(){
      THIS = this;
      THIS.store.commit('setPageText','当前位置：门店 / 运营中心列表');
      THIS.getList();
      THIS.get_address();
      THIS.permissions = JSON.parse(window.localStorage.permissions);
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
