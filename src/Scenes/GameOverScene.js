import Phaser from 'phaser';
import scores from '../js/topscores';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  preload() {
    this.add.image(250, 200, 'logo');
  }

  create() {
    // this.scene.start('Preloader');
    this.finalScoreText = this.add.text(16, 32, `score: ${scores.score}`, { fontSize: '16px', fill: '#FFF' });
  }
}