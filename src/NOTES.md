I'm building a:
ThreeJS and ReactJS-powered project.
Using the ThreeJS codebase as a base to create a 3D game engine.
I have set the basics:
* Using react-three/fiber to handle the rendering and ThreeJS abstractions
    * Which should be abstracted again into this project if requirements changes, or augment react-three/fiber's own
* Environment, Plane, Sky, a Player, a few PositionalLights/DirectionalLights, a FloatingBox
* Using react-three/cannon for the physics engine, I want to have the Player be piloted by (forget the handling for the inputs as I'll figure that part out later) the user inputs so that 'FORWARD' means it'll move by some force toward the direction of the crosshair (basically raycasting from the camera)

The question is: How would I go about making it so that it kind of feels like piloting a natural "human"
    * never trips over its feet, or tumble very rarely unless really pushed at the "head", let's say
    * is allowed to go over obstacles, like a staircase "step" height
    * ... further tweaks will depend on what you would advise me to do so that it's performant and doable strictly using react, three, react-three/fiber, react-three/drei, react-three/cannon and zustand, mixing their APIs so that it's kind of a minimal abstraction over these libraries primitives

If you access my code, you can see that this code gets us somewhere already, as I'm already using ChatGPT to help me. I figure you can, too.

Let's build this thing.
