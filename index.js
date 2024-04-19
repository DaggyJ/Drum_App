const keys = document.querySelectorAll(".key");
const volumeControl = document.getElementById ("volumeControl");
const playButton = document.getElementById ("playButton");
const recordButton = document.getElementById ("recordButton");
const clearButton = document.getElementById ("clearButton");
const confirmClearDialog = document.getElementById ("confirm-clear-dialog");
const cancelBtn = document.getElementById ("cancel-btn");
const discardBtn = document.getElementById ("discard-btn");

let recordedSequence = [];
let isRecording = false;
const handleKeyPress = (e) => {
    const key = e.keyCode;
    const audio = document.querySelector(`audio[data-key= "${key}"]`);

    //console.log(audio);
    const keyElement = document.querySelector(`.key[data-key= "${key}"]`);
    //console.log(keyElement);
    if (!audio) return;
    audio.currentTime = 0; //restartd the audio
    audio.play();
; 
    keyElement.classList.add("playing");
    //keyElement.classList.remove("playing");

    if(isRecording){
        recordedSequence.push({
            key,
            time: e.timeStamp,
        });
};

    console.log(recordedSequence);
};
function removeTransition(e) {
//const removeTransition = (e) => {
    //console.log(e);
    if(e.propertyName !== "transform") return;
    //console.log(this);
    this.classList.remove("playing");
};

const adjustvolume = () => {
    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach(audio=>{
        //console.log(volumeControl.value)
        audio.volume = volumeControl.value;
    });
};

const playRecording = async () => {
    for(const record of recordedSequence){
        const audio = document.querySelector(`audio[data-key= "${record.key}"]`);
        const keyElement = document.querySelector(`.key[data-key= "${record.key}"]`);

    if (!audio) continue; //skips the audio
    audio.currentTime = 0; 
    audio.play();
    
    keyElement.classList.add("playing");
    await new Promise(resolve => {
        audio.onended = () => {
            keyElement.classList.remove("playing");
            resolve();
        };

    });

    };  
};

const startRecording = () => {
    isRecording = true;
  };

const clearRecording = () => {
    recordedSequence = [];
    console.log(recordedSequence);
};
playButton.addEventListener("click", playRecording);
volumeControl.addEventListener("input", adjustvolume);
recordButton.addEventListener("click", startRecording);
clearButton.addEventListener("click", /*clearRecording*/ () =>{
    confirmClearDialog.showModal();

});

cancelBtn.addEventListener("click", () =>{
    confirmClearDialog.close();
})

discardBtn.addEventListener("click", ()=>{
    confirmClearDialog.close();
     recordedSequence = [];
})




keys.forEach(key=>{
    key.addEventListener("transitionend",removeTransition);
});
window.addEventListener("keydown", handleKeyPress);