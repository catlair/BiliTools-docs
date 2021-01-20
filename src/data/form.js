export default {
    slsConfig: {
        scf: {
            appName: 'catlair_Bilibili',
            name: '',
            description: '',
            region: 'ap-chengdu',
        },
        dailyRunTime: ['19:19:19', '23:23:23']
    },
    message: {
        email: {
            from: '',
            to: '',
            pass: '',
            host: '',
            port: 465
        },
        serverChan: ''
    },
    functionConfig: {
        allFunctions: [
            {
                key: 'addCoins',
                label: '每日投币',
            },
            {
                key: 'shareAndWatch',
                label: '分享/观看视频',
            },
            {
                key: 'supGroupSign',
                label: '应援团签到',
            }, {
                key: 'judgement',
                label: '风纪委员任务',
            },
            {
                key: 'mangaSign',
                label: '漫画签到'
            },
            {
                key: 'silver2Coin',
                label: '银瓜子换硬币',
            },
            {
                key: 'liveSignTask',
                label: '直播签到'
            }
        ],
        closeFunValues: ['judgement']
    },
    baseConfig: {
        apiDelay: [2, 6],
        userAgent: "",
        cookie: ''
    },
    coinsConfig: {
        stayCoins: 0,
        targetCoins: 5,
        targetLevel: 6,
        coinRetryNum: 4,
        upperAccMatch: true,
        customizeUp: [{
            value: '',
            key: 'abc00key'
        }],
    }
}
