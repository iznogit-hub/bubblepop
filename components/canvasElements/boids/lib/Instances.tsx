import { GroupProps, InstancedMeshProps, useFrame } from "@react-three/fiber";
import { IEntity } from "miniplex";
import { createECS } from "miniplex-react";
import { FC, forwardRef, useEffect, useRef } from "react";
import { Group, InstancedMesh, Object3D } from "three";

type InstanceEntity = {
  instance: {
    sceneObject: Object3D;
  };
} & IEntity;

export function makeInstanceComponents() {
  const ecs = createECS<InstanceEntity>();

  const Root: FC<InstancedMeshProps & { countStep?: number }> = ({
    children,
    countStep = 1000,
    ...props
  }) => {
    const instancedMesh = useRef<InstancedMesh>(null);
    const { entities } = ecs.useArchetype("instance");

    const instanceLimit = Math.ceil((entities.length || 1) / countStep) * countStep;

    useFrame(() => {
      if (!instancedMesh.current) return;
      for (let i = 0; i < entities.length; i++) {
        const { instance } = entities[i];
        if (instance && instance.sceneObject) {
           instancedMesh.current.setMatrixAt(i, instance.sceneObject.matrixWorld);
        }
      }
      instancedMesh.current.instanceMatrix.needsUpdate = true;
      instancedMesh.current.count = entities.length;
    });

    return (
      <instancedMesh
        ref={instancedMesh}
        {...props}
        args={[undefined, undefined, instanceLimit]}
      >
        {children}
      </instancedMesh>
    );
  };

  const Instance = forwardRef<Group, GroupProps>(
    ({ children, ...groupProps }, ref) => {
      const group = useRef<Group>(null!);

      useEffect(() => {
        const entity = ecs.world.createEntity({
          instance: {
            sceneObject: group.current,
          },
        });

        return () => ecs.world.destroyEntity(entity);
      }, []);

      return (
        <group ref={group} {...groupProps}>
          {children}
        </group>
      );
    }
  );
  
  // FIXED: Explicit Display Name assignment
  Instance.displayName = "Instance";

  return { world: ecs.world, useArchetype: ecs.useArchetype, Root, Instance };
}