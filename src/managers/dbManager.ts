export const getDB = () => {
    let raw = localStorage.getItem('DawPage') || "";
    let obj = JSON.parse(raw)
    console.log('getDB =>', obj);
    
    return obj
}
export const persistDB = (state:any) => {
    localStorage.setItem('DawPage', JSON.stringify(state))
    console.log('persistDB done');
}