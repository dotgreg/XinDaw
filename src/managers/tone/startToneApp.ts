import Tone from 'tone'

export const startToneApp = () => {
    let tone = new Tone()
    Tone.Transport.start('+0.1')
    Tone.Transport.loopEnd = '2m'
    Tone.Transport.loop = true
    // @ts-ignore
    window.Tone = Tone

    Tone.context.latencyHint = "interactive"
}