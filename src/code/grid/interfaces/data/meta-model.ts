/** @public */
export interface MetaModel {
    /**
     * @desc _IMPLEMENTATION OF THIS METHOD IS OPTIONAL._
     *
     * Get the metadata store. The precise type of this object is implementation-dependent so not defined here.
     *
     * `datasaur-base` supplies fallback implementations of this method as well as {@link DataModel#setMetadataStore} which merely get and set `this.metadata` in support of {@link DataModel#getRowMetadata} and {@link DataModel#setRowMetadata}.
     *
     * Custom data models are not required to implement them if they don't need them.
     *
     * Hypergrid never calls `getMetadataStore` itself. If implemented, Hypergrid does make a single call to `setMetadataStore` when data model is reset (see {@link Local#resetDataModel}) with no arguments.
     *
     * @returns Metadata store object.
     */
    getMetadataStore?(): MetaModel.RowMetadata[];


    /**
     * @desc _IMPLEMENTATION OF THIS METHOD IS OPTIONAL._
     *
     * Get the row's metadata object, which is a hash of cell properties objects, for those cells that have property overrides, keyed by column name; plus a row properties object with key `__ROW` when there are row properties.
     *
     * The default implementations of `getRowMetadata` and `setRowMetadata` store the metadata in an in-memory table. If this is not appropriate, override these methods to store the meta somewhere else (_e.g.,_ with the data in a hidden column, in another database table, in local storage, _etc._).
     *
     * @param rowIndex - Row index.
     * @returns One of:
     * * object - existing metadata object; else
     * * `undefined` - row found but no existing metadata; else
     * * `null`  - no such row
     */
    getRowMetadata?(rowIndex: number): null | undefined | MetaModel.RowMetadata;

    /**
     * @desc _IMPLEMENTATION OF THIS METHOD IS OPTIONAL._
     *
     * Set the metadata store. The precise type of this object is implementation-dependent, so not defined here.
     *
     * `datasaur-base` supplies fallback implementations of this method as well as {@link DataModel#getMetadataStore} which merely set and get `this.metadata` in support of {@link DataModel#setRowMetadata} and {@link DataModel#getRowMetadata}.
     *
     * Custom data models are not required to implement them if they don't need them.
     *
     * If implemented, Hypergrid makes a single call to `setMetadataStore` when data model is reset (see {@link Local#resetDataModel}) with no arguments. Therefore this method needs to expect a no-arg overload and handle it appropriately.
     *
     * Hypergrid never calls `getMetadataStore`.
     * @param [newMetadataStore] - New metadata store object. Omitted on data model reset.
     */
    setMetadataStore?(metadataStore?: MetaModel.RowMetadata[]): void;

    /**
     * @desc _IMPLEMENTATION OF THIS METHOD IS OPTIONAL._
     *
     * Set the row's metadata object, which is a hash of cell properties objects, for those cells that have property overrides, keyed by column name; plus a row properties object with key `__ROW` when there are row properties.
     *
     * The default implementations of `getRowMetadata` and `setRowMetadata` store the metadata in an in-memory table. If this is not appropriate, override these methods to store the meta somewhere else (_e.g.,_ with the data in a hidden column, in another database table, in local storage, _etc._).
     *
     * @param rowIndex - Row index.
     * @param newMetadata - When omitted, delete the row's metadata.
     */
    setRowMetadata?(rowIndex: number, newMetadata?: MetaModel.RowMetadata): void;
}

/** @public */
export namespace MetaModel {
    export type Constructor = new () => MetaModel;

    export interface HeightRowProperties {
        height?: number; // will use default height if undefined
    }

    // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
    export interface RowProperties extends HeightRowProperties {
        [key: string]: unknown;
    }

    export type RowPropertiesPrototype = RowProperties;

    export type CellOwnProperty = unknown;
    export type CellOwnProperties = Record<string, CellOwnProperty>;

    // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
    export interface CellOwnPropertiesRowMetadata {
        [fieldName: string]: CellOwnProperties;
    }

    export interface RowPropertiesRowMetadata {
        __ROW?: RowProperties;
    }

    export type RowMetadata = CellOwnPropertiesRowMetadata | RowPropertiesRowMetadata;

    export type RowMetadataPrototype = null;

    export class DefaultRowProperties implements MetaModel.RowPropertiesPrototype {
        [key: string]: unknown;

        private _height: number | undefined;

        constructor(
            private readonly _heightChangedEventer: DefaultRowProperties.HeightChangedEventer,
        ) {
        }

        get height() {
            return this._height;
        }

        set height(height: number | undefined) {
            if (typeof height !== 'number' || isNaN(height)) {
                height = undefined;
            }
            if (height !== this._height) {
                if (height === undefined) {
                    this._height = undefined;
                } else {
                    height = Math.max(5, Math.ceil(height));
                    // Define `_height` as non-enumerable so won't be included in output of saveState.
                    // (Instead the `height` getter is explicitly invoked and the result is included.)
                    Object.defineProperty(this, '_height', { value: height, configurable: true });
                }
                this._heightChangedEventer();
            }
        }
    }

    export namespace DefaultRowProperties {
        export type HeightChangedEventer = (this: void) => void;
    }
}
