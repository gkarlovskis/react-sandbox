import { ReduxActionType } from '../enums/redux-action-type';
import { IAppProps } from "../props/i-app-props";

export type TAppAction = {
  type: ReduxActionType;
  data: IAppProps;
};