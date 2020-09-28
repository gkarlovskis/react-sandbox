export interface ISelectDefaultProps {
  name?: string;
  value?: string;
  valueList?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
}
