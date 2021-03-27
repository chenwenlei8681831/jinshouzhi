<template>
        <div class="views pad_l_50 pad_r_50 b_s mr_color01">
            <div class="bg_fff">
                <bot-header></bot-header>
                <div class="views_100ch_1">
                    <!--顶部选项-->
                    <div class="pad_l_30 pad_r_30 w_100 header_item h_60px b_s font14">
                        结算列表（{{total}}）
                    </div>
                    <!--输入框、下拉筛选-->
                    <div class="w_100 flex header_item h_60px b_s pad_r_30 pad_l_30">
                        <div class="flex_1 flex row" label="所属企业">
                                <span class="font12">选择企业：</span>
                                <el-select class="flex_1" remote :remote-method='search_company' v-model="company" filterable clearable placeholder="请选择所属企业">
                                    <el-option v-for="(item,index) in companyArr" :key="index" :label="item.realtitle" :value="item.id"></el-option>
                                </el-select>
                        </div>
                        <div class="flex_1 f_l w_200px b_s h_100 mar_l_30">
                            <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff" style="line-height:36px">查询</span>
                            <span @click="sub(2)" class="f_l mar_l_20 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff" style="line-height:36px">重置</span>
                            <div class="clearfix"></div>
                        </div>
                        <div class="flex_1 b_s h_100 mar_l_30"></div>
                        <div class="flex_1 b_s h_100 mar_l_30"></div>
                        <div class="clearfix"></div>
                    </div>
                    <!--下载、上传-->
                    <div class="w_100 header_item h_60px b_s font14">
                            <span @click="edit('','','','')" class="f_l search_btn search_btn01 3_btn b_s pad_r_20 pointer bg_blue co_fff">创建</span>
                            <div class="clearfix"></div>
                    </div>
                    <!--列表-->
                    <div class="list">
                        <ol class="list_header">
                            <li class="h_50px pad_l_20 b_s f_l" style="width:7%">ID</li>
                            <li class="h_50px pad_l_20 b_s f_l">企业名称</li>
                            <li class="h_50px pad_l_20 b_s f_l">公式名称</li>
                            <li class="h_50px pad_l_20 b_s f_l">公式内容</li>
                            <li class="h_50px pad_l_20 b_s f_l">创建时间</li>
                            <li class="h_50px pad_l_20 b_s f_l" style="width:13%">操作</li>
                            <div class="clearfix"></div>
                        </ol>
                        <ul class="list_main">
                            <li class="" v-for="(item,index) in list" :key="index">
                                <ol :class="index%2==1?'list_bg':''">
                                    <li class="f_l pad_l_20 b_s" style="width:7%">{{item.id}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.realtitle?item.realtitle:'--'">{{item.realtitle?item.realtitle:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.name?item.name:'--'">{{item.name?item.name:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.gongshi?item.gongshi:'--'">{{item.gongshi?item.gongshi:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" :title="item.createat?item.createat:'--'">{{item.createat?item.createat:'--'}}</li>
                                    <li class="f_l pad_l_20 b_s" style="width:13%">
                                        <span class="edit_button w_50 f_l" @click="edit(item.id,item.companyid,item.name,item.gongshi)">编辑</span>
                                        <span class="edit_button w_50 f_l list_co02" @click="deletes(item.id)">删除</span>
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
                    </div>
                </div>
            </div>
            <el-dialog title="创建公式" :before-close='close02' :visible.sync="show_flag" :closeOnClickModal='false' width="400px" >
                    <el-form :model="up_ruleForm" label-width="100px" :rules="up_rules" label-position='left' ref="up_ruleForm" class="demo-ruleForm">
                            <el-form-item label="选择企业" prop="company">
                                <el-select class="flex_1" @change='change_company' style="width: 100%;" v-model="up_ruleForm.company" clearable filterable  remote :remote-method='up_search_company' placeholder="企业名称">
                                    <el-option v-for="(item,index) in up_companyArr" :key="index" :label="item.realtitle" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="公式名称" prop="gs_name">
                                <el-input class="flex_1" v-model="up_ruleForm.gs_name" placeholder="公式名称" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="公式内容" prop="gs_content">
                                <el-input class="flex_1" v-model="up_ruleForm.gs_content" placeholder="公式内容" clearable></el-input>
                            </el-form-item>
                            <p class="font13 cor04 mar_b_10">标准公式样例 E:E = A:A * B:B + C:C - D:D</p>
                            <div class="h_40px flex row b_s j_between" style="padding-left:60px;padding-right:60px;">
                                <span @click="submit_from(1)" class="up_btn up_btn01 font14 text_height_center pointer">取消上传</span>
                                <span @click="submit_from(2)" class="up_btn up_btn02 font14 text_height_center pointer">确定上传</span>
                            </div>
                    </el-form>
            </el-dialog>
        </div>
</template>

<script>
var THIS;
import botHeader from '../../components/bot-header/bot-header';
import tabCar from '../../components/list/tab-car.vue';
import downLoad from '../../components/list/down-load.vue';
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
          id:'',
          page:1,
          count:10,
          total:0,
          company:'',
          companyArr:[],
          list:[],
          show_flag:false,
          up_companyArr:[],
          up_ruleForm:{
              company:'',
              gs_name:'',
              gs_content:''
          },
          up_rules:{
              company:[{ required: true, message: '企业必选', trigger: [] }],
              gs_name:[{ required: true, message: '公式名称必填', trigger: [] }],
              gs_content:[{ required: true, message: '公式内容必填', trigger: [] }]
          }
      }
  },
  methods:{


        sub(type){
                THIS.page = 1;
                if(type==2){
                    THIS.company = '';
                };
                THIS.getList();
        },

        getList(){
                var data = sign({
                    page:THIS.page,
                    count:THIS.count,
                    companyid:THIS.company
                });
                vue_Post(THIS,'jiesuan/gongshi_list',data,callback,1,1,0,1);
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

        //获取企业列表
        search_company(msg){
                var data = {
                    keyword:msg
                };
                vue_indexPost(THIS,'company/companySearchList',data,callback,0,0,0,0);
                function callback(msg){
                    THIS.companyArr = msg.list;
                }; 
        },

        //获取企业列表
        up_search_company(msg){
                var data = {
                    keyword:msg
                };
                vue_indexPost(THIS,'company/companySearchList',data,callback,0,0,0,0);
                function callback(msg){
                    THIS.up_companyArr = msg.list;
                }; 
        },

        edit(id,companyid,gs_name,gs_content){
            THIS.id = id;
            THIS.show_flag = true;
            if(id){
                THIS.up_ruleForm = {
                    company:parseInt(companyid),
                    gs_name:gs_name,
                    gs_content:gs_content
                };
            };
        },

        deletes(id){
            THIS.$confirm('确定删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                THIS.deleteFunc(id);
            }).catch(() => {});
        },

        deleteFunc(id){
            var data = sign({
                id : id
            });
            vue_Post(THIS,'jiesuan/del_gongshi',data,callback,1,1,0,1);
            function callback(msg){
                THIS.getList();
                THIS.$message({
                    type: 'success',
                    message: '删除成功!',
                    dangerouslyUseHTMLString:true
                });
            };
        },

        close02(){
            THIS.show_flag = false;  
            THIS.$refs['up_ruleForm'].resetFields();  
            THIS.up_ruleForm = {
                company:'',
                gs_name:'',
                gs_content:''
            };
        },

        submit_from(type){
            if(type==1){
                THIS.close02();
            }else if(type==2){
                THIS.$refs['up_ruleForm'].validate((valid) => {
                if (valid) {
                    THIS.submit_func();
                } else {
                    THIS.$message({
                        type: 'warning',
                        message: '请将必填项完善后再提交',
                        dangerouslyUseHTMLString:true
                    });
                    return false;
                }
            });
            };
        },

        submit_func(){
            var data = sign({
                companyid : THIS.up_ruleForm.company,
                id:THIS.id,
                name:THIS.up_ruleForm.gs_name,
                gongshi:(THIS.up_ruleForm.gs_content).replace(/\s+/g,"")
            });
            vue_Post(THIS,'jiesuan/add_gongshi',data,callback,1,1,0,1);
            function callback(msg){
                THIS.getList();
                THIS.close02(); 
                THIS.$message({
                    type: 'success',
                    message: THIS.id?'编辑成功!':'创建成功!',
                    dangerouslyUseHTMLString:true
                });
            };
        },
        
        change_company(res){
            THIS.up_ruleForm.gs_name = '';
            for(let i=0;i<THIS.up_companyArr.length;i++){
                if((THIS.up_companyArr[i].id==res)){
                    THIS.up_ruleForm.gs_name = THIS.up_companyArr[i].realtitle;
                }
            };
        }

  },
   mounted(){
        THIS = this;
        THIS.store.commit('setPageText','当前位置：财务 / 结算公式');
        THIS.getList();
        THIS.search_company('');
        THIS.up_search_company('');
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
        width: 20%;
    }
    .up_btn{
        width: 90px;
        height:  32px;
        border-radius: 4px;
    }
    .up_btn01{
        border: 1px solid #D9D9D9;
        background: #fff;
        color: #595959;
    }
    .up_btn02{
        background: #007DF2;
        color: #fff;
    }
    .cor04{
        color: #007DF2;
    }
</style>
