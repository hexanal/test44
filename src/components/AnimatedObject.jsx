import * as THREE from 'three';
import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

export const AnimatedObject = ({ 
  children, 
  startPosition = [0, 0, 0],
  endPosition = [0, 2, 0],
  startScale = [1, 1, 1],
  endScale = [1.5, 1.5, 1.5],
  duration = 2,
  delay = 0,
  loop = THREE.LoopOnce
}) => {
  const objectRef = useRef()
  const mixerRef = useRef()

  useEffect(() => {
    const mixer = new THREE.AnimationMixer(objectRef.current)
    mixerRef.current = mixer

    const positionKF = new THREE.VectorKeyframeTrack(
      '.position',
      [0, duration],
      [...startPosition, ...endPosition]
    )

    const scaleKF = new THREE.VectorKeyframeTrack(
      '.scale',
      [0, duration],
      [...startScale, ...endScale]
    )

    const clip = new THREE.AnimationClip('animation', duration, [positionKF, scaleKF])
    const action = mixer.clipAction(clip)
    
    action.setLoop(loop)
    action.clampWhenFinished = true
    action.startAt(delay)
    action.play()

    return () => mixer.stopAllAction()
  }, [startPosition, endPosition, startScale, endScale, duration, delay, loop])

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta)
    }
  })

  return <group ref={objectRef}>{children}</group>
}
