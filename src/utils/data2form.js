import functionData from "@/data/functionData";
import form from "@/data/form";

function getSlsDailyRunTime(dailyRunTime) {
    if (!dailyRunTime) return form().slsConfig.dailyRunTime;
    return dailyRunTime.split('-');
}

function getFunctionConfig(data) {
    return Object.keys(functionData).filter(key => !data[key])
}

function getCustomizeUp(customizeUp) {
    const customizeUpArray = []
    for (const upNumber of customizeUp) {
        customizeUp.push({
            value: upNumber,
            key: Date.now()
        })
    }
    return customizeUpArray;
}

function getSLS(sls) {
    if (sls) return JSON.parse(JSON.stringify(sls));
    return form().slsConfig.scf;
}

function getMessage(message, state) {
    const srcMsg = form().message;
    if (!message) return srcMsg;
    if (message === true) return state.message || srcMsg;
    const temp = {};
    temp.email = message.email ? message.email : srcMsg.email;
    if (message.serverChan === true) {
        temp.serverChan = srcMsg.serverChan
        return temp;
    }
    temp.serverChan = message.serverChan || '';
    return temp;
}

export default function (data, state) {
    const {
        apiDelay,
        userAgent,
        cookie,
        stayCoins,
        targetCoins,
        targetLevel,
        coinRetryNum,
        upperAccMatch,
        message,
        sls,
        function: fun, //当初为啥用关键字
        customizeUp
    } = data;

    return {
        slsConfig: {
            scf: getSLS(sls),
            dailyRunTime: getSlsDailyRunTime(data.sls?.dailyRunTime)
        },
        message: getMessage(message, state),
        functionConfig: {
            allFunctions: form().functionConfig.allFunctions,
            closeFunValues: getFunctionConfig(fun)
        },
        baseConfig: {
            apiDelay,
            userAgent,
            cookie
        },
        coinsConfig: {
            stayCoins,
            targetCoins,
            targetLevel,
            coinRetryNum,
            upperAccMatch,
            customizeUp: getCustomizeUp(customizeUp)
        }
    }
}
