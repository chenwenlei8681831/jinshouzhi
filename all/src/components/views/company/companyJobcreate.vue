<template>

            <div class="views h_bottom po_r pad_l_50 pad_r_50 b_s mr_color01">
                    <bot-header></bot-header>
                    <!--表单-->
                    <el-form label-position="top" :model="ruleForm"  :rules="rules" ref="ruleForm" class="views_100ch_2 demo-ruleForm">
                        <!--基本信息-->
                        <div class="from_box">
                            <div class="from_tltle">基本信息</div>
                            <div class="w_100 b_s pad_l_30 pad_r_30 mar_t_30">
                                <!--选择企业-->
                                <el-form-item class="w_30" label="选择企业" prop="company">
                                    <el-select class="w_100 d_b_line" v-model="ruleForm.company" clearable filterable  placeholder="请选择企业">
                                        <el-option v-for="(item,index) in companyArr" :key="index" :label="item.realtitle" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <!--企业基本信息-->
                                <div class="w_100" v-if="ruleForm.company">
                                    <div class="w_100 mar_b_30">
                                        <div class="line_30px pad_r_20 w_25 b_s s_l f_l font15 pointer">
                                            <span class="color_span">企业真实名称:</span> {{baseInfo.name}}
                                        </div>
                                        <div class="line_30px pad_r_20 w_25 b_s s_l f_l font15 pointer">
                                            <span class="color_span">社会信用代码:</span> {{baseInfo.companyCode}}
                                        </div>
                                        <div class="line_30px pad_r_20 w_25 b_s s_l f_l font15 pointer">
                                            <span class="color_span">所属行业:</span>  {{baseInfo.hangye}}
                                        </div>
                                        <div class="line_30px pad_r_20 w_25 b_s s_l f_l font15 pointer">
                                            <span class="color_span">所属分公司:</span>  {{baseInfo.fen_company}}
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="w_100 mar_b_30">
                                        <p class="font15 color_span">企业简介：</p>
                                        <p class="mar_t_10 font15">{{baseInfo.jianjie}} </p>
                                    </div>
                                </div>
                                <!--基本信息-->
                                <div class="w_100">
                                    <div class="w_100 flex row j_between">
                                        <el-form-item class="w_30" label="对外招工名称" prop="dw_name">
                                            <el-input v-model="ruleForm.dw_name" placeholder="请输入对外招工名称" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item class="w_65" label="主营产品" prop="product">
                                            <el-input v-model="ruleForm.product" placeholder="请输入主营产品" clearable></el-input>
                                        </el-form-item>
                                    </div>
                                    <div class="w_100 flex row j_between">
                                        <el-form-item class="w_30" label="所属地区" prop="address">
                                            <el-cascader class="w_100" :options="address_options"  v-model='ruleForm.address'  filterable placeholder="请选择所属地区" clearable></el-cascader>
                                        </el-form-item>
                                        <el-form-item class="w_30" label="详细地址" prop="xx_address">
                                            <el-input v-model="ruleForm.xx_address" placeholder="请输入详细地址" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item v-if="false" class="w_30" label="上传工厂视频（选填）">
                                            <el-input v-model="ruleForm.up_sp"></el-input>
                                        </el-form-item>  
                                        <div v-else class="w_30"></div>
                                    </div>
                                </div>
                                <!--工厂实照-->
                                <div class="w_100">
                                    <p class="font14" style="line-height:42px;"><span style="color:#F35149;">*</span>工厂实照（限9张）</p>
                                    <div class="w_100" style="min-height:70px;">
                                        <el-upload
                                            :action="up_imgurl"
                                            list-type="picture-card"
                                            :on-preview="handlePictureCardPreview"
                                            :limit=9
                                            :on-success='upload'
                                            :on-remove='deleteImg'
                                            :file-list="img_value">
                                            <i class="el-icon-plus"></i>
                                        </el-upload>
                                        <el-dialog :visible.sync="dialogVisible">
                                            <img width="100%" :src="dialogImageUrl" alt="">
                                        </el-dialog>
                                    </div>
                                </div>
                                <div class="w_100 flex row j_between mar_t_30">
                                    <el-form-item class="from_textarea_120px flex_1" prop="wenan"  label="分享文案">
                                        <el-input  type="textarea" v-model="ruleForm.wenan" placeholder="请输入分享文案"></el-input>
                                    </el-form-item>
                                </div>
                                <!--置顶、标签-->
                                <div class="w_100 mar_t_30 row flex j_between">
                                    <div class="w_30" >
                                        <el-form-item  label="是否置顶">
                                            <el-radio-group  v-model="ruleForm.isTop">
                                                <el-radio :label="1">是</el-radio>
                                                <el-radio :label="0">否</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </div>
                                </div>
                                <div class="w_100 mar_t_30 row flex j_between">
                                    <span>选择标签（选填）</span>
                                    <ul class="biaoqian flex row worp flex_1 pad_l_20">
                                        <li @click="choose_biaoqian(index)" :class="item.flag?'current':''" v-for="(item,index) in company_tag_info" :key="index">{{item.name}}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!--招聘岗位-->
                        <div class="from_box mar_t_30">
                            <div class="from_tltle">招聘岗位</div>
                            <div class="w_100 b_s pad_l_30 pad_r_30 mar_t_30">
                                <div class="flex row j_between">
                                    <el-form-item class="w_30" label="工作岗位" prop="job">
                                        <el-select class="w_100 d_b_line" v-model="ruleForm.job"  placeholder="请选择工作岗位" clearable> 
                                            <el-option v-for="(item,index) in gangwei_info" :key="index" :label="item.name" :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item class="w_30" label="工作性质" prop="xingzhi">
                                        <el-select class="w_100 d_b_line" v-model="ruleForm.xingzhi" clearable placeholder="请选择工作性质">
                                            <el-option v-for="(item,index) in xingzhi_info" :key="index" :label="item.name" :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item class="w_30" label="招聘人数(人)" prop="number" >
                                        <el-input v-model="ruleForm.number" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入招聘人数"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="flex row j_between">
                                    <el-form-item class="w_30" label="年龄要求" prop="age">
                                        <el-input v-model="ruleForm.age"  placeholder="请选择年龄要求" clearable></el-input>
                                    </el-form-item>
                                    <div class="w_65">
                                        <p class="font14 mar_b_15" style="line-height:32px;"><span style="color:#F35149;">*</span>招聘期限</p>
                                        <el-date-picker
                                            class="w_60"
                                            v-model="ruleForm.timer"
                                            value-format="yyyy-MM-dd"
                                            type="daterange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            end-placeholder="结束日期">
                                        </el-date-picker>
                                    </div>
                                </div>
                                <div class="w_100 flex row j_between mar_t_30">
                                    <el-form-item class="from_textarea_120px w_45"  label="入职材料准备" prop="cailiao">
                                        <el-input  type="textarea" v-model="ruleForm.cailiao" placeholder="请输入入职材料准备"></el-input>
                                    </el-form-item>
                                    <el-form-item class="from_textarea_120px w_45"  label="体检费用及流程" prop="tijian">
                                        <el-input  type="textarea" v-model="ruleForm.tijian" placeholder="体检费用及流程"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="w_100 flex row j_between mar_t_30">
                                    <el-form-item class="from_textarea_120px flex_1"  label="其他说明(选填)">
                                        <el-input  type="textarea" v-model="ruleForm.shuoming" placeholder="请输入其他说明"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>
                        <!--薪资待遇-->
                        <div class="from_box mar_t_30">
                            <div class="from_tltle">薪资待遇</div>
                            <div class="w_100 b_s pad_l_30 pad_r_30 mar_t_30">
                                <div class="flex row j_between">
                                    <el-form-item class="w_30" label="计薪方式" prop="jxfs">
                                        <el-select class="w_100 d_b_line" v-model="ruleForm.jxfs" clearable  placeholder="请选择计薪方式">
                                            <el-option v-for="(item,index) in wage_type_info" :key="index" :label="item.name" :value="item.id"></el-option>
                                        </el-select>
                                    </el-form-item> 
                                    <el-form-item class="w_30" :label="ruleForm.jxfs==1?'员工单价(元/小时)':'同工同酬工资(元/月)'" prop="ygdj" >
                                        <el-input v-model="ruleForm.ygdj" oninput="value=value.replace(/[^\d\.]/g,'')" placeholder="请输入员工单价" clearable></el-input>
                                    </el-form-item>
                                    <div class="w_30 row flex">
                                        <el-form-item class="w_40 mar_r_10" label="薪资范围(最低)" prop="xzfw_down" >
                                            <el-input v-model="ruleForm.xzfw_down" oninput="value=value.replace(/[^\d\.]/g,'')" clearable placeholder="请输入薪资范围最低"></el-input>
                                        </el-form-item>    
                                        <div class="b_s" style="padding-top:30px;line-height:32px;"> ~ </div>
                                        <el-form-item class="w_40 mar_l_10" label="薪资范围(最高)" prop="xzfw_top" >
                                            <el-input v-model="ruleForm.xzfw_top" oninput="value=value.replace(/[^\d\.]/g,'')" clearable placeholder="请输入薪资范围最高"></el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                                <div class="flex row j_between">
                                    <el-form-item class="w_30" label="发薪时间" prop="fxsj">
                                        <el-select class="w_100 d_b_line" v-model="ruleForm.fxsj"  placeholder="请选择发薪时间" clearable>
                                            <el-option v-for="index in 31" :key="index" :label="'每月'+index+'号'" :value="index"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <div class="w_30">
                                        <el-form-item class="w_100" label="选择结算起始日" prop="fxsj">
                                            <el-select class="w_100 d_b_line" v-model="ruleForm.js_start"  placeholder="结算起始日" clearable>
                                                <el-option v-for="index in 31" :key="index" :label="'每月'+index+'号'" :value="index"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                    <div class="w_30">
                                        <el-form-item class="w_100" label="选择结算终止日" prop="fxsj">
                                            <el-select class="w_100 d_b_line" v-model="ruleForm.js_end"  placeholder="结算终止日" clearable>
                                                <el-option v-for="index in 31" :key="index" :label="'每月'+index+'号'" :value="index" clearable></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </div>
                                <div class="flex row j_between">
                                    <el-form-item class="w_30" label="发薪银行" prop="fxyh">
                                        <el-select class="w_100 d_b_line" v-model="ruleForm.fxyh"  placeholder="请选择发薪银行" clearable>
                                            <el-option v-for="(item,index) in bank_info" :key="index" :label="item.name" :value="item.id" clearable></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <div class="w_30"></div>
                                    <div class="w_30"></div>
                                </div>
                                <div class="w_100 flex row j_between mar_t_30">
                                    <el-form-item class="from_textarea_120px w_45"  label="运营中心绩效" prop="yyzx_jx">
                                        <el-input  type="textarea" v-model="ruleForm.yyzx_jx" placeholder="请输入运营中心绩效"></el-input>
                                    </el-form-item>
                                    <el-form-item class="from_textarea_120px w_45"  label="其他说明（选填）">
                                        <el-input  type="textarea" v-model="ruleForm.yyzx_jxshuoming" placeholder="请输入其他说明"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>
                        <!--食宿福利-->
                        <div class="from_box mar_t_30">
                            <div class="from_tltle">食宿福利</div>
                            <div class="w_100 b_s pad_l_30 pad_r_30 mar_t_30">
                                <div class="flex row j_between">
                                    <el-form-item class="from_textarea_120px w_45"  label="伙食情况" prop="hsqk">
                                        <el-input  type="textarea" v-model="ruleForm.hsqk" placeholder="请输入伙食情况"></el-input>
                                    </el-form-item>
                                    <el-form-item class="from_textarea_120px w_45"  label="住宿情况" prop="zsqk">
                                        <el-input  type="textarea" v-model="ruleForm.zsqk" placeholder="请输入住宿情况"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="w_100 b_s pad_l_30 pad_r_30 mar_t_30">
                                <div class="flex row j_between">
                                    <el-form-item class="from_textarea_120px w_45"  label="社保福利" prop="sbfl">
                                        <el-input  type="textarea" v-model="ruleForm.sbfl" placeholder="请输入社保福利"></el-input>
                                    </el-form-item>
                                    <el-form-item class="from_textarea_120px w_45"  label="车费报销" prop="cfbx">
                                        <el-input  type="textarea" v-model="ruleForm.cfbx" placeholder="请输入车费报销"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="w_100 b_s pad_l_30 pad_r_30 mar_t_30">
                                <div class="flex row j_between">
                                    <el-form-item class="w_45"  label="生活费预支"  prop="shfyz">
                                        <el-radio-group  v-model="ruleForm.shfyz">
                                        <el-radio :label="300">是</el-radio>
                                        <el-radio :label="0">否</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="w_100 b_s pad_l_30 pad_r_30 mar_t_30">
                                <el-form-item class="from_textarea_120px flex_1"  label="其他说明(选填)">
                                    <el-input  type="textarea" v-model="ruleForm.sssm" placeholder="请输入其他说明"></el-input>
                                </el-form-item>
                            </div>
                        </div>
                        <!--对接人信息-->
                        <div class="from_box mar_t_30">
                            <div class="from_tltle">对接人信息</div>
                            <div class="w_100 b_s pad_l_30 pad_r_30 mar_t_30">
                                <div class="flex row j_between">
                                    <el-form-item class="w_30" label="对接人" prop="djr" >
                                        <el-input v-model="ruleForm.djr" placeholder="请输入对接人" clearable></el-input>
                                    </el-form-item>
                                    <el-form-item class="w_30" label="对接人电话" prop="djrdh">
                                        <el-input v-model="ruleForm.djrdh"  oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" placeholder="请输入对接人电话" clearable></el-input>
                                    </el-form-item>
                                    <div class="w_30"></div>
                                </div>
                            </div>
                        </div>
                        <!--绩效结算-->
                        <div class="from_box mar_t_30">
                            <div class="from_tltle b_s">绩效结算</div>
                            <div class="w_100 b_s pad_l_20 pad_r_20 mar_t_30">
                                <el-form-item class="w_100 b_s pad_l_30 pad_r_30"  label="结算方式"  prop="jsfs">
                                    <el-radio-group  v-model="ruleForm.jsfs">
                                    <el-radio :label="0">人工核算</el-radio>
                                    <el-radio :label="1" >系统核算</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <p class="text font14 b_s pad_l_20 pad_r_20"><span class="list_co04">开票单位：</span>{{ruleForm.js_kaipiao_company?ruleForm.js_kaipiao_company:'--'}}</p>
                                <p class="text font14 b_s pad_l_20 pad_r_20 mar_t_30"><span class="list_co04">开票信息：</span><br>{{ruleForm.js_kaipiao_info?ruleForm.js_kaipiao_info:'--'}}</p>
                            </div>
                            <div v-if="ruleForm.jsfs==0" class="w_100 b_s pad_l_30 pad_r_30 mar_t_30">
                                <el-form-item class="from_textarea_120px flex_1" prop="cwjsbz"  label="财务绩效结算备注">
                                    <el-input  type="textarea" v-model="ruleForm.cwjsbz" placeholder="请输入财务绩效结算备注"></el-input>
                                </el-form-item>
                            </div>
                            <div v-if="ruleForm.jsfs==1" class="b_s pad_l_20 pad_r_20">
                                <el-form-item class="from_textarea_120px flex_1" prop="cwjsbz_xt"  label="财务绩效结算备注">
                                    <el-input  type="textarea" v-model="ruleForm.cwjsbz_xt" placeholder="请输入财务绩效结算备注"></el-input>
                                </el-form-item>
                                <!--开票信息-->
                                <p class="text font14 b_s pad_l_20 pad_r_20 mar_t_30"><span class="list_co04">驻厂管理费：</span>{{ruleForm.jxfs==1?'0.075 元/小时':'20元/月'}}</p>
                                <div class="flex b_s row pad_l_20 pad_r_20 mar_t_30">
                                    <span @click="choose_jx_type(1)" :class="ruleForm.jx_type==1?'current':''" class="type_btn type_btn01">社会工工价</span>
                                    <span @click="choose_jx_type(2)" :class="ruleForm.jx_type==2?'current':''" class="type_btn type_btn02">学生工工价</span>
                                </div>
                                <!--小时工模块-->
                                <div v-if="ruleForm.jxfs==1">
                                    <div class="w_100 b_s pad_l_20 pad_r_20 mar_t_30">
                                        <el-form-item class="w_30" label="业务费(元/小时)" prop="yewu_fee" >
                                            <el-input v-model="ruleForm.yewu_fee" placeholder="请输入业务费" clearable></el-input>
                                        </el-form-item>
                                    </div>
                                    <span @click="add_jstj" class="add_tiaojian mar_l_20 text_center pointer">+ 添加结算条件</span>
                                    <!--社会工&&小时工-->
                                    <div v-if="ruleForm.jx_type==1" class="pad_l_20 pad_r_20 b_s mar_t_30">
                                        <!--结算条件-->
                                        <div class="jx_box mar_b_30" :class="item.shouqi_flag?'current':''" v-for="(item,index) in ruleForm.sh_msg" :key="index">
                                            <div class="top pad_l_40 pad_r_40 b_s flex row j_between">
                                                <div class="flex_1 text_height_line_center list_co06">结算条件{{index+1}}</div>
                                                <div class="flex_1 flex row j_end">
                                                    <span class="mar_r_30 text_height_line_center list_co05 pointer" :class="item.shouqi_flag?'current02':'current01'" @click="shouqi(index)">{{item.shouqi_flag?'展开':'收起'}}</span>
                                                    <span class="mar_l_30 text_height_line_center list_co02 pointer current03" @click="remove_jstj(index)">删除结算条件</span>
                                                </div>
                                            </div>
                                            <div class="bottom pad_l_40 pad_r_40 b_s pad_t_20 pad_b_20">
                                                <div class="w_100 mar_t_20">
                                                    <el-form-item class="from_textarea_120px w_45"  label="入职时间" prop="timer">
                                                        <el-date-picker
                                                            v-model="item.timer"
                                                            type="daterange"
                                                            value-format="yyyy-MM-dd"
                                                            range-separator="至"
                                                            start-placeholder="开始日期"
                                                            end-placeholder="结束日期">
                                                        </el-date-picker>
                                                    </el-form-item>
                                                    <div class="b_add_btn font14 pointer" @click="add_bumen(index)">+ 添加部门条件</div>
                                                    <!--部门条件-->
                                                    <div class="jx_box mar_t_30 w_100" v-for="(v_item,v_index) in item.bm_msg" :key="v_index">
                                                        <div class="top flex row pad_l_40 pad_r_40 b_s">
                                                            <div class="flex_1 text_height_line_center list_co06">部门{{v_index+1}}条件</div> 
                                                            <div class="text_height_line_center list_co02 text_right pointer current03" @click="remove_bumen(index,v_index)">删除部门条件</div>
                                                        </div>
                                                        <div class="bottom pad_l_40 pad_r_40 b_s pad_t_20">
                                                            <div class="b_add_btn font14 pointer" @click="add_tj(index,v_index)">+ 添加条件</div>
                                                        </div>
                                                        <!--部门人数条件-->
                                                        <div class="pad_l_40 pad_r_40 pad_b_20 b_s">
                                                            <div class="jx_box mar_t_30 w_100 b_s pad_b_20" v-for="(s_item,s_index) in v_item.tj_msg" :key="s_index">
                                                                <div class="top flex row pad_l_40 pad_r_40 b_s">
                                                                    <div class="flex_1 text_height_line_center list_co06 pointer">条件{{s_index+1}}</div>
                                                                    <div class="text_height_line_center text_right list_co02 pointer current03" @click="remove_tj(index,v_index,s_index)">删除条件</div>
                                                                </div>
                                                                <div class="bottom pad_l_40 pad_r_40 b_s pad_t_20 pad_b_20">
                                                                    <div class="flex worp row j_between">
                                                                        <el-form-item v-if="s_index!=0" class="w_30" label="生效时间" prop="timer" >
                                                                            <el-date-picker
                                                                                class="w_100"
                                                                                value-format="yyyy-MM-dd"
                                                                                v-model="s_item.timer"
                                                                                type="date"
                                                                                placeholder="选择生效时间">
                                                                            </el-date-picker>
                                                                        </el-form-item>
                                                                        <el-form-item class="w_30" label="企业工价(元/小时)" prop="qy_price" >
                                                                            <el-input v-model="s_item.qy_price" placeholder="请输入企业工价" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                                        </el-form-item>
                                                                        <el-form-item class="w_30" label="员工单价(元/小时)" prop="yg_price">
                                                                            <el-input v-model="s_item.yg_price" placeholder="请输入员工单价" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                                        </el-form-item>
                                                                        <el-form-item v-if="s_item.rs_msg.length==0" prop="jx_price" class="w_30" label="绩效(元/小时)" >
                                                                            <el-input v-model="s_item.jx_price" placeholder="请输入绩效" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                                        </el-form-item>
                                                                        <div v-else class="w_30"></div>
                                                                    </div>
                                                                    <div class="b_add_btn font14 pointer" @click="add_rs(index,v_index,s_index)">+ 添加人数条件</div>
                                                                    <div class="bottom b_s flex row j_start worp">
                                                                        <div class="mar_t_20 rs_item mar_r_30" v-for="(rs_item,rs_index) in s_item.rs_msg" :key="rs_index">
                                                                            <div class="w_100 flex col b_s pad_b_20">
                                                                                <div class="top flex row pad_l_40 pad_r_40 b_s">
                                                                                    <div class="flex_1 text_height_line_center">人数条件{{rs_index+1}}</div>
                                                                                    <div class="text_height_line_center list_co02 text_right pointer current03" @click="remove_rs(index,v_index,s_index,rs_index)">删除</div>
                                                                                </div>
                                                                                <div class="flex flex_1 col b_s pad_l_20 pad_t_20 pad_r_20">
                                                                                    <p class="w_100 font14 mar_b_10 list_co06"><span class="list_co02">*</span>人数条件</p>
                                                                                    <div class="rs_list flex row">
                                                                                        <el-form-item class="w_40" label="" prop="rs_start">
                                                                                            <el-input v-model="rs_item.rs_start" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入" clearable></el-input>
                                                                                        </el-form-item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ~ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                     
                                                                                        <el-form-item class="w_40" label="" prop="rs_end">
                                                                                            <el-input v-model="rs_item.rs_end" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入" clearable></el-input>
                                                                                        </el-form-item>
                                                                                    </div>
                                                                                    <div class="rs_list">
                                                                                        <p class="w_100 font14 mar_b_10 list_co06"><span class="list_co02">*</span>绩效(元/小时)</p>
                                                                                        <el-form-item class="w_100" label="" prop="jx" >
                                                                                            <el-input v-model="rs_item.jx" oninput="value=value.replace(/[^\d\.]/g,'')" placeholder="请输入绩效" clearable></el-input>
                                                                                        </el-form-item>
                                                                                    </div>
                                                                                    <div class="rs_list"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--学生工&&小时工-->
                                    <div v-if="ruleForm.jx_type==2" class="pad_l_20 pad_r_20 b_s mar_t_30">
                                        <!--结算条件-->
                                        <div class="jx_box mar_b_30" :class="item.shouqi_flag?'current':''" v-for="(item,index) in ruleForm.xs_msg" :key="index">
                                            <div class="top pad_l_40 pad_r_40 b_s flex row j_between">
                                                <div class="flex_1 text_height_line_center list_co06">结算条件{{index+1}}</div>
                                                <div class="flex_1 flex row j_end">
                                                    <span class="mar_r_30 text_height_line_center list_co05 pointer" :class="item.shouqi_flag?'current02':'current01'" @click="shouqi(index)">{{item.shouqi_flag?'展开':'收起'}}</span>
                                                    <span class="mar_l_30 text_height_line_center list_co02 pointer current03" @click="remove_jstj(index)">删除结算条件</span>
                                                </div>
                                            </div>
                                            <div class="bottom pad_l_40 pad_r_40 b_s pad_t_20 pad_b_20">
                                                <div class="w_100 mar_t_20">
                                                    <el-form-item class="from_textarea_120px w_45" label="入职时间" prop="timer">
                                                        <el-date-picker
                                                            v-model="item.timer"
                                                            type="daterange"
                                                            value-format="yyyy-MM-dd"
                                                            range-separator="至"
                                                            start-placeholder="开始日期"
                                                            end-placeholder="结束日期">
                                                        </el-date-picker>
                                                    </el-form-item>
                                                    <div class="b_add_btn font14 pointer" @click="add_bumen(index)">+ 添加部门条件</div>
                                                    <!--部门条件-->
                                                    <div class="jx_box mar_t_30 w_100" v-for="(v_item,v_index) in item.bm_msg" :key="v_index">
                                                        <div class="top flex row pad_l_40 pad_r_40 b_s">
                                                            <div class="flex_1 text_height_line_center list_co06">部门{{v_index+1}}条件</div>
                                                            <div class="text_height_line_center list_co02 text_right pointer current03" @click="remove_bumen(index,v_index)">删除部门条件</div>
                                                        </div>
                                                        <div class="bottom pad_l_40 pad_r_40 b_s pad_t_20">
                                                            <div class="b_add_btn font14 pointer" @click="add_tj(index,v_index)">+ 添加条件</div>
                                                        </div>
                                                        <!--部门人数条件-->
                                                        <div class="pad_l_40 pad_r_40 pad_b_20 b_s">
                                                            <div class="jx_box mar_t_30 w_100 b_s pad_b_20" v-for="(s_item,s_index) in v_item.tj_msg" :key="s_index">
                                                                <div class="top flex row pad_l_40 pad_r_40 b_s">
                                                                    <div class="flex_1 text_height_line_center list_co06 pointer">条件{{s_index+1}}</div>
                                                                    <div class="text_height_line_center text_right list_co02 pointer current03" @click="remove_tj(index,v_index,s_index)">删除条件</div>
                                                                </div>
                                                                <div class="bottom pad_l_40 pad_r_40 b_s pad_t_20 pad_b_20">
                                                                    <div class="flex worp row j_between">
                                                                        <el-form-item v-if="s_index!=0" prop="timer" class="w_30" label="生效时间" >
                                                                            <el-date-picker
                                                                                class="w_100"
                                                                                value-format="yyyy-MM-dd"
                                                                                v-model="s_item.timer"
                                                                                type="date"
                                                                                placeholder="选择生效时间">
                                                                            </el-date-picker>
                                                                        </el-form-item>
                                                                        <el-form-item class="w_30" label="企业工价(元/小时)" prop="qy_price" >
                                                                            <el-input v-model="s_item.qy_price" placeholder="请输入企业工价" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                                        </el-form-item>
                                                                        <el-form-item class="w_30" label="员工单价(元/小时)" prop="yg_price">
                                                                            <el-input v-model="s_item.yg_price" placeholder="请输入员工单价" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                                        </el-form-item>
                                                                        <el-form-item v-if="s_item.rs_msg.length==0" class="w_30" label="绩效(元/小时)" prop="jx_price">
                                                                            <el-input v-model="s_item.jx_price" placeholder="请输入绩效" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                                        </el-form-item>
                                                                        <div v-else class="w_30"></div>
                                                                    </div>
                                                                    <div class="b_add_btn font14 pointer" @click="add_rs(index,v_index,s_index)">+ 添加人数条件</div>
                                                                    <div class="bottom b_s flex row j_start worp">
                                                                        <div class="mar_t_20 rs_item mar_r_30" v-for="(rs_item,rs_index) in s_item.rs_msg" :key="rs_index">
                                                                            <div class="w_100 flex col b_s pad_b_20">
                                                                                <div class="top flex row pad_l_40 pad_r_40 b_s">
                                                                                    <div class="flex_1 text_height_line_center">人数条件{{rs_index+1}}</div>
                                                                                    <div class="text_height_line_center list_co02 text_right pointer current03" @click="remove_rs(index,v_index,s_index,rs_index)">删除</div>
                                                                                </div>
                                                                                <div class="flex flex_1 col b_s pad_l_20 pad_t_20 pad_r_20">
                                                                                    <p class="w_100 font14 mar_b_10 list_co06"><span class="list_co02">*</span>人数条件</p>
                                                                                    <div class="rs_list flex row">
                                                                                        <el-form-item class="w_40" label="" prop="rs_start">
                                                                                            <el-input v-model="rs_item.rs_start" placeholder="请输入" oninput="value=value.replace(/[^\d]/g,'')" clearable></el-input>
                                                                                        </el-form-item>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ~ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                     
                                                                                        <el-form-item class="w_40" label="" prop="rs_end">
                                                                                            <el-input v-model="rs_item.rs_end" placeholder="请输入" oninput="value=value.replace(/[^\d]/g,'')" clearable></el-input>
                                                                                        </el-form-item>
                                                                                    </div>
                                                                                    <div class="rs_list">
                                                                                        <p class="w_100 font14 mar_b_10 list_co06"><span class="list_co02">*</span>绩效(元/小时)</p>
                                                                                        <el-form-item class="w_100" label="" prop="jx" >
                                                                                            <el-input v-model="rs_item.jx" placeholder="请输入绩效" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                                                        </el-form-item>
                                                                                    </div>
                                                                                    <div class="rs_list"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--同工同酬模块-->
                                <div v-if="ruleForm.jxfs==2" class="b_s pad_l_20 pad_r_20">
                                    <!--社会工-->
                                    <div v-if="ruleForm.jx_type==1">
                                        <div class="flex row b_s pad_t_20">
                                            <p class=" font14 mar_r_30" style="line-height:32px;"><span class="list_co02">*  </span>计算方式</p>
                                            <el-form-item label="" prop="">
                                                <el-radio-group  v-model="ruleForm.tg_sh_msg.tg_jsfs">
                                                    <el-radio :label="0">按小时</el-radio>
                                                    <el-radio :label="1">按全勤天数</el-radio>
                                                    <el-radio :label="2">按百分比</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                        </div>
                                        <!--计算方式 0:按小时  1：按全勤天数  2：按百分比 -->
                                        <div v-if="ruleForm.tg_sh_msg.tg_jsfs==0">
                                            <div class="flex row j_between">
                                                <el-form-item class="w_30" label="企业工价(元/小时)" prop="" >
                                                    <el-input v-model="ruleForm.tg_sh_msg.tg_laowufee" placeholder="请输入企业工价" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                </el-form-item>
                                                <el-form-item class="w_30" label="绩效(元/小时)" prop="">
                                                    <el-input v-model="ruleForm.tg_sh_msg.tg_jx" placeholder="请输入绩效" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                </el-form-item>
                                                <el-form-item class="w_30" label="业务费(元/小时)" prop="">
                                                    <el-input v-model="ruleForm.tg_sh_msg.tg_yewufee" placeholder="请输入业务费" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                </el-form-item>
                                            </div>
                                            <div class="flex row b_s pad_t_20">
                                                <p class="font14 mar_r_30" style="line-height:32px;"><span class="list_co02">*  </span>工资发放方式</p>
                                                <el-form-item label="" prop="">
                                                    <el-radio-group  v-model="ruleForm.tg_sh_msg.tg_fffs">
                                                        <el-radio :label="0">企业全额</el-radio>
                                                        <el-radio :label="2">公司发放</el-radio>
                                                        <el-radio :label="1">补差额</el-radio>
                                                    </el-radio-group>
                                                </el-form-item>
                                            </div>
                                            <!--公司发放-->
                                            <div v-if="ruleForm.tg_sh_msg.tg_fffs==2" class="flex row j_between">
                                                <el-form-item class="w_30" label="员工单价(元/小时)" prop="" >
                                                    <el-input v-model="ruleForm.tg_sh_msg.tg_ygdj" oninput="value=value.replace(/[^\d\.]/g,'')" placeholder="请输入员工单价" clearable></el-input>
                                                </el-form-item>
                                                <div class="w_30"></div>
                                                <div class="w_30"></div>
                                            </div>
                                            <!--补差额-->
                                            <div v-if="ruleForm.tg_sh_msg.tg_fffs==1" class="flex row j_between">
                                                <el-form-item class="w_30" label="企业保底(元/小时)" prop="" >
                                                    <el-input v-model="ruleForm.tg_sh_msg.tg_qybd" oninput="value=value.replace(/[^\d\.]/g,'')" placeholder="请输入企业保底" clearable></el-input>
                                                </el-form-item>
                                                <el-form-item class="w_30" label="公司保底(元/小时)" prop="">
                                                    <el-input v-model="ruleForm.tg_sh_msg.tg_gsbd" oninput="value=value.replace(/[^\d\.]/g,'')" placeholder="请输入公司保底" clearable></el-input>
                                                </el-form-item>
                                                <div class="w_30"></div>
                                            </div>
                                        </div>
                                        <div v-if="ruleForm.tg_sh_msg.tg_jsfs==1">
                                            <div class="flex row b_s pad_t_20">
                                                <p class=" font14 mar_r_30" style="line-height:32px;"><span class="list_co02">*  </span>月份类型</p>
                                                <el-form-item label="" prop="tg_jsfs">
                                                    <el-radio-group  v-model="ruleForm.tg_sh_msg.tg_yflx">
                                                        <el-radio :label="0">自然月</el-radio>
                                                        <el-radio :label="1">固定月</el-radio>
                                                    </el-radio-group>
                                                </el-form-item>
                                            </div>
                                            <!--固定月-->
                                            <div v-if="ruleForm.tg_sh_msg.tg_yflx==1" class="flex row j_between">
                                                <el-form-item class="w_30" label="全勤天数" prop="" >
                                                    <el-input v-model="ruleForm.tg_sh_msg.tg_qqts" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入全勤天数" clearable></el-input>
                                                </el-form-item>
                                                <div class="w_30"></div>
                                                <div class="w_30"></div>
                                            </div>
                                            <div class="flex row j_between">
                                                <el-form-item class="w_30" label="企业工价(元/月)" prop="" >
                                                    <el-input v-model="ruleForm.tg_sh_msg.tg_laowufee" placeholder="请输入企业工价" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                </el-form-item>
                                                <el-form-item class="w_30" label="绩效(元/月)" prop="">
                                                    <el-input v-model="ruleForm.tg_sh_msg.tg_jx" placeholder="请输入绩效" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                </el-form-item>
                                                <el-form-item class="w_30" label="业务费(元/月)" prop="">
                                                    <el-input v-model="ruleForm.tg_sh_msg.tg_yewufee" placeholder="请输入业务费" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                </el-form-item>
                                            </div>
                                            <div class="flex row b_s pad_t_20">
                                                <p class=" font14 mar_r_30" style="line-height:32px;"><span class="list_co02">*  </span>工资发放方式</p>
                                                <el-form-item label="" prop="">
                                                    <el-radio-group  v-model="ruleForm.tg_sh_msg.tg_fffs">
                                                        <el-radio :label="0">企业全额</el-radio>
                                                        <el-radio :label="2">公司发放</el-radio>
                                                        <el-radio :label="1">补差额</el-radio>
                                                    </el-radio-group>
                                                </el-form-item>
                                            </div>
                                            <!--公司发放-->
                                            <div v-if="ruleForm.tg_sh_msg.tg_fffs==2" class="flex row j_between">
                                                <el-form-item class="w_30" label="员工单价(元/月)" prop="" >
                                                    <el-input v-model="ruleForm.tg_sh_msg.tg_ygdj" oninput="value=value.replace(/[^\d\.]/g,'')" placeholder="请输入员工单价" clearable></el-input>
                                                </el-form-item>
                                                <div class="w_30"></div>
                                                <div class="w_30"></div>
                                            </div>
                                            <!--补差额-->
                                            <div v-if="ruleForm.tg_sh_msg.tg_fffs==1" class="flex row j_between">
                                                <el-form-item class="w_30" label="企业保底(元/月)" prop="" >
                                                    <el-input v-model="ruleForm.tg_sh_msg.tg_qybd" placeholder="请输入企业保底" clearable></el-input>
                                                </el-form-item>
                                                <el-form-item class="w_30" label="公司保底(元/月)" prop="">
                                                    <el-input v-model="ruleForm.tg_sh_msg.tg_gsbd" placeholder="请输入公司保底" clearable></el-input>
                                                </el-form-item>
                                                <div class="w_30"></div>
                                            </div>
                                        </div>
                                        <div v-if="ruleForm.tg_sh_msg.tg_jsfs==2">
                                            <div class="flex row j_between">
                                                <el-form-item class="w_30" label="劳务费(%)" prop="" >
                                                    <el-input v-model="ruleForm.tg_sh_msg.tg_laowufee" placeholder="请输入劳务费" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                </el-form-item>
                                                <el-form-item class="w_30" label="绩效(%)" prop="">
                                                    <el-input v-model="ruleForm.tg_sh_msg.tg_jx" placeholder="请输入绩效" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                </el-form-item>
                                                <el-form-item class="w_30" label="业务费(%)" prop="">
                                                    <el-input v-model="ruleForm.tg_sh_msg.tg_yewufee" placeholder="请输入业务费" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                </el-form-item>
                                            </div>
                                        </div>
                                    </div>
                                    <!--学生工-->
                                    <div v-if="ruleForm.jx_type==2">
                                        <div class="flex row b_s pad_t_20">
                                            <p class=" font14 mar_r_30" style="line-height:32px;"><span class="list_co02">*  </span>计算方式</p>
                                            <el-form-item label="" prop="">
                                                <el-radio-group  v-model="ruleForm.tg_xs_msg.tg_jsfs">
                                                    <el-radio :label="0">按小时</el-radio>
                                                    <el-radio :label="1">按全勤天数</el-radio>
                                                    <el-radio :label="2">按百分比</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                        </div>
                                        <!--计算方式 0:按小时  1：按全勤天数  2：按百分比 -->
                                        <div v-if="ruleForm.tg_xs_msg.tg_jsfs==0">
                                            <div class="flex row j_between">
                                                <el-form-item class="w_30" label="企业工价(元/小时)" prop="" >
                                                    <el-input v-model="ruleForm.tg_xs_msg.tg_laowufee" placeholder="请输入企业工价" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                </el-form-item>
                                                <el-form-item class="w_30" label="绩效(元/小时)" prop="">
                                                    <el-input v-model="ruleForm.tg_xs_msg.tg_jx" placeholder="请输入绩效" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                </el-form-item>
                                                <el-form-item class="w_30" label="业务费(元/小时)" prop="">
                                                    <el-input v-model="ruleForm.tg_xs_msg.tg_yewufee" placeholder="请输入业务费" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                </el-form-item>
                                            </div>
                                            <div class="flex row b_s pad_t_20">
                                                <p class="font14 mar_r_30" style="line-height:32px;"><span class="list_co02">*  </span>工资发放方式</p>
                                                <el-form-item label="" prop="">
                                                    <el-radio-group  v-model="ruleForm.tg_xs_msg.tg_fffs">
                                                        <el-radio :label="0">企业全额</el-radio>
                                                        <el-radio :label="2">公司发放</el-radio>
                                                        <el-radio :label="1">补差额</el-radio>
                                                    </el-radio-group>
                                                </el-form-item>
                                            </div>
                                            <!--公司发放-->
                                            <div v-if="ruleForm.tg_xs_msg.tg_fffs==2" class="flex row j_between">
                                                <el-form-item class="w_30" label="员工单价(元/小时)" prop="" >
                                                    <el-input v-model="ruleForm.tg_xs_msg.tg_ygdj" oninput="value=value.replace(/[^\d\.]/g,'')" placeholder="请输入员工单价" clearable></el-input>
                                                </el-form-item>
                                                <div class="w_30"></div>
                                                <div class="w_30"></div>
                                            </div>
                                            <!--补差额-->
                                            <div v-if="ruleForm.tg_xs_msg.tg_fffs==1" class="flex row j_between">
                                                <el-form-item class="w_30" label="企业保底(元/小时)" prop="" >
                                                    <el-input v-model="ruleForm.tg_xs_msg.tg_qybd" oninput="value=value.replace(/[^\d\.]/g,'')" placeholder="请输入企业保底" clearable></el-input>
                                                </el-form-item>
                                                <el-form-item class="w_30" label="公司保底(元/小时)" prop="">
                                                    <el-input v-model="ruleForm.tg_xs_msg.tg_gsbd" oninput="value=value.replace(/[^\d\.]/g,'')" placeholder="请输入公司保底" clearable></el-input>
                                                </el-form-item>
                                                <div class="w_30"></div>
                                            </div>
                                        </div>
                                        <div v-if="ruleForm.tg_xs_msg.tg_jsfs==1">
                                            <div class="flex row b_s pad_t_20">
                                                <p class=" font14 mar_r_30" style="line-height:32px;"><span class="list_co02">*  </span>月份类型</p>
                                                <el-form-item label="" prop="">
                                                    <el-radio-group  v-model="ruleForm.tg_xs_msg.tg_yflx">
                                                        <el-radio :label="0">自然月</el-radio>
                                                        <el-radio :label="1">固定月</el-radio>
                                                    </el-radio-group>
                                                </el-form-item>
                                            </div>
                                            <!--固定月-->
                                            <div v-if="ruleForm.tg_xs_msg.tg_yflx==1" class="flex row j_between">
                                                <el-form-item class="w_30" label="全勤天数" prop="" >
                                                    <el-input v-model="ruleForm.tg_xs_msg.tg_qqts" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入全勤天数" clearable></el-input>
                                                </el-form-item>
                                                <div class="w_30"></div>
                                                <div class="w_30"></div>
                                            </div>
                                            <div class="flex row j_between">
                                                <el-form-item class="w_30" label="企业工价" prop="" >
                                                    <el-input v-model="ruleForm.tg_xs_msg.tg_laowufee" placeholder="请输入企业工价" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                </el-form-item>
                                                <el-form-item class="w_30" label="绩效(元/月)" prop="">
                                                    <el-input v-model="ruleForm.tg_xs_msg.tg_jx" placeholder="请输入绩效" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                </el-form-item>
                                                <el-form-item class="w_30" label="业务费(元/月)" prop="">
                                                    <el-input v-model="ruleForm.tg_xs_msg.tg_yewufee" placeholder="请输入业务费" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                </el-form-item>
                                            </div>
                                            <div class="flex row b_s pad_t_20">
                                                <p class=" font14 mar_r_30" style="line-height:32px;"><span class="list_co02">*  </span>工资发放方式</p>
                                                <el-form-item label="" prop="">
                                                    <el-radio-group  v-model="ruleForm.tg_xs_msg.tg_fffs">
                                                        <el-radio :label="0">企业全额</el-radio>
                                                        <el-radio :label="2">公司发放</el-radio>
                                                        <el-radio :label="1">补差额</el-radio>
                                                    </el-radio-group>
                                                </el-form-item>
                                            </div>
                                            <!--公司发放-->
                                            <div v-if="ruleForm.tg_xs_msg.tg_fffs==2" class="flex row j_between">
                                                <el-form-item class="w_30" label="员工单价(元/月)" prop="" >
                                                    <el-input v-model="ruleForm.tg_xs_msg.tg_ygdj" oninput="value=value.replace(/[^\d\.]/g,'')" placeholder="请输入员工单价" clearable></el-input>
                                                </el-form-item>
                                                <div class="w_30"></div>
                                                <div class="w_30"></div>
                                            </div>
                                            <!--补差额-->
                                            <div v-if="ruleForm.tg_xs_msg.tg_fffs==1" class="flex row j_between">
                                                <el-form-item class="w_30" label="企业保底(元/月)" prop="" >
                                                    <el-input v-model="ruleForm.tg_xs_msg.tg_qybd" oninput="value=value.replace(/[^\d\.]/g,'')" placeholder="请输入企业保底" clearable></el-input>
                                                </el-form-item>
                                                <el-form-item class="w_30" label="公司保底(元/月)" prop="">
                                                    <el-input v-model="ruleForm.tg_xs_msg.tg_gsbd" oninput="value=value.replace(/[^\d\.]/g,'')" placeholder="请输入公司保底" clearable></el-input>
                                                </el-form-item>
                                                <div class="w_30"></div>
                                            </div>
                                        </div>
                                        <div v-if="ruleForm.tg_xs_msg.tg_jsfs==2">
                                            <div class="flex row j_between">
                                                <el-form-item class="w_30" label="劳务费(%)" prop="" >
                                                    <el-input v-model="ruleForm.tg_xs_msg.tg_laowufee" placeholder="请输入劳务费" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                </el-form-item>
                                                <el-form-item class="w_30" label="绩效(%)" prop="">
                                                    <el-input v-model="ruleForm.tg_xs_msg.tg_jx" placeholder="请输入绩效" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                </el-form-item>
                                                <el-form-item class="w_30" label="业务费(%)" prop="">
                                                    <el-input v-model="ruleForm.tg_xs_msg.tg_yewufee" placeholder="请输入业务费" oninput="value=value.replace(/[^\d\.]/g,'')" clearable></el-input>
                                                </el-form-item>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-form>
                    <div class="po_b po_bottom bg_fff h_60px w_100">
                        <submit-btn @submitForm='submitForm' @resetForm='resetForm'></submit-btn>
                    </div>
            </div>
  
</template>

<script>
var THIS,inter;
import botHeader from '../../components/bot-header/bot-header';
import submitBtn from '../../components/form-submit/submit-btn';
export default {
    components:{
        botHeader,
        submitBtn
    },
    name: '',
    computed: {
        watchCompany() {
            return this.ruleForm.company;
        },
    },
    watch: {
        watchCompany() {
            this.get_companybaseInfo();
        },
    },
    data(){
        return {
                id:'',
                type:'',      //1:岗位列表   2：审核列表
                baseInfo:{
                    name:'',
                    companyCode:'',
                    hangye:'',
                    fen_company:'',
                    jianjie:''
                },
                companyArr:[],
                hangye_info:[],
                kaipiao_info:[],
                gangwei_info:[],
                company_tag_info:[],
                xingzhi_info:[],
                wage_type_info:[],
                bank_info:[],
                address_options:[],
                //表单验证
                ruleForm:{
                    company:'',
                    fen_company:'',
                    dw_name:'',
                    product:'',
                    address:'',
                    xx_address:'',
                    up_sp:'',
                    isTop:1,
                    job:'',
                    xingzhi:'',
                    number:'',
                    imgArr:[],
                    wenan:'',
                    age:'',
                    timer:'',
                    cailiao:'',
                    shuoming:'',
                    ygdj:'',
                    xzfw_down:'',
                    xzfw_top:'',
                    tijian:'',
                    fxyh:'',
                    fxsj:'',
                    js_start:'',
                    js_end:'',
                    yyzx_jx:'',
                    yyzx_jxshuoming:'',
                    hsqk:'',
                    zsqk:'',
                    sbfl:'',
                    cfbx:'',
                    shfyz:'',
                    sssm:'',
                    cwjsbz:'',
                    jxfs:1,                         //1：小时工  2：同工同酬
                    jsfs:1,                         //0：人工核算  1：系统核算
                    cwjsbz_xt:'',                   //系统结算备注
                    djr:'',
                    djrdh:'',
                    //绩效内容：
                    jx_type:1,                                          //绩效类型：1 社会工  2 学生工
                    js_kaipiao_id:'',
                    js_kaipiao_company:'',
                    js_kaipiao_info:'',
                    //小时工
                    yewu_fee:'',
                    sh_msg:[],
                    xs_msg:[],
                    //同工同酬
                    tg_sh_msg:{
                        tg_jsfs:0,                                      //0:按小时   1：按全天   2：按百分比
                        //0:按小时
                        tg_laowufee:'',
                        tg_jx:'',
                        tg_yewufee:'',
                        tg_qybd:'',
                        tg_gsbd:'',
                        tg_fffs:0,                                     //0:企业全额  1:补差额  2:公司发放
                        tg_yflx:0,                                     //0:自然月  1:固定月
                        tg_qqts:'',                                    //全勤天数
                        tg_ygdj:'',                                    //员工单价(公司发放情况下)
                    },
                    tg_xs_msg:{
                        tg_jsfs:0,                                      //0:按小时   1：按全天   2：按百分比
                        tg_laowufee:'',
                        tg_jx:'',
                        tg_yewufee:'',
                        tg_qybd:'',
                        tg_gsbd:'',
                        tg_fffs:0,                                     //0:企业全额  1:补差额  2:公司发放
                        tg_yflx:0,                                     //0:自然月  1:固定月
                        tg_qqts:'',                                    //全勤天数
                        tg_ygdj:'',                                    //员工单价(公司发放情况下)
                    },
                },
                rules:{
                    company:[{ required: true, message: '请选择企业', trigger: [] }],
                    fen_company:[{ required: true, message: '请选择所属分公司', trigger: [] }],
                    dw_name:[{ required: true, message: '请输入对外招工名称', trigger: [] }],
                    product:[{ required: true, message: '请输入主营产品', trigger: [] }],
                    address:[{ required: true, message: '请选择所属地区', trigger: [] }],
                    xx_address:[{ required: true, message: '请输入详细地址', trigger: [] }],
                    wenan:[{ required: true, message: '请输入分享文案', trigger: [] }],
                    job:[{ required: true, message: '请选择工作岗位', trigger: [] }],
                    xingzhi:[{ required: true, message: '请选择工作性质', trigger: [] }],
                    number:[{ required: true, message: '请输入招聘人数', trigger: [] }],
                    age:[{ required: true, message: '请输入年龄要求', trigger: [] }],
                    cailiao:[{ required: true, message: '请输入入职材料准备', trigger: [] }],
                    tijian:[{ required: true, message: '请输入体检费用及流程', trigger: [] }],
                    jxfs:[{ required: true, message: '请选择计薪方式', trigger: [] }],
                    ygdj:[{ required: true, message: '请输入员工单价', trigger: [] }],
                    xzfw_down:[{ required: true, message: '请输入薪资范围最低', trigger: [] }],
                    xzfw_top:[{ required: true, message: '请输入薪资范围最高', trigger: [] }],
                    fxsj:[{ required: true, message: '请选择发薪时间', trigger: [] }],
                    js_start:[{ required: true, message: '请选择结算开始时间', trigger: [] }],
                    js_end:[{ required: true, message: '请选择结算结束时间', trigger: [] }],
                    fxyh:[{ required: true, message: '请选择发薪银行', trigger: [] }],
                    yyzx_jx:[{ required: true, message: '请输入绩效结算备注', trigger: [] }],
                    hsqk:[{ required: true, message: '请输入伙食情况', trigger: [] }],
                    sbfl:[{ required: true, message: '请输入社保福利', trigger: [] }],
                    cfbx:[{ required: true, message: '请输入车费报销', trigger: [] }],
                    zsqk:[{ required: true, message: '请输入住宿情况', trigger: [] }],
                    shfyz:[{ required: true, message: '请选择生活费预支', trigger: [] }],
                    cwjsbz:[{ required: true, message: '请输入财务绩效结算备注', trigger: [] }],
                    jsfs:[{ required: true, message: '请选择结算方式', trigger: [] }],
                    djr:[{ required: true, message: '请输入对接人', trigger: [] }],
                    djrdh:[{ required: true, message: '请输入对接人电话', trigger: [] }],
                    yewu_fee:[{ required: true, message: '请输入业务费', trigger: [] }],
                    qy_price:[{ required: false, message: '请输入企业单价', trigger: [] }],
                    yg_price:[{ required: false, message: '请输入员工单价', trigger: [] }],
                    rs_start:[{ required: false, message: '请输入开始人数', trigger: [] }],
                    rs_end:[{ required: false, message: '请输入结束人数', trigger: [] }],
                    tg_jsfs:[{ required: false, message: '请选择计薪方式', trigger: [] }],
                    tg_laowufee:[{ required: false, message: '请输入劳务费', trigger: [] }],
                    tg_jx:[{ required: false, message: '请输入绩效', trigger: [] }],
                    jx_price:[{ required: false, message: '请输入绩效', trigger: [] }],
                    jx:[{ required: false, message: '请输入绩效', trigger: [] }],
                    tg_yewufee:[{ required: false, message: '请输入业务费', trigger: [] }], 
                    tg_qybd:[{ required: false, message: '请输入企业保底', trigger: [] }],
                    tg_gsbd:[{ required: false, message: '请输入公司保底', trigger: [] }],
                    tg_qqts:[{ required: false, message: '请输入全勤天数', trigger: [] }],
                    timer:[{ required: false, message: '请选择时间', trigger: [] }]
                },
                //上传图片开始
                up_imgurl:'',
                dialogImageUrl: '',
                dialogVisible: false,           //放大图片展示框
                img_value:[],
                //上传图片结束
        }
    },
    methods:{

            submitForm(formName) {
                THIS.$refs[formName].validate((valid) => {
                    if (valid) {
                        THIS.submit_from();
                    } else {
                        THIS.$message({
                            type: 'warning',
                            message: '请将必填项完善后再提交',
                            dangerouslyUseHTMLString:true
                        });
                        return false;
                    }
                });
            },

            resetForm(formName) {
                THIS.$refs[formName].resetFields();
                THIS.clearForm();
            },

            clearForm(){
                THIS.img_value = [];
                THIS.ruleForm = {
                    company:'',
                    fen_company:'',
                    dw_name:'',
                    product:'',
                    address:'',
                    xx_address:'',
                    up_sp:'',
                    isTop:1,
                    job:'',
                    xingzhi:'',
                    number:'',
                    imgArr:[],
                    wenan:'',
                    age:'',
                    timer:'',
                    cailiao:'',
                    shuoming:'',
                    jxfs:1,                         //1：小时工  2：同工同酬
                    ygdj:'',
                    xzfw_down:'',
                    xzfw_top:'',
                    tijian:'',
                    fxyh:'',
                    fxsj:'',
                    js_start:'',
                    js_end:'',
                    yyzx_jx:'',
                    yyzx_jxshuoming:'',
                    hsqk:'',
                    zsqk:'',
                    sbfl:'',
                    cfbx:'',
                    shfyz:'',
                    sssm:'',
                    cwjsbz:'',
                    jsfs:1,
                    djr:'',
                    djrdh:'',
                    //绩效内容：
                    jx_type:1,                                          //绩效类型：1 社会工  2 学生工
                    js_kaipiao_id:'',
                    js_kaipiao_company:'',
                    js_kaipiao_info:'',
                    //小时工
                    yewu_fee:'',
                    sh_msg:[],
                    xs_msg:[],
                    //同工同酬
                    tg_sh_msg:{
                        tg_jsfs:0,                                      //0:按小时   1：按全天   2：按百分比
                        //0:按小时
                        tg_laowufee:'',
                        tg_jx:'',
                        tg_yewufee:'',
                        tg_qybd:'',
                        tg_gsbd:'',
                        tg_fffs:0,                                     //0:企业全额  1:补差额  2:公司发放
                        tg_yflx:0,                                     //0:自然月  1:固定月
                        tg_qqts:'',                                    //全勤天数
                    },
                    tg_xs_msg:{
                        tg_jsfs:0,                                      //0:按小时   1：按全天   2：按百分比
                        tg_laowufee:'',
                        tg_jx:'',
                        tg_yewufee:'',
                        tg_qybd:'',
                        tg_gsbd:'',
                        tg_fffs:0,                                     //0:企业全额  1:补差额  2:公司发放
                        tg_yflx:0,                                     //0:自然月  1:固定月
                        tg_qqts:'',                                    //全勤天数
                    },
                };
            },

            upload(event, file, fileList){
                if(event.code==1){
                    THIS.ruleForm.imgArr.push(event.data.picture[0].url);
                }else if(event.code=='-999'){
                    layout(THIS);
                }else{
                    THIS.$message({
                            type: 'error',
                            message: event.msg,
                            dangerouslyUseHTMLString:true
                    });
                };
            },

            handlePictureCardPreview(file) {
                //放大图片
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },

            deleteImg(file, fileList){
                this.ruleForm.imgArr = [];
                for(let i=0;i<fileList.length;i++){
                    this.ruleForm.imgArr.push(fileList[i].url)
                };
            },

            get_detail(){
                    var data = {
                        companyid:'',
                        type:2
                    };
                    vue_Post(THIS,'company/details',data,callback,1,0,0,0);
                    function callback(msg){
                        //配置文件
                        THIS.hangye_info = msg.hangye_info;
                        THIS.kaipiao_info = msg.kaipiao_info;
                        THIS.gangwei_info = msg.gangwei_info;
                        THIS.xingzhi_info = msg.xingzhi_info;
                        THIS.wage_type_info = msg.wage_type_info;
                        THIS.bank_info = msg.bank_info;
                        //标签
                        THIS.company_tag_info = msg.company_tag_info;
                        for(let i=0;i<THIS.company_tag_info.length;i++){
                            THIS.company_tag_info[i].flag = false;
                        };
                        var ab = THIS.company_tag_info;
                        THIS.company_tag_info = JSON.parse(JSON.stringify(ab));            
                    }; 
            },

            saveDrafts(){
                window.localStorage.ruleForm = JSON.stringify(THIS.ruleForm);
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

            choose_biaoqian(index){
                var aa = this.company_tag_info;
                aa[index].flag = !aa[index].flag;
                this.company_tag_info = JSON.parse(JSON.stringify(aa));
            },

            submit_from(){
                    //工厂照片
                    for(let i=0;i<THIS.ruleForm.imgArr.length;i++){
                        THIS.ruleForm.imgArr[i] = THIS.ruleForm.imgArr[i];
                    };
                    //标签
                    var welfare_tag='',welfareArr=[];
                    for(let i=0;i<THIS.company_tag_info.length;i++){
                        if(THIS.company_tag_info[i].flag){
                            welfareArr.push(THIS.company_tag_info[i].id);
                        };
                    };
                    //招聘期限
                    var star_time = '';
                    var end_time = '';
                    if(THIS.ruleForm.timer){
                        star_time = THIS.ruleForm.timer[0];
                        end_time = THIS.ruleForm.timer[1];
                    };
                    welfare_tag = welfareArr.length>0?welfareArr.join('|'):'';
                    //系统结算
                    var shehui_job = [];
                    var xuesheng_job = [];
                    var yue_job = '';
                    if((THIS.ruleForm.jsfs==1)&&(THIS.ruleForm.jxfs==1)){
                        //小时工系统结算:社会工&&学生工
                        var aa = THIS.ruleForm.sh_msg;
                        var bb = THIS.ruleForm.xs_msg;
                        for(let i=0;i<aa.length;i++){
                            var bumen = [];
                            var t1 = aa[i].timer[0]?aa[i].timer[0]:'';     //开始时间
                            var t2 = aa[i].timer[1]?aa[i].timer[1]:'';     //结束时间
                            for(let j=0;j<aa[i].bm_msg.length;j++){
                                var condition = [];
                                var cur01 = aa[i].bm_msg[j].tj_msg;
                                for(let k=0;k<cur01.length;k++){
                                    if(cur01[k].rs_msg.length==0){//如果人数条件为空
                                        condition.push(
                                            {
                                                system_price:cur01[k].qy_price,
                                                system_yuangong_price:cur01[k].yg_price,
                                                system_jixiao:cur01[k].jx_price,
                                                effect_time:cur01[k].timer?cur01[k].timer:'',
                                            }
                                        );
                                    }else{//如果有人数条件
                                        var number = [];
                                        for(let m=0;m<cur01[k].rs_msg.length;m++){
                                            number.push({
                                                min:cur01[k].rs_msg[m].rs_start,
                                                max:cur01[k].rs_msg[m].rs_end,
                                                system_jixiao:cur01[k].rs_msg[m].jx
                                            });
                                        };
                                        condition.push(
                                            {
                                                system_price:cur01[k].qy_price,
                                                system_yuangong_price:cur01[k].yg_price,
                                                effect_time:cur01[k].timer?cur01[k].timer:'',
                                                number:number
                                            }
                                        );
                                    };
                                    
                                };
                                bumen.push({
                                    name : '生产'+(j+1)+'部',
                                    condition : condition
                                })
                            };
                            shehui_job.push({
                                startdate : t1,
                                enddate : t2,
                                bumen : bumen
                            });
                        };
                        for(let i=0;i<bb.length;i++){
                            var bumen = [];
                            var t1 = aa[i].timer[0]?aa[i].timer[0]:'';     //开始时间
                            var t2 = aa[i].timer[1]?aa[i].timer[1]:'';     //结束时间
                            for(let j=0;j<bb[i].bm_msg.length;j++){
                                var condition = [];
                                var cur01 = bb[i].bm_msg[j].tj_msg;
                                for(let k=0;k<cur01.length;k++){
                                    if(cur01[k].rs_msg.length==0){//如果人数条件为空
                                        condition.push(
                                            {
                                                system_price:cur01[k].qy_price,
                                                system_yuangong_price:cur01[k].yg_price,
                                                system_jixiao:cur01[k].jx_price,
                                                effect_time:cur01[k].timer
                                            }
                                        );
                                    }else{//如果有人数条件
                                        var number = [];
                                        for(let m=0;m<cur01[k].rs_msg.length;m++){
                                            number.push({
                                                min:cur01[k].rs_msg[m].rs_start,
                                                max:cur01[k].rs_msg[m].rs_end,
                                                system_jixiao:cur01[k].rs_msg[m].jx
                                            });
                                        };
                                        condition.push(
                                            {
                                                system_price:cur01[k].qy_price,
                                                system_yuangong_price:cur01[k].yg_price,
                                                effect_time:cur01[k].timer?to_time(cur01[k].timer):'',
                                                number:number
                                            }
                                        );
                                    };
                                };
                                bumen.push({
                                    name : '生产'+(j+1)+'部',
                                    condition : condition
                                })
                            };
                            xuesheng_job.push({
                                startdate : t1,
                                enddate : t2,
                                bumen : bumen
                            });
                        };
                    }else if((THIS.ruleForm.jsfs==1)&&(THIS.ruleForm.jxfs==2)){
                        //同工同酬系统结算:社会工&&学生工 0:按小时 1:按全勤 2：按百分比
                        var shehui_obj = {};
                        var xuesheng_obj = {};
                        //社会工
                        var aa = THIS.ruleForm.tg_sh_msg;
                        if(THIS.ruleForm.tg_sh_msg.tg_jsfs==0){
                            shehui_obj = {
                                js_type: 1,
                                laowu_price: aa.tg_laowufee,
                                system_jixiao: aa.tg_jx,
                                manage_fee: aa.tg_yewufee,
                                gz_type:aa.tg_fffs,
                                company_baoli:aa.tg_fffs==1?aa.tg_qybd:'',
                                jsz_baoli:aa.tg_fffs==1?aa.tg_gsbd:aa.tg_ygdj        //tg_fffs:1 补差额  0：企业全额  2：公司发放  
                            };
                        }else if(THIS.ruleForm.tg_sh_msg.tg_jsfs==1){
                            shehui_obj = {
                                js_type: 3,
                                month_type:aa.tg_yflx,
                                month_day:aa.tg_yflx==1?aa.tg_qqts:'',
                                laowu_price: aa.tg_laowufee,
                                system_jixiao: aa.tg_jx,
                                laowu_price: aa.tg_laowufee,
                                manage_fee: aa.tg_yewufee,
                                gz_type:aa.tg_fffs,
                                company_baoli:aa.tg_fffs==1?aa.tg_qybd:'',
                                jsz_baoli:aa.tg_fffs==1?aa.tg_gsbd:aa.tg_ygdj

                            };
                        }else if(THIS.ruleForm.tg_sh_msg.tg_jsfs==2){
                            shehui_obj = {
                                js_type: 2,
                                laowu_price: aa.tg_laowufee,
                                system_jixiao: aa.tg_jx,
                                manage_fee: aa.tg_yewufee
                            };
                        };
                        //学生工 
                        var bb = THIS.ruleForm.tg_xs_msg;
                        if(THIS.ruleForm.tg_xs_msg.tg_jsfs==0){
                            xuesheng_obj = {
                                js_type: 1,
                                laowu_price: bb.tg_laowufee,
                                system_jixiao: bb.tg_jx,
                                manage_fee: bb.tg_yewufee,
                                gz_type:bb.tg_fffs,
                                company_baoli:bb.tg_fffs==1?bb.tg_qybd:'',
                                jsz_baoli:bb.tg_fffs==1?bb.tg_gsbd:bb.tg_ygdj
                            };
                        }else if(THIS.ruleForm.tg_xs_msg.tg_jsfs==1){
                            xuesheng_obj = {
                                js_type: 3,
                                month_type:bb.tg_yflx,
                                month_day:bb.tg_yflx==1?bb.tg_qqts:'',
                                laowu_price: bb.tg_laowufee,
                                system_jixiao: bb.tg_jx,
                                manage_fee: bb.tg_yewufee,
                                gz_type:bb.tg_fffs,
                                company_baoli:bb.tg_fffs==1?bb.tg_qybd:'',
                                jsz_baoli:bb.tg_fffs==1?bb.tg_gsbd:bb.tg_ygdj
                            };
                        }else if(THIS.ruleForm.tg_xs_msg.tg_jsfs==2){
                            xuesheng_obj = {
                                js_type: 2,
                                laowu_price: bb.tg_laowufee,
                                system_jixiao: bb.tg_jx,
                                manage_fee: bb.tg_yewufee
                            };
                        };
                        yue_job = {
                            shehui : shehui_obj,
                            xuesheng : xuesheng_obj
                        };
                    };
                    var data = {
                        companyid:THIS.ruleForm.company,
                        edit:THIS.id?1:0,
                        title:THIS.ruleForm.dw_name,
                        province:THIS.ruleForm.address[0]?THIS.ruleForm.address[0]:0,
                        city:THIS.ruleForm.address[1]?THIS.ruleForm.address[1]:0,
                        area:THIS.ruleForm.address[2]?THIS.ruleForm.address[2]:0,
                        address:THIS.ruleForm.xx_address,
                        product:THIS.ruleForm.product,
                        top:THIS.ruleForm.isTop,
                        picture:THIS.ruleForm.imgArr.length>0?JSON.stringify(THIS.ruleForm.imgArr):'',
                        gangwei:THIS.ruleForm.job,
                        number:THIS.ruleForm.number,
                        wenan:THIS.ruleForm.wenan,
                        age:THIS.ruleForm.age,
                        zhengjian:THIS.ruleForm.cailiao,
                        tijian:THIS.ruleForm.tijian,
                        zhaopin_other:THIS.ruleForm.shuoming,
                        jxfs:THIS.ruleForm.jxfs,
                        zhaopinqixian:star_time,
                        zhaopinqixian_end:end_time,
                        yggz:THIS.ruleForm.ygdj,
                        xzfwdown:THIS.ruleForm.xzfw_down,
                        xzfwup:THIS.ruleForm.xzfw_top,
                        gzjs:THIS.ruleForm.fxsj,
                        xingzhi:THIS.ruleForm.xingzhi,
                        default_bankname:THIS.ruleForm.fxyh,
                        start_date:THIS.ruleForm.js_start,
                        end_date:THIS.ruleForm.js_end,
                        jx:THIS.ruleForm.yyzx_jx,
                        xinzi_other:THIS.ruleForm.yyzx_jxshuoming,
                        jctj:THIS.ruleForm.hsqk,
                        zstj:THIS.ruleForm.zsqk,
                        djbx:THIS.ruleForm.sbfl,
                        cfbx:THIS.ruleForm.cfbx,
                        shfyz:THIS.ruleForm.shfyz,
                        other:THIS.ruleForm.sssm,
                        welfare_tag:welfare_tag,
                        qiye_duijie:THIS.ruleForm.djr,
                        qiye_duijie_phone:THIS.ruleForm.djrdh,
                        //绩效(系统结算)
                        hesuanfangshi:THIS.ruleForm.jsfs==1?0:1,
                        //人工核算 
                        jiesuan_mark:THIS.ruleForm.jsfs==0?THIS.ruleForm.cwjsbz:'',     
                        //系统核算
                        jiesuan_mark2:THIS.ruleForm.jsfs==1?THIS.ruleForm.cwjsbz_xt:'',
                        manage_fee:(THIS.ruleForm.jsfs==1)&&(THIS.ruleForm.jxfs==1)?THIS.ruleForm.yewu_fee:'',
                        jiesuan_danwei:THIS.ruleForm.js_kaipiao_id,
                        shehui_job:shehui_job?JSON.stringify(shehui_job):'',
                        xuesheng_job:xuesheng_job?JSON.stringify(xuesheng_job):'',
                        yue_job:yue_job?JSON.stringify(yue_job):''
                    };
                    vue_Post(THIS,'company/add',data,callback,1,1,1,1);
                    function callback(msg){
                        THIS.clearForm();
                        THIS.saveDrafts();
                        THIS.$message({
                            type: 'success',
                            message: THIS.id?'编辑成功':'创建成功',
                            dangerouslyUseHTMLString:true
                        });
                        if(THIS.type==1){
                            THIS.$router.replace('/home/company/companyTwo/companyJobList');
                        }else{
                            THIS.$router.replace('/home/company/companyThree/companyShList');
                        };
                    }; 
            },

            search_company(msg){
                    var THIS = this;
                    var data = { keyword:msg, type:2 ,count:10000};
                    vue_indexPost(THIS,'company/companySearchList',data,callback,1,0,0,0);
                    function callback(msg){
                        THIS.companyArr = msg.list;
                    }
            },

            get_companybaseInfo(){
                if(!THIS.ruleForm.company){ return false; };
                var data = {
                    companyid:THIS.ruleForm.company,
                    type:1
                };
                vue_Post(THIS,'company/details',data,callback,1,1,1,1);
                function callback(msg){
                    THIS.baseInfo = {
                        name:msg.info.realtitle,
                        companyCode:msg.info.xy_code,
                        hangye:msg.info.industry_name,
                        fen_company:msg.info.branch_title,
                        jianjie:msg.info.profile
                    };
                    var aa = msg.info.qiandan_id_name;
                    THIS.ruleForm.js_kaipiao_id = aa.id?aa.id:'';
                    THIS.ruleForm.js_kaipiao_company = aa.danwei?aa.danwei:'';
                    THIS.ruleForm.js_kaipiao_info = aa.info?aa.info:'';
                }; 
            },

            get_token_up(file){
                var THIS = this;
                var data = sign({ token:THIS.store.state.token });
                vue_Post(THIS,'upload/getToken',data,callback,1,1,1,1);
                function callback(msg){
                        THIS.load = layer.load(2)
                        var token = msg.token;
                        var files = file;
                        var key = msg.key;
                        var putExtra = { fname: "", params: {} };
                        var config = {
                            useCdnDomain: true,
                            region: null
                        };
                        var observer = {
                            next(res){},
                            error(err){}, 
                            complete(res){
                                layer.close(THIS.load);
                                me_msg(THIS,'上传成功',1);
                                THIS.msgEdit.filepath = res.key;
                                THIS.msgEdit.filename = '版本'+THIS.msgEdit.code+'.apk';
                            }
                        };
                        qiniu.upload(files, key, token, putExtra, config).subscribe(observer); // 上传开始
                };
            },

            choose_jx_type(type){
                THIS.ruleForm.jx_type = type;
            },

            add_jstj(){
                if(THIS.ruleForm.jx_type==1){
                    THIS.ruleForm.sh_msg.push(
                        {
                            timer:'',
                            shouqi_flag:false,
                            bm_msg:[
                                {
                                    tj_msg:[
                                        {
                                            qy_price:'',
                                            yg_price:'',
                                            jx_price:'',
                                            rs_msg:[]
                                        }
                                    ]
                                }
                            ]
                        }
                    );
                }else if(THIS.ruleForm.jx_type==2){
                    THIS.ruleForm.xs_msg.push(
                        {
                            timer:'',
                            shouqi_flag:false,
                            bm_msg:[
                                {
                                    tj_msg:[
                                        {
                                            qy_price:'',
                                            yg_price:'',
                                            jx_price:'',
                                            rs_msg:[]
                                        }
                                    ]
                                }
                            ]
                        }
                    );
                };
            },

            remove_jstj(index){
                if(THIS.ruleForm.jx_type==1){
                    THIS.ruleForm.sh_msg.splice(index,1);
                }else if(THIS.ruleForm.jx_type==2){
                    THIS.ruleForm.xs_msg.splice(index,1);
                };
            },
            
            add_bumen(index){
                if(THIS.ruleForm.jx_type==1){
                    THIS.ruleForm.sh_msg[index].bm_msg.push(
                        {
                            tj_msg:[
                                {
                                    qy_price:'',
                                    yg_price:'',
                                    jx_price:'',
                                    rs_msg:[]
                                }
                            ]
                        }
                    );
                }else if(THIS.ruleForm.jx_type==2){
                    THIS.ruleForm.xs_msg[index].bm_msg.push(
                        {
                            tj_msg:[
                                {
                                    qy_price:'',
                                    yg_price:'',
                                    jx_price:'',
                                    rs_msg:[]
                                }
                            ]
                        }
                    );
                };
            },

            remove_bumen(index,v_index){
                if(THIS.ruleForm.jx_type==1){
                    THIS.ruleForm.sh_msg[index].bm_msg.splice(v_index,1);
                }else if(THIS.ruleForm.jx_type==2){
                    THIS.ruleForm.xs_msg[index].bm_msg.splice(v_index,1);
                };
            },

            add_tj(index,v_index){
                if(THIS.ruleForm.jx_type==1){
                    THIS.ruleForm.sh_msg[index].bm_msg[v_index].tj_msg.push(
                        {
                            qy_price:'',
                            yg_price:'',
                            jx_price:'',
                            rs_msg:[]
                        }
                    )
                }else if(THIS.ruleForm.jx_type==2){
                    THIS.ruleForm.xs_msg[index].bm_msg[v_index].tj_msg.push(
                        {
                            qy_price:'',
                            yg_price:'',
                            jx_price:'',
                            rs_msg:[]
                        }
                    )
                };
            },

            remove_tj(index,v_index,s_index){
                if(THIS.ruleForm.jx_type==1){
                    THIS.ruleForm.sh_msg[index].bm_msg[v_index].tj_msg.splice(s_index,1);
                }else if(THIS.ruleForm.jx_type==2){
                    THIS.ruleForm.xs_msg[index].bm_msg[v_index].tj_msg.splice(s_index,1);
                };
            },

            add_rs(index,v_index,s_index){
                if(THIS.ruleForm.jx_type==1){
                    THIS.ruleForm.sh_msg[index].bm_msg[v_index].tj_msg[s_index].rs_msg.push(
                        {
                            rs_start:'',
                            rs_end:'',
                            jx:''
                        }
                    );
                }else if(THIS.ruleForm.jx_type==2){
                    THIS.ruleForm.xs_msg[index].bm_msg[v_index].tj_msg[s_index].rs_msg.push(
                        {
                            rs_start:'',
                            rs_end:'',
                            jx:''
                        }
                    )
                };
            },

            remove_rs(index,v_index,s_index,rs_index){
                if(THIS.ruleForm.jx_type==1){
                    THIS.ruleForm.sh_msg[index].bm_msg[v_index].tj_msg[s_index].rs_msg.splice(rs_index,1);
                }else if(THIS.ruleForm.jx_type==2){
                    THIS.ruleForm.xs_msg[index].bm_msg[v_index].tj_msg[s_index].rs_msg.splice(rs_index,1);
                };
            },

            shouqi(index){
                if(THIS.ruleForm.jx_type==1){
                    THIS.ruleForm.sh_msg[index].shouqi_flag = !THIS.ruleForm.sh_msg[index].shouqi_flag;
                }else if(THIS.ruleForm.jx_type==2){
                    THIS.ruleForm.xs_msg[index].shouqi_flag = !THIS.ruleForm.xs_msg[index].shouqi_flag;
                };
            }

    },
    mounted(){
        THIS = this;
        THIS.store.commit('setPageText','当前位置：企业 / 创建岗位');
        THIS.id = THIS.$route.params.id?THIS.$route.params.id:'';
        THIS.type = THIS.$route.params.type;
        THIS.up_imgurl = window.localStorage.commonhost+'upload/uploadFile';
        THIS.get_detail();
        THIS.get_address();
        if(!THIS.id){
            THIS.search_company('');
        };
        //获取草稿
        THIS.ruleForm = JSON.parse(window.localStorage.ruleForm);
        for(let i=0;i<THIS.ruleForm.imgArr.length;i++){
            THIS.img_value.push({url:THIS.ruleForm.imgArr[i],name:''});
        };
        //检测浏览器关闭时保存草稿
        inter = setInterval(()=>{
            THIS.saveDrafts();
            console.log('好了');
        },8000);

    },
    beforeDestroy(){
        clearInterval(inter);
    }
}
</script>

<style scoped>
    .biaoqian li{
        padding: 8px;
        background-color: #F3F3F3;
        color: #595959;
        font-size: 14px;
        line-height: 14px;
        margin: 0 15px 15px 0;
        cursor: pointer;
    }
    .biaoqian li.current{
        color: #409EFF;
        background-color: #ecf5ff;
        box-sizing: border-box;
    }
    .color_span{
        color: #8C8C8C;
    }
    .d_b_line{
        display: inline-block!important;
    }
    .text{
        padding: 0 0.3rem;
    }
    .type_btn{
        width: 320px;
        height: 32px;
        line-height: 32px;
        background: #F1F1F1;
        text-align: center;
        font-size: 14px;
        color: #595959;
        cursor: pointer;
    }
    .type_btn01{
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    .type_btn02{
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .type_btn.current{
        line-height: 30px;
        background: #E7F4FF;
        color: #007DF2;
        box-sizing: border-box;
        border:1px solid #1890FF;
    }
    .add_tiaojian{
        display: block;
        width: 180px;
        height: 32px;
        line-height: 32px;
        background: #007DF2;
        color: #fff;
        border-radius: 5px;
    }
    .jx_box{
        height: auto;
        border: 1px solid #E5E5E5;
        border-radius: 5px;
        box-shadow: 0px 4px 10px 0px rgba(229, 229, 229, 0.8);
        transition: all 0.2s;
    }
    .jx_box.current{
        height: 50px;
        overflow: hidden;
    }
    .jx_box .top{
        height: 50px;
        background: #F8F8F8;
        border-bottom: 1px solid #D9D9D9;
    }
    .b_add_btn{
        width: 150px;
        height: 28px;
        border: 1px solid #007DF2;
        color: #007DF2;
        line-height: 28px;
        text-align: center;
        border-radius: 3px;
    }
    .rs_item{
        width: 300px;
        border: 1px solid #D9D9D9;
        border-radius: 3px;
    }
    .rs_item .rs_list{
        height: 46px;
    }
    .w_100{
        width: 100%!important;
    }
    .current01{
        padding-left: 26px;
        background: url(../../../assets/images/jx01.png) no-repeat center left /16px;
    }
    .current02{
        padding-left: 26px;
        background: url(../../../assets/images/jx02.png) no-repeat center left /16px;
    }
    .current03{
        padding-left: 26px;
        background: url(../../../assets/images/jx03.png) no-repeat center left /16px;
    }
</style>
