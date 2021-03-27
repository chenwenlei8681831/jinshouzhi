<template>

          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
                <div class="bg_fff">
                    <bot-header></bot-header>
                    <div class="views_100ch_1">
                        <div class="pad_l_30 pad_r_30 w_100 header_item h_60px b_s font14">企业列表（{{total}}家）</div>
                        <div class="flex row w_100 header_item h_60px b_s pad_r_30 pad_l_30">
                            <div class="flex_1 b_s h_100 flex row">
                                <span class="font12">企业名称：</span>
                                <el-input class="flex_1 inp"  v-model="searchObj.keyword" placeholder="请输入企业名称" clearable></el-input>
                                <div class="clearfix"></div>
                            </div>
                            <div class="flex_1 b_s h_100 flex row mar_l_30">
                                <span class="font12">签单公司：</span>
                                <el-select class="flex_1" v-model="qd_company" filterable clearable placeholder="请选择签单公司">
                                    <el-option v-for="(item,index) in qd_companyArr" :key="index" :label="item.danwei" :value="item.id"></el-option>
                                </el-select>
                                <div class="clearfix"></div>
                            </div>
                            <div class="w_25 flex row b_s h_100 mar_l_30">
                                <span class="font12">创建时间：</span>
                                <el-date-picker
                                        class="flex_1"
                                        v-model="searchObj.timer"
                                        value-format="yyyy-MM-dd"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                                <div class="clearfix"></div>
                            </div>
                            <div class="flex_1 b_s h_100 mar_l_30">
                                    <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff" style="line-height:30px">查询</span>
                                    <span @click="sub(2)" class="f_l mar_l_30 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff" style="line-height:30px">重置</span>
                                    <div class="clearfix"></div>
                            </div>
                        </div>
                        <div v-show="permissions['company.releasecompanyadd']==1||permissions['company.releasecompanyexport']==1" class="w_100 header_item h_60px b_s font14">
                            <span @click="add()" v-show="permissions['company.releasecompanyadd']==1" class="f_l search_btn search_btn01 3_btn b_s pad_r_20 pointer bg_blue co_fff">创建</span>
                            <span @click="dao_choose(1)" v-show="permissions['company.releasecompanyexport']==1" class="f_l search_btn search_btn02 3_btn b_s pad_r_20 pointer all_line">全部导出</span>
                            <span @click="dao_choose(2)" v-show="permissions['company.releasecompanyexport']==1" class="f_l search_btn search_btn03 3_btn b_s pad_r_20 pointer all_line">批量导出</span>
                            <div class="clearfix"></div>
                        </div>
                        <div class="list">
                            <ol class="list_header list_bg">
                                <li @click="choose(1000)" class="h_50px pad_l_20 b_s f_l" style="width:10%"><span class="c_span" :class="allFlag?'current':''"></span>ID</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:17%">企业名称</li>
                                <li class="h_50px pad_l_20 b_s f_l">签单公司</li>
                                <li class="h_50px pad_l_20 b_s f_l">所属分公司</li>
                                <li class="h_50px pad_l_20 b_s f_l pointer" @click="paixu" style="width:11%">在职人数<span class="paixu" :class="paixuIndex==0?'':(paixuIndex==1?'current01':'current02')"></span></li>
                                <li class="h_50px pad_l_20 b_s f_l">创建时间</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:20%">操作</li>
                                <div class="clearfix"></div>
                            </ol>
                            <ul class="list_main">
                                <li @click="view(2,item.id)" v-for="(item,index) in list" :key="index">
                                    <ol :class="index%2==1?'list_bg':''">
                                        <li  @click.stop="choose(index)" class="f_l pad_l_20 b_s" style="width:10%">
                                            <span :class="item.flag?'current':''" class="c_span"></span>{{item.id}}
                                        </li>
                                        <li class="f_l pad_l_20 b_s" style="width:17%" :title="item.realtitle?item.realtitle:'--'">{{item.realtitle?item.realtitle:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.qiandan_info?item.qiandan_info:'--'">{{item.qiandan_info?item.qiandan_info:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.title?item.title:'--'">{{item.title?item.title:'--'}}</li>
                                        <li class="f_l pad_l_20 b_s" style="width:11%" :title="item.zaizhi_count?item.zaizhi_count:0+'人'">{{item.zaizhi_count?item.zaizhi_count:0}}人</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.createat">{{item.createat}}</li>
                                        <li class="f_l pad_l_20 b_s flex row" style="width:20%">
                                            <span v-show="permissions['company.releasecompanyadd']==1" :class="item.flag?'current':''" class="edit_button flex_1" @click.stop="view(1,item.id)">编辑</span>
                                            <span :class="item.flag?'current':''" class="edit_button flex_1" @click.stop="view(2,item.id)">查看</span>
                                            <span v-show="permissions['company.bindingzhuchang']==1" :class="item.flag?'current':''" class="edit_button flex_2" @click.stop="choose_zc(item.id)">分配驻厂</span>
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
                <el-dialog title="驻厂选择"  :visible.sync="show_flag" :closeOnClickModal='false' width="400px" left >
                    <div class="content">
                        <p style="margin: 20px;"></p>
                        <el-form  ref="formLabelAlign" label-width="80px">
                            <el-select class="w_100" v-model="zhuchang" multiple filterable clearable placeholder="请选择驻厂">
                                <el-option v-for="(item,index) in zhuchangArr" :key="index" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="alert_btn(0)">取 消</el-button>
                        <el-button type="primary" @click="alert_btn(1)">确 定</el-button>
                    </span>
                </el-dialog>
          </div>
  
</template>

<script>
import botHeader from '../../components/bot-header/bot-header';
var THIS;
export default {
  components:{
      botHeader,
  },
  name: 'companyList',
  data(){
      return {
          keydown_flag:true,
          qd_company:'',
          qd_companyArr:[],
          permissions:'',
          id:'',
          seleteIndex:0,
          page:1,
          count:10,
          total:0,
          searchObj:{
              keyword:'',
              area:'',
              timer:''
          },
          zhuchangArr:[],
          zhuchang:[],
          list:[],
          downobj:{
              addLink:'/home/company/companyCreate'
          },
          show_flag:false,
          allFlag:false,
          isAll:false,
          paixuIndex:0,         //0:正常  1：升序  2：降序
      }
  },
  methods:{

      sub(type){
            THIS.page = 1;
            if(type==2){
                THIS.searchObj.keyword = '';
                THIS.searchObj.timer = '';
                THIS.qd_company = '';
            };
            THIS.getList();
      },

      getList(){
            var time = '';
            if(THIS.searchObj.timer){
                time = THIS.searchObj.timer[0]+'|'+THIS.searchObj.timer[1];
            };
            var data = sign({
                page:THIS.page,
                count:THIS.count,
                qiandan_id:THIS.qd_company,
                keyword:THIS.searchObj.keyword,
                createat:time,
                type:'4',
                zaizhi_desc:THIS.paixuIndex==1?'ASC':(THIS.paixuIndex==2?'DESC':'')
            });
            vue_Post(THIS,'company/releaseCompanyList',data,callback,1,1,0,1);
            function callback(msg){
                  THIS.total = msg.total;
                  THIS.list = msg.list;
                  THIS.allFlag = false;
                  for(let i=0;i<THIS.list.length;i++){
                      THIS.list[i].flag = false;
                      THIS.list[i].createat = THIS.list[i].createat?THIS.list[i].createat.split(' ')[0]:'--'
                  };
            }; 
      },

      get_qd_company(){
            var data = sign({
                companyid:''
            });
            vue_Post(THIS,'company/addPreInfo',data,callback,0,0,0,0);
            function callback(msg){
                THIS.qd_companyArr = msg.kaipiao_info;
            }
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

      view(type,id){
          if(type==1){
              this.$router.replace('/home/company/companyOne/companyEdit/'+id);
          }else if(type==2){
              this.$router.replace('/home/company/companyOne/companyDetail/'+id);
          };
      },

      add(){
            var THIS = this;
            window.localStorage.beforNavIndex = THIS.tabIndex;
            THIS.$router.push(THIS.downobj.addLink);
      },

      get_zhuchang(){
            var THIS = this;
            var data = sign({
                page:1,
                count:1000
            });
            vue_Post(THIS,'zhuchang/zhuchangSearchList',data,callback,0,0,0,0);
            function callback(msg){
                for(let i=0;i<msg.list.length;i++){
                    THIS.zhuchangArr.push({
                        id:msg.list[i].id,
                        name:msg.list[i].name
                    })
                };
            }; 
      },

      choose_zc(id){
            var THIS = this;
            THIS.id = id;
            THIS.show_flag = true;
            var data = sign({
                companyid:id
            });
            vue_Post(THIS,'company/bindingZhuchangDetails',data,callback,1,1,1,1);
            function callback(msg){
                THIS.zhuchang = [];
                for(let i=0;i<msg.length;i++){
                    THIS.zhuchang.push(msg[i].id);
                };
            }; 
      },

      alert_btn(type){
          if(type==0){
              this.show_flag = false;
              this.zhuchang = [];
          }else if(type==1){
              this.chooseFunc();
          };
      },

      chooseFunc(){
            var THIS = this;
            var data = sign({
                companyid:THIS.id,
                zhuchangid:THIS.zhuchang.join('|')
            });
            vue_Post(THIS,'company/bindingZhuchang',data,callback,1,1,1,1);
            function callback(msg){
                THIS.$message({
                    type: 'success',
                    message: '修改成功',
                    dangerouslyUseHTMLString:true
                });
                THIS.show_flag = false;
                this.zhuchang = [];
            }; 
      },

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
                    alert('导出全部')
                    //THIS.lizhi_alert(true,'');
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
                    alert('导出部分有'+ids.length+'条');
                    //THIS.lizhi_alert(false,ids.join('|'));
                };
        };
      },

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
      THIS.store.commit('setPageText','当前位置：企业 / 企业列表');
      THIS.getList();
      THIS.get_zhuchang();
      THIS.get_qd_company();
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
        width: 14%;
    }
    .header_item{
        line-height: 60px;
        color: #262626;
    }
    
</style>
