import { EntitiesState } from "../slices/entitiesSlice";

export default interface NormalizedData<R, E = Partial<EntitiesState>> {
  result: R;
  entities: E;
}
