export const sounds:any[] = [
    {
        id: 'sound1',
        name: 'sound1',
        code:`
            let freeverb = new Tone.Freeverb().toMaster();
            freeverb.dampening.value = 1986;
            let synth = new Tone.AMSynth().connect(freeverb);
            
            let c = Tone.Transport.schedule(time => {
                synth.triggerAttackRelease('E3', '2n', time)
                console.log('trigger  ')
            }, 0)
            
            return { t: 'event', c: c}
        `
    },
    {
        id: 'sound3',
        name: 'sound3',
        code:`
            var vol = new Tone.Volume(10).toMaster();
            let scale = ["B3", "C#4", "D#4", "F#4", "G#4"]
            var synth = new Tone.FMSynth().chain(vol);
            var c = new Tone.Pattern(function(time, note){
            console.log(note, '222');
            synth.triggerAttackRelease(note, '4n', time)
            }, scale, "upDown");
            c.interval = "8n";
        `
    },
    {
        id: 'sound4',
        name: 'sound4',
        code:`
            var vol = new Tone.Volume(10).toMaster();
            let scale = ["B3", "C#4", "D#4", "F#4", "G#4"]
            var synth = new Tone.FMSynth().chain(vol);
            var c = new Tone.Pattern(function(time, note){
            console.log(note, '222');
            synth.triggerAttackRelease(note, '4n', time)
            }, scale, "upDown");
            c.interval = "8n";
            var o = {
                vars: [
                    ['vol',vol.volume, -100, 100]
                ]
            }
        `
    },
    {
        id: 'sound2',
        name: 'sound2',
        code: `
            //let freeverb = new Tone.Freeverb().toMaster();
            //freeverb.dampening.value = 1000;
            var vol = new Tone.Volume(-100).toMaster();
            
            //let scale = teoria.scale(teoria.note('b3'),'majorpentatonic').notes().map(n => n.scientific())
            let scale = ["B3", "C#4", "D#4", "F#4", "G#4"]
            //console.log(scale)
            // scale = _.shuffle(scale)
            
            options = {
                harmonicity  : 3 ,
                modulationIndex  : 10 ,
                detune  : 0 ,
                oscillator  : {
                    type  : 'cos'
            }  ,
            envelope  : {
            attack  : 0.1 ,
            decay  : 0.5 ,
            sustain  : 0 ,
            release  : 0
            }  ,
            modulation  : {
            type  : 'triangle'
            }  ,
            modulationEnvelope  : {
            attack  : 0.5 ,
            decay  : 0 ,
            sustain  : 1 ,
            release  : 0.5
            }
            }
            
            var synth = new Tone.FMSynth(options).chain(vol);
            
            var c = new Tone.Pattern(function(time, note){
                //console.log(note);
                synth.triggerAttackRelease(note, '4n', time)
            }, scale, "upDown");
            c.interval = "8n";
            
            var o = { 
            vars: [
                ['vol', vol.volume, -100, 100,1,-17],
            ] 
            }
        `
    }
]


// var vol = new Tone.Volume(10).toMaster();
// let scale = ["B3", "C#4", "D#4", "F#4", "G#4"]
// var synth = new Tone.FMSynth().chain(vol);
// var c = new Tone.Pattern(function(time, note){
//   console.log(note, '222');
//   synth.triggerAttackRelease(note, '4n', time)
// }, scale, "upDown");
// c.interval = "8n";
// var o = {
// 	vars: [
//     	['vol', vol.volume,50,-100,100]
//     ]
// }


// => scroller songs
// controller id: 24, value: 65
// controller id: 24, value: 63
// => button
// controller id: 44, value: 0
// controller id: 44, value: 127
// controller id: 44, value: 0
// controller id: 44, value: 127
// => simple knob
// controller id: 48, value: 39
// controller id: 48, value: 43
// controller id: 48, value: 53



// => scroller songs
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 65

// => button
// controller id: 44, value: 0
// controller id: 44, value: 127
// controller id: 45, value: 0
// controller id: 45, value: 127
// controller id: 45, value: 0
// controller id: 45, value: 127
// controller id: 46, value: 0
// controller id: 46, value: 127
// controller id: 47, value: 0
// controller id: 47, value: 127
// controller id: 47, value: 0
// controller id: 47, value: 127
// controller id: 47, value: 0
// controller id: 47, value: 127
// controller id: 47, value: 0
// controller id: 47, value: 127
// controller id: 47, value: 0
// controller id: 47, value: 127
// controller id: 50, value: 0

// => simple knob
// controller id: 50, value: 127
// controller id: 48, value: 39
// controller id: 48, value: 43
// controller id: 48, value: 53
// controller id: 48, value: 64
// controller id: 48, value: 67
// controller id: 48, value: 69
// controller id: 48, value: 74
// controller id: 48, value: 81
// controller id: 48, value: 87
// controller id: 48, value: 92
// controller id: 48, value: 101
// controller id: 48, value: 112
// controller id: 48, value: 123
// controller id: 48, value: 127
// controller id: 48, value: 125
// controller id: 48, value: 115
// controller id: 48, value: 100
// controller id: 48, value: 81
// controller id: 48, value: 64
// controller id: 48, value: 61
// controller id: 48, value: 51
// controller id: 48, value: 42
// controller id: 48, value: 34
// controller id: 48, value: 27
// controller id: 48, value: 20
// controller id: 48, value: 15
// controller id: 48, value: 9
// controller id: 48, value: 4
// controller id: 48, value: 0
// controller id: 48, value: 5
// controller id: 48, value: 16
// controller id: 48, value: 28
// controller id: 48, value: 39
// controller id: 48, value: 50
// controller id: 48, value: 62
// controller id: 48, value: 64
// controller id: 48, value: 73
// controller id: 48, value: 83
// controller id: 48, value: 91
// controller id: 48, value: 96
// controller id: 48, value: 100
// controller id: 48, value: 102
// controller id: 48, value: 99
// controller id: 48, value: 96
// controller id: 48, value: 92
// controller id: 48, value: 89
// controller id: 48, value: 87
// controller id: 48, value: 85
// controller id: 48, value: 83
// controller id: 48, value: 82
// controller id: 48, value: 81
// controller id: 48, value: 78
// controller id: 48, value: 71
// controller id: 48, value: 64
// controller id: 48, value: 63
// controller id: 48, value: 51
// controller id: 48, value: 45
// controller id: 48, value: 41
// controller id: 48, value: 38
// controller id: 16, value: 63
// controller id: 16, value: 63
// controller id: 16, value: 63
// controller id: 16, value: 63
// controller id: 16, value: 65
// controller id: 16, value: 65
// controller id: 16, value: 65
// controller id: 16, value: 65
// controller id: 16, value: 65
// controller id: 16, value: 63
// controller id: 16, value: 63
// controller id: 16, value: 63
// controller id: 16, value: 63
// controller id: 16, value: 63
// controller id: 16, value: 63
// controller id: 16, value: 63
// controller id: 16, value: 65
// controller id: 16, value: 65
// controller id: 16, value: 65
// controller id: 16, value: 65
// controller id: 118, value: 0
// controller id: 54, value: 2
// controller id: 118, value: 32
// controller id: 54, value: 2
// controller id: 55, value: 0
// controller id: 55, value: 1
// controller id: 55, value: 2
// controller id: 55, value: 4
// controller id: 55, value: 6
// controller id: 55, value: 7
// controller id: 55, value: 9
// controller id: 55, value: 10
// controller id: 55, value: 11
// controller id: 55, value: 12
// controller id: 55, value: 13
// controller id: 55, value: 14
// controller id: 55, value: 15
// controller id: 55, value: 16
// controller id: 55, value: 17
// controller id: 55, value: 19
// controller id: 55, value: 20
// controller id: 55, value: 21
// controller id: 55, value: 22
// controller id: 55, value: 23
// controller id: 55, value: 24
// controller id: 55, value: 25
// controller id: 55, value: 26
// controller id: 55, value: 27
// controller id: 55, value: 28
// controller id: 55, value: 30
// controller id: 55, value: 29
// controller id: 55, value: 28
// controller id: 55, value: 26
// controller id: 55, value: 24
// controller id: 55, value: 23
// controller id: 55, value: 22
// controller id: 55, value: 21
// controller id: 55, value: 20
// controller id: 55, value: 19
// controller id: 55, value: 18
// controller id: 55, value: 17
// controller id: 55, value: 16
// controller id: 55, value: 15
// controller id: 55, value: 14
// controller id: 55, value: 13
// controller id: 55, value: 12
// controller id: 55, value: 11
// controller id: 55, value: 10
// controller id: 55, value: 9
// controller id: 55, value: 8
// controller id: 55, value: 7
// controller id: 55, value: 6
// controller id: 55, value: 5
// controller id: 55, value: 4
// controller id: 55, value: 2
// controller id: 24, value: 63
// controller id: 24, value: 63
// controller id: 24, value: 63
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 63
// controller id: 24, value: 63
// controller id: 24, value: 63
// controller id: 24, value: 63
// controller id: 24, value: 63
// controller id: 24, value: 63
// controller id: 24, value: 63
// controller id: 24, value: 63
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 63
// controller id: 24, value: 63
// controller id: 24, value: 63
// controller id: 24, value: 63
// controller id: 24, value: 63
// controller id: 24, value: 63
// controller id: 24, value: 63
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 65
// controller id: 24, value: 63
// controller id: 24, value: 63
// controller id: 24, value: 63
// controller id: 24, value: 63
// controller id: 24, value: 63
// controller id: 24, value: 63
// controller id: 32, value: 65
// controller id: 32, value: 65
// controller id: 32, value: 65
// controller id: 32, value: 65
// controller id: 32, value: 65
// controller id: 32, value: 65
// controller id: 32, value: 66
// controller id: 32, value: 65
// controller id: 32, value: 65
// controller id: 32, value: 67
// controller id: 32, value: 66
// controller id: 32, value: 66
// controller id: 32, value: 65
// controller id: 32, value: 67
// controller id: 32, value: 68
// controller id: 32, value: 67
// controller id: 32, value: 69
// controller id: 32, value: 68
// controller id: 32, value: 68
// controller id: 32, value: 69
// controller id: 32, value: 69
// controller id: 32, value: 70
// controller id: 32, value: 68
// controller id: 32, value: 68
// controller id: 32, value: 68
// controller id: 32, value: 68
// controller id: 32, value: 67
// controller id: 32, value: 66
// controller id: 32, value: 66
// controller id: 32, value: 65
// controller id: 32, value: 65
// controller id: 32, value: 65
// controller id: 32, value: 65
// controller id: 32, value: 63
// controller id: 32, value: 63
// controller id: 32, value: 63
// controller id: 32, value: 63
// controller id: 32, value: 61
// controller id: 32, value: 62
// controller id: 32, value: 61
// controller id: 32, value: 61
// controller id: 32, value: 60
// controller id: 32, value: 61
// controller id: 32, value: 61
// controller id: 32, value: 62
// controller id: 32, value: 63
// controller id: 32, value: 62
// controller id: 32, value: 63
// controller id: 32, value: 63
// controller id: 32, value: 62
// controller id: 32, value: 63
// controller id: 32, value: 61
// controller id: 32, value: 63
// controller id: 32, value: 61
// controller id: 32, value: 62
// controller id: 32, value: 61
// controller id: 32, value: 60
// controller id: 32, value: 60
// controller id: 32, value: 60
// controller id: 32, value: 58
// controller id: 32, value: 58
// controller id: 32, value: 58
// controller id: 32, value: 58
// controller id: 32, value: 59
// controller id: 32, value: 58
// controller id: 32, value: 59
// controller id: 32, value: 60
// controller id: 32, value: 60
// controller id: 32, value: 60
// controller id: 32, value: 62
// controller id: 32, value: 62
// controller id: 32, value: 62
// controller id: 32, value: 62
// controller id: 32, value: 63
// controller id: 32, value: 63
// controller id: 32, value: 65
// Connected first input: Reloop BeatMix
// Found 1 MIDI input(s)
// 50
// Parts Manage