import { Repository, Entity, EntityId } from 'rimo'

export interface DynamoRepository<T extends Entity<any>, ID extends EntityId>
  extends Repository<T, ID> {}
