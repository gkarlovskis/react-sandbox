import { IInputDefaultState } from './i-input-default-state';
export interface ISelectDefaultState extends IInputDefaultState {
  keys: string[];
  options: string[];
}
