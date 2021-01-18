export default {
    updateMessage({config}, message) {
        config.message = JSON.parse(JSON.stringify(message))
    },
    pushAccount({config}, user) {
        config.account.push(JSON.parse(JSON.stringify(user)))
    },
    deleteAccount({config}, user) {
        let index = -1;
        const reg = `(?:^|)DedeUserID=([^;]*)(?:;|$)`;
        config.account.forEach((el,i) => {
          if(el.cookie?.match(reg)[1] === user.userId){
              index = i;
          }
        })
        if (index === -1) return;
        config.account.splice(index, 1);
    }
}
