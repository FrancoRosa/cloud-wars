import Entity from './Entity';

export default class PlayerLaser extends Entity {
  constructor(scene, x, y, angle) {
    super(scene, x, y, 'sprLaserPlayer');
    this.body.velocity.y = -300;
    if (angle) {
      this.body.velocity.x = -300 * angle;
    }
  }
}
