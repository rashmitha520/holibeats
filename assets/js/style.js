let raag = new Tone.Players({
a:"https://cdn.glitch.com/0ecfa1a9-99ca-4c0e-9798-bcd165a19bfc%2F360771__sankalp__kampitam-gamaka-in-carnatic-music.wav?v=1598627867571",


}).toDestination()
let raagPattern=[
  ["0:1:0","a"],
]



document.getElementById("raag").onclick = async () => {
  let raagPart = new Tone.Part((time, voice) => {
    raag.player(voice).start(time);
  }, raagPattern).start();
  raagPart.loop = true;
  raagPart.loopStart = 0;
  raagPart.loopEnd = '1m';
}

let classicPlayers = new Tone.Players({
kick: "https://cdn.glitch.com/1575a522-36d9-4f64-b20a-e79e95084d78%2F32569__erh__indian-brass-pestle-lo.wav?v=1598375651970t",
hatClosed: "https://cdn.glitch.com/1575a522-36d9-4f64-b20a-e79e95084d78%2F85794__sandyrb__native-flute-figure-05.wav?v=1598376180986",
hatOpen: "https://cdn.glitch.com/1575a522-36d9-4f64-b20a-e79e95084d78%2F47665__arnaud-coutancier__tibetan-bowl-bol-tibet-attac.wav?v=1598375947315",
ride: "https://cdn.glitch.com/0ecfa1a9-99ca-4c0e-9798-bcd165a19bfc%2F147896__mannhawks__mark-sitar-03.wav?v=1598446386701",
crash: " https://cdn.glitch.com/1575a522-36d9-4f64-b20a-e79e95084d78%2F403661__jdagenet__processed-sitar-tone-1.wav?v=1598374632496",
// b:"https://cdn.glitch.com/0ecfa1a9-99ca-4c0e-9798-bcd165a19bfc%2Fzimbalom.wav?v=1597245767265"
  
}
  ).toDestination()
let classicPattern=[
  ["0:0:0","hatOpen"],
  ["1:0:0", "kick"],
  ["0:0:0", "ride"],
  ["0:0:2", "crash"],
  ["0:0:1", "ride"],
  ["1:2:0", "hatClosed"],
  ["1:0:9", "kick"],
  ["1:0:0", "hatClosed"],
  ["1:2:0", "kick"],
  ["1:2:3", "ride"],
  ["1:0:0", "hatClosed"],
  ["1:3:2", "kick"],
  ["1:3:2", "hatOpen"],
];
//bg music on start
let leadSampler=new Tone.Sampler({urls:{
  'C2':'https://cdn.glitch.com/1575a522-36d9-4f64-b20a-e79e95084d78%2F47665__arnaud-coutancier__tibetan-bowl-bol-tibet-attac.wav?v=1598375947315',
  'C1':'https://cdn.glitch.com/0ecfa1a9-99ca-4c0e-9798-bcd165a19bfc%2F147896__mannhawks__mark-sitar-03.wav?v=1598446386701',
 // 'B1':'https://cdn.glitch.com/0ecfa1a9-99ca-4c0e-9798-bcd165a19bfc%2F427849__carloscarty__dizi-flute-03.wav?v=1598458872035',
  'A1': 'https://cdn.glitch.com/1575a522-36d9-4f64-b20a-e79e95084d78%2F85794__sandyrb__native-flute-figure-05.wav?v=1598376180986'
}, 
volume: 4
}).toDestination()

let leadPattern=[
  ["0:0:0", "E1"],
  ["0:1:0","E1"],
  ["1:2:5","C1"],
  ["2:2:5","B1"],
  ["3:2:5","A1"]
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


// for nature sounds.
const NatSampler = new Tone.Sampler({
	urls: {
    "C4": "C4.mp3",
		"D#4": "Ds4.mp3",
		"F#4": "Fs4.mp3",
		"A4": "A4.mp3",
	},
  release: 10,
 
	baseUrl: "https://cdn.glitch.com/0ecfa1a9-99ca-4c0e-9798-bcd165a19bfc%2F335992__inspectorj__waterfall-large-a.wav?v=1598548449034",
}).toDestination();

document.getElementById("nature").onclick=()=>{
  
 NatSampler.triggerAttackRelease(["A4", "B2", "C2"], 160);

}
const BirdSampler = new Tone.Sampler({
	urls: {
    "C4": "C4.mp3",
		"D#4": "Ds4.mp3",
		"F#4": "Fs4.mp3",
		"A4": "A4.mp3",
	},
  release: 1,
 
	baseUrl: "https://cdn.glitch.com/0ecfa1a9-99ca-4c0e-9798-bcd165a19bfc%2F122764__grigore__birds.wav?v=1598620012784",
}).toDestination();

document.getElementById("bird").onclick=()=>{
 
 BirdSampler.triggerAttackRelease(["A4", "B2", "C2"], 160);

}


let classicPart = new Tone.Part((time, classic) => {
  classicPlayers.player(classic).start(time);
}, classicPattern).start();
classicPart.loop = true;
classicPart.loopStart = 0;
classicPart.loopEnd = '1m';
//time can be expressed :"1n","2n"....*/



  
 

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
 /*//magenta stuff
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
  
}*/