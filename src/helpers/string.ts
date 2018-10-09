import {lowerCase} from 'lodash'

type charsType = 'all' | 'alphanum'

export const randomString = (length:number = 10, charsRange:charsType = 'all') => {
    let text = "";
    
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    if (charsRange === 'all') chars += "<>?-=()!#}|{\/$@%^&*"
    
    for (let i = 0; i < length; i++)
        text += chars.charAt(Math.floor(Math.random() * chars.length));
    
    return text;
}

export const simplifyString = (val:any) => lowerCase(val).replace(/\s/g, '-')