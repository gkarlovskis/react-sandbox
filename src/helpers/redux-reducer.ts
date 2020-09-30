import { ReduxActionType } from '../interfaces/enums/redux-action-type';
import { TAppAction } from '../interfaces/types/t-action';
import { TAppState } from '../interfaces/types/t-app-state';

export type DispatchType = (args: TAppAction) => TAppAction;

const initialState: TAppState = {
  isLoggedIn: false,
  user: { username: "" },
};

const reducer = (
  state: TAppState = initialState,
  action: TAppAction
): TAppState => {

  switch (action.type) {
    case ReduxActionType.LOG_IN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.data.user
      };
    case ReduxActionType.LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        user: action.data.user
      };
  }
  return state;
};

export default reducer;

