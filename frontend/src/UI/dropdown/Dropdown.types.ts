interface Option {
  label: string;
  value: string | number;
}

export default interface IDropdownProps {
  name: string;
  options: Option[];
  onSelect: (key: string, value: string | number) => void;
  placeholder?: string;
}
