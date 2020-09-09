import 'phaser';
import logo_img from '../assets/logo.png';
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload () {
    // load images
    this.load.image('logo', logo_img);
  }

  create () {
    this.add.image(400, 300, 'logo');
  }
};