import { ActivityType } from './ActivityType';

export interface Activity{
    type:ActivityType;
    name:string;
    checksRequired:number;
    iconsUrl?:string[];
    utilitiesUrl?:{description:string, url:string}[];
}
