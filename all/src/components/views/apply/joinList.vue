<template>
        <div class="views pad_l_50 pad_r_50 b_s mr_color01">
          <div class="bg_fff">
                <bot-header></bot-header>
                <div class="views_100ch_1">
                    <!--输入框、下拉筛选-->
                    <div class="flex row header_item h_60px b_s pad_r_30 pad_l_30">
                        <div class="flex_1 b_s h_100 flex row">
                            <span class="font12">报名人姓名：</span>
                            <el-input class="flex_1 inp"  v-model="keyword" placeholder="请输入报名人姓名" clearable></el-input>
                        </div>
                        <div class="flex_1 b_s h_100 flex row mar_l_30">
                            <span class="font12">联系电话：</span>
                            <el-input class="flex_1 inp"  v-model="phone" placeholder="请输入联系电话" clearable oninput="value=value.replace(/[^\d]/g,'')" maxlength="11"></el-input>
                        </div>
                        <div class="w_25 flex row b_s h_100 mar_l_30">
                            <span class="font12">报名时间：</span>
                            <el-date-picker
                                    class="flex_1"
                                    v-model="timer"
                                    value-format="yyyy-MM-dd"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                        <div class="flex_1 b_s h_100 mar_l_30">
                                <span @click="sub(1)" class="f_l font14 pointer t_center header_set_btn header_set_btn01 border all_line co_fff h_100" style="line-height:30px">查询</span>
                                <span @click="sub(2)" class="f_l mar_l_30 font14 pointer t_center header_set_btn header_set_btn02 border all_line bg_fff h_100" style="line-height:30px">重置</span>
                                <div class="clearfix"></div>
                        </div>
                    </div>
                    <!--列表-->
                    <div class="list">
                        <ol class="list_header flex row">
                            <li class="h_50px pad_l_20 b_s" style="width:10%">ID</li>
                            <li class="h_50px pad_l_20 b_s flex_1">员工姓名</li>
                            <li class="h_50px pad_l_20 b_s flex_2">联系电话</li>
                            <li class="h_50px pad_l_20 b_s flex_2">加盟地区</li>
                            <li class="h_50px pad_l_20 b_s flex_2">申请时间</li>
                        </ol>
                        <ul class="list_main">
                            <li v-for="(item,index) in list" :key="index">
                                <ol class="flex row" :class="index%2==1?'list_bg':''">
                                    <li class="h_50px pad_l_20 b_s" style="width:10%">{{item.id}}</li>
                                    <li class="h_50px pad_l_20 b_s flex_1">{{item.name?item.name:'--'}}</li>
                                    <li class="h_50px pad_l_20 b_s flex_2">{{item.phone?item.phone:'--'}}</li>
                                    <li class="h_50px pad_l_20 b_s flex_2">{{(item.province+'-'+item.city+'-'+item.area)?(item.province+'-'+item.city+'-'+item.area):'--'}}</li>
                                    <li class="h_50px pad_l_20 b_s flex_2">{{item.create_time?item.create_time:'--'}}</li>
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
var THIS;
import botHeader from '../../components/bot-header/bot-header';
export default {
  components:{
      botHeader,
  },
  name: 'joinList',
  data(){
      return {
          keydown_flag:true,
          page:1,
          count:10,
          total:0,
          keyword:'',
          phone:'',
          timer:'',
          list:[],
      }
  },
  methods:{


      sub(type){
        this.page = 1;
        if(type==2){
            this.keyword = '';
            this.timer = '';
            this.phone = '';
        };
        this.getList();
      },

      getList(){
            var createat_star = '';
            var createat_end = '';
            if(THIS.timer){
                createat_star = THIS.timer[0];
                createat_end = THIS.timer[1];
            };
            var data = sign({
                current_page:THIS.page,
                per_page:THIS.count,
                name:THIS.keyword,
                phone:THIS.phone,
                start_date:createat_star,
                end_date:createat_end
            });
            THIS.vue_Get(THIS,'admin/enroll/recruitList',data,callback,1,1,1,1);
            function callback(msg){
                 THIS.list = msg.recruit_list.data;
                 THIS.total = msg.recruit_list.total;
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


  },
   mounted(){
        THIS = this;
        THIS.store.commit('setPageText','当前位置：报名 / 招商加盟');
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
        width: 10%;
    }
</style>
