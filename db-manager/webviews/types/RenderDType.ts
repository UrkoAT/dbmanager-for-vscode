export enum RenderDType {
    text,
    number,
    boolean,
    date,
    time,
    datetime,
    json,
}

export namespace RenderDType {
    // This function converts a string to the corresponding value in the RenderDType enum
    export function fromString(type: string): RenderDType {
        const lookup = {
            text: RenderDType.text,
            number: RenderDType.number,
            boolean: RenderDType.boolean,
            date: RenderDType.date,
            time: RenderDType.time,
            datetime: RenderDType.datetime,
            json: RenderDType.json,
        };
        return lookup[type as keyof typeof lookup];
    }

    // This function converts a value in the RenderDType enum to its string representation
    export function toString(type: RenderDType): string {
        const lookup = {
            [RenderDType.text]: "text",
            [RenderDType.number]: "number",
            [RenderDType.boolean]: "boolean",
            [RenderDType.date]: "date",
            [RenderDType.time]: "time",
            [RenderDType.datetime]: "datetime",
            [RenderDType.json]: "json",
        };
        return lookup[type];
    }

}