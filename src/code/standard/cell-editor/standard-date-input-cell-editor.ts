import { BehavioredColumnSettings, BehavioredGridSettings, DataServer, DatalessViewCell, RevAssertError, RevClientGrid, SchemaField } from '../../client/internal-api';
import { StandardInputElementCellEditor } from './standard-input-element-cell-editor';

/** @public */
export class StandardDateInputCellEditor<
    BGS extends BehavioredGridSettings,
    BCS extends BehavioredColumnSettings,
    SF extends SchemaField
> extends StandardInputElementCellEditor<BGS, BCS, SF> {
    constructor(grid: RevClientGrid<BGS, BCS, SF>, dataServer: DataServer<SF>) {
        super(grid, dataServer, 'date');
        this.element.classList.add('revgrid-date-input-editor');
    }

    override tryOpenCell(cell: DatalessViewCell<BCS, SF>, openingKeyDownEvent: KeyboardEvent | undefined, _openingClickEvent: MouseEvent | undefined) {
        const dataServer = this._dataServer;
        if (dataServer.getEditValue === undefined) {
            return false;
        } else {
            const key = openingKeyDownEvent !== undefined ? openingKeyDownEvent.key : undefined;
            if (key !== undefined) {
                // trying to open from key down event
                const isPrintableKey = key.length === 1 || key === 'Unidentified';
                if (!isPrintableKey) {
                    return false; // only open if relevant key have been pushed down
                }
            }

            const result = super.tryOpenCell(cell, openingKeyDownEvent, _openingClickEvent);

            if (result) {
                if (key !== undefined) {
                    // was opened by keyboard
                    this.element.value = key;
                } else {
                    // was not opened by keyboard
                    const value = dataServer.getEditValue(cell.viewLayoutColumn.column.field, cell.viewLayoutRow.subgridRowIndex);
                    if (Object.prototype.toString.call(value) !== '[object Date]') {
                        throw new RevAssertError('STIETO41112', typeof value);
                    } else {
                        this.element.valueAsDate = (value as Date);
                        this.selectAll();
                    }
                }
            }

            return result;
        }
    }

    override closeCell(field: SF, subgridRowIndex: number, cancel: boolean) {
        if (!cancel && !this.readonly && this._dataServer.setEditValue !== undefined) {
            this._dataServer.setEditValue(field, subgridRowIndex, this.element.valueAsDate);
        }
        super.closeCell(field, subgridRowIndex, cancel);
    }
}
