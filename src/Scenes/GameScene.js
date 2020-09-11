import Phaser from 'phaser';
import Player from '../Entities/Player';
import EnemyShipSmall from '../Entities/EnemyShipSmall';
import BonusLife from '../Entities/BonusLife';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }
  
  preload() {
    
    this.load.image('logo', 'assets/logo.png');
    this.load.image('sprBg0', 'assets/game/sprBg0.png');
    this.load.image('sprBg1', 'assets/game/sprBg1.png');
    this.load.spritesheet('sprExplosion', 'assets/game/sprExplosion.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('sprEnemy0', 'assets/game/sprEnemy0.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('sprEnemy1', 'assets/game/sprEnemy1.png');
    this.load.spritesheet('sprEnemy2', 'assets/game/sprEnemy2.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('sprLaserEnemy0', 'assets/game/sprLaserEnemy0.png');
    this.load.image('sprLaserPlayer', 'assets/game/sprLaserPlayer.png');
    this.load.spritesheet('sprPlayer', 'assets/game/sprPlayer.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('sprBonusLife', 'assets/game/sprBonusLife.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.audio('sndExplode0', 'assets/game/sndExplode0.wav');
    this.load.audio('sndExplode1', 'assets/game/sndExplode1.wav');
    this.load.audio('sndLaser', 'assets/game/sndLaser.wav');

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  create() {
    

    this.anims.create({
      key: 'sprEnemy0',
      frames: this.anims.generateFrameNumbers('sprEnemy0'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemy2',
      frames: this.anims.generateFrameNumbers('sprEnemy2'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion'),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: 'sprPlayer',
      frames: this.anims.generateFrameNumbers('sprPlayer'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprBonusLife',
      frames: this.anims.generateFrameNumbers('sprBonusLife'),
      frameRate: 10,
      repeat: -1,
    });

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
      ],
      laser: this.sound.add('sndLaser'),
    };

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayer',
    );

    this.playerLasers = this.add.group();
    this.enemyLasers = this.add.group();
    this.enemies = this.add.group();
    this.bonusLifes = this.add.group();

    this.player.setData('enemies', 0);

    this.player.setData('score', 0);
    const livesText = this.add.text(16, 16, 'level: 0', { fontSize: '16px', fill: '#FFF' });
    const scoreText = this.add.text(16, 32, 'score: 0', { fontSize: '16px', fill: '#FFF' });
    const levelText = this.add.text(16, 48, 'lives: 0', { fontSize: '16px', fill: '#FFF' });

    this.time.addEvent({
      delay: 500,
      callback: () => {
        const enemy = new EnemyShipSmall(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          0,
        );
        this.enemies.add(enemy);
        window.enemies = this.enemies.getChildren().length;
        window.lasers = this.enemyLasers.getChildren().length;
        this.player.setData('enemies', this.player.getData('enemies') + 1);
        this.player.setData('score', this.player.getData('score') + 1);
        scoreText.setText(`score: ${this.player.getData('score')}`);
        if (this.player.getData('enemies') > 10) {
          this.player.setData('enemies', 0);
          const bonuslife = new BonusLife(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
          bonuslife.setScale(1.5);
          this.bonusLifes.add(bonuslife);
        }
      },
      callbackScope: this,
      loop: true,
    });

    
  }

  update() {
    this.player.update();
    this.enemies.getChildren().forEach(e => {
      e.update();
      if (e && e.y > this.game.config.height - 10) {
        e.onDestroy();
        e.destroy();
      }
    });

    this.enemyLasers.getChildren().forEach(e => {
      if (e && e.y > this.game.config.height - 10) e.destroy();
    });

    this.playerLasers.getChildren().forEach(e => {
      if (e && e.y < 10) e.destroy();
    });

    this.bonusLifes.getChildren().forEach(e => {
      e.update();
      if (e && e.y > this.game.config.height - 10) {
        e.destroy();
      }
    });

    if (this.keyW.isDown) this.player.moveUp();
    if (this.keyS.isDown) this.player.moveDown();
    if (this.keyA.isDown) this.player.moveLeft();
    if (this.keyD.isDown) this.player.moveRight();

    if (this.keySpace.isDown) {
      this.player.setData('isShooting', true);
    } else {
      this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
      this.player.setData('isShooting', false);
    }
  }
}
