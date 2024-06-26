
import { DataServer, RevAssertError, RevDataServer } from '../../grid/grid-public-api';
import { MultiHeadingSchemaField } from './multi-heading-schema-field';

/** @public */
export class MultiHeadingDataServer<SF extends MultiHeadingSchemaField> implements DataServer<SF> {
    private _rowCount = 0;
    private _callbackListeners: RevDataServer.NotificationsClient[] = [];

    subscribeDataNotifications(listener: RevDataServer.NotificationsClient) {
        this._callbackListeners.push(listener)
    }

    unsubscribeDataNotifications(client: RevDataServer.NotificationsClient) {
        const idx = this._callbackListeners.findIndex((element) => element === client);
        if (idx < 0) {
            throw new RevAssertError('HSARDCL65539');
        } else {
            this._callbackListeners.splice(idx, 1);
        }
    }

    getRowCount() {
        return this._rowCount;
    }

    getViewValue(field: SF, rowIndex: number) {
        const headings = field.headings;
        if (rowIndex >= headings.length) {
            return field.name;
        } else {
            return headings[rowIndex];
        }
    }

    reset(rowCount: number) {
        this._rowCount = rowCount;
        this._callbackListeners.forEach((listener) => { listener.rowsLoaded(); });
    }
}
