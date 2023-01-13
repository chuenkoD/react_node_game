var intersects = require('intersects');
const { GameRadio } = require('./radio');
const death1 = require('./Resources/Sounds/den1.mp3');
const death2 = require('./Resources/Sounds/den2.mp3');
const death3 = require('./Resources/Sounds/den3.mp3');
const death4 = require('./Resources/Sounds/den4.mp3');
const death5 = require('./Resources/Sounds/den5.mp3');
const boss = require('./Resources/Sounds/boss.mp3');
const boss1 = require('./Resources/Sounds/boss1.mp3');
const boss2 = require('./Resources/Sounds/boss3.mp3');
const bossdefeated = require('./Resources/Sounds/bossdefeated.mp3');
const yarik = require('./Resources/Sounds/yarik.ogg');
const yarik2 = require('./Resources/Sounds/yarikboosted.mp3');
const yarik3 = require('./Resources/Sounds/shavuha.mp3');

const zoha1 = require('./Resources/Sounds/выстрел1.mp3');
const zoha2 = require('./Resources/Sounds/выстрел2.mp3');
const zoha3 = require('./Resources/Sounds/выстрел3.mp3');
const zoha4 = require('./Resources/Sounds/выстрел4.mp3');

const zohadamage1 = require('./Resources/Sounds/урон1.mp3');
const zohadamage2 = require('./Resources/Sounds/урон2.mp3');
const zohadamage3 = require('./Resources/Sounds/урон3.mp3');
const zohadamage4 = require('./Resources/Sounds/урон4.mp3');
const zohadamage5 = require('./Resources/Sounds/урон5.mp3');
const zohadamage6 = require('./Resources/Sounds/урон6.mp3');

const zohaevent1 = require('./Resources/Sounds/фуллтильт.mp3');
const zohaevent2 = require('./Resources/Sounds/Юнити.mp3');
const zohaevent3 = require('./Resources/Sounds/Появление.mp3');
const zohaevent4 = require('./Resources/Sounds/Таблетка.mp3');

const junkie = require('./Resources/Sounds/junkie.mp3');

const shavuha1 = require('./Resources/Sounds/shavuha1.mp3');
const shavuha2 = require('./Resources/Sounds/shavuha2.mp3');
const { saveResult } = require('./result');

const Cookies = require('js-cookie');

const DeadAnim = {
    Rotate: 0,
    Scale: 1,
    RotateReverse: 2,
    Fade: 3,
    ScaleUp: 4
}
const audios = [new Audio(death1), new Audio(death2), new Audio(death3), new Audio(death4), new Audio(death5)]
const shot = new Audio(yarik);
const shot2 = new Audio(yarik2);
const shot3 = new Audio(yarik3);
const needle = new Audio(junkie);
const bossArrival = [new Audio(boss), new Audio(boss1), new Audio(boss2)];
const shotshavuha = [new Audio(shavuha1), new Audio(shavuha2)];
const bossDefeated = new Audio(bossdefeated);
const zohashot = [new Audio(zoha1), new Audio(zoha2), new Audio(zoha3), new Audio(zoha4)];
const zohadamage = [new Audio(zohadamage1), new Audio(zohadamage2), new Audio(zohadamage3), new Audio(zohadamage4), new Audio(zohadamage5), new Audio(zohadamage6)];
const zohaevents = [new Audio(zohaevent1), new Audio(zohaevent2), new Audio(zohaevent3), new Audio(zohaevent4),];

class Game {
    constructor(drops, enemies, balls, spawnTime, points, killedCount) {
        this.Drops = drops;
        this.Enemies = enemies;
        this.Balls = balls;
        this.Allies = [];
        this.Bonuses = [];
        this.spawnTime = spawnTime;
        this.Points = points;
        this.killedCount = killedCount;
        this.Over = false;
        this.Started = false;
        this.BulletsCount = 0;
        this.ShavuhaCount = 0;
        this.OdnorazkaCount = 0;
        this.ZohaCount = 0;
        this.BusterTime = 0;
        this.TolikTime = 0;
        this.NeedleTime = 0;
        this.TimeAlive = 0;
        this.PillsCount = 0;
        this.UnityCount = 0;
        this.NeedlesCount = 0;
        this.Win = false;
        this.Boss = null;
        shot.volume = 0.35;
        shot3.volume = 0.35;
        needle.volume = 0.5;
        shotshavuha[0].volume = 0.35;
        shotshavuha[1].volume = 0.20;
        zohashot[0].volume = 0.25;
        zohashot[1].volume = 0.25;
        zohashot[2].volume = 0.25;
        zohashot[3].volume = 0.25;

        for (const item of zohadamage) {
            item.volume = 0.35;
        }
        for (const item of zohaevents) {
            item.volume = 0.54;
        }
    }

    InitGame() {
        if (!this.Started) {
            this.addNewEnemy();
            this.Started = true;

            let attempts = parseInt(Cookies.get('attempts'));
            Cookies.set('attempts', isNaN(attempts) ? 0 : attempts + 1);
        }
    }
}

class Enemy {
    constructor(pos) {
        let rand = Math.random();
        this.pos = pos;
        this.alive = true;
        this.deadAnim = Math.floor(rand * 5);
        this.direction = rand > 0.5 ? 1 : 2;
    }

    Die = () => {
        this.alive = false;
    }

    ChangeDirection = () => {
        this.direction === 1 ? this.direction = 2 : this.direction = 1;
    }

    CheckBorders() {
        let leftBorder = - window.innerWidth / 2;
        let rightBorder = window.innerWidth / 2 - window.innerWidth * 0.05;

        if (this.pos.x < leftBorder) {
            this.pos.x = leftBorder;
            this.ChangeDirection();
        }
        else if (this.pos.x > rightBorder) {
            this.pos.x = rightBorder;
            this.ChangeDirection();
        }
    }

    Move() {
        if (this.direction !== 0) {
            this.direction === 1 ? this.pos.x -= window.innerWidth / 1920 : this.pos.x += window.innerWidth / 1920;
        }
        this.CheckBorders();
    }
}

class Ally {
    constructor(pos) {
        this.pos = pos;
        this.hp = 260;
        this.alive = true;
        let rand = Math.random();
        this.deadAnim = Math.floor(rand * 5);
        this.direction = rand > 0.5 ? 1 : 2;
        this.BusterTime = 0;
    }
    ChangeDirection = () => {
        this.direction === 1 ? this.direction = 2 : this.direction = 1;
    }

    Update() {
        if (this.BusterTime > 0) {
            this.BusterTime--;
        }
    }

    CheckBorders() {
        let leftBorder = - window.innerWidth / 2;
        let rightBorder = window.innerWidth / 2 - window.innerWidth * 0.05;

        if (this.pos.x < leftBorder) {
            this.pos.x = leftBorder;
            this.ChangeDirection();
        }
        else if (this.pos.x > rightBorder) {
            this.pos.x = rightBorder;
            this.ChangeDirection();
        }
    }

    Move() {
        if (this.direction !== 0) {
            let speed = this.BusterTime === 0 ? window.innerWidth / 1000 : window.innerWidth / 600
            this.direction === 1 ? this.pos.x -= speed : this.pos.x += speed;
        }
        if (Math.random() < 0.001) {
            this.ChangeDirection();
        }
        this.CheckBorders();
    }
}

class Boss {
    constructor(pos) {
        this.pos = pos;
        this.alive = true;
        this.reloadtime = 25;
        let rand = Math.random();
        this.deadAnim = Math.floor(rand * 5);
        this.direction = rand > 0.5 ? 1 : 2;
        this.hp = 1500;
    }

    ChangeDirection = () => {
        this.direction === 1 ? this.direction = 2 : this.direction = 1;
    }

    CheckBorders() {
        let leftBorder = - window.innerWidth / 2;
        let rightBorder = window.innerWidth / 2 - window.innerWidth * 0.05;

        if (this.pos.x < leftBorder) {
            this.pos.x = leftBorder;
            this.ChangeDirection();
        }
        else if (this.pos.x > rightBorder) {
            this.pos.x = rightBorder;
            this.ChangeDirection();
        }
    }

    Move() {
        if (this.direction !== 0) {
            this.direction === 1 ? this.pos.x -= window.innerWidth / 1340 : this.pos.x += window.innerWidth / 1340;
        }
        if (Math.random() < 0.001) {
            this.ChangeDirection();
        }
        this.CheckBorders();
    }

    Shot() {
        let dir = Math.random();
        return new Ball({ x: this.pos.x + window.innerWidth * 0.01, y: window.innerHeight * 0.1 }, dir > 0.66 ? window.innerWidth * 0.001 : dir > 0.33 ? -(window.innerWidth * 0.001) : 0);
    }
}

class Drop {
    constructor(pos, type) {
        this.pos = pos;
        this.speed = window.innerHeight / 540;
        this.type = type;
    }
}

class Ball {
    constructor(pos, dir) {
        this.pos = pos;
        this.speed = window.innerHeight / 540;
        this.dir = dir === null ? null : dir;
    }
}

class Bonus {
    constructor(pos, type) {
        this.pos = pos;
        this.speed = window.innerHeight / 1080;
        this.type = type;
    }
}

module.exports = {
    Game,
    DeadAnim
}