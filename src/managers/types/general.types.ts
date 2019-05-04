export type iPlayType = 'attack' | 'release'

export type iToneType = 'pattern'|'event'|'unknown'

export interface iProcessedMidiInfos {
    type?:iPlayType, 
    note?:string, 
    power?:number,
    rawNote?: number
}