import config from "src/config";

export const getDB = () => {
    let raw = localStorage.getItem('DawPage') || "";
    let obj = JSON.parse(raw)
    config.debug.dbManager && console.log('[DB] getDB =>', obj);
    
    return obj
}
export const persistDB = (state:any) => {
    localStorage.setItem('DawPage', JSON.stringify(state))
    config.debug.dbManager && console.log('[DB] persistDB done');
}