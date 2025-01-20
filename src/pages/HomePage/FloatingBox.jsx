import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function FloatingBox() {
  const meshRef = useRef()
  const mixerRef = useRef()
  const floatActionRef = useRef()
  const scaleActionRef = useRef()
  const [isPressed, setIsPressed] = useState(false)

  useEffect(() => {
    const mixer = new THREE.AnimationMixer(meshRef.current)
    mixerRef.current = mixer

    // Floating animation
    const floatKF = new THREE.VectorKeyframeTrack(
      '.position',
      [0, 1, 2],
      [0, 0, 0, 0, 0.5, 0, 0, 0, 0]
    )
    const floatClip = new THREE.AnimationClip('float', 2, [floatKF])
    floatActionRef.current = mixer.clipAction(floatClip)
    floatActionRef.current.setLoop(THREE.LoopRepeat)

    // Scale animation
    const scaleKF = new THREE.VectorKeyframeTrack(
      '.scale',
      [0, 1],
      [1, 1, 1, 1.5, 1.5, 1.5]
    )
    const scaleClip = new THREE.AnimationClip('scale', 1, [scaleKF])
    scaleActionRef.current = mixer.clipAction(scaleClip)
    scaleActionRef.current.setLoop(THREE.LoopOnce)
    scaleActionRef.current.clampWhenFinished = true

    floatActionRef.current.play()

    return () => mixer.stopAllAction()
  }, [])

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta)
    }
  })

  const handlePress = () => {
    if (!isPressed && floatActionRef.current && scaleActionRef.current) {
      floatActionRef.current.fadeOut(0.1)
      scaleActionRef.current.reset().fadeIn(1).play()
      setIsPressed(true)
    }
  }

  return (
    <mesh ref={meshRef} onClick={handlePress}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="royalblue" />
    </mesh>
  )
}
