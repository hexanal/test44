// ecs.js
import { World, System, Component, Types } from 'ecsy';

// Define components
class Position extends Component {
  static schema = {
    x: { type: Types.Number, default: 0 },
    y: { type: Types.Number, default: 0 },
    z: { type: Types.Number, default: 0 }
  };
}

class Rotation extends Component {
  static schema = {
    x: { type: Types.Number, default: 0 },
    y: { type: Types.Number, default: 0 },
    z: { type: Types.Number, default: 0 }
  };
}

// Define a system
class MovementSystem extends System {
  execute(delta, time) {
    this.queries.moving.results.forEach(entity => {
      const position = entity.getComponent(Position);
      position.x += 0.01;
      position.y += 0.01;
      position.z += 0.01;
    });
  }
}

MovementSystem.queries = {
  moving: { components: [Position] }
};

// Create and configure the world
const world = new World();
world
  .registerComponent(Position)
  .registerComponent(Rotation)
  .registerSystem(MovementSystem);

export { world, Position, Rotation };
