export default function () {
    return {
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
        closeFunValues: ['judgement'],
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
            }]
        },
    }
}
