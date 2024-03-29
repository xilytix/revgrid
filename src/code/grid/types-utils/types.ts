/** @public */
export const enum HorizontalWheelScrollingAllowed {
    Never,
    Always,
    CtrlKeyDown,
}

/** @public */
export type Writable<T> = {
    -readonly [P in keyof T]: T[P];
};

/** @public */
export const enum ListChangedTypeId {
    Set,
    Insert,
    Remove,
    Move,
    Clear,
}

/** @public */
export type ListChangedEventer = (
    this: void,
    typeId: ListChangedTypeId,
    index: number,
    count: number,
    targetIndex: number | undefined
) => void;

/** @public */
export const enum SelectionAreaTypeSpecifier {
    Primary,
    Secondary,
    Rectangle,
    Row,
    Column,
    LastOrPrimary,
}

/** @public */
export type IndexSignatureHack<T> = { [K in keyof T]: IndexSignatureHack<T[K]> };

/** @public */
export type UiableListChangedEventHandler = (
    this: void,
    typeId: ListChangedTypeId,
    index: number,
    count: number,
    targetIndex: number | undefined,
    ui: boolean
) => void;
