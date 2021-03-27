<template>

          <div class="views">
                <keep-alive include="permissions_js">
                    <router-view></router-view>
                </keep-alive>
          </div>
  
</template>

<script>
export default {
  name: '',
  data(){
      return {
          
          
      }
  },
  methods:{
     
  },
   mounted(){
      this.store.commit('setPageText','角色管理');
  }
}
</script>

<style>
   
</style>
