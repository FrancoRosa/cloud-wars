import Entity from './Entity';

export default class EnemyLaser extends Entity {
  constructor(scene, x, y, speed) {
    super(scene, x, y, 'sprLaserEnemy0');
    this.body.velocity.y = 200 + speed;
  }
}