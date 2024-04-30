// (c) 2024 Xilytix Pty Ltd / Paul Klink

import {
    Integer,
    compareValue
} from '@xilytix/sysutils';
import { RevHorizontalAlignId, RevRenderValue } from '../../../../../text/internal-api';
import { RevSourcedFieldSourceDefinition } from '../../../../sourced-field/server/internal-api';
import { RevRecordSourcedField, RevRecordSourcedFieldDefinition } from '../../../record/server/internal-api';
import { RevGenericTableValue, RevTableValue, RevTableValuesRecord } from '../value/internal-api';

/** @public */
export abstract class RevTableField<RenderValueTypeId, RenderAttributeTypeId> extends RevRecordSourcedField<RenderValueTypeId, RenderAttributeTypeId> {
    private _valueTypeId: RenderValueTypeId;

    constructor(
        protected readonly textFormatter: RevRenderValue.TextFormatter<RenderValueTypeId, RenderAttributeTypeId>,
        definition: RevTableField.Definition<RenderValueTypeId, RenderAttributeTypeId>,
        heading: string,
    ) {
        super(definition, heading);
    }

    get valueTypeId() { return this._valueTypeId; }

    compare(left: RevTableValuesRecord<RenderValueTypeId, RenderAttributeTypeId>, right: RevTableValuesRecord<RenderValueTypeId, RenderAttributeTypeId>): number {
        const leftValue = left.values[this.index];
        const rightValue = right.values[this.index];
        if (leftValue === rightValue) {
            return 0;
        } else {
            if (leftValue.isUndefined()) {
                if (rightValue.isUndefined()) {
                    return 0;
                } else {
                    return this.compareUndefinedToDefinedField(rightValue);
                }
            } else {
                if (rightValue.isUndefined()) {
                    return -this.compareUndefinedToDefinedField(leftValue);
                } else {
                    return this.compareDefined(leftValue, rightValue);
                }
            }
        }
    }

    compareDesc(left: RevTableValuesRecord<RenderValueTypeId, RenderAttributeTypeId>, right: RevTableValuesRecord<RenderValueTypeId, RenderAttributeTypeId>): number {
        const leftValue = left.values[this.index];
        const rightValue = right.values[this.index];
        if (leftValue === rightValue) {
            return 0;
        } else {
            if (leftValue.isUndefined()) {
                if (rightValue.isUndefined()) {
                    return 0;
                } else {
                    return -this.compareUndefinedToDefinedField(rightValue);
                }
            } else {
                if (rightValue.isUndefined()) {
                    return this.compareUndefinedToDefinedField(leftValue);
                } else {
                    return this.compareDefined(rightValue, leftValue);
                }
            }
        }
    }

    override getViewValue(record: RevTableValuesRecord<RenderValueTypeId, RenderAttributeTypeId>): RevRenderValue<RenderValueTypeId, RenderAttributeTypeId> {
        const tableGridValue = record.values[this.index];
        return tableGridValue.renderValue;
    }

    protected setValueTypeId(value: RenderValueTypeId) {
        this._valueTypeId = value;
    }

    protected compareUndefinedToDefinedField(definedValue: RevTableValue<RenderValueTypeId, RenderAttributeTypeId>) {
        // left is undefined, right is defined (parameter)
        return -1;
    }

    protected abstract compareDefined(left: RevTableValue<RenderValueTypeId, RenderAttributeTypeId>, right: RevTableValue<RenderValueTypeId, RenderAttributeTypeId>): number;
}

/** @public */
export namespace RevTableField {
    export class Definition<RenderValueTypeId, RenderAttributeTypeId> extends RevRecordSourcedFieldDefinition {
        constructor(
            sourceDefinition: RevSourcedFieldSourceDefinition,
            sourcelessName: string,
            defaultHeading: string,
            defaultTextAlignId: RevHorizontalAlignId,
            readonly gridFieldConstructor: RevTableField.Constructor<RenderValueTypeId, RenderAttributeTypeId>,
            readonly gridValueConstructor: RevTableValue.Constructor<RenderValueTypeId, RenderAttributeTypeId>,

        ) {
            super(sourceDefinition, sourcelessName, defaultHeading, defaultTextAlignId);
        }
    }

    export type Constructor<RenderValueTypeId, RenderAttributeTypeId> = new(
        textFormatter: RevRenderValue.TextFormatter<RenderValueTypeId, RenderAttributeTypeId>,
        definition: RevTableField.Definition<RenderValueTypeId, RenderAttributeTypeId>,
        heading: string,
        index: Integer,
    ) => RevTableField<RenderValueTypeId, RenderAttributeTypeId>;
}

/** @public */
export class RevGenericTableField<DataType extends number | string, ValueClass extends RevGenericTableValue<DataType, RenderValueTypeId, RenderAttributeTypeId>, RenderValueTypeId, RenderAttributeTypeId>
    extends RevTableField<RenderValueTypeId, RenderAttributeTypeId> {

    protected compareDefined(left: RevTableValue<RenderValueTypeId, RenderAttributeTypeId>, right: RevTableValue<RenderValueTypeId, RenderAttributeTypeId>): number {
        return compareValue<DataType>((left as ValueClass).definedData, (right as ValueClass).definedData);
    }
}
