// (c) 2024 Xilytix Pty Ltd / Paul Klink

import { BehavioredColumnSettings, BehavioredGridSettings } from '../grid/grid-public-api';
import { RevRecordGrid } from '../record/internal-api';
import { RevAllowedRecordSourcedField, RevAllowedRecordSourcedFieldsColumnLayoutDefinition, RevRecordSourcedField } from './server/internal-api';

/** @public */
export class RevRecordSourcedFieldGrid<
    RenderValueTypeId,
    RenderAttributeTypeId,
    BGS extends BehavioredGridSettings,
    BCS extends BehavioredColumnSettings,
    SF extends RevRecordSourcedField<RenderValueTypeId, RenderAttributeTypeId>
> extends RevRecordGrid<BGS, BCS, SF> {
    createAllowedSourcedFieldsColumnLayoutDefinition(allowedFields: readonly RevAllowedRecordSourcedField<RenderValueTypeId, RenderAttributeTypeId>[]) {
        const definitionColumns = this.createColumnLayoutDefinitionColumns();
        return new RevAllowedRecordSourcedFieldsColumnLayoutDefinition<RenderValueTypeId, RenderAttributeTypeId>(definitionColumns, allowedFields, this.settings.fixedColumnCount);
    }
}