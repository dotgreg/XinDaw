export const idKeyToNote = (note: number) => {
    let octaveLength = 12
    let currentOctave = Math.round((note-6)/octaveLength) + 1
    let currentNoteId = note % octaveLength
    // let notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
    let notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
    let res = `${notes[currentNoteId]}${currentOctave}`
    console.log(note, res);
    
    return res
}

// 0 => c0
// 1
// 2
// 3
// 4
// 5
// 6
// 7