const track1 = require('./Resources/Radio/zoha.mp3');
const track2 = require('./Resources/Radio/zoha2.mp3');
const track3 = require('./Resources/Radio/zoha3.mp3');
const track4 = require('./Resources/Radio/zoha4.mp3');
const track5 = require('./Resources/Radio/yarik1.mp3');
const track6 = require('./Resources/Radio/yarik2.mp3');
const track7 = require('./Resources/Radio/yarik3.mp3');
const track8 = require('./Resources/Radio/zoha5.mp3');
const track9 = require('./Resources/Radio/zoha6.mp3');
const track10 = require('./Resources/Radio/den1.mp3');

const bosstrack = require('./Resources/Radio/boss.mp3');

const end1 = require('./Resources/Sounds/end1.mp3');
const end2 = require('./Resources/Sounds/end2.mp3');
const end3 = require('./Resources/Sounds/end3.mp3');

const win = require('./Resources/Radio/win.mp3');

const switchs = require('./Resources/Sounds/switch.mp3');

class Radio {
    constructor() {
        this.Tracks = [new Audio(track1), new Audio(track2), new Audio(track3), new Audio(track4), new Audio(track5), new Audio(track6), new Audio(track7), new Audio(track8), new Audio(track9), new Audio(track10)];
        this.EndSounds = [new Audio(end1), new Audio(end2), new Audio(end3)];
        this.BossTrack = new Audio(bosstrack);
        this.SwitchSound = new Audio(switchs);
        this.WinSound = new Audio(win);
        this.Current = this.ChooseRandom();
        this.isPlaying = false;
    }

    ChooseRandom() {
        return Math.floor(Math.random() * this.Tracks.length);
    }

    PlayBoss(){
        this.Tracks.at(this.Current).pause();
        this.BossTrack.volume = 0.25;
        this.BossTrack.loop = true;
        this.BossTrack.play();
    }

    PlayEndSound() {
        let Num = Math.floor(Math.random() * this.EndSounds.length);
        this.EndSounds.at(Num).volume = 0.3;
        this.EndSounds.at(Num).play();
    }

    ReduceVolume(){
        this.Tracks.at(this.Current).volume = 0.1;
    }

    PlayWinSound(play) {
        if (play) {
            this.WinSound.currentTime = 0;
            this.WinSound.volume = 1;
            this.WinSound.play();
        }
        else {
            this.WinSound.pause();
        }
    }

    PlaySwitch() {
        this.SwitchSound.volume = 0.6;
        this.SwitchSound.play();
    }

    ToggleSomething() {
        this.Tracks.at(this.Current).loop = true;
        this.Tracks.at(this.Current).volume = 0.25;
        this.isPlaying = !this.isPlaying;

        if (this.isPlaying) {
            this.Tracks.at(this.Current).currentTime = 0;
            this.Tracks.at(this.Current).play();
        }
        else {
            this.BossTrack.pause();
            this.Tracks.at(this.Current).pause()
            this.Current = this.ChooseRandom();
            this.PlayEndSound();
        }
    }

    InitRadio() {
        if (!this.isPlaying)
            this.ToggleSomething();
    }
}

const GameRadio = new Radio();

module.exports = {
    GameRadio
}