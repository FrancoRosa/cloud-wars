import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import { hide } from '../js/dom';

export default class ScoresScene extends Phaser.Scene {
  constructor() {
    super('Scores');
  }

  preload() {
    hide();
    this.add.image(250, 100, 'logo');
  }

  create() {
  }
}
