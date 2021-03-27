<template>


          <div class="views pad_l_50 pad_r_50 b_s mr_color01 h_bottom">
              <div class="bg_fff">
                  <bot-header :link='link'></bot-header>
                  <div class="views_100ch_1 pad_all_30">
                      <div class="ct_title">基本信息</div>
                      <div class="flex row b_line mar_t_30 baseInfo pad_b_20">
                          
                      </div>
                  </div>
              </div>
          </div>
  
</template>

<script>
import botHeader from '../../components/bot-header/bot-header';
export default {
  components:{
    botHeader
  },
  name: '',
  data(){
      return {
          link:'/home/company/companyThree/companyShList'
      }
  },
  methods:{
     
  },
   mounted(){
      this.store.commit('setPageText','企业 / 岗位详情');
  },
  beforeDestroy(){
      this.store.commit('setPageText','当前位置：企业 / 岗位详情');
  }
}
</script>

<style scoped>
   
</style>
