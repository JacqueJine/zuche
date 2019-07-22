import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    //数据库
    state: {
      //侧边栏
      show:false,
      //结算
      f_user:{},
     
       //预订
      y_user:{},
      //会员数据
      hui_use:'',
    },
    //修改数据
    mutations:{
      //侧边栏
      u(state){
        state.show=!state.show;
      },
      y_fin(state,y_use){
        state.y_user=y_use;
      },
      f_fin(state,f_use){
        state.f_user=f_use;
      },
      hui_fine(state,vip){
        state.hui_use=vip;
      },
      change_pho(state,pho){
        state.hui_use.phone=pho;
      }
      
    },
})