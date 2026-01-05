import { Archetype, IEntity } from "miniplex";

// Helper 1: Generic System Generator
export const system =
  <TEntity extends IEntity = IEntity, TArgs extends any[] = any[]>(
    archetype: Archetype<TEntity>,
    fun: (entities: TEntity[], ...args: TArgs) => void
  ) =>
  (...args: TArgs) =>
    fun(archetype.entities, ...args);

// Helper 2: Batched System Generator (Optimized for 800k users scale)
export const batchedSystem = <
  TEntity extends IEntity = IEntity,
  TArgs extends any[] = any[]
>(
  archetype: Archetype<TEntity>,
  batchSize: number,
  fun: (entities: TEntity[], ...args: TArgs) => void
) => {
  let offset = 0;
  const { entities } = archetype;

  return (...args: TArgs) => {
    // Safety check if entities are empty
    if (entities.length === 0) return;

    const end = Math.min(offset + batchSize, entities.length);
    const batch = entities.slice(offset, end);
    
    fun(batch, ...args);
    
    offset = (offset + batch.length) % entities.length;
  };
};