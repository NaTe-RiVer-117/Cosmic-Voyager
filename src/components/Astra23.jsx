import React, { useEffect, useState } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations, useFBX } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { useRef } from 'react'


export function Model23(props) {
  // Load model
  const { scene } = useGLTF('/models/astra__valorant/scene.gltf')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)



  return (
    <group {...props} dispose={null} position={[0, -2, 0]} rotation={[0, 0, 0]} scale={2}>
      <group name="Sketchfab_model" rotation={[-Math.PI / 3, 0, Math.PI]}>
        <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
          <group name="Astra_0" position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <primitive object={nodes.GLTF_created_0_rootJoint} />
            <skinnedMesh 
              name="Object_6" 
              geometry={nodes.Object_6.geometry} 
              material={materials.TP_Rift_S0_Hair_MI} 
              skeleton={nodes.Object_6.skeleton} 
            />
            <skinnedMesh 
              name="Object_7" 
              geometry={nodes.Object_7.geometry} 
              material={materials.NewOverlayMaterialInstance_TP_Rift_S0_MI} 
              skeleton={nodes.Object_7.skeleton} 
            />
            <skinnedMesh 
              name="Object_8" 
              geometry={nodes.Object_8.geometry} 
              material={materials.TP_Core_Eye_MI_Astra} 
              skeleton={nodes.Object_8.skeleton} 
            />
            <skinnedMesh 
              name="Object_9" 
              geometry={nodes.Object_9.geometry} 
              material={materials.NewOverlayMaterialInstance_TP_Rift_S0_MI} 
              skeleton={nodes.Object_9.skeleton} 
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/astra__valorant/scene.gltf')