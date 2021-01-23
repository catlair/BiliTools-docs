export const getUserId = (cookie) => {
    const reg = `(?:^|)DedeUserID=([^;]*)(?:;|$)`;
    return cookie.match(reg)?.[1] || '-1'
}
