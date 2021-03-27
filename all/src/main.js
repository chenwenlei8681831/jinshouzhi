import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
import VueResoure from 'vue-resource';
Vue.use(VueResoure);

//全局设置请求头
Vue.http.headers.common['appType'] = '2';
Vue.http.headers.common['deviceType'] = 'web';
//Vue.http.headers.common['token'] = '';

//引入router
import router from './router/router.js';

//css:   引入ret  public
import '../public/css/reset.css';
import '../public/css/public.css';
import '../public/css/ele.css';
import '../public/css/me.css';
import '../public/css/flex.css';

//js:    引入jquery rem echarts
import $ from 'jquery';
window.$ = $;
import rem from '../public/js/rem';
rem();

//引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });


//富文本编辑器
import  VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
Vue.use(VueQuillEditor)

//引入vuex
import store from './store/state.js'
Vue.prototype.store = store;


Vue.prototype.vue_Get = function vue_Get(THIS, url, data, callback, isFeedback, isLoading, isFlag, isCheckToken) {
    if (!window.localStorage.token) {
        return false;
    };
    if (isFlag == 1) {
        if (THIS.flag) { return false };
        THIS.flag = true;
    };
    var url = window.localStorage.init_host + url;
    var loading;
    if (isLoading == 1) {
        //添加动画
        loading = THIS.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0)'
        });
    };
    Vue.http.headers.common['token'] = (window.localStorage.token ? window.localStorage.token : '');
    THIS.$http.get(url, { params: data }).then(function(response) {
        if (isLoading == 1) { loading.close(); };
        if (isFlag == 1) { THIS.flag = false; };
        var a = response.body.data,
            b = response.body.code;
        if (b == 1) {
            callback(a);
        } else if (b == '-999') {
            if (isCheckToken == 1) {
                layout(THIS, response.body.msg);
            };
        } else {
            //请求报错报错
            if (isFeedback == 1) {
                THIS.$message({
                    type: 'error',
                    message: response.body.msg,
                    dangerouslyUseHTMLString: true
                });
            };
        };
    }, function() {
        if (isFlag == 1) { THIS.flag = false };
        if (isLoading == 1) { loading.close(); };
        //提示网络出问题
        if (isFeedback == 1) {
            THIS.$message({
                type: 'error',
                message: '网络出错，请稍后重试!',
                dangerouslyUseHTMLString: true
            });
        };
    });
};

new Vue({
    render: h => h(App),
    router
}).$mount('#app');