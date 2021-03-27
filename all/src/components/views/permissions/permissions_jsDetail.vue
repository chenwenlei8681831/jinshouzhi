<template>
        <div class="views pad_l_50 pad_r_50 b_s mr_color01">
          <div class="bg_fff">
                <bot-header :link='link'></bot-header>
                <div class="views_100ch_1  pad_all_30 b_s">
                    <div class="w_100 b_s pad_b_20 b_line" v-for="(item,index) in list" :key="index">
                        <div @click="select_all(index)" class="pointer title flex row a_center">
                            <span class="select_span mar_r_20" :class="item.all_flag?'select_span_current':''" ></span>{{item.name}}
                        </div>
                        <ul>
                            <li @click="choose_item(index,v_index)" class="f_l pointer font14" :class="v_item.hasauth==1?'current':''" v-for="(v_item,v_index) in item.childs" :key="v_index" :title="v_item.name">
                                <span class="select_span" :class="v_item.hasauth==1?'select_span_current':''"></span>{{v_item.name}}
                            </li>
                            <div class="clearfix"></div>
                        </ul>
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
      botHeader
  },
  name: '',
  data(){
      return {
          id:'',
          link:'/home/permissions/permissions_jsOne/permissions_js',
          list:[]
      }
  },
  methods:{

      get_detail(){
            var THIS = this;
            var data = sign({
                position_id:THIS.id,
                step:0
            });
            vue_Post(THIS,'admin/positionAccess',data,callback,1,1,0,1);
            function callback(msg){
                THIS.list = msg.list;
                THIS.list = THIS.list.map(item=>{
                    item.all_flag = item.childs.every((value,index)=>value.hasauth==1);
                    return item;
                });
                console.log(THIS.list);
            }; 
      },

      choose_item(index,v_index){
          let aa = THIS.list;
          aa[index].childs[v_index].hasauth=aa[index].childs[v_index].hasauth==0?1:0;
          THIS.select_func();
      },

      select_all(index){
          for(let i=0;i<THIS.list[index].childs.length;i++){
              THIS.list[index].childs[i].hasauth = THIS.list[index].all_flag?0:1;
          };
          THIS.select_func();
      },

      select_func(){
          let arr = [];
          let aa = THIS.list;
          for(let i=0;i<aa.length;i++){
              for(let j=0;j<aa[i].childs.length;j++){
                  let id = aa[i].childs[j].id;
                  let hasauth = aa[i].childs[j].hasauth;
                  arr.push([id,hasauth]);
              };
          };
          THIS.submit_from(arr);
      },

      submit_from(arr){
           var data = sign({
                position_id:THIS.id,
                step:1,
                access: JSON.stringify(arr)
           });
           vue_Post(THIS,'admin/positionAccess',data,callback,1,1,0,1);
           function callback(msg){
                THIS.$message({
                    type: 'success',
                    message: '操作成功!',
                    dangerouslyUseHTMLString:true
                });
                THIS.get_detail();
           }; 
      },

 
  },
   mounted(){
        THIS = this;
        THIS.store.commit('setPageText','当前位置：权限 / 权限设置');
        THIS.id = THIS.$route.params.id?THIS.$route.params.id:'';
        THIS.get_detail();
  },
  beforeDestroy(){
      THIS.store.commit('setPageText','当前位置：权限 / 角色管理');
  }
}
</script>

<style scoped>
    .title{
        color: #595959;
        font-size: 16px;
        margin-bottom: 10px;
        margin-top: 20px;
    }
    ul li{
        width: 20%;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        color: #595959;
    }
    ul li.current{
        color: #007DF2;
    }
    span.select_span {
        display: inline-block;
        width: 14px;
        height: 14px;
        vertical-align: middle;
        margin-right: 5px;
        border: 1px solid #C5C5C5;
        box-sizing: border-box;
        vertical-align: middle;
    }
    span.select_span_current{
        border: none;
        background: url(../../../assets/images/chooce.jpg) no-repeat center /100%;
    }
</style>
