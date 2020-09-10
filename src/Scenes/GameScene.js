import Phaser from 'phaser';
import Player from '../Entities/Player';

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
    this.load.audio('sndExplode0', 'assets/game/sndExplode0.wav');
    this.load.audio('sndExplode1', 'assets/game/sndExplode1.wav');
    this.load.audio('sndLaser', 'assets/game/sndLaser.wav');
  }

  create() {
    this.add.image(400, 300, 'logo');

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
  }
}
