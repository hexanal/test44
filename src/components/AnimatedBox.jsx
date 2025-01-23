import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function AnimatedBox() {
  const meshRef = useRef()
  const mixerRef = useRef()

  useEffect(() => {
    // Create AnimationMixer
    const mixer = new THREE.AnimationMixer(meshRef.current)
    mixerRef.current = mixer

    // Create KeyframeTracks
    const positionKF = new THREE.VectorKeyframeTrack(
      '.position',
      [0, 2], // keyframe times in seconds
      [0, 0, 0, 0, 2, 0] // values for x, y, z at each keyframe
    )

    const scaleKF = new THREE.VectorKeyframeTrack(
      '.scale',
      [0, 2], // keyframe times in seconds
      [1, 1, 1, 1.5, 1.5, 1.5] // values for x, y, z at each keyframe
    )

    // Create AnimationClip
    const clip = new THREE.AnimationClip('boxAnimation', 2, [positionKF, scaleKF])

    // Create AnimationAction and play it
    const action = mixer.clipAction(clip)
    action.play()

    return () => mixer.stopAllAction()
  }, [])

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta)
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshBasicMaterial color="royalblue" />
    </mesh>
  )
}




// import * as THREE from 'three';

// // Create an AnimationMixer
// const mixer = new THREE.AnimationMixer(cube);

// // Create KeyframeTracks for position and scale
// const positionKF = new THREE.VectorKeyframeTrack(
//   '.position',
//   [1, 3], // keyframe times in seconds
//   [0, 0, 0, 0, 2, 0] // values for x, y, z at each keyframe
// );

// const scaleKF = new THREE.VectorKeyframeTrack(
//   '.scale',
//   [1, 3], // keyframe times in seconds
//   [1, 1, 1, 1.5, 1.5, 1.5] // values for x, y, z at each keyframe
// );

// // Create an AnimationClip
// const clip = new THREE.AnimationClip('cubeAnimation', 3, [positionKF, scaleKF]);

// // Create an AnimationAction
// const action = mixer.clipAction(clip);

// // Set up the animation loop
// const clock = new THREE.Clock();

// function animate() {
//   requestAnimationFrame(animate);
//   const delta = clock.getDelta();
//   mixer.update(delta);
//   renderer.render(scene, camera);
// }

// // Start the animation
// action.play();
// animate();
