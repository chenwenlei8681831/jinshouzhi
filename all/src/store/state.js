import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);


const store = new Vuex.Store({

    state: {
        cityId: '',
        pageText: '',
        navIndex: 0,
        navmsg: [{
                title: '首页',
                son: [{
                    title: '系统首页',
                    list: [
                        { title: '系统首页', url: '/home/firstpage/xtsetting', permissions: 'index.index' },
                        { title: '登录日志', url: '/home/firstpage/logincon', permissions: 'index.loginrecord' }
                    ]
                }]
            },
            {
                title: '企业',
                son: [{
                        title: '企业管理',
                        list: [
                            { title: '企业列表', url: '/home/company/companyOne', permissions: 'company.releasecompanylist' },
                            { title: '创建企业', url: '/home/company/companyCreate', permissions: 'company.releasecompanyadd' }
                        ]
                    },
                    {
                        title: '岗位管理',
                        list: [
                            { title: '岗位列表', url: '/home/company/companyTwo', permissions: 'company.list' },
                            { title: '创建岗位', url: '/home/company/companyJobcreate', permissions: 'company.add' },
                            { title: '岗位审核', url: '/home/company/companyThree', permissions: 'company.auditedpostlist' },
                        ]
                    }
                ]
            },
            {
                title: '门店',
                son: [{
                        title: '运营中心管理',
                        list: [
                            { title: '运营中心列表', url: '/home/store/storeOne', permissions: 'center.list' },
                            { title: '创建运营中心', url: '/home/store/storeCreate', permissions: 'center.add' }
                        ]
                    },
                    {
                        title: '群聊管理',
                        list: [
                            { title: '群聊列表', url: '/home/store/storeTwo', permissions: 'center.listteam' }
                        ]
                    }
                ]
            },
            {
                title: '驻厂',
                son: [{
                    title: '驻厂管理',
                    list: [
                        { title: '驻厂列表', url: '/home/zhuchang/zhuchangOne', permissions: 'zhuchang.list' },
                        { title: '创建驻厂', url: '/home/zhuchang/zhuchangCreate', permissions: 'zhuchang.add' }
                    ]
                }]
            },
            {
                title: '员工',
                son: [{
                    title: '员工管理',
                    list: [
                        { title: '员工列表', url: '/home/employees/employeesOne', permissions: 'yuangong.list' },
                        { title: '员工评价', url: '/home/employees/employeesTwo', permissions: 'comments.list' },
                        { title: '员工投诉', url: '/home/employees/employeesThree', permissions: 'suggestion.list' },
                        { title: '用户列表', url: '/home/employees/employeesFour', permissions: 'user.list' }
                    ]
                }]
            },
            {
                title: '事务',
                son: [{
                        title: '驻厂管理',
                        list: [
                            { title: '员工列表', url: '/home/affair/affairFour', permissions: 'centerflow.newflowlist' },
                            { title: '借支列表', url: '/home/affair/affairOne', permissions: 'jiezhi.list' },
                            { title: '合同管理', url: '/home/affair/htgl', permissions: 'agreement.list' }
                        ]
                    },
                    {
                        title: '运营中心管理',
                        list: [
                            { title: '员工列表', url: '/home/affair/affairTwo', permissions: 'daikou.list' },
                            { title: '代扣列表', url: '/home/affair/affairThree', permissions: 'daikou.list' }
                        ]
                    }
                ]
            },
            {
                title: '财务',
                son: [{
                        title: '借支管理',
                        list: [
                            { title: '借支列表', url: '/home/financial/jzList', permissions: 'finance.jiezhilist' },
                        ]
                    },
                    {
                        title: '代扣管理',
                        list: [
                            { title: '代扣列表', url: '/home/financial/dkList', permissions: 'finance.daikoulist' }
                        ]
                    },
                    {
                        title: '绩效管理',
                        list: [
                            { title: '绩效列表', url: '/home/financial/jxList', permissions: 'finance.jixiaolist' }
                        ]
                    },
                    {
                        title: '工资管理',
                        list: [
                            { title: '结算列表', url: '/home/financial/settlement', permissions: 'finance.jiezhilist' },
                            { title: '结算公式', url: '/home/financial/formula', permissions: 'finance.jiezhilist' },
                            { title: '补发列表', url: '/home/financial/replacementOne', permissions: 'finance.jiezhilist' },
                            { title: '不发列表', url: '/home/financial/nosendOne', permissions: 'finance.jiezhilist' }
                        ]
                    }
                ]
            },
            {
                title: '消息',
                son: [{
                    title: '消息管理',
                    list: [
                        { title: '系统消息', url: '/home/message/messageOne', permissions: 'msg.msglistwithsystem' },
                        { title: '员工动态', url: '/home/message/messageTwo', permissions: 'msg.msglistwithflow' },
                        { title: '招工消息', url: '/home/message/messageThree', permissions: 'msg.msglistwithsystem' },
                        { title: '发布消息', url: '/home/message/sendMessage', permissions: 'msg.sendnote' },
                        { title: '意见反馈', url: '/home/message/messageFour', permissions: 'msg.advicelist' }
                    ]
                }]
            },
            {
                title: '报名',
                son: [{
                    title: '报名管理',
                    list: [
                        { title: '报名列表', url: '/home/apply/applyOne', permissions: 'enroll.list' },
                        { title: '招商加盟', url: '/home/apply/applyTwo', permissions: 'enroll.recruitlist' },
                    ]
                }]
            },
            {
                title: '统计',
                son: [{
                    title: '统计分析',
                    list: [
                        { title: '员工统计', url: '/home/statistical/statisticalOne', permissions: 'index.tongjiindex' },
                        { title: '驻厂统计', url: '/home/statistical/statisticalTwo', permissions: 'index.tongjiindex' },
                        { title: '运营中心统计', url: '/home/statistical/statisticalThree', permissions: 'index.tongjiindex' },
                        { title: '企业统计', url: '/home/statistical/statisticalFour', permissions: 'index.tongjiindex' }
                    ]
                }]
            },
            {
                title: '设置',
                son: [{
                        title: '帮助中心',
                        list: [
                            { title: '帮助列表', url: '/home/setting/settingOne', permissions: 'help.list' },
                            { title: '添加帮助', url: '/home/setting/helpCreate', permissions: 'help.add' },
                        ]
                    },
                    {
                        title: '版本管理',
                        list: [
                            { title: '版本列表', url: '/home/setting/settingThree', permissions: 'version.list' },
                            { title: '上传版本', url: '/home/setting/versionCreate', permissions: 'version.upload' }
                        ]
                    },
                    /*{
                      title:'广告管理',
                      list:[
                        { title:'广告列表',url:'/home/message/advList',permissions:'banner.list'},
                        { title:'添加广告',url:'/home/message/advCreate',permissions:'banner.add'}
                      ]
                    },*/
                ]
            },
            {
                title: '权限',
                son: [{
                    title: '权限管理',
                    list: [
                        { title: '角色管理', url: '/home/permissions/permissions_jsOne', permissions: 'admin.position' },
                        { title: '成员管理', url: '/home/permissions/permissions_cy', permissions: 'admin.adminlist' },
                        { title: '操作日志', url: '/home/permissions/permissionsThree', permissions: 'operations' }
                    ]
                }]
            }
        ],
        token: '',
        userInfo: {}
    },
    mutations: {

        setCityId(state, msg) {
            state.cityId = msg;
        },
        setPageText(state, msg) {
            state.pageText = msg;
        },
        setNavIndex(state, msg) {
            state.navIndex = msg;
        },
        setUserInfo(state, msg) {
            state.userInfo = msg;
        },
        setToken(state, msg) {
            state.token = msg;
        },

    }

});

export default store;