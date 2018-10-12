export const toneTypeSign = (toneType:string) => {
    let res = ''
    switch(toneType){
        case "pattern":res = '⋰';break;
        case "event":res="♫";break;
    }
    return res
}
//∞⋰▶♩♪♫♬♯♮