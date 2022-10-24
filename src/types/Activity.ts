export interface Activity{
    type:'daily'|'weekly'|'monthly';
    name:string;
    checksRequired:number;
    iconsUrl?:string[];
    utilitiesUrl?:{description:string, url:string}[];
}
