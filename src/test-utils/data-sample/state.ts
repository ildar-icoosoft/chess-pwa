import { RootState } from "../../app/rootReducer";

export const defaultState: RootState = {
  acceptSeekRequest: {
    inProcess: false,
    itemId: null,
    error: null,
  },
  currentUser: {
    userId: null,
    isLoading: true,
    error: null,
  },
  messages: [],
  modal: {
    showModal: null,
    allowClose: true,
  },
  seekModal: {
    isSeekModalVisible: false,
    allowCloseSeekModal: true,
  },
  seeksList: {
    isLoading: true,
    error: null,
    items: [],
  },
  usersList: {
    isLoading: true,
    error: null,
    items: [],
  },
  singleGame: {},
  gamesList: {
    isLoading: true,
    error: null,
  },
  entities: {
    users: {},
    games: {},
    seeks: {},
  },
};

export const makeStateSample = (
  data: Partial<RootState>,
  originalStateSample = defaultState
): RootState => ({
  ...originalStateSample,
  ...data,
});
