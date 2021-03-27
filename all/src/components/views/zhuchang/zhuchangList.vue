<template>
        <div class="views pad_l_50 pad_r_50 b_s mr_color01">
          <div class="bg_fff">
                <bot-header></bot-header>
                <div class="views_100ch_1">
                    <!--顶部选项-->
                    <div class="pad_l_30 pad_r_30 w_100 header_item h_60px b_s font14">驻厂列表（{{total}}）</div>
                    <!--输入框、下拉筛选-->
                    <div class="w_100 header_item h_60px b_s pad_r_30 pad_l_30">
                        <div class="f_l w_25 b_s h_100 flex row">
                            <span class="font12">驻厂姓名：</span>
                            <el-input class="flex_1 inp"  v-model="keyword" placeholder="请输入驻厂姓名" clearable></el-input>
                            <div class="clearfix"></div>
                        </div>
                        <div class="f_l w_25 b_s h_100 flex row mar_l_30">
                            <span class="font12">驻厂电话：</span>
                            <el-input class="flex_1 inp"  v-model="phone" placeholder="请输入驻厂电话" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" clearable></el-input>
                            <div class="clearfix"></div>
                        </div>
                        <div class="f_l w_200px b_s h_100 mar_l_30">
                            <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff" style="line-height:36px">查询</span>
                            <span @click="sub(2)" class="f_l mar_l_20 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff" style="line-height:36px">重置</span>
                            <div class="clearfix"></div>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <!--下载、上传-->
                    <div v-show="permissions['zhuchang.add']==1||permissions['zhuchang.export']==1" class="w_100 header_item h_60px b_s font14">
                        <span v-show="permissions['zhuchang.add']==1" @click="add()" class="f_l search_btn search_btn01 3_btn b_s pad_r_20 pointer bg_blue co_fff">创建</span>
                        <span v-show="permissions['zhuchang.export']==1" @click="dao_choose(1)" class="f_l search_btn search_btn02 3_btn b_s pad_r_20 pointer all_line">全部导出</span>
                        <span v-show="permissions['zhuchang.export']==1" @click="dao_choose(2)" class="f_l search_btn search_btn03 3_btn b_s pad_r_20 pointer all_line">批量导出</span>
                        <div class="clearfix"></div>
                    </div>
                    <!--列表-->
                    <div class="list">
                        <ol class="list_header">
                            <li @click="choose(1000)" class="h_50px pad_l_20 b_s f_l" style="width:10%"><span class="c_span" :class="allFlag?'current':''"></span>ID</li>
                            <li class="h_50px pad_l_20 b_s f_l text_center">驻厂头像</li>
                            <li class="h_50px pad_l_20 b_s f_l" style="width:13%">驻厂姓名</li>
                            <li class="h_50px pad_l_20 b_s f_l">联系电话</li>
                            <li class="h_50px pad_l_20 b_s f_l pointer" @click="paixu">在职员工<span class="paixu" :class="paixuIndex==0?'':(paixuIndex==1?'current01':'current02')"></span></li>
                            <li class="h_50px pad_l_20 b_s f_l">被投诉次数(次)</li>
                            <li class="h_50px pad_l_20 b_s f_l" style="width:13%">操作</li>
                            <div class="clearfix"></div>
                        </ol>
                        <ul class="list_main">
                            <li @click="view(1,item.id)" v-for="(item,index) in list" :key="index">
                                <ol :class="index%2==1?'list_bg':''">
                                    <li @click.stop="choose(index)" class="f_l pad_l_20 b_s" style="width:10%">
                                        <span :class="item.flag?'current':''" class="c_span"></span>{{item.id}}
                                    </li>
                                    <li class="f_l pad_l_20 b_s" style="padding-top:5px;">
                                        <img style="margin:0 auto;" v-if="item.picture" class="zc_img d_block" :src="item.picture" alt="">
                                        <div style="margin:0 auto;" v-else class="zc_img"></div>
                                    </li>
                                    <li class="f_l pad_l_20 b_s" :title="item.name?item.name:'--'" style="width:13%">{{item.name?item.name:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.phone?item.phone:'--'">{{item.phone?item.phone:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s">{{item.zaizhi_count?item.zaizhi_count:0}}人</li>
                                    <li class="f_l pad_l_20 b_s">{{item.suggestion_count?item.suggestion_count:0}}人</li>
                                    <li class="f_l pad_l_20 b_s" style="width:13%">
                                        <span class="edit_button w_50 f_l" v-show="permissions['zhuchang.add']==1" @click.stop="view(2,item.id)">编辑</span>
                                        <span class="edit_button w_50 f_l" v-show="permissions['zhuchang.details']==1" @click.stop="view(1,item.id)">查看</span>
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
  name: 'zhuchangList',
  data(){
      return {
          keydown_flag:true,
          permissions:'',
          page:1,
          count:10,
          total:0,
          keyword:'',
          phone:'',
          list:[],
          downobj:{
              addLink:'/home/zhuchang/zhuchangCreate'
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
            this.seleteIndex = index;
        },

        sub(type){
                this.page = 1;
                if(type==2){
                    this.keyword = '';
                    this.phone = '';
                };
                this.getList();
        },

        getList(){
                var data = sign({
                    page:THIS.page,
                    count:THIS.count,
                    keyword:THIS.keyword,
                    phone:THIS.phone,
                    desc:THIS.paixuIndex?THIS.paixuIndex:''
                });
                vue_Post(THIS,'zhuchang/list',data,callback,1,1,0,1);
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

        view(type,id){
            if(type==1&&THIS.permissions['zhuchang.details']==1){
                this.$router.replace('/home/zhuchang/zhuchangOne/zhuchangDatile/'+id);
            }else if(type==2){
                this.$router.replace('/home/zhuchang/zhuchangOne/zhuchangEdit/'+id);
            };
        },

        add(){
                window.localStorage.beforNavIndex = THIS.tabIndex;
                THIS.$router.push(THIS.downobj.addLink);
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
                var bb = window.localStorage.host+'zhuchang/export?token='
                    +window.localStorage.token
                    +'&ids='+ids
                    +'&keyword='+THIS.keyword
                    +'&phone='+THIS.phone;
                window.location.href = bb;
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
      THIS.store.commit('setPageText','当前位置：驻厂 / 驻厂列表');
      THIS.permissions = JSON.parse(window.localStorage.permissions);
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
    .zc_img{
        width:40px;
        height:40px;
        border-radius: 50%;
        overflow: hidden;
        margin: 5px 0;
        background: url(../../../assets/images/moren01.png) no-repeat center /100%;
    }
</style>
