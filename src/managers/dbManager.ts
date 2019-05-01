import config from "src/config";

export const getDB = ():any => {
    let raw = localStorage.getItem('DawPage') || "";
    let obj = null
    try {
        obj = JSON.parse(raw)
    } catch (error) {
        console.warn('[DB] error when loading db:', error);
    }
    config.debug.dbManager && console.log('[DB] getDB =>', obj);
    return obj
}
export const persistDB = (state:any) => {
    localStorage.setItem('DawPage', JSON.stringify(state))
    config.debug.dbManager && console.log('[DB] persistDB done');
}