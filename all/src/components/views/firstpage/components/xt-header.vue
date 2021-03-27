<template>

          <ul class="header co_fff">
              <li @click="to_view(msg[0].index,msg[0].itemIndex,msg[0].sonIndex,msg[0].permissions)" class="pointer item b_s f_l h_100 bg_fff flex col">
                  <p class=" font14">合作企业总数</p>
                  <h1 class=" font20">{{msg[0].number}}<i class="font14">家</i></h1>
              </li>
              <li  @click="to_view(msg[1].index,msg[1].itemIndex,msg[1].sonIndex,msg[1].permissions)" class="pointer item b_s f_l h_100 bg_fff flex col">
                  <p class=" font14">运营中心总数</p>
                  <h1 class=" font20">{{msg[1].number}}<i class="font14">家</i></h1>
              </li>
              <li  @click="to_view(msg[2].index,msg[2].itemIndex,msg[2].sonIndex,msg[2].permissions)" class="pointer item b_s f_l h_100 bg_fff flex col">
                  <p class=" font14">驻厂总数</p>
                  <h1 class=" font20">{{msg[2].number}}<i class="font14">人</i></h1>
              </li>
              <li  @click="to_view(msg[3].index,msg[3].itemIndex,msg[3].sonIndex,msg[3].permissions)" class="pointer item b_s f_l h_100 bg_fff flex col">
                  <p class="font14">员工总数</p>
                  <h1 class="font20">{{msg[3].number}}<i class="font14">人</i></h1>
              </li>
              <div class="clearfix"></div>
          </ul>
  
</template>

<script>
export default {
  props:['msg'],
  name: '',
  data(){
      return {
          s_msg: this.store.state.navmsg,
          permissions:''
          
      }
  },
  methods:{

      to_view(index,itemIndex,sonIndex,permissions){
          var THIS = this;
          if(!index){//未开通功能
              THIS.$confirm('功能暂未开通，请耐心等待...', '提示', {
                confirmButtonText: '确定',
                type: 'warning',
              })
          }else if(index==100){//解绑
              THIS.$emit('jiebang');
          }else{//快捷操作
              if(THIS.permissions[permissions]==1){
                  window.localStorage.beforNavIndex = THIS.store.state.navIndex;
                  THIS.store.commit('setNavIndex',index);
                  THIS.$router.push(THIS.s_msg[index].son[itemIndex].list[sonIndex].url);
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
      var THIS = this;
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
  .header{
    height: 1.4rem;
  }
  .header li{
    width: calc(25% - 0.42rem);
    border-radius: 0.1rem;
    margin-right: 0.56rem;
  }
  .header li:nth-child(4){
    margin-right: 0;
  }
  .item{
    background:  no-repeat left 0.32rem center /0.5rem;
    padding: 0.4rem 0 0.4rem 1.1rem;
  }
  .item:nth-child(1){
    background-color:#55AEFF;
    background-image: url(../../../../assets/images/firstpage/company.png)
  }
  .item:nth-child(2){
    background-color:#FF986F;
    background-image: url(../../../../assets/images/firstpage/yy.png)
  }
  .item:nth-child(3){
    background-color:#18CF99;
    background-image: url(../../../../assets/images/firstpage/zhuchang01.png)
  }
  .item:nth-child(4){
    background-color:#6A8DFF;
    background-image: url(../../../../assets/images/firstpage/em.png)
  }
  .item p{
    height: 0.3rem;
    line-height: 0.3rem;
  }
  .item h1{
    display: inline-block;
    height: 0.3rem;
    line-height: 0.3rem;
  }
  .item h1 i{
    font-size: 0.18rem;
    font-style: normal;
    margin-left: 0.1rem;
  }
</style>
