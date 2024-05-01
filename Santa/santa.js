let startscene = new Phaser.Scene("start");
let gameScene = new Phaser.Scene("Santa");
let endscene = new Phaser.Scene("over");

let userInput;
let player;
let stairs;
let ice;
let platform;
let house;
let gifts;
let delivery = 3;
let timeText;
let timer;
let duration = 60;
let WHnearCat = false;
let GRnearCat = false;
let WHCat;
let GRCat;
let blueGicon;
let redGicon;
let yellowGicon;
let collectedGifts = {
    redB: false,
    blueB: false,
    yellowB: false
};
let nearHouse = {
    redH: false,
    blueH: false,
    yellowH: false
};
let isWin = false;
let BGAudio;
let collectFX;
let catFX;
let grCatFX;
let whCatFX;
let deliverFX;
let winFX;
let loseFX;

startscene.preload = function () {
    this.load.image("startscreen", "assets/startscreen.png");
};

startscene.create = function () {
    this.add.image(0, 0, "startscreen").setOrigin(0, 0);

    const startButton = this.add.text(450, 430, 'Start Game', { fontFamily: 'chrismas', fontSize: '50px', fill: '#000' })
        .setInteractive();

    startButton.on('pointerover', function () {
        startButton.setStyle({ fill: '#ff0' });
    });

    startButton.on('pointerout', function () {
        startButton.setStyle({ fill: '#000' });
    });

    startButton.on('pointerdown', () => {
        this.scene.start('Santa');
    });

};

endscene.preload = function () {
    this.load.image("gameover", "assets/lose.png");
    this.load.image("win", "assets/win.png");
};

endscene.create = function () {

    if (!isWin) {
        this.add.image(0, 0, "gameover").setOrigin(0, 0);
        const restartButton = this.add.text(520, 400, 'Restart Game', { fontFamily: 'chrismas', fontSize: '40px', fill: '#fff' })
            .setInteractive();

        
        restartButton.on('pointerover', () => {
            restartButton.setStyle({ fill: '#ff0' });
        });

        restartButton.on('pointerout', () => {
            restartButton.setStyle({ fill: '#fff' });
        });

        restartButton.on('pointerdown', () => {
            restartgame();
        });
    } else {
        this.add.image(0, 0, "win").setOrigin(0, 0);

       
        const restartButton = this.add.text(480, 510, 'Restart Game', { fontFamily: 'chrismas', fontSize: '30px', fill: '#000' })
            .setInteractive();
        
        restartButton.on('pointerover', () => {
            restartButton.setStyle({ fill: '#ff0' });
        });

        restartButton.on('pointerout', () => {
            restartButton.setStyle({ fill: '#000' });
        });

        restartButton.on('pointerdown', () => {
            restartgame();
        });
    }
};

gameScene.preload = function () {
    this.load.image("bg", "assets/bg.png");
    this.load.image("base", "assets/level.png");
    this.load.image("bridge", "assets/bridge.png");
    this.load.image("redH", "assets/red-house.png");
    this.load.image("yellowH", "assets/yellow-house.png");
    this.load.image("blueH", "assets/blue-house.png");
    this.load.image("bigplat", "assets/walk-plat.png");
    this.load.image("midplat", "assets/mid-plat.png");
    this.load.image("smallplat", "assets/small-plat.png");
    this.load.image("bigice", "assets/big-ice.png");
    this.load.image("smallice", "assets/small-ice.png");
    this.load.image("bigS", "assets/big-stair.png");
    this.load.image("smallS", "assets/small-stair.png");
    this.load.image("redB", "assets/red-gift.png");
    this.load.image("blueB", "assets/blue-gift.png");
    this.load.image("yellowB", "assets/yellow-gift.png");
    this.load.image("cloud", "assets/cloud.png");
    this.load.image("ice", "assets/break-ice.png");
    this.load.spritesheet("player", "assets/player.png", { frameWidth: 32.2, frameHeight: 30 });
    this.load.spritesheet("WHCat", "assets/whitecate.png", { frameWidth: 30.75, frameHeight: 22 });
    this.load.spritesheet("GRCat", "assets/cat.png", { frameWidth: 32, frameHeight: 23 });
    this.load.audio("collectFX", "assets/Collect.wav");
    this.load.audio("catFX", "assets/CatStanding.wav");
    this.load.audio("grCatFX", "assets/GRCatIdle.wav");
    this.load.audio("whCatFX", "assets/WHCatIdle.wav");
    this.load.audio("deliverFX", "assets/DeliverSound.wav");
    this.load.audio("winFX", "assets/Winning.wav");
    this.load.audio("loseFX", "assets/Losing.wav");
    this.load.audio("BGAudio", "assets/BackgroundMusic.mp3");
}

gameScene.create = function () {

    this.add.image(0, 0, "bg").setOrigin(0, 0);

    blueGicon = this.add.image(20, 10, "blueB").setOrigin(0, 0);
    blueGicon.visible = false;

    redGicon = this.add.image(50, 10, "redB").setOrigin(0, 0);
    redGicon.visible = false;
    yellowGicon = this.add.image(80, 10, "yellowB").setOrigin(0, 0);
    yellowGicon.visible = false;


    house = this.physics.add.staticGroup();
    house.create(0, 225, "redH").setOrigin(0, 0);
    house.create(505, 310, "blueH").setOrigin(0, 0);
    house.create(1000, 390, "yellowH").setOrigin(0, 0);

    platform = this.physics.add.staticGroup();
    platform.create(280, 410, "bridge").setOrigin(0, 0);

    this.add.image(0, 0, "base").setOrigin(0, 0);
    
    platform.create(0, 679, "bigplat").setOrigin(0, 0);
    platform.create(30, 617, "midplat").setOrigin(0, 0);
    platform.create(982, 648, "midplat").setOrigin(0, 0);
    platform.create(70, 557, "smallplat").setOrigin(0, 0);
    platform.create(0, 352, "bigice").setOrigin(0, 0);
    platform.create(500, 430, "bigice").setOrigin(0, 0);
    platform.create(982, 510, "bigice").setOrigin(0, 0);
    platform.create(217, 417, "smallice").setOrigin(0, 0);

    cloud1 = this.physics.add.image(250, 300, "cloud").setOrigin(0, 0).setDirectControl().setImmovable();
    cloud2 = this.physics.add.image(400, 230, "cloud").setOrigin(0, 0).setDirectControl().setImmovable();
    cloud3 = this.physics.add.image(750, 75, "cloud").setOrigin(0, 0).setDirectControl().setImmovable();
    cloud4 = this.physics.add.image(900, 150, "cloud").setOrigin(0, 0).setDirectControl().setImmovable();

    ice = this.physics.add.staticGroup();
    ice.create(760, 450, "ice").setOrigin(0, 0);
    ice.create(860, 500, "ice").setOrigin(0, 0);

    stairs = this.physics.add.staticGroup();
    stairs.create(100, 352, "bigS").setOrigin(0, 0);
    stairs.create(1050, 510, "smallS").setOrigin(0, 0);

    gifts = this.physics.add.staticGroup();
    gifts.create(780, 420, "redB").setOrigin(0, 0);
    gifts.create(930, 120, "yellowB").setOrigin(0, 0);
    gifts.create(520, 645, "blueB").setOrigin(0, 0);

    player = this.physics.add.sprite(400, 600, "player");
    WHCat = this.physics.add.sprite(1150, 640, "WHCat");
    GRCat = this.physics.add.sprite(195, 340, "GRCat");

    collectFX = this.sound.add("collectFX");
    catFX = this.sound.add("catFX");
    grCatFX = this.sound.add("grCatFX");
    whCatFX = this.sound.add("whCatFX");
    deliverFX = this.sound.add("deliverFX");
    winFX = this.sound.add("winFX");
    loseFX = this.sound.add("loseFX");
    BGAudio = this.sound.add("BGAudio", { loop: true });
    BGAudio.play();

    platform.children.entries.forEach((val) => {
        val.refreshBody();
    });

    gifts.children.entries.forEach((val) => {
        val.refreshBody();
    });

    stairs.children.entries.forEach((val) => {
        val.refreshBody();
    });

    ice.children.entries.forEach((val) => {
        val.refreshBody();
    });

    house.children.entries.forEach((val) => {
        val.refreshBody();
    });

    this.physics.add.collider(gifts, platform);
    this.physics.add.collider(WHCat, platform);
    this.physics.add.collider(GRCat, platform);
    this.physics.add.collider(
        player,
        platform,
        null,
        (player, platform) => {
            return player.body.velocity.y >= 0;
        });
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.physics.add.collider(player, [cloud1, cloud2, cloud3, cloud4]);
    this.physics.add.collider(player, ice, onIceOverlap, null, this);
    this.physics.add.overlap(player, WHCat, onWHCatOverlap, null, this);
    this.physics.add.overlap(player, GRCat, onGRCatOverlap, null, this);
    this.physics.add.overlap(player, gifts, onPlayerOverlap, null, this);
    this.physics.add.overlap(player, stairs, onStairsOverlap, null, this);
    this.physics.add.overlap(player, house, onNearHouse, null, this);

    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("player", { start: 20, end: 24 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("player", { start: 14, end: 19 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "jump",
        frames: this.anims.generateFrameNumbers("player", { start: 7, end: 13 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "idle",
        frames: this.anims.generateFrameNumbers("player", { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "WHcatIdle",
        frames: this.anims.generateFrameNumbers("WHCat", { start: 3 }),
        frameRate: 1,
        repeat: -1
    });

    this.anims.create({
        key: "WHcatPlayer",
        frames: this.anims.generateFrameNumbers("WHCat", { start: 0, end: 2 }),
        frameRate: 1,
        repeat: -1
    });

    this.anims.create({
        key: "GRcatIdle",
        frames: this.anims.generateFrameNumbers("GRCat", { start: 24, end: 27 }),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: "GRcatPlayer",
        frames: this.anims.generateFrameNumbers("GRCat", { start: 0, end: 23 }),
        frameRate: 5,
        repeat: -1
    });

    this.tweens.add({
        targets: cloud1,
        x: 350,
        duration: 4000,
        yoyo: true,
        repeat: -1
    });

    this.tweens.add({
        targets: cloud2,
        x: 575,
        duration: 2000,
        yoyo: true,
        repeat: -1
    });

    this.tweens.add({
        targets: cloud3,
        y: 240,
        duration: 2000,
        yoyo: true,
        repeat: -1
    });

    
    timeText = this.add.text(600, 16, 'Time: ' + duration, {fontFamily: 'chrismas', fontSize: '32px', fill: '#000' });

    timer = this.time.addEvent({
        delay: 1000,
        callback: updateTimer,
        callbackScope: this,
        loop: true
    });
}

gameScene.update = function () {

    if (delivery == 0 && duration > 0) {
        winFX.play();
        timer.paused = true;
        isWin = true;
        gameOver(gameScene);
    }

    userInput = this.input.keyboard.createCursorKeys();
    if (userInput.right.isDown) {
        player.anims.play("right", true);
        player.setVelocityX(100);

    } else if (userInput.left.isDown) {
        player.anims.play("left", true);
        player.setVelocityX(-100);
    } else {
        if (player.body.touching.down) {
            player.setVelocityX(0);
            player.play("idle", true);
        }

        if (nearHouse.redH && collectedGifts.redB && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('G'))) {
            deliveredRed();
        }
        else if (nearHouse.blueH && collectedGifts.blueB && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('G'))) {
            deliveredBlue();
        }
        else if (nearHouse.yellowH && collectedGifts.yellowB && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('G'))) {
            deliveredYellow();
        }
    }

    if(collectedGifts.blueB){
        blueGicon.visible = true;
    }
    if(collectedGifts.redB){
        redGicon.visible = true;
    }
    if(collectedGifts.yellowB){
        yellowGicon.visible = true;
    }

    if (userInput.space.isDown && player.body.touching.down) {
        player.play("jump");
        player.setVelocityY(-300);
    }

    if (WHnearCat == true) {
        WHCat.play("WHcatPlayer", true);
    }
    else {
        WHCat.play("WHcatIdle");
    }

    if (GRnearCat == true) {
        GRCat.play("GRcatPlayer", true);
    }
    else {
        GRCat.play("GRcatIdle", true);
    }
    nearHouse = {
        redH: false,
        blueH: false,
        yellowH: false
    };
}

function onPlayerOverlap(player, gifts) {
    const giftKey = gifts.texture.key;
    if (!collectedGifts[giftKey]) {
        collectFX.play();
        collectedGifts[giftKey] = true;
        gifts.destroy();
    }
}

function onIceOverlap(player, ice) {
    if (!ice.isDestroyed) {
        ice.isDestroyed = true;
        this.time.delayedCall(250, function () {
            ice.destroy();
        }, [], this);
    }
}

function onStairsOverlap(player, stairs) {
    if (userInput.up.isDown) {
        player.play("idle", true);
        player.setVelocityY(-100);
    }
}

function deliveredRed() {
    delivery -= 1;
    deliverFX.play();
    collectedGifts.redB = false;
    redGicon.visible = false;
}

function deliveredBlue() {
    delivery -= 1;
    deliverFX.play();
    collectedGifts.blueB = false;
    blueGicon.visible = false;
}

function deliveredYellow() {
    delivery -= 1;
    deliverFX.play();
    collectedGifts.yellowB = false;
    yellowGicon.visible = false;
}

function updateTimer() {
    if (duration > 0) {
        timer.elapsed = Math.floor(timer.getElapsedSeconds());
        timeText.setText('Time: ' + (duration - timer.elapsed));
        duration = duration - timer.elapsed;
    } else {
        loseFX.play();
        timer.paused = true;
        isWin = false;
        gameOver(gameScene);
    }
}

function gameOver(gameScene) {
    gameScene.scene.start("over");
}

function onNearHouse(player, house) {
    const houseKey = house.texture.key;
    if (!nearHouse[houseKey]) {
        nearHouse[houseKey] = true;
    }
}

function onWHCatOverlap(player, WHCat) {
    WHnearCat = true;
    whCatFX.play();
    this.time.delayedCall(3000, () => {
        WHnearCat = false;
    });
}

function onGRCatOverlap(player, GRCat) {
    GRnearCat = true;
    grCatFX.play();
    this.time.delayedCall(4800, () => {
        GRnearCat = false;
    });
}

function restartgame() {

    gameScene.scene.stop('start');
    gameScene.scene.stop('Santa');
    gameScene.scene.stop('over');

    gameScene.anims.anims.clear();
    BGAudio.stop();
    collectedGifts = {
        redB: false,
        blueB: false,
        yellowB: false
    };
    delivery = 3;

    timer.remove(false);
    duration = 60;
    
    gameScene.scene.start('Santa');
}

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scene: [startscene, gameScene, endscene],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 500 },
           // debug: true
        }
    },
    audio: {
        disableHTMLAudio: true
    }
}

let game = new Phaser.Game(config);