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