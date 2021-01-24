import functionData from "@/data/functionData";

function getFunctionsOption(closeFunValues) {
    closeFunValues.forEach(name => {
        functionData[name] = false
    })
    return functionData;
}

function getSlsOption(scf, control) {
    if (!control) return null;
    return scf;
}

function getDailyRunTime(dailyRunTime) {
    return dailyRunTime[0] + '-' + dailyRunTime[1];
}

function getCustomizeUp(customizeUp) {
    return customizeUp.map(up => up.value).filter(up => up !== '');
}

function getAccountMessage(account) {
    const message = account.message,
        control = account.switch.message;
    if (!control.use) return false;

    const useEmailCustom = control.email.custom,
        useServerChanCustom = control.serverChan.custom;
    if (useEmailCustom && useServerChanCustom) {
        return message;
    }

    if (!useEmailCustom && !useServerChanCustom)
        if (control.email.use && control.serverChan.use)
            return true;

    const tempMessage = {};
    if (useEmailCustom) {
        tempMessage.email = message.email;
    }
    if (useServerChanCustom) {
        tempMessage.serverChan = message.serverChan;
    }
    return tempMessage;
}

function getAccountOne(account) {
    const {baseConfig, coinsConfig, closeFunValues, slsConfig} = account;
    return {
        function: getFunctionsOption(closeFunValues),
        dailyRunTime: getDailyRunTime(slsConfig.dailyRunTime),
        ...baseConfig,
        message: getAccountMessage(account),
        ...coinsConfig,
        customizeUp: getCustomizeUp(coinsConfig.customizeUp),
        sls: getSlsOption(slsConfig.scf, account.switch.scf)
    };
}

function getMessageData(message) {
    const {form, switch: control} = message,
        tempMessage = {};
    Object.keys(control).forEach(el => {
        control[el] && (tempMessage[el] = form[el]);
    })
    return tempMessage;
}

function getAccountData(account) {
    return Object.keys(account).map(key => getAccountOne(account[key]))
}

export default function (account, message) {
    return Object.copy({
        message: getMessageData(message),
        account: getAccountData(account)
    })
}