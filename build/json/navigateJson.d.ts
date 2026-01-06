type NavigateResults<ValueType = any, ObjectType = any, IsFull extends boolean = boolean> = {
    /** number of keys navigated */
    depth: number;
    /** the path navigated */
    path: string;
    /** was the path fully navigated? */
    isFull: IsFull;
    /** the last object/array navigated */
    parent: IsFull extends true ? ObjectType : unknown;
    /** the last key navigated */
    key: string;
    /** the requested value; only present if isFull === true */
    value?: IsFull extends true ? ValueType : never;
};
export declare function navigateJson<ValueType = any, ObjectType = any>(object: unknown, path: string): NavigateResults<ValueType, ObjectType>;
export {};
