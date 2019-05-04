import { iSettingsItem } from "./types/settings.type";

let settings: {
    [key:string]: number | string
} = { }

export const buildSettingsObj = (stateSettingsArray: iSettingsItem[]) => {
    
    settings = {}
    for (let i = 0; i < stateSettingsArray.length; i++) {
        let el = stateSettingsArray[i]
        if (el.type === 'settings') {
            settings[el.key] = el.value
        }
    }
    console.log(settings);
}

export const getSettingsObj = () => {
    return settings
}