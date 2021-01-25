import functionData from '@/data/functionData';
import form, { createMessage } from '@/data/form';
import { getUserId } from '@/utils/index';

function setDailyRunTime(dailyRunTime) {
  if (!dailyRunTime) return form().slsConfig.dailyRunTime;
  return dailyRunTime.split('-');
}

function setFunctionsOption(data, control) {
  if (!data) return form().closeFunValues;
  const closeFunValues = Object.keys(functionData).filter((key) => {
    if (data[key] === undefined) return !functionData[key]; // 如果未设置则返回默认值(为false就包含)
    return !data[key];
  });
  control.addCoins = !closeFunValues.includes('addCoins');
  return closeFunValues;
}

function setCustomizeUp(customizeUp) {
  let customizeUpArray = [];
  if (!customizeUp.length) {
    customizeUpArray = form().coinsConfig.customizeUp;
  }
  for (const upNumber of customizeUp) {
    customizeUpArray.push({
      value: Number(upNumber),
      key: Date.now().toString(),
    });
  }
  return customizeUpArray;
}

function setSlsOption(sls, control) {
  if (sls && sls.name) {
    control['scf'] = true;
    return Object.copy(sls);
  }
  control.scf = false;
  return form().slsConfig.scf;
}

function setAccountMessage(message, control) {
  const tempMessage = Object.copy(form().message),
    baseMessage = Object.copy(form().message),
    base = Object.keys(baseMessage);

  //初始化switch
  control.use = false;
  control.custom = false;
  base.forEach((el) => {
    const item = (control[el] = {});
    item.use = false;
    item.custom = false;
  });

  if (!message || Object.isEmpty(message)) return baseMessage;

  control.use = true;

  let useCount = 0;

  base.forEach((el) => {
    const item = message[el];
    if (!item || Object.isEmpty(item)) return;
    //使用
    control[el].use = true;
    if (item === true) {
      useCount++;
      return;
    }
    //自定义
    control.custom = true;
    control[el].custom = true;
    tempMessage[el] = item;
  });

  //临时解决
  if (useCount > 0 && useCount < base.length) control.custom = true;

  return tempMessage;
}

function setAccountOne(account, userIdArray) {
  const control = {
      message: {},
    },
    {
      apiDelay,
      userAgent,
      cookie,
      stayCoins,
      targetCoins,
      targetLevel,
      coinRetryNum,
      upperAccMatch,
    } = account;

  userIdArray.push(getUserId(cookie));

  return {
    switch: control,
    slsConfig: {
      scf: setSlsOption(account.sls, control),
      dailyRunTime: setDailyRunTime(account.dailyRunTime),
    },
    message: setAccountMessage(account.message, control.message),
    closeFunValues: setFunctionsOption(account.function, control),
    baseConfig: {
      apiDelay,
      userAgent,
      cookie,
    },
    coinsConfig: {
      stayCoins,
      targetCoins,
      targetLevel,
      coinRetryNum,
      upperAccMatch,
      customizeUp: setCustomizeUp(account.customizeUp),
    },
  };
}

function setMessageData(message) {
  if (!message) return createMessage();

  const tempMessage = {
    form: message,
    switch: {},
  };

  //form().message是最全的
  Object.keys(form().message).forEach((el) => {
    tempMessage.switch[el] = Boolean(message[el]);
  });

  //邮箱的from没有,不可能开启邮箱
  if (!message.email || !message.email.from) {
    tempMessage.switch.email = false;
  }

  return tempMessage;
}

function setAccountData(account) {
  const tempAccount = {},
    userIdArray = [],
    array = account.map((user) => setAccountOne(user, userIdArray));
  for (let i = 0; i < array.length; i++) {
    tempAccount[userIdArray[i]] = Object.copy(array[i]);
  }
  return tempAccount;
}

export default function(config) {
  return Object.copy({
    account: setAccountData(config.account),
    message: setMessageData(config.message),
  });
}
