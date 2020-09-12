import Phaser from 'phaser';
import Player from '../Entities/Player';
import EnemyShipSmall from '../Entities/EnemyShipSmall';
import BonusLife from '../Entities/BonusLife';
import scores from '../js/topscores';
import { hide } from '../js/dom';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    hide();
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
      level: this.sound.add('sndLevel'),
      life: this.sound.add('sndLife'),
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

    this.levelText = this.add.text(16, 8, `player: ${scores.user.user}`, { fontSize: '16px', fill: '#FFF' });
    this.levelText = this.add.text(16, 26, 'level: 1', { fontSize: '16px', fill: '#FFF' });
    this.livesText = this.add.text(16, 44, 'lifes: 3', { fontSize: '16px', fill: '#FFF' });
    this.scoreText = this.add.text(16, 62, 'score: 0', { fontSize: '16px', fill: '#FFF' });

    this.time.addEvent({
      delay: 1000 - (100 * this.getLevel() - 1),
      callback: () => {
        const enemy = new EnemyShipSmall(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          0,
        );
        this.enemies.add(enemy);
        window.enemies = this.enemies.getChildren().length;
        window.lasers = this.enemyLasers.getChildren().length;
        window.playerlasers = this.playerLasers.getChildren().length;
        this.addEnemies(1);
        this.addScore(1);
        if ((this.getEnemies() % 10) === 0) {
          const bonuslife = new BonusLife(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
          bonuslife.setScale(1.5);
          this.bonusLifes.add(bonuslife);
        }
        if ((this.getEnemies() % 20) === 0) this.levelUp();
      },
      callbackScope: this,
      loop: true,
    });

    this.physics.add.overlap(this.playerLasers, this.enemies, (player, enemy) => {
      if (!player.getData('isDead')
          && !enemy.getData('isDead')) {
        // player.explode(false);
        enemy.explode(true);
        this.addScore(10);
      }
    });

    this.physics.add.overlap(this.player, this.bonusLifes, (player, bonus) => {
      this.addLifes();
      if (!player.getData('isDead')) {
        bonus.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, (player, enemy) => {
      this.removeLifes();
      if (this.getLifes() < 0) {
        enemy.explode(true);
        if (!player.getData('isDead') && !enemy.getData('isDead')) {
          player.explode(true);
        }
      }
    });

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      this.removeLifes();
      if (!player.getData('isDead') && !enemy.getData('isDead')) {
        enemy.explode(true);
        if (this.getLifes() < 0) player.explode(true);
      }
    });

    this.physics.add.overlap(this.playerLasers, this.enemyLasers, (player, enemy) => {
      player.explode(true);
      enemy.explode(true);
      player.destroy();
      enemy.destroy();
    });
  }

  update() {
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

    if (!this.player.getData('isDead')) {
      this.player.update();

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
    } else {
      scores.score = this.getScore();
      this.scene.start('GameOver');
    }
  }

  getScore() {
    return this.player.getData('score');
  }

  addScore(value) {
    if (!this.player.getData('isDead')) {
      this.player.setData('score', this.getScore() + value);
      this.scoreText.setText(`score: ${this.player.getData('score')}`);
    }
  }

  getLifes() {
    return this.player.getData('lifes');
  }

  addLifes() {
    this.player.setData('lifes', this.getLifes() + 1);
    this.livesText.setText(`lifes: ${this.getLifes()}`);
    this.sfx.life.play();
    this.player.power();
  }

  removeLifes() {
    this.player.setData('lifes', this.getLifes() - 1);
    if (this.getLifes() >= 0) this.livesText.setText(`lifes: ${this.getLifes()}`);
  }

  getEnemies() {
    return this.player.getData('enemies');
  }

  addEnemies() {
    this.player.setData('enemies', this.getEnemies() + 1);
  }

  getLevel() {
    return this.player.getData('level');
  }

  levelUp() {
    this.player.setData('level', this.player.getData('level') + 1);
    this.levelText.setText(`level: ${this.player.getData('level')}`);
    this.sfx.level.play();
    this.player.power();
  }
}
