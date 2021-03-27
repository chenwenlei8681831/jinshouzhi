<template>

        <ul class="w_100 flex kanban margin_bottom row j_between worp">
            <li class="flex col b_radius10 bg_fff margin_bottom" v-for="(item,index) in kanban" :key="index">
                <div class="title b_line pad_l_30">{{item.title}}</div>
                <div class="w_100 flex row flex_1">
                    <div @click="to_view(s_item.index,s_item.itemIndex,s_item.sonIndex,s_item.permissions)" class="flex col kb_smallitem flex_1 pad_t_30 pad_b_30 pointer" v-for="(s_item,s_index) in item.list" :key="s_index">
                        <h1 class="t_center flex_1 j_center"> {{s_item.number}} </h1>
                        <p class="t_center flex_1 j_center font14"> {{s_item.name}} </p>
                    </div>
                </div>
            </li>
        </ul>
  
</template>

<script>
var THIS;
export default {
  props:['kanban'],
  name: '',
  data(){
      return {
          msg: this.store.state.navmsg,
          permissions:'',
          
      }
  },
  methods:{

        to_view(index,itemIndex,sonIndex,permissions){
                if(THIS.permissions[permissions]==1){
                    window.localStorage.beforNavIndex = THIS.store.state.navIndex;
                    THIS.store.commit('setNavIndex',index);
                    THIS.$router.push(THIS.msg[index].son[itemIndex].list[sonIndex].url);
                }else{//暂无操作权限
                    THIS.$confirm('暂无操作权限...', '提示', {
                        confirmButtonText: '确定',
                        type: 'warning',
                    })
                };
        },

  },
   mounted(){
      
        THIS = this;
        THIS.permissions = JSON.parse(window.localStorage.permissions);
  }
}
</script>

<style scoped>
    .title{
     height: 0.6rem;
     line-height: 0.6rem;
     font-size: 14px;
     color: #262626;
     font-weight: bold;
   }
   .kanban li{
      width: 7.54rem;
      height: 2rem;
   }
   .kb_smallitem h1{
      font-size: 24px;
   }
   .kb_smallitem p{ 
   }
   .kb_smallitem:nth-child(1) h1{
      color: #068777;
   }
   .kb_smallitem:nth-child(2) h1{ 
      color: #F7A54D;
   }
   .kb_smallitem:nth-child(3) h1{ 
      color: #E64726;
   }
   .kb_smallitem:nth-child(4) h1{ 
      color: #1989F3;
   }
</style>
