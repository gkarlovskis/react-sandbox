import { ReduxActionType } from '../../../interfaces/enums/redux-action-type';
import { IAppProps } from "../../../interfaces/props/i-app-props";

export type TAppAction = {
  type: ReduxActionType;
  data: IAppProps;
};