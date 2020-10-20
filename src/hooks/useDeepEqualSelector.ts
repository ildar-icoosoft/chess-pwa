import { isEqual } from "lodash";
import { useSelector, DefaultRootState } from "react-redux";

export function useDeepEqualSelector<
  TState = DefaultRootState,
  TSelected = unknown
>(selector: (state: TState) => TSelected) {
  return useSelector(selector, isEqual);
}
