import {
  SelectComponent, SelectPickerComponent, SelectPickerImage, SelectPickerOptionsComponent, SelectTitleRow, SelectTitle,
} from './styled';

export interface SelectPickerProps<T>{
    className?:string;
    title:string;
    options:{label:string, value:T}[];
    children?:any;
    onSelect?:Function;
}

function SelectPickerOptions(props:any) {
  const { innerProps, className, value } = props;
  return <SelectPickerOptionsComponent className={className} {...innerProps}>
        {value.iconsUrl.map((url:string) => <SelectPickerImage key={value.name} src={url} alt={value.name}></SelectPickerImage>)}
        {value.name}
        </SelectPickerOptionsComponent>;
}

export function SelectPicker<T>(props:SelectPickerProps<T>) {
  const onChange = ((newValue: unknown) => {
    const newValueCast = newValue as {label:string, value:T};
    return props.onSelect && props.onSelect(newValueCast.value);
  });

  return <SelectPickerComponent>
        <SelectTitleRow>
        <SelectTitle>{props.title}</SelectTitle>
       {props.children}
        </SelectTitleRow>

        <SelectComponent key={props.title} className={props.className} components={{ Option: SelectPickerOptions }} options={props.options} onChange={onChange}/>
    </SelectPickerComponent>;
}
