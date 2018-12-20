import { Field } from './field';

export interface Menu {
    menus?: Menu[],
    restField: string,
    title: string,
    fields?: Field[] 
}
