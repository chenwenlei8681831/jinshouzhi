<template>

         <div class="bg_fff">
               <div class="flex_1 pad_t_20 pad_l_20 pad_r_20">
                     <ol class="flex row header">
                           <li  @click="choose_tab(index)" class="flex_1 text_center font14 pointer po_r" :class="item.class" v-for="(item,index) in list.header" :key="index">
                              {{item.title}}
                              <span class="d_l_block" v-if="index!=0" :class="index==list.tabIndex?'current':''"></span>
                           </li>
                     </ol>
                     <ul class="w_100">
                           <li v-for="(item,index) in list.list" :key="index">
                              <ol class="flex row bodyer" :class="index%2==1?'list_bg':''">
                                 <li @click="choose_span(index)" class="font14 flex_1 text_center po_r" v-for="(v_item,v_index) in item" :key="v_index" :class="v_item.class">{{v_item.title}}</li>
                              </ol>
                           </li>
                     </ul>
               </div>
         </div>
  
</template>

<script>
export default {
  props:['list'],
  name: '',
  data(){
      return {
    
      }
  },
  methods:{

    view(link){
         this.$router.replace(link);
    },

    choose_tab(index){
         if(index==0){
            this.choose_span(1000);
         }else{
            this.$emit('choose_tab',index);
         }
    },

    choose_span(index){
       this.$emit('choose_span',index);
    }

  },
   mounted(){
     
  }
}
</script>

<style scoped>
   ol,ol li,ul li{
     height: 50px;
     line-height: 50px;
   }
   ol.header >li span{
      width: 8px;
      height: 14px;
      margin-left: 3px;
      vertical-align: middle;
      background: no-repeat center /100% 100%;
   }
   .bodyer .v_color01{
      color: #333;
   }
   .header .v_color01{
      background-color: #F3F3F3;
      color: #333;
   }
   .header .v_color02{
      background:rgba(71,71,71,0.2);
      color: #333;
   }
   .bodyer .v_color02{
      color: #333;
   }
   ol.header >li.v_color02 span{
      background-image: url(../../../../assets/images/statistical/arrow02ss.png);
   }
   ol.header >li.v_color02 span.current{
      background-image: url(../../../../assets/images/statistical/arrow02s.png);
   }
   .header .v_color03{
      background:rgba(247,165,77,0.2);
      color: #F59A39;
   }
   .bodyer .v_color03{
      color: #F59A39;
   }
   ol.header >li.v_color03 span{
      background-image: url(../../../../assets/images/statistical/arrow03ss.png);
   }
   ol.header >li.v_color03 span.current{
      background-image: url(../../../../assets/images/statistical/arrow03s.png);
   }
   .header .v_color04{
      background:rgba(255,106,75,0.2);
      color: #FF6A4B;
   }
   .bodyer .v_color04{
      color: #FF6A4B;
   }
   ol.header >li.v_color04 span{
      background-image: url(../../../../assets/images/statistical/arrow04ss.png);
   }
   ol.header >li.v_color04 span.current{
      background-image: url(../../../../assets/images/statistical/arrow04s.png);
   }
   .header .v_color05{
      background:rgba(9,168,149,0.2);
      color: #09A895;
   }
   .bodyer .v_color05{
      color: #09A895;
   }
   ol.header >li.v_color05 span{
      background-image: url(../../../../assets/images/statistical/arrow05ss.png);
   }
   ol.header >li.v_color05 span.current{
      background-image: url(../../../../assets/images/statistical/arrow05s.png);
   }
   .c_span{
      top: 50%;
      left: 50px;
      width: 14px!important;
      height: 14px!important;
      margin-top: -7px;
   }
</style>
