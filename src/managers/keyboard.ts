export const idKeyToNote = (note: number) => {
    let octaveLength = 12
    let currentOctave = Math.round(note/octaveLength) + 1
    let currentNoteId = note % octaveLength
    let notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
    let res = `${notes[currentNoteId]}${currentOctave}`
    return res
}