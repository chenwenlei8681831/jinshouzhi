//金手指管理后台3.0
if (window.location.href.indexOf('manage_v2.jszhr.com') != '-1') {
    let init_host = 'https://api.jszhr.com/';
    window.localStorage.init_host = init_host;
    window.localStorage.host = init_host + 'admin/';
    window.localStorage.commonhost = init_host + 'common/';
    window.localStorage.indexhost = init_host + 'index/';
    window.localStorage.ws = 'ws://socket.jszhr.com';
} else if (window.location.href.indexOf('manage_v2.dxszp.cn') != '-1') { //线上测试
    let init_host = 'https://apitest.jszhr.com/';
    window.localStorage.init_host = init_host;
    window.localStorage.host = init_host + 'admin/';
    window.localStorage.commonhost = init_host + 'common/';
    window.localStorage.indexhost = init_host + 'index/';
    window.localStorage.ws = 'ws://socket.jszhr.com';
} else {
    let init_host = 'http://api.jszhr.test/';
    window.localStorage.init_host = init_host;
    window.localStorage.host = init_host + 'admin/';
    window.localStorage.commonhost = init_host + 'common/';
    window.localStorage.indexhost = init_host + 'index/';
    window.localStorage.ws = 'ws://socket.jszhr.test';

};

//提示token失效,并且对出
function layout(THIS, msg) {
    THIS.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        showCancelButton: false,
        closeOnClickModal: false,
        showClose: false,
        type: 'warning',
    }).then(() => {
        THIS.$message({
            type: 'success',
            message: '退出成功!',
            dangerouslyUseHTMLString: true
        });
        THIS.$router.replace('/login');
    }).catch(() => {});
};

/*请求数据:只适用于post请求
 *	参数说明: 
 *		THIS            : vue对象
 *		url    			: 请求地址
 *		data   			: 请求数据
 *		callback		: 成功的对调函数
 *		isFeedback		: code != 1时，是否需要提示错误信息
 *		isLoading		: 请求时是否需要显示加载动画     1:需要 0：不需要
 *		isFlag			: 请求时是否需要设置开关  	     1:需要 0：不需要
 *		isCheckToken	: 请求时是否需要检测token  	    1:需要 0：不需要
 */
function vue_Post(THIS, url, data, callback, isFeedback, isLoading, isFlag, isCheckToken) {
    if (!window.localStorage.token) {
        return false;
    };
    if (isFlag == 1) {
        if (THIS.flag) { return false };
        THIS.flag = true;
    };
    var url = window.localStorage.host + url;
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
    THIS.$http.post(url, data, {
        emulateJSON: true,
        headers: {
            token: window.localStorage.token ? window.localStorage.token : ''
        }
    }).then(function(response) {
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

/*请求数据:只适用于post请求
 *	参数说明: 
 *		THIS            : vue对象
 *		url    			: 请求地址
 *		data   			: 请求数据
 *		callback		: 成功的对调函数
 *		isFeedback		: code != 1时，是否需要提示错误信息
 *		isLoading		: 请求时是否需要显示加载动画  1:需要 0：不需要
 *		isFlag			: 请求时是否需要设置开关  	  1:需要 0：不需要
 *		isCheckToken	: 请求时是否需要检测token  	  1:需要 0：不需要
 */
function vue_commonPost(THIS, url, data, callback, isFeedback, isLoading, isFlag, isCheckToken) {
    if (isFlag == 1) {
        if (THIS.flag) { return false };
        THIS.flag = true;
    };
    var url = window.localStorage.commonhost + url;
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
    THIS.$http.post(url, data, {
        emulateJSON: true,
        headers: {
            token: window.localStorage.token ? window.localStorage.token : ''
        }
    }).then(function(response) {
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
        if (isFeedback == 1) {
            THIS.$message({
                type: 'error',
                message: '网络出错，请稍后重试!',
                dangerouslyUseHTMLString: true
            });
        };
    });
};

/*请求数据:只适用于post请求
 *	参数说明: 
 *		THIS            : vue对象
 *		url    			: 请求地址
 *		data   			: 请求数据
 *		callback		: 成功的对调函数
 *		isFeedback		: 是否需要提示错误信息		  1:需要 0：不需要
 *		isLoading		: 请求时是否需要显示加载动画  1:需要 0：不需要
 *		isFlag			: 请求时是否需要设置开关  	  1:需要 0：不需要
 *		isCheckToken	: 请求时是否需要检测token  	  1:需要 0：不需要
 */
function vue_indexPost(THIS, url, data, callback, isFeedback, isLoading, isFlag, isCheckToken) {
    if (!window.localStorage.token) {
        return false;
    };
    if (isFlag == 1) {
        if (THIS.flag) { return false };
        THIS.flag = true;
    };
    var url = window.localStorage.indexhost + url;
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
    THIS.$http.post(url, data, {
        emulateJSON: true,
        headers: {
            token: window.localStorage.token ? window.localStorage.token : ''
        }
    }).then(function(response) {
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
        if (isFeedback == 1) {
            THIS.$message({
                type: 'error',
                message: '网络出错，请稍后重试!',
                dangerouslyUseHTMLString: true
            });
        };
    });
};

//获取省
function get_address(THIS, callback) {
    var url = window.localStorage.commonhost + 'district/getDistrict';
    THIS.$http.post(url, { type: '1' }, {
        emulateJSON: true,
        headers: {
            token: window.localStorage.token ? window.localStorage.token : ''
        }
    }).then(function(response) {
        if (response.body.code == 1) {
            callback(response.body.data);
        }
    })
};