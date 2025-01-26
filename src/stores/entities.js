import { createWorld, addEntity, addComponent } from 'bitecs';
import { Position, Rotation, Scale } from '../pages/components';

const world = createWorld();

const createBoxEntity = (x, y, z, rx, ry, rz, sx, sy, sz) => {
  const entity = addEntity(world);
  addComponent(world, Position, entity);
  addComponent(world, Rotation, entity);
  addComponent(world, Scale, entity);

  Position.x[entity] = x;
  Position.y[entity] = y;
  Position.z[entity] = z;

  Rotation.x[entity] = rx;
  Rotation.y[entity] = ry;
  Rotation.z[entity] = rz;

  Scale.x[entity] = sx;
  Scale.y[entity] = sy;
  Scale.z[entity] = sz;

  return entity;
};

const box1 = createBoxEntity(0, 0, 0, 0, 0, 0, 1, 1, 1);
const box2 = createBoxEntity(2, 0, 0, 0, 0, 0, 1, 1, 1);
const box3 = createBoxEntity(-2, 0, 0, 0, 0, 0, 1, 1, 1);

export { world, box1, box2, box3 };