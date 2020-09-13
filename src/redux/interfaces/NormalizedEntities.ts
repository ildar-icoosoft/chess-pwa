import { EntitiesState } from "../slices/entitiesSlice";

export default interface NormalizedEntities {
  entities: Partial<EntitiesState>;
}
