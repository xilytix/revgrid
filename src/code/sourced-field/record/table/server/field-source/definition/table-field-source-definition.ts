// (c) 2024 Xilytix Pty Ltd / Paul Klink

import { Integer } from '@xilytix/sysutils';
// import { GridRecordFieldState } from '../../../record/grid-record-internal-api';
import { RevSourcedFieldDefinition } from '../../../../../sourced-field/server/internal-api';
import { RevRecordSourcedFieldSourceDefinition } from '../../../../record/server/internal-api';
import { RevTableField } from '../../field/internal-api';
import { RevTableValue } from '../../value/internal-api';

/** @public */
export abstract class RevTableFieldSourceDefinition<TypeId, RenderValueTypeId, RenderAttributeTypeId> extends RevRecordSourcedFieldSourceDefinition {
    readonly fieldDefinitions: RevTableField.Definition<RenderValueTypeId, RenderAttributeTypeId>[];

    constructor(readonly typeId: TypeId, name: string) {
        super(name);
    }

    get fieldCount(): Integer { return this.fieldDefinitions.length; }

    getFieldName(idx: Integer): string {
        return this.fieldDefinitions[idx].name;
    }

    findFieldByName(name: string): Integer | undefined {
        const upperName = name.toUpperCase();
        const idx = this.fieldDefinitions.findIndex((definition) => definition.name.toUpperCase() === upperName);
        return idx >= 0 ? idx : undefined;
    }

    encodeFieldName(sourcelessFieldName: string) {
        return RevSourcedFieldDefinition.Name.compose(this.name, sourcelessFieldName);
    }

    abstract getFieldNameById(id: number): string;
}

/** @public */
export namespace RevTableFieldSourceDefinition {
    export type TableFieldValueConstructors<RenderValueTypeId, RenderAttributeTypeId> = [
        field: RevTableField.Constructor<RenderValueTypeId, RenderAttributeTypeId>,
        value: RevTableValue.Constructor<RenderValueTypeId, RenderAttributeTypeId>
    ];

    // used by descendants
    export type TableGridConstructors<RenderValueTypeId, RenderAttributeTypeId> = [
        RevTableField.Constructor<RenderValueTypeId, RenderAttributeTypeId>,
        RevTableValue.Constructor<RenderValueTypeId, RenderAttributeTypeId>
    ];

    export interface FieldName<TypeId> {
        readonly sourceTypeId: TypeId;
        readonly sourcelessName: string;
    }

    export interface FieldId<TypeId> {
        sourceTypeId: TypeId;
        id: number;
    }
}