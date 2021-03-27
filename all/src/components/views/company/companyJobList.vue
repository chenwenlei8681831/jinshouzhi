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
                            <div class="flex_1 b_s h_100 flex row mar_l_30" v-if="searchObj.options">
                                <span class="font12">所在地区：</span>
                                <el-cascader class="flex_1 inp" style="height:auto;"
                                    :options="address_options"
                                    :props="{ checkStrictly: true }"
                                    collapse-tags
                                    v-model="area"
                                    filterable
                                    clearable>
                                </el-cascader>
                                <div class="clearfix"></div>
                            </div>
                            <div class="w_25 flex row b_s h_100 mar_l_30">
                                <span class="font12">创建时间：</span>
                                <el-date-picker
                                        class="flex_1"
                                        v-model="timer"
                                        type="daterange"
                                        value-format="yyyy-MM-dd"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                </el-date-picker>
                                <div class="clearfix"></div>
                            </div>
                            <div class="flex_1 b_s h_100 mar_l_30">
                                    <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff h_100" style="line-height:30px">查询</span>
                                    <span @click="sub(2)" class="f_l mar_l_30 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff h_100" style="line-height:30px">重置</span>
                                    <div class="clearfix"></div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <!--下载、上传-->
                        <div class="w_100 header_item h_60px b_s font14">
                                <span v-show="permissions['company.add']==1" @click="add()" class="f_l search_btn search_btn01 3_btn b_s pad_r_20 pointer bg_blue co_fff">创建</span>
                                <span @click="dao_choose(1)" class="f_l search_btn search_btn02 3_btn b_s pad_r_20 pointer all_line">全部导出</span>
                                <span @click="dao_choose(2)" class="f_l search_btn search_btn03 3_btn b_s pad_r_20 pointer all_line">批量导出</span>
                                <span @click="bangding" v-show="cityId!=0" class="f_l search_btn search_btn03 3_btn b_s pad_r_20 pointer all_line">绑定岗位</span>
                                <span class="gj_search f_r pointer" @click="show_gj()">高级搜索</span>
                                <div class="clearfix"></div>
                        </div>
                        <!--列表-->
                        <div class="list">
                            <ol class="list_header">
                                <li @click="choose(1000)" class="h_50px pad_l_20 b_s f_l" style="width:10%"><span class="c_span" :class="allFlag?'current':''"></span>ID</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:24%;">企业名称</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:15%;">所在地区</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:9%">待招人数</li>
                                <li class="h_50px pad_l_20 b_s f_l">创建时间</li>
                                <li class="h_50px pad_l_20 b_s f_l">状态</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:9%">设置招聘</li>
                                <li class="h_50px pad_l_20 b_s f_l" style="width:13%">操作</li>
                                <div class="clearfix"></div>
                            </ol>
                            <ul class="list_main">
                                <li  @click="view(2,item.id)" v-for="(item,index) in list" :key="index">
                                    <ol :class="index%2==1?'list_bg':''">
                                        <li @click.stop="choose(index)" class="f_l pad_l_20 b_s" style="width:10%">
                                            <span :class="item.flag?'current':''" class="c_span"></span>{{item.id}}
                                        </li>
                                        <li class="f_l pad_l_20 b_s" :title="item.realtitle" style="width:24%;">{{item.realtitle}}</li>
                                        <li class="f_l pad_l_20 b_s" style="width:15%;" :title="item.address">{{item.address}}</li>
                                        <li class="f_l pad_l_20 b_s" style="width:9%" :title="item.hasnumber?item.hasnumber:'0'+'人'">{{item.hasnumber?item.hasnumber:'0'}}人</li>
                                        <li class="f_l pad_l_20 b_s" :title="item.createat">{{item.createat}}</li>
                                        <li class="f_l pad_l_20 b_s" :class="item.zaixian==1?'co01':'co02'">{{item.zaixian==1?'正在招聘':(item.zaixian==2?'已招满':'暂停招聘')}}</li>
                                        <li @click.stop="set_status(item.id,item.zaixian)" class="f_l pad_l_20 b_s" style="width:9%">
                                            <el-switch
                                                v-model="item.zaixian_flag"
                                                active-color="#1890FF"
                                                inactive-color="#C5C5C5">
                                            </el-switch>
                                        </li>
                                        <li class="f_l pad_l_20 b_s flex row" style="width:13%">
                                            <span v-show="permissions['company.add']==1" class="edit_button flex_1" @click.stop="view(1,item.id)">编辑</span>
                                            <span v-show="permissions['company.details']==1" class="edit_button flex_1" @click.stop="view(2,item.id)">查看</span>
                                            <span class="edit_button flex_1" @click.stop="istop(item.top,item.id)" :class="item.top==0?'':'list_co02'">{{item.top==0?'置顶':'取消'}}</span>
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
            <el-dialog title="高级搜索"  :visible.sync="show_flag" :closeOnClickModal='false' width="700px" >
                    <div class="content alert_gj">
                        <el-form label-width="80px" :model="formLabelAlign">
                            <div class="flex row j_between">
                                <el-form-item class="w_50" label="所属行业">
                                    <el-select class="w_100" v-model="formLabelAlign.sshy" filterable clearable placeholder="请选择所属行业">
                                    <el-option v-for="(item,index) in hangye_info" :key="index" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="w_50" label="工作性质">
                                    <el-select class="w_100" v-model="formLabelAlign.gzxz" filterable clearable placeholder="请选择工作性质">
                                    <el-option v-for="(item,index) in xingzhi_type" :key="index" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="flex row j_between">
                                <el-form-item class="w_50" label="计薪方式">
                                    <el-select class="w_100" v-model="formLabelAlign.jxfs" filterable clearable placeholder="请选择计薪方式">
                                    <el-option v-for="(item,index) in wage_type" :key="index" :label="item.name" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            
                        </el-form>
                    </div>
                    <span slot="footer" class="w_100 dialog-footer">
                        <span @click="gj_btnClikc(0)" class="pointer f_l gj_search_resetbtn">重置搜索条件</span>
                        <el-button @click="gj_btnClikc(1)">取 消</el-button>
                        <el-button @click="gj_btnClikc(2)" type="primary">确 定</el-button>
                    </span>
            </el-dialog>
            <el-dialog title="开启招聘" :before-close='close02'  :visible.sync="set_flag" :closeOnClickModal='false' width="400px" >
                    <div class="flex h_30px">
                        <span class="h_30px font14" style="line-height:30px;">待招人数:</span>
                        <input placeholder="请输入待招人数" class="flex_1 hs_input mar_l_20 pad_l_10 font12" v-model="hasnumber" type="text" oninput="value=value.replace(/[^\d]/g,'')">
                    </div>
                    <div slot="footer" class="w_100 dialog-footer">
                        <el-button @click="gj_btnClikc(3)">取 消</el-button>
                        <el-button @click="gj_btnClikc(4)" type="primary">确 定</el-button>
                    </div>
            </el-dialog>
            <el-dialog title="选择绑定的岗位"  :visible.sync="bd_show_flag" :closeOnClickModal='false' width="400px" left >
                <div class="content">
                    <p style="margin: 20px;"></p>
                    <el-form  ref="formLabelAlign" label-width="80px">
                        <el-select class="w_100" v-model="bd_job" multiple filterable clearable placeholder="请选择绑定岗位">
                            <el-option v-for="(item,index) in jobArr" :key="index" :label="item.name" :value="item.id">
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
import tabCar from '../../components/list/tab-car.vue';
var THIS;
export default {
  components:{
      botHeader,
      tabCar
  },
  computed: {
        watchCityId() {
            return this.store.state.cityId;
        },
  },
  watch:{
        watchCityId(id) {
            THIS = this;
            THIS.cityId = window.localStorage.cityId;
            THIS.get_bd_job();
        },
  },
  name: 'companyJobList',
  data(){
      return {
          id:'',
          keydown_flag:true,
          seleteIndex:0,
          permissions:'',
          page:1,
          count:10,
          total:0,
          currentPage:0,
          address_options:[],
          keyword:'',
          timer:'',
          area:'',
          downobj:{
              addLink:'/home/company/companyJobcreate'
          },
          searchObj:{
              options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                    value: 'yizhi',
                    label: '一致'
                    }, {
                    value: 'fankui',
                    label: '反馈'
                    }, {
                    value: 'xiaolv',
                    label: '效率'
                    }, {
                    value: 'kekong',
                    label: '可控'
                    }]
                }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                    value: 'cexiangdaohang',
                    label: '侧向导航'
                    }, {
                    value: 'dingbudaohang',
                    label: '顶部导航'
                    }]
                }]
                }, 
                {
                value: 'zujian',
                label: '组件',
                children: [{
                    value: 'basic',
                    label: 'Basic',
                    children: [{
                    value: 'layout',
                    label: 'Layout 布局'
                    }, {
                    value: 'color',
                    label: 'Color 色彩'
                    }, {
                    value: 'typography',
                    label: 'Typography 字体'
                    }, {
                    value: 'icon',
                    label: 'Icon 图标'
                    }, {
                    value: 'button',
                    label: 'Button 按钮'
                    }]
                }, {
                    value: 'form',
                    label: 'Form',
                    children: [{
                    value: 'radio',
                    label: 'Radio 单选框'
                    }, {
                    value: 'checkbox',
                    label: 'Checkbox 多选框'
                    }, {
                    value: 'input',
                    label: 'Input 输入框'
                    }, {
                    value: 'input-number',
                    label: 'InputNumber 计数器'
                    }, {
                    value: 'select',
                    label: 'Select 选择器'
                    }, {
                    value: 'cascader',
                    label: 'Cascader 级联选择器'
                    }, {
                    value: 'switch',
                    label: 'Switch 开关'
                    }, {
                    value: 'slider',
                    label: 'Slider 滑块'
                    }, {
                    value: 'time-picker',
                    label: 'TimePicker 时间选择器'
                    }, {
                    value: 'date-picker',
                    label: 'DatePicker 日期选择器'
                    }, {
                    value: 'datetime-picker',
                    label: 'DateTimePicker 日期时间选择器'
                    }, {
                    value: 'upload',
                    label: 'Upload 上传'
                    }, {
                    value: 'rate',
                    label: 'Rate 评分'
                    }, {
                    value: 'form',
                    label: 'Form 表单'
                    }]
                }, 
                {
                    value: 'data',
                    label: 'Data',
                    children: [{
                    value: 'table',
                    label: 'Table 表格'
                    }, {
                    value: 'tag',
                    label: 'Tag 标签'
                    }, {
                    value: 'progress',
                    label: 'Progress 进度条'
                    }, {
                    value: 'tree',
                    label: 'Tree 树形控件'
                    }, {
                    value: 'pagination',
                    label: 'Pagination 分页'
                    }, {
                    value: 'badge',
                    label: 'Badge 标记'
                    }]
                }, 
                {
                    value: 'notice',
                    label: 'Notice',
                    children: [{
                    value: 'alert',
                    label: 'Alert 警告'
                    }, {
                    value: 'loading',
                    label: 'Loading 加载'
                    }, {
                    value: 'message',
                    label: 'Message 消息提示'
                    }, {
                    value: 'message-box',
                    label: 'MessageBox 弹框'
                    }, {
                    value: 'notification',
                    label: 'Notification 通知'
                    }]
                }, 
                {
                    value: 'navigation',
                    label: 'Navigation',
                    children: [{
                    value: 'menu',
                    label: 'NavMenu 导航菜单'
                    }, {
                    value: 'tabs',
                    label: 'Tabs 标签页'
                    }, {
                    value: 'breadcrumb',
                    label: 'Breadcrumb 面包屑'
                    }, {
                    value: 'dropdown',
                    label: 'Dropdown 下拉菜单'
                    }, {
                    value: 'steps',
                    label: 'Steps 步骤条'
                    }]
                }, 
                {
                    value: 'others',
                    label: 'Others',
                    children: [{
                    value: 'dialog',
                    label: 'Dialog 对话框'
                    }, {
                    value: 'tooltip',
                    label: 'Tooltip 文字提示'
                    }, {
                    value: 'popover',
                    label: 'Popover 弹出框'
                    }, {
                    value: 'card',
                    label: 'Card 卡片'
                    }, {
                    value: 'carousel',
                    label: 'Carousel 走马灯'
                    }, {
                    value: 'collapse',
                    label: 'Collapse 折叠面板'
                    }]
                }
                ]
                }, 
                {
                value: 'ziyuan',
                label: '资源',
                children: [{
                    value: 'axure',
                    label: 'Axure Components'
                    }, {
                        value: 'sketch',
                        label: 'Sketch Templates'
                    }, {
                    value: 'jiaohu',
                    label: '组件交互文档'
                }]
                }
                ],
          },
          seleteArr:[
              {name:'全部企业',number:'0',type:0},
              {name:'正在招聘',number:'0',type:1},
              {name:'停止招聘',number:'0',type:2}
          ],
          list:[],
          //高级搜索
          show_flag:false,
          xingzhi_type:[],
          hangye_info:[],
          wage_type:[],
          address_options:[],
          formLabelAlign:{
              jxfs:'',
              gzxz:'',
              sshy:''
          },
          //批量导表
          allFlag:false,
          isAll:false,
          //设置招聘人数
          set_flag:false,
          hasnumber:'',
          //绑定岗位
          cityId:window.localStorage.cityId,
          bd_show_flag:false,
          bd_job:[],
          jobArr:[],
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
                    this.formLabelAlign = {
                        jxfs:'',
                        gzxz:'',
                        sshy:''
                    }
                };
                this.getList();
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

        add(){
                var THIS = this;
                window.localStorage.beforNavIndex = THIS.tabIndex;
                THIS.$router.push(THIS.downobj.addLink);
        },

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

        view(type,id){
            if(THIS.permissions['company.details']==0){
                return false;
            };
            if(type==1){
                THIS.$router.replace('/home/company/companyTwo/companyJobEdit/'+id);
            }else if(type==2){
                THIS.$router.replace('/home/company/companyTwo/companyJobDetail/'+id);
            };
        },

        istop(top,id){
            if(THIS.permissions['company.companytop']==0){
                return false;
            };
            THIS.id = id;
            var text = top==0?'置顶':'取消置顶';
            var status = top==0?'1':'0';
            THIS.$confirm('确定'+text+'吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                THIS.topFunc(status);
            }).catch(() => {});
        },

        topFunc(status){
                var THIS = this;
                var data = sign({
                    companyid:THIS.id,
                    type:status
                });
                vue_Post(THIS,'company/companyTop',data,callback,1,1,0,1);
                function callback(msg){
                    THIS.getList();
                    THIS.$message({
                        type: 'success',
                        message: '操作成功!',
                        dangerouslyUseHTMLString:true
                    });
                }; 
        },

        show_gj(){
            this.show_flag = true;
        },

        gj_btnClikc(type){
            if(type==0){
                    THIS.formLabelAlign = {
                        company:'',
                        center:'',
                        address:''
                    }
            }else if(type==1){
                THIS.show_flag = false;
            }else if(type==2){
                THIS.show_flag = false;
                THIS.page = 1;
                THIS.getList();
            }else if(type==3){
                THIS.hasnumber = '';
                THIS.set_flag = false;
                THIS.getList();
            }else if(type==4){
                if(THIS.hasnumber){
                    THIS.set_status_func(1,THIS.hasnumber);
                }else{
                    THIS.$message({
                        type: 'warning',
                        message: '请先输入待招人数!',
                        dangerouslyUseHTMLString:true
                    });
                };
                
            };
        },

        getList(){
                var aa = THIS.formLabelAlign;
                var time = '';
                if(THIS.timer){
                    time = THIS.timer[0]+'|'+THIS.timer[1];
                };
                var zaixian = THIS.seleteIndex==0?3:(THIS.seleteIndex==1?1:0);
                var data = sign({
                    page:THIS.page,
                    count:THIS.count,
                    keyword:THIS.keyword,
                    zaixian:zaixian,
                    area:THIS.area.length>0?THIS.area.join('|'):'',
                    createat:time,
                    industry_id:aa.sshy?aa.sshy:'',
                    jxfs:aa.jxfs?aa.jxfs:'',
                    xingzhi:aa.gzxz?aa.gzxz:''
                });
                vue_Post(THIS,'company/list',data,callback,1,1,1,1);
                function callback(msg){
                    //配置文件
                    THIS.xingzhi_type = msg.xingzhi_type;
                    THIS.hangye_info = msg.hangye_info;
                    THIS.wage_type = msg.wage_type;
                    THIS.list = msg.list;
                    THIS.total = msg.total;
                    THIS.seleteArr[0].number = msg.total_3;
                    THIS.seleteArr[1].number = msg.total_1;
                    THIS.seleteArr[2].number = msg.total_2;
                    for(let i=0;i<THIS.list.length;i++){
                        THIS.list[i].createat = THIS.list[i].createat?THIS.list[i].createat.split(' ')[0]:'--';
                    };
                    THIS.allFlag = false;
                    for(let i=0;i<THIS.list.length;i++){
                        THIS.list[i].flag = false;
                        THIS.list[i].zaixian_flag = THIS.list[i].zaixian == 1?true:false;
                    };
                }; 
        },

        choose(index){
            if(index==1000){//全选
                THIS.allFlag = !THIS.allFlag;
                for(let i=0;i<THIS.list.length;i++){
                    THIS.list[i].flag = THIS.allFlag;
                };
            }else{//单选
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
            }else if(type==2){//批量
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
            }else if(type==3){//全部历史记录
                THIS.$confirm('确定导出在职数据吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    THIS.downLode('');
                }).catch(() => {});
            };
        },

        downLode(ids){
                var aa = THIS.formLabelAlign;
                var time = '';
                if(THIS.timer){
                    time = THIS.timer[0]+'|'+THIS.timer[1];
                };
                var bb = window.localStorage.host+'company/export?token='
                    +window.localStorage.token
                    +'&ids='+ids
                    +'&keyword='+THIS.keyword
                    +'&area='+(THIS.area.length>0?THIS.area.join('|'):'')
                    +'&createat='+time
                    +'&industry_id='+(aa.sshy?aa.sshy:'')
                    +'&zaixian='+(THIS.seleteIndex)
                    +'&jxfs='+(aa.jxfs?aa.jxfs:'')
                    +'&xingzhi='+(aa.gzxz?aa.gzxz:'');
                window.location.href = bb;
        },

        set_status(id,status){
            if(THIS.permissions['company.setzhaopin']==0){
                THIS.getList();
                return false;  
            };
            THIS.id = id;
            if(status==1){
                THIS.set_status_func(0,0);
            }else{
                THIS.set_flag = true;
            };
        },

        set_status_func(status,hasnumber){
            var data = sign({
                companyid:THIS.id,
                status:status,
                hasnumber:hasnumber
            });
            vue_Post(THIS,'company/setZhaopin',data,callback,1,1,1,0);
            function callback(msg){
                THIS.getList();
                THIS.$message({
                    type: 'success',
                    message: '操作成功!',
                    dangerouslyUseHTMLString:true
                });
                THIS.set_flag = false;
                THIS.hasnumber = '';
                THIS.getList();
            }; 
        },

        close02(){
            THIS.hasnumber = '';
            THIS.set_flag = false;
            THIS.getList();
        },

        bangding(){
            THIS.bd_show_flag = true;
        },

        alert_btn(type){
            if(type==0){
                THIS.bd_show_flag = false;
                THIS.bd_job = [];
            }else if(type==1){
                THIS.bangdingFunc();
            };
        },

        bangdingFunc(){
            var data = sign({
                branch_cid : window.localStorage.cityId,
                companyid : THIS.bd_job.join('|')
            });
            vue_Post(THIS,'company/bindingCompany',data,callback,1,0,0,0);
            function callback(msg){
                THIS.$message({
                    type: 'success',
                    message: '绑定成功',
                    dangerouslyUseHTMLString:true
                });
                THIS.get_bd_job();
                THIS.bd_show_flag = false;
            }
        },

        get_bd_job(){
            var data = sign({
                branch_cid : window.localStorage.cityId,  
            });
            vue_Post(THIS,'company/bindingCompanyDetails',data,callback,1,0,0,0);
            function callback(msg){
                THIS.bd_job = [];
                for(let i=0;i<msg.length;i++){
                    THIS.bd_job.push(msg[i].id);
                };
            }
        },

        get_searchCompany(){
            var data = sign({
                page:1,
                count:10000,
                request_type:2
            });
            vue_indexPost(THIS,'company/companySearchList',data,callback,1,0,0,0);
            function callback(msg){
                for(let i=0;i<msg.list.length;i++){
                    THIS.jobArr.push({
                        id:msg.list[i].id,
                        name:msg.list[i].realtitle
                    })
                };
            }; 
        },
        

  },
   mounted(){
      THIS = this;
      THIS.store.commit('setPageText','当前位置：企业 / 岗位列表');
      THIS.getList();
      THIS.get_address();
      THIS.get_searchCompany();
      THIS.get_bd_job();
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
        width: 10%;
    }
    .co01{
        color: #47C321;
    }
    .co02{
        color: #F4514A;
    }
    .hs_input{
        border: 1px solid #D9D9D9;
        border-radius: 3px;
    }
</style>
