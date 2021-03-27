<template>

          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
                <div class="bg_fff">
                    <bot-header></bot-header>
                    <div class="views_100ch_1">
                        <!--顶部数据-->
                        <div class="pad_l_30 pad_r_30 w_100 header_item h_60px b_s font14">员工动态列表（{{total}}）</div>
                        <!--输入框、下拉筛选-->
                        <div class="flex row w_100 header_item h_60px b_s pad_r_30 pad_l_30">
                            <div class="flex_1 b_s h_100 flex row">
                                <span class="font12">版本号：</span>
                                <el-input class="flex_1 inp"  v-model="keyword" placeholder="请输入版本号" clearable></el-input>
                                <div class="clearfix"></div>
                            </div>                            
                            <div class="flex_1 b_s h_100 mar_l_30">
                                    <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff" style="line-height:30px">查询</span>
                                    <span @click="sub(2)" class="f_l mar_l_30 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff" style="line-height:30px">重置</span>
                                    <div class="clearfix"></div>
                            </div>
                            <div class="flex_1 b_s h_100 mar_l_30"></div>
                            <div class="flex_1 b_s h_100 mar_l_30"></div>
                        </div>
                        <!--列表-->
                        <div class="list">
                            <ol class="list_header list_bg flex row">
                                <li class="h_50px pad_l_20 b_s" style="width:7%">ID</li>
                                <li class="h_50px pad_l_20 b_s flex_1">设备类型</li>
                                <li class="h_50px pad_l_20 b_s flex_1">版本号</li>
                                <li class="h_50px pad_l_20 b_s flex_1">发布时间</li>
                                <li class="h_50px pad_l_20 b_s" style="width:15%">操作</li>
                            </ol>
                            <ul class="list_main">
                                <li  v-for="(item,index) in list" :key="index">
                                    <ol :class="index%2==1?'list_bg':''" class="flex row">
                                        <li class="pad_l_20 b_s" style="width:7%">{{item.id}}</li>
                                        <li class="flex_1 pad_l_20 b_s" :title="item.device_type?item.device_type:'--'">{{item.device_type?item.device_type:'--'}}</li>
                                        <li class="flex_1 pad_l_20 b_s" :title="item.ver?item.ver:'--'">{{item.ver?item.ver:'--'}}</li>
                                        <li class="flex_1 pad_l_20 b_s" :title="item.createat?item.createat:'--'">{{item.createat?item.createat:'--'}}</li>
                                        <li class="pad_l_20 b_s list_co05 flex" style="width:15%">
                                            <span v-show="permissions['version.upload']==1" class="flex_1 edit_button" @click="view(1,item.id)">编辑</span>
                                            <span class="flex_1 edit_button" @click="down_load(item.url_name)">下载</span>
                                            <span v-show="permissions['version.del']==1" class="flex_1 edit_button list_co02" @click="view(2,item.id)">删除</span>
                                        </li>
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
var THIS;
export default {
  components:{
      botHeader,
  },
  name: 'versionList',
  data(){
      return {
          keydown_flag:true,
          id:'',
          permissions:'',
          page:1,
          count:10,
          total:0,
          keyword:'',
          list:[]
      }
  },
  methods:{

        sub(type){
                THIS.page = 1;
                if(type==2){
                    THIS.keyword = '';
                };
                THIS.getList();
        },

        getList(){
                var data = sign({
                    page:THIS.page,
                    count:THIS.count,
                    ver:THIS.keyword,
                });
                vue_Post(THIS,'version/list',data,callback,1,1,1,1);
                function callback(msg){
                    THIS.total = msg.total;
                    THIS.list = msg.list;
                }; 
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

        view(type,id){
            THIS.id = id;
            if(type==1){
                THIS.$router.replace('/home/setting/versionCreate/'+id);
            }else if(type==2){
                    THIS.$confirm('确定删除吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }).then(() => {
                        THIS.deleteFunc();
                    }).catch(() => {});
            };
        },

        deleteFunc(){
                var data = sign({
                    id:THIS.id
                });
                vue_Post(THIS,'version/del',data,callback,1,1,1,1);
                function callback(msg){
                    THIS.getList();
                    THIS.$message({
                        type: 'success',
                        message: '操作成功!',
                        dangerouslyUseHTMLString:true
                    });
                }; 
        },
    
        down_load(url){
            window.location.href = url;
        }

  },
   mounted(){
        THIS = this;
        THIS.permissions = JSON.parse(window.localStorage.permissions);
        THIS.store.commit('setPageText','当前位置：设置 / 版本列表');
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
        width: 25%;
    }
    .header_item{
        line-height: 60px;
        color: #262626;
    }
</style>
