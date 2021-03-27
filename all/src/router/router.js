import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//配置路由
const routes = [
    { path: '/', redirect: 'login' },
    {
        path: '/login',
        component: () =>
            import ( /*webpackChunkName:"group-index"*/ '../components/login.vue')
    },
    {
        path: '/home',
        component: () =>
            import ( /*webpackChunkName:"group-index"*/ '../components/home.vue'),
        children: [
            { path: '/', redirect: '/home/firstpage' },
            {
                path: '/home/firstpage',
                component: () =>
                    import ( /*webpackChunkName:"group-index"*/ '../components/views/firstpage/firstpage.vue'),
                children: [
                    { path: '/', redirect: '/home/firstpage/xtsetting' },
                    {
                        path: '/home/firstpage/xtsetting',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/firstpage/xtsetting.vue')
                    },
                    {
                        path: '/home/firstpage/zhsetting',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/firstpage/zhsetting.vue')
                    },
                    {
                        path: '/home/firstpage/logincon',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/firstpage/logincon.vue')
                    },
                ]
            },
            {
                path: '/home/company',
                component: () =>
                    import ( /*webpackChunkName:"group-index"*/ '../components/views/company/company.vue'),
                children: [
                    { path: '/', redirect: '/home/company/companyOne' },
                    {
                        path: '/home/company/companyOne',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/company/companyOne.vue'),
                        children: [
                            { path: '/', redirect: '/home/company/companyOne/companyList' },
                            {
                                path: '/home/company/companyOne/companyList',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/company/companyList.vue'),
                                meta: {
                                    keepAlive: true
                                }
                            },
                            {
                                path: '/home/company/companyOne/companyDetail/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/company/companyDetail.vue'),
                                meta: {
                                    keepAlive: false
                                }
                            },
                            {
                                path: '/home/company/companyOne/companyEdit/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/company/companyEdit.vue'),
                                meta: {
                                    keepAlive: false
                                }
                            },
                        ]
                    },
                    {
                        path: '/home/company/companyCreate',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/company/companyCreate.vue')
                    },
                    {
                        path: '/home/company/companyCreate/:id',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/company/companyCreate.vue')
                    },
                    {
                        path: '/home/company/companyTwo',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/company/companyTwo.vue'),
                        children: [
                            { path: '/', redirect: '/home/company/companyTwo/companyJobList' },
                            {
                                path: '/home/company/companyTwo/companyJobList',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/company/companyJobList.vue'),
                                meta: {
                                    keepAlive: true
                                }
                            },
                            {
                                path: '/home/company/companyTwo/companyJobDetail/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/company/companyJobDetail.vue'),
                                meta: {
                                    keepAlive: false
                                }
                            },
                            {
                                path: '/home/company/companyTwo/companyJobEdit/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/company/companyJobEdit.vue'),
                                meta: {
                                    keepAlive: false
                                }
                            },
                        ]
                    },
                    {
                        path: '/home/company/companyJobcreate',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/company/companyJobcreate.vue')
                    },
                    {
                        path: '/home/company/companyJobcreate/:id/:type',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/company/companyJobcreate.vue')
                    },
                    {
                        path: '/home/company/companyThree',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/company/companyThree.vue'),
                        children: [
                            { path: '/', redirect: '/home/company/companyThree/companyShList' },
                            {
                                path: '/home/company/companyThree/companyShList',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/company/companyShList.vue'),
                                meta: {
                                    keepAlive: true
                                }
                            },
                            {
                                path: '/home/company/companyThree/companyShDetail/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/company/companyShDetail.vue'),
                                meta: {
                                    keepAlive: false
                                }
                            },
                        ]
                    },
                ]
            },
            {
                path: '/home/store',
                component: () =>
                    import ( /*webpackChunkName:"group-index"*/ '../components/views/store/store.vue'),
                children: [
                    { path: '/', redirect: '/home/store/storeOne' },
                    {
                        path: '/home/store/storeOne',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/store/storeOne.vue'),
                        children: [
                            { path: '/', redirect: '/home/store/storeOne/storeList' },
                            {
                                path: '/home/store/storeOne/storeList',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/store/storeList.vue'),
                                meta: { keepAlive: true }
                            },
                            {
                                path: '/home/store/storeOne/storeDetail/:id/:type',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/store/storeDetail.vue'),
                            },
                            {
                                path: '/home/store/storeOne/storeEdit/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/store/storeEdit.vue'),
                                meta: {
                                    keepAlive: false
                                }
                            },
                        ]
                    },
                    {
                        path: '/home/store/storeCreate',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/store/storeCreate.vue'),
                        meta: {
                            keepAlive: false
                        }
                    },
                    {
                        path: '/home/store/storeTwo',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/store/storeTwo.vue'),
                        children: [
                            { path: '/', redirect: '/home/store/storeTwo/chatList' },
                            {
                                path: '/home/store/storeTwo/chatList',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/store/chatList.vue'),
                                meta: { keepAlive: true }
                            },
                            {
                                path: '/home/store/storeTwo/chatDetail/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/store/chatDetail.vue'),
                            }
                        ]
                    }
                ]
            },
            {
                path: '/home/zhuchang',
                component: () =>
                    import ( /*webpackChunkName:"group-index"*/ '../components/views/zhuchang/zhuchang.vue'),
                children: [
                    { path: '/', redirect: '/home/zhuchang/zhuchangOne' },
                    {
                        path: '/home/zhuchang/zhuchangOne',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/zhuchang/zhuchangOne.vue'),
                        children: [
                            { path: '/', redirect: '/home/zhuchang/zhuchangOne/zhuchangList' },
                            {
                                path: '/home/zhuchang/zhuchangOne/zhuchangList',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/zhuchang/zhuchangList.vue'),
                                meta: { keepAlive: true }
                            },
                            {
                                path: '/home/zhuchang/zhuchangOne/zhuchangEdit/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/zhuchang/zhuchangEdit.vue')
                            },
                            {
                                path: '/home/zhuchang/zhuchangOne/zhuchangDatile/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/zhuchang/zhuchangDatile.vue'),
                            },
                            {
                                path: '/home/zhuchang/zhuchangOne/pingjiaDatile/:id/:zhuchangid',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/zhuchang/pingjiaDatile.vue'),
                            },
                            {
                                path: '/home/zhuchang/zhuchangOne/tousuDatile/:id/:zhuchangid',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/zhuchang/tousuDatile.vue'),
                            },

                        ]
                    },
                    {
                        path: '/home/zhuchang/zhuchangCreate',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/zhuchang/zhuchangCreate.vue')
                    },
                    {
                        path: '/home/zhuchang/zhuchangCreate/:id',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/zhuchang/zhuchangCreate.vue')
                    },
                    {
                        path: '/home/zhuchang/zhuchangDatile/:id',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/zhuchang/zhuchangDatile.vue')
                    }
                ]
            },
            {
                path: '/home/employees',
                component: () =>
                    import ( /*webpackChunkName:"group-index"*/ '../components/views/employees/employees.vue'),
                children: [
                    { path: '/', redirect: '/home/employees/employeesOne' },
                    {
                        path: '/home/employees/employeesOne',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/employees/employeesOne.vue'),
                        children: [
                            { path: '/', redirect: '/home/employees/employeesOne/employeesList' },
                            {
                                path: '/home/employees/employeesOne/employeesList',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/employees/employeesList.vue'),
                                meta: { keepAlive: true }
                            },
                            {
                                path: '/home/employees/employeesOne/employeesList/:name/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/employees/employeesList.vue'),
                                meta: { keepAlive: true }
                            },
                            {
                                path: '/home/employees/employeesOne/employeesDetail/:id/:type',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/employees/employeesDetail.vue'),
                            },
                            {
                                path: '/home/employees/employeesOne/employeesEdit/:id/:type',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/employees/employeesEdit.vue'),
                            },
                        ]
                    },
                    {
                        path: '/home/employees/employeesTwo',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/employees/employeesTwo.vue'),
                        children: [
                            { path: '/', redirect: '/home/employees/employeesTwo/employeesPj' },
                            {
                                path: '/home/employees/employeesTwo/employeesPj',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/employees/employeesPj.vue'),
                                meta: { keepAlive: true }
                            },
                            {
                                path: '/home/employees/employeesTwo/employeespJDetail/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/employees/employeesPjDetail.vue'),
                            },
                        ]
                    },
                    {
                        path: '/home/employees/employeesThree',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/employees/employeesThree.vue'),
                        children: [
                            { path: '/', redirect: '/home/employees/employeesThree/employeesTs' },
                            {
                                path: '/home/employees/employeesThree/employeesTs',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/employees/employeesTs.vue'),
                                meta: { keepAlive: true }
                            },
                            {
                                path: '/home/employees/employeesThree/employeesTsDetail/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/employees/employeesTsDetail.vue'),
                            },
                        ]
                    },
                    {
                        path: '/home/employees/employeesFour',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/employees/employeesFour.vue'),
                        children: [
                            { path: '/', redirect: '/home/employees/employeesFour/userList' },
                            {
                                path: '/home/employees/employeesFour/userList',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/employees/userList.vue'),
                                meta: { keepAlive: true }
                            },
                            {
                                path: '/home/employees/employeesFour/userDetail/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/employees/userDetail.vue'),
                            },
                        ]
                    }
                ]
            },
            {
                path: '/home/affair',
                component: () =>
                    import ( /*webpackChunkName:"group-index"*/ '../components/views/affair/affair.vue'),
                children: [
                    { path: '/', redirect: '/home/affair/affairOne' },
                    {
                        path: '/home/affair/affairOne',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/affair/affairOne.vue'),
                        children: [
                            { path: '/', redirect: '/home/affair/affairOne/jzlb' },
                            {
                                path: '/home/affair/affairOne/jzlb',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/affair/jzlb.vue')
                            },
                            {
                                path: '/home/affair/affairOne/jzlbDetail/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/affair/jzlbDetail.vue')
                            }
                        ]
                    },
                    {
                        path: '/home/affair/htgl',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/affair/htgl.vue')
                    },
                    {
                        path: '/home/affair/affairThree',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/affair/affairThree.vue'),
                        children: [
                            { path: '/', redirect: '/home/affair/affairThree/dklb' },
                            {
                                path: '/home/affair/affairThree/dklb',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/affair/dklb.vue')
                            },
                            {
                                path: '/home/affair/affairThree/dklbDetail/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/affair/dklbDetail.vue')
                            },
                        ]
                    },
                    {
                        path: '/home/affair/affairFour',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/affair/affairFour.vue'),
                        children: [
                            { path: '/', redirect: '/home/affair/affairFour/yglb' },
                            {
                                path: '/home/affair/affairFour/yglb',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/affair/yglb.vue')
                            },
                            {
                                path: '/home/affair/affairFour/yglbDetail/:id/:type',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/affair/yglbDetail.vue')
                            },
                        ]
                    },
                    {
                        path: '/home/affair/affairTwo',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/affair/affairTwo.vue'),
                        children: [
                            { path: '/', redirect: '/home/affair/affairTwo/center_yglb' },
                            {
                                path: '/home/affair/affairTwo/center_yglb',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/affair/center_yglb.vue')
                            },
                            {
                                path: '/home/affair/affairTwo/centerYglbDetail/:id/:type',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/affair/centerYglbDetail.vue')
                            },
                        ]
                    }
                ]
            },
            {
                path: '/home/financial',
                component: () =>
                    import ( /*webpackChunkName:"group-index"*/ '../components/views/financial/financial.vue'),
                children: [
                    { path: '/', redirect: '/home/financial/applyList' },
                    {
                        path: '/home/financial/jzList',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/financial/jzList.vue')
                    },
                    {
                        path: '/home/financial/dkList',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/financial/dkList.vue')
                    },
                    {
                        path: '/home/financial/jxList',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/financial/jxList.vue')
                    },
                    {
                        path: '/home/financial/settlement',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/financial/settlement.vue')
                    },
                    {
                        path: '/home/financial/formula',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/financial/formula.vue')
                    },
                    {
                        path: '/home/financial/replacementOne',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/financial/replacementOne.vue'),
                        children: [
                            { path: '/', redirect: '/home/financial/replacementOne/replacementList' },
                            {
                                path: '/home/financial/replacementOne/replacementList',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/financial/replacementList.vue'),
                                meta: { keepAlive: true }
                            },
                            {
                                path: '/home/financial/replacementOne/replacementDetail/:id/:type',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/financial/replacementDetail.vue'),
                            },
                        ]
                    },
                    {
                        path: '/home/financial/nosendOne',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/financial/nosendOne.vue'),
                        children: [
                            { path: '/', redirect: '/home/financial/nosendOne/nosendList' },
                            {
                                path: '/home/financial/nosendOne/nosendList',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/financial/nosendList.vue'),
                                meta: { keepAlive: true }
                            },
                            {
                                path: '/home/financial/nosendOne/nosendDetail/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/financial/nosendDetail.vue'),
                            },
                        ]
                    }
                ]
            },
            {
                path: '/home/message',
                component: () =>
                    import ( /*webpackChunkName:"group-index"*/ '../components/views/message/message.vue'),
                children: [
                    { path: '/', redirect: '/home/message/messageOne' },
                    {
                        path: '/home/message/messageOne',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/message/messageOne.vue'),
                        children: [
                            { path: '/', redirect: '/home/message/messageOne/xtMessage' },
                            {
                                path: '/home/message/messageOne/xtMessage',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/message/xtMessage.vue')
                            },
                            {
                                path: '/home/message/messageOne/xtMessageDetail/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/message/xtMessageDetail.vue')
                            }
                        ]
                    },
                    {
                        path: '/home/message/messageTwo',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/message/messageTwo.vue'),
                        children: [
                            { path: '/', redirect: '/home/message/messageTwo/ygMessage' },
                            {
                                path: '/home/message/messageTwo/ygMessage',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/message/ygMessage.vue')
                            },
                            {
                                path: '/home/message/messageTwo/ygMessageDetail/:id/:type',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/message/ygMessageDetail.vue')
                            }
                        ]
                    },
                    {
                        path: '/home/message/messageThree',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/message/messageThree.vue'),
                        children: [
                            { path: '/', redirect: '/home/message/messageThree/zgMessage' },
                            {
                                path: '/home/message/messageThree/zgMessage',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/message/zgMessage.vue')
                            },
                            {
                                path: '/home/message/messageThree/zgMessageDetail/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/message/zgMessageDetail.vue')
                            }
                        ]
                    },
                    {
                        path: '/home/message/messageFour',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/message/messageFour.vue'),
                        children: [
                            { path: '/', redirect: '/home/message/messageFour/yjMessage' },
                            {
                                path: '/home/message/messageFour/yjMessage',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/message/yjMessage.vue')
                            },
                            {
                                path: '/home/message/messageFour/yjMessageDetail/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/message/yjMessageDetail.vue')
                            }
                        ]
                    },
                    {
                        path: '/home/message/sendMessage',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/message/sendMessage.vue')
                    },
                    {
                        path: '/home/message/advList',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/message/advList.vue')
                    },
                    {
                        path: '/home/message/advCreate',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/message/advCreate.vue')
                    }
                ]
            },
            {
                path: '/home/apply',
                component: () =>
                    import ( /*webpackChunkName:"group-index"*/ '../components/views/apply/apply.vue'),
                children: [
                    { path: '/', redirect: '/home/apply/applyOne' },
                    {
                        path: '/home/apply/applyOne',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/apply/applyOne.vue'),
                        children: [
                            { path: '/', redirect: '/home/apply/applyOne/applyList' },
                            {
                                path: '/home/apply/applyOne/applyList',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/apply/applyList.vue')
                            },
                            {
                                path: '/home/apply/applyOne/applyDetail/:id/:type',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/apply/applyDetail.vue')
                            }
                        ]
                    },
                    {
                        path: '/home/apply/applyTwo',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/apply/applyTwo.vue'),
                        children: [
                            { path: '/', redirect: '/home/apply/applyTwo/joinList' },
                            {
                                path: '/home/apply/applyTwo/joinList',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/apply/joinList.vue')
                            }
                        ]
                    },
                ]
            },
            {
                path: '/home/statistical',
                component: () =>
                    import ( /*webpackChunkName:"group-index"*/ '../components/views/statistical/statistical.vue'),
                children: [
                    { path: '/', redirect: '/home/statistical/statisticalOne' },
                    {
                        path: '/home/statistical/statisticalOne',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/statistical/statisticalOne.vue'),
                        children: [
                            { path: '/', redirect: '/home/statistical/statisticalOne/statistical_yg' },
                            {
                                path: '/home/statistical/statisticalOne/statistical_yg',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/statistical/statistical_yg.vue'),
                                meta: { keepAlive: true }
                            },
                            {
                                path: '/home/statistical/statisticalOne/statistical_ygDetail',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/statistical/statistical_ygDetail.vue')
                            }
                        ]
                    },
                    {
                        path: '/home/statistical/statisticalTwo',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/statistical/statisticalTwo.vue'),
                        children: [
                            { path: '/', redirect: '/home/statistical/statisticalTwo/statistical_zc' },
                            {
                                path: '/home/statistical/statisticalTwo/statistical_zc',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/statistical/statistical_zc.vue'),
                                meta: { keepAlive: true }
                            },
                            {
                                path: '/home/statistical/statisticalTwo/statistical_zcDetail',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/statistical/statistical_zcDetail.vue')
                            }
                        ]
                    },
                    {
                        path: '/home/statistical/statisticalThree',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/statistical/statisticalThree.vue'),
                        children: [
                            { path: '/', redirect: '/home/statistical/statisticalThree/statistical_yy' },
                            {
                                path: '/home/statistical/statisticalThree/statistical_yy',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/statistical/statistical_yy.vue'),
                                meta: { keepAlive: true }
                            },
                            {
                                path: '/home/statistical/statisticalThree/statistical_yyDetail',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/statistical/statistical_yyDetail.vue')
                            }
                        ]
                    },
                    {
                        path: '/home/statistical/statisticalFour',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/statistical/statisticalFour.vue'),
                        children: [
                            { path: '/', redirect: '/home/statistical/statisticalFour/statistical_qy' },
                            {
                                path: '/home/statistical/statisticalFour/statistical_qy',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/statistical/statistical_qy.vue'),
                                meta: { keepAlive: true }
                            },
                            {
                                path: '/home/statistical/statisticalFour/statistical_qyDetail',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/statistical/statistical_qyDetail.vue')
                            }
                        ]
                    }
                ]
            },
            {
                path: '/home/permissions',
                component: () =>
                    import ( /*webpackChunkName:"group-index"*/ '../components/views/permissions/permissions.vue'),
                children: [
                    { path: '/', redirect: '/home/permissions/permissions_jsOne' },
                    {
                        path: '/home/permissions/permissions_jsOne',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/permissions/permissions_jsOne.vue'),
                        children: [
                            { path: '/', redirect: '/home/permissions/permissions_jsOne/permissions_js' },
                            {
                                path: '/home/permissions/permissions_jsOne/permissions_js',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/permissions/permissions_js.vue')
                            },
                            {
                                path: '/home/permissions/permissions_jsOne/permissions_jsDetail/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/permissions/permissions_jsDetail.vue')
                            }
                        ]
                    },
                    {
                        path: '/home/permissions/permissions_cy',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/permissions/permissions_cy.vue')
                    },
                    {
                        path: '/home/permissions/permissionsThree',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/permissions/permissionsThree.vue'),
                        children: [
                            { path: '/', redirect: '/home/permissions/permissionsThree/permissions_rz' },
                            {
                                path: '/home/permissions/permissionsThree/permissions_rz',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/permissions/permissions_rz.vue')
                            },
                            {
                                path: '/home/permissions/permissionsThree/permissions_rzDetail/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/permissions/permissions_rzDetail.vue')
                            }
                        ]

                    }
                ]
            },
            {
                path: '/home/setting',
                component: () =>
                    import ( /*webpackChunkName:"group-index"*/ '../components/views/setting/setting.vue'),
                children: [
                    { path: '/', redirect: '/home/setting/settingOne' },
                    {
                        path: '/home/setting/settingOne',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/setting/settingOne.vue'),
                        children: [
                            { path: '/', redirect: '/home/setting/settingOne/helpList' },
                            {
                                path: '/home/setting/settingOne/helpList',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/setting/helpList.vue'),
                                meta: {
                                    keepAlive: true
                                }
                            },
                            {
                                path: '/home/setting/settingOne/helpEdit/:id',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/setting/helpEdit.vue'),
                            },
                        ]
                    },
                    {
                        path: '/home/setting/helpCreate',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/setting/helpCreate.vue'),
                    },
                    {
                        path: '/home/setting/settingThree',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/setting/settingThree.vue'),
                        children: [
                            { path: '/', redirect: '/home/setting/settingThree/versionList' },
                            {
                                path: '/home/setting/settingThree/versionList',
                                component: () =>
                                    import ( /*webpackChunkName:"group-index"*/ '../components/views/setting/versionList.vue'),
                                meta: {
                                    keepAlive: true
                                }
                            },
                        ]
                    },
                    {
                        path: '/home/setting/versionCreate',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/setting/versionCreate.vue'),
                    },
                    {
                        path: '/home/setting/versionCreate/:id',
                        component: () =>
                            import ( /*webpackChunkName:"group-index"*/ '../components/views/setting/versionCreate.vue'),
                    },
                ]
            }
        ]
    },
];

//实例化VueRouter
const router = new VueRouter({
    routes
});


//将router暴露出去
export default router;