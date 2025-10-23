export default interface ICountryDropdownProps{
    name: string
    onCountrySelect: (key: string, country: string) => void;
    placeholder?: string;
}