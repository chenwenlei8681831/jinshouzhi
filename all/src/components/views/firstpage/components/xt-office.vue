<template>

          <div class="office margin_bottom">
            <div class="w_100 h_100 b_radius10 f_l">
               <div class="title pad_l_30">待办理事件</div>
               <div class="flex row j_between">
                  <ul class="office_ul office_left b_s bg_fff">
                        <li @click="to_view(item.index,item.itemIndex,item.sonIndex,item.permissions)" class="pad_l_30 pad_r_30 pointer" v-for="(item,index) in dbmsg.msg1" :key="index">
                            <div class="h_100 font14" :class="index!=2?'b_line':''">
                              {{item.title}}  <b>({{item.number}})</b>
                            </div>
                            <div class="clearfix"></div>
                        </li>
                  </ul>
                  <ul class="office_ul office_left b_s bg_fff">
                        <li @click="to_view(item.index,item.itemIndex,item.sonIndex,item.permissions)" class="pad_l_30 pad_r_30 pointer" v-for="(item,index) in dbmsg.msg2" :key="index">
                            <div class="h_100 font14" :class="index!=2?'b_line':''">
                                {{item.title}}  <b>({{item.number}})</b>
                            </div>
                            <div class="clearfix"></div>
                        </li>
                  </ul>
                  <ul class="office_ul office_left bg_fff">
                        <li @click="to_view(item.index,item.itemIndex,item.sonIndex,item.permissions)" class="pad_l_30 pad_r_30 pointer" v-for="(item,index) in dbmsg.msg3" :key="index">
                            <div class="h_100 font14" :class="index!=2?'b_line':''">
                              {{item.title}}  <b>({{item.number}})</b>
                            </div>
                            <div class="clearfix"></div>
                        </li>
                  </ul>
               </div>
            </div>
            <div class="w_100 h_100 b_radius10 f_r bg_fff mar_t_30" >
               <div class="title b_line pad_l_30">办公快捷入口</div>
               <ul class="office_right flex row">
                     <li @click="to_view(item.index,item.itemIndex,item.sonIndex,item.permissions)" class="pointer flex_1" v-for="(item,index) in fast" :key="index">
                        <div>
                           <div class="img"></div>
                           <p class="font14 t_center">{{item.title}}</p>
                        </div>
                     </li>
                     <div class="clearfix"></div>
               </ul>
            </div>
            <div class="clearfix"></div>
         </div>
  
</template>

<script>
var THIS;
export default {
  props:['dbmsg','fast'],
  name: '',
  data(){
      return {
          msg: this.store.state.navmsg,
          permissions:''
      }
  },
  methods:{

      to_view(index,itemIndex,sonIndex,permissions){
          if(index==100){//解绑
              THIS.$emit('jiebang');
          }else{//快捷操作
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
          };
      }
      
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
   .office{
     margin-top: 0.12rem;
   }
   .office_left li{
     height: 0.6rem;
     line-height: 0.6rem;
     background: url(../../../../assets/images/right_arrow01.png) no-repeat right 0.3rem center /0.22rem;
   }
   .office_left li  b{
     color: #007DF1;
     font-weight: normal;
   }
   .office_right{
     padding: 20px 0;
   }
   .office_right li>div{
     width: 100%;
     margin: 0 auto;
   }
   .office_right li >p{
     height: 0.3rem;
     line-height: 0.3rem;
   }
   .office_right li .img{
     display: block;
     width: 0.9rem;
     height: 0.9rem;
     margin: 0 auto 0.05rem;
     background: no-repeat center /100%;
   }
   .office_right li:nth-child(1) .img{
     background-image: url(../../../../assets/images/firstpage/rulu.png);
   }
   .office_right li:nth-child(2) .img{
     background-image: url(../../../../assets/images/firstpage/jiesuan.png);
   }
   .office_right li:nth-child(3) .img{
     background-image: url(../../../../assets/images/firstpage/zhuchang.png);
   }
   .office_right li:nth-child(4) .img{
     background-image: url(../../../../assets/images/firstpage/yuny.png);
   }
   .office_right li:nth-child(5) .img{
     background-image: url(../../../../assets/images/firstpage/send.png);
   }
   .office_right li:nth-child(6) .img{
     background-image: url(../../../../assets/images/firstpage/apply.png);
   }
   .office_right li:nth-child(7) .img{
     background-image: url(../../../../assets/images/firstpage/shiwu.png);
   }
   .office_right li:nth-child(8) .img{
     background-image: url(../../../../assets/images/firstpage/tongji.png);
   }
   .office_right li:nth-child(9) .img{
     background-image: url(../../../../assets/images/firstpage/jiebang.png);
   }
   .office_ul{
     width: calc(33.33% - 0.2rem);
   }
</style>
