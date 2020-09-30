export interface IInputDefaultProps {
  value?: string;
  minlength?: number;
  maxlength?: number;
  required?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
}
