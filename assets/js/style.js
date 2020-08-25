


let classicPlayers = new Tone.Players({kick: "https://cdn.glitch.com/1575a522-36d9-4f64-b20a-e79e95084d78%2F32569__erh__indian-brass-pestle-lo.wav?v=1598375651970t",
hatClosed: "https://cdn.glitch.com/1575a522-36d9-4f64-b20a-e79e95084d78%2F85794__sandyrb__native-flute-figure-05.wav?v=1598376180986",
hatOpen: "https://cdn.glitch.com/1575a522-36d9-4f64-b20a-e79e95084d78%2F47665__arnaud-coutancier__tibetan-bowl-bol-tibet-attac.wav?v=1598375947315",
snare: "https://teropa.info/ext-assets/drumkit/snare3.mp3",
tomLow: "https://teropa.info/ext-assets/drumkit/tomLow.mp3",
tomMid: "https://teropa.info/ext-assets/drumkit/tomMid.mp3",
tomHigh: "https://teropa.info/ext-assets/drumkit/tomHigh.mp3",
ride: "https://cdn.glitch.com/1575a522-36d9-4f64-b20a-e79e95084d78%2F380750__anjds__veena-classical.wav?v=1598376365808",
crash: " https://cdn.glitch.com/1575a522-36d9-4f64-b20a-e79e95084d78%2F403661__jdagenet__processed-sitar-tone-1.wav?v=1598374632496",
// b:"https://cdn.glitch.com/0ecfa1a9-99ca-4c0e-9798-bcd165a19bfc%2Fzimbalom.wav?v=1597245767265"
  
}
  ).toDestination()
let drumPattern=[
  ["0:0:0", "kick"],
  ["0:1:0", "hatClosed"],
  ["0:1:2", "crash"],
  ["0:2:0", "ride"],
  ["0:3:0", "hatClosed"],
  ["1:0:0", "kick"],
  ["1:1:0", "hatClosed"],
  ["1:2:0", "kick"],
  ["1:2:3", "ride"],
  ["1:3:0", "hatClosed"],
  ["1:3:2", "kick"],
  ["1:3:2", "hatOpen"],
];
let midiDrum=new Map([
  [36, "kick"],
  [37, "snare"],
  [38, "snare"],
  [40, "snare"],
  [42, "hatClosed"],
  [22, "hatClosed"],
  [44, "hatClosed"],
  [46, "hatOpen"],
  [26, "hatOpen"],
  [43, "tomLow"],
  [58, "tomLow"],
  [47, "tomMid"],
  [45, "tomMid"],
  [50, "tomHigh"],
  [48, "tomHigh"],
  [49, "crash"],
  [52, "crash"],
  [55, "crash"],
  [57, "crash"],
  [51, "ride"],
  [53, "ride"],
  [59, "ride"],
])
let classicPart = new Tone.Part((time, classic) => {
  classicPlayers.player(classic).start(time);
}, drumPattern).start();
classicPart.loop = true;
classicPart.loopStart = 0;
classicPart.loopEnd = '2m';
//time can be expressed :"1n","2n"....

let leadSampler=new Tone.Sampler({urls:{
  'C2':'https://cdn.glitch.com/1575a522-36d9-4f64-b20a-e79e95084d78%2F47665__arnaud-coutancier__tibetan-bowl-bol-tibet-attac.wav?v=1598375947315'
  
}, 
volume: 4
})//.toDestination()

let leadPattern=[
  ["0:0:0", "E1"],
  ["0:1:0","E1"]
  ,];

let leadPart=new Tone.Part((time,note)=>{
  leadSampler.triggerAttackRelease(note,"1n",time);
},leadPattern).start();
leadSampler.loop=true;
leadSampler.loopStart=0;
leadSampler.loopEnd='2n';

let leadDelay = new Tone.PingPongDelay('8n.', 0.3)
leadSampler.connect(leadDelay);
leadDelay.toDestination();
let leadReverb = new Tone.Reverb({decay: 3, wet: 0.5})
  .toDestination();
leadSampler.connect(leadReverb);



  let bass= new Tone.Synth({ oscillator:{type:"sawtooth"}, volume:-7});

  let bassFilter=new Tone.Filter({type:"lowpass",frequency:2000});

  bass.connect(bassFilter);
  bassFilter.toDestination();
  document.getElementById("bass").onclick=()=>{
  bass.triggerAttackRelease('C#2',0.1);
}

   let bassPattern=[
  ['0:1:0','C#2'],
  ['0:2:0','C#2'],
  ['1:3:1','E1'],
  ];
  
  //c
  let bassPart= new Tone.Part((time,note)=>{
    bass.triggerAttackRelease(note,0.1,time); 
    //volume:-1;     
  },bassPattern).start();
  
  bassPart.loop=true;
  bassPart.loopStart=0;
  bassPart.loopEnd='1m';

  document.getElementById("start").onclick = async () => {
    await Tone.start();
    Tone.Transport.start();
  }
  document.getElementById("stop").onclick = async () => {
     // await Tone.start();
      Tone.Transport.stop();
      //lead.Tone.Transport.stop();
    }
    document.getElementById("bpm").oninput=(evt)=>{
      let BPM=+evt.target.value;
      Tone.Transport.bpm.value=BPM;
  }

  let sequencer = new Nexus.Sequencer('#sequencer',{
    columns:32,
    rows:12,
    size:[1300,300]
  })
  new Tone.Loop((time)=>{
    Tone.Draw.schedule(()=>sequencer.next(),time)
  },'16n').start();
  
  let sequencerRows=['C#3','E3','B3','G#3','C#2','E2','B2','G#2','C#1','E1','B1','G#1'];
  sequencer.on('change',({column,row,state})=>{
    let time={'16n':column};
    let note=sequencerRows[row];
    if(state){
      leadPart.add(time,note);
    }
    else{
      leadPart.remove(time,note);
    }
  });
 //magenta stuff
let melodyRnn=new music_rnn.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/chord_pitches_improv');
let melodyRnnLoaded=melodyRnn.initialize()
document.getElementById('generate-melody').onclick=async()=>{
await melodyRnnLoaded;
  let seed={
    notes:[
      {pitch:Tone.Frequency('C#3').toMidi(),quantizedStartStep:0,quantizedEndStep:4}
    ],
    totalQuantizedSteps:4,
    quantizationInfo:{stepsPerQuarter:4}
    
  };
  let steps=28;
  let temperature=1.2;
  let chordProgression=['C#m7'];
  let result=await melodyRnn.continueSequence(seed,steps,temperature,chordProgression);
  let combined = core.sequences.concatenate([seed,result]);
  sequencer.matrix.populate.all([0]);
  for(let note of combined.notes){
    let column=note.quantizedStartStep;
    let noteName=Tone.Frequency(note.pitch,'midi').toNote();
    let row=sequencerRows.indexOf(noteName);
  
  if(row>=0){
    sequencer.matrix.set.cell(column,row,1);
  }}
  console.log(combined);
  
}