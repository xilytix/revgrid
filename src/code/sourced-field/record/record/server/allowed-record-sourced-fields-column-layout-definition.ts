// (c) 2024 Xilytix Pty Ltd / Paul Klink

import { Integer } from '@xilytix/sysutils';
import { RevColumnLayoutDefinition } from '../../../../column-layout/server/internal-api';
import { RevAllowedSourcedFieldsColumnLayoutDefinition } from '../../../sourced-field/server/internal-api';
import { RevAllowedRecordSourcedField } from './allowed-record-sourced-field';

/** @public */
export class RevAllowedRecordSourcedFieldsColumnLayoutDefinition<
    TextFormattableValueTypeId,
    TextFormattableValueAttributeTypeId
> extends RevColumnLayoutDefinition implements RevAllowedSourcedFieldsColumnLayoutDefinition {
    // Uses AllowedGridField instead of RevFieldDefinition as heading can be changed at runtime
    constructor(
        columns: readonly RevColumnLayoutDefinition.Column[],
        readonly allowedFields: readonly RevAllowedRecordSourcedField<TextFormattableValueTypeId, TextFormattableValueAttributeTypeId>[],
        readonly fixedColumnCount: Integer,
    ) {
        super(columns);
    }
}
