// Assume we have a model with multiple animations
const mixer = new THREE.AnimationMixer(model);

// Create AnimationActions for different animations
const idleAction = mixer.clipAction(model.animations[0]);
const walkAction = mixer.clipAction(model.animations[1]);
const runAction = mixer.clipAction(model.animations[2]);

// Set up initial state
idleAction.play();

// Function to transition between animations
function transitionTo(newAction, duration = 0.5) {
  const oldAction = mixer.clipAction(model.animations.find(clip => clip.isRunning()));
  newAction.reset();
  newAction.setLoop(THREE.LoopRepeat);
  newAction.play();
  newAction.crossFadeFrom(oldAction, duration);
}

// Example of blending from idle to walk
transitionTo(walkAction);

// Update the mixer in the animation loop
function animate(time) {
  mixer.update(clock.getDelta());
  requestAnimationFrame(animate);
}
animate();
