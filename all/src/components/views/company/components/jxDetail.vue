<template>

          <div>
              <div v-if="obj.length>0">
                  <p class="mar_b_10 font14 list_co05">{{type}}:</p>
                  <ol class="flex row li_header">
                      <li class="text_all_center li_border flex_1 font14">员工类型</li>
                      <li class="text_all_center li_border flex_1 font14">入职时间段</li>
                      <div class="flex row flex_6">
                          <li class="text_all_center li_border flex_1 font14">部门</li>
                          <li class="flex row flex_5">
                              <div class="text_all_center li_border flex_1 font14">企业工价(元/小时)</div>
                              <div class="text_all_center li_border flex_1 font14">员工单价(元/小时)</div>
                              <div class="flex row flex_3">
                                  <div class="text_all_center li_border flex_1 font14">生效时间</div>
                                  <div class="text_all_center li_border flex_1 font14">绩效(元/小时)</div>
                                  <div class="text_all_center li_border flex_1 font14">人数条件(人)</div>
                              </div>
                          </li>
                      </div>
                  </ol>
                  <ul class="flex col li_bodyer">
                      <div class="flex_1 row flex" v-for="(item,index) in obj" :key="index">
                          <li class="text_all_center li_border flex_1 font14">{{type}}</li>
                          <li class="text_all_center li_border flex_1 font14">{{item.startdate+' ~ '+item.enddate}}</li>
                          <div class="flex col flex_6">
                              <div class="flex row flex_1" v-for="(s_item,s_index) in item.bumen" :key="s_index">
                                  <li class="text_all_center li_border flex_1 font14">{{s_item.name?s_item.name:'--'}}</li>
                                  <li class="flex col flex_5">
                                      <div class="flex row flex_1" v-for="(v_item,v_index) in s_item.condition" :key="v_index">
                                          <!--有人数条件-->
                                          <div class="flex_1 row flex" v-if="v_item.number">
                                              <div class="flex_1 text_all_center li_border font14">{{v_item.system_price}}</div>
                                              <div class="flex_1 text_all_center li_border font14">{{v_item.system_yuangong_price}}</div>
                                              <div class="flex_1 text_all_center li_border font14">{{v_item.effect_time?v_item.effect_time:'--'}}</div>
                                              <div class="flex_2 col flex">
                                                  <div class="flex_1 row flex" v-for="(m_item,m_index) in v_item.number" :key="m_index">
                                                      <li class="text_all_center li_border li_item flex_1 font14">{{m_item.system_jixiao}}</li>
                                                      <li class="text_all_center li_border li_item flex_1 font14">{{m_item.min+'~'+m_item.max}}</li>
                                                  </div>
                                              </div>
                                          </div>
                                          <!--无人数条件-->
                                          <div class="flex_1 row flex" v-else>
                                              <div class="flex_1 text_all_center li_border li_item font14">{{v_item.system_price?v_item.system_price+'元':'---'}}</div>
                                              <div class="flex_1 text_all_center li_border li_item font14">{{v_item.system_yuangong_price?v_item.system_yuangong_price+'元':'--'}}</div>
                                              <div class="flex_1 text_all_center li_border li_item font14">{{v_item.effect_time?v_item.effect_time:'--'}}</div>
                                              <div class="flex_1 text_all_center li_border li_item font14">{{v_item.system_jixiao?v_item.system_jixiao+'元':'--'}}</div>
                                              <div class="flex_1 text_all_center li_border li_item font14">--</div>
                                          </div>
                                      </div>
                                  </li>
                              </div>
                          </div>
                      </div>
                  </ul>
              </div>
          </div>
  
</template>

<script>

export default {
  props:['obj','type'],
  name: '',
  data(){
      return {
          
          
      }
  },
  methods:{
     
  }
}
</script>

<style scoped>
    .base_btn_co01{
        width: auto;
        padding-left: 8px;
        padding-right: 8px;
        color: #007DF2;
        border-color: #007DF2;
    }
    .js_show .li_border{
        box-sizing: border-box;
        border: 1px solid #E5E5E5;
    }
    .li_header{
        height: 50px;
        background: #FAFAFA;;
    }
    .li_item{
        height: 50px;
    }
</style>
