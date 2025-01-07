import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export function useSmoothTransform(initialValue, smoothTime = 0.1) {
  const ref = useRef(initialValue.clone())
  const currentValue = useRef(initialValue.clone())
  const velocity = useRef(
    initialValue instanceof THREE.Euler
      ? new THREE.Vector3()
      : initialValue.clone().set(0, 0, 0)
  )

  useFrame((_, delta) => {
    if (initialValue instanceof THREE.Euler) {
      const targetVector = new THREE.Vector3(
        ref.current.x,
        ref.current.y,
        ref.current.z
      )
      const currentVector = new THREE.Vector3(
        currentValue.current.x,
        currentValue.current.y,
        currentValue.current.z
      )
      
      currentVector.addScaledVector(
        velocity.current,
        delta
      ).lerp(targetVector, 1 - Math.exp(-smoothTime / delta))
      
      currentValue.current.set(currentVector.x, currentVector.y, currentVector.z)
      velocity.current.subVectors(targetVector, currentVector).multiplyScalar(smoothTime)
    } else {
      currentValue.current.addScaledVector(velocity.current, delta)
        .lerp(ref.current, 1 - Math.exp(-smoothTime / delta))
      velocity.current.subVectors(ref.current, currentValue.current).multiplyScalar(smoothTime)
    }
  })

  return [currentValue, ref]
}
