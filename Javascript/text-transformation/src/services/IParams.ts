interface Replacers {
    [name: string]: string;
}
export default interface IParams {
    lineWidth: number;
    spacing: string;
    alignment: string;
    bold: string[];
    italic: string[];
    facts: string[];
    replacers: Replacers;
}
