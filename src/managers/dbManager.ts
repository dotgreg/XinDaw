import config from "src/config";
import {assign, random} from 'lodash'
import { iSound } from "./types/sound.type";
import { iPart } from "./types/part.type";
import { iSoundControls } from "./types/control.type";
import { iSettingsItem } from "./types/settings.type";
import { iComponentEvent } from "./types/componentEvent.type";

export interface iStateDawPage {
    sounds: iSound[]
    parts: iPart[]
    controls: iSoundControls[]
    settings: iSettingsItem[]
    events: iComponentEvent[]
    settingsOpen: boolean
    midiDebugOpen: boolean
  }

  
export  const generateInitialDb = ()  => {
    return {
        sounds: [],
        parts: [],
        controls: [],
        settings: [],
        events: [],
        settingsOpen: false,
        midiDebugOpen: false,
  } as iStateDawPage
}

export const getDB = ():any => {
    let raw = localStorage.getItem('DawPage') || "";
    let obj:iStateDawPage
    try {
        obj = JSON.parse('dddd')
    } catch (error) {
        let backupKeyName = `backup-db-${random(0,1000000)}`
        console.warn(`[DB] error when loading db, saving db in key ${backupKeyName} of localstorage and loading initial db:`, error);
        localStorage.setItem(backupKeyName, localStorage.getItem('DawPage') as string)
        obj = generateInitialDb()
    }
    // merge the result with initial db to avoid missing/deleted properties    
    let mergeObj = assign(generateInitialDb(), obj)

    return mergeObj
}
export const persistDB = (state:any) => {
    localStorage.setItem('DawPage', JSON.stringify(state))
    config.debug.dbManager && console.log('[DB] persistDB done');
}