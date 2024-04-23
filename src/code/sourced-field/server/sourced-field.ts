// (c) 2024 Xilytix Pty Ltd / Paul Klink

import {
    EnumInfoOutOfOrderError
} from '@xilytix/sysutils';
import { SchemaField } from '../../grid/internal-api';
import { HorizontalAlignEnum } from '../../standard/internal-api';
import { RevSourcedFieldDefinition } from './definition/internal-api';
import { RevSourcedFieldCustomHeadingsService } from './sourced-field-custom-headings-service';

/** @public */
export interface RevSourcedField extends SchemaField {
    readonly definition: RevSourcedFieldDefinition;
    readonly name: string;
    heading: string;
}

/** @public */
export namespace RevSourcedField {
    export const enum FieldId {
        Name,
        Heading,
        SourceName,
        DefaultHeading,
        DefaultTextAlign,
        DefaultWidth,
    }

    export namespace Field {
        export type Id = FieldId;

        interface Info {
            readonly id: Id;
            readonly name: string;
            readonly horizontalAlign: HorizontalAlignEnum;
        }

        type InfosObject = { [id in keyof typeof FieldId]: Info };

        const infosObject: InfosObject = {
            Name: {
                id: FieldId.Name,
                name: 'Name',
                horizontalAlign: HorizontalAlignEnum.left,
            },
            Heading: {
                id: FieldId.Heading,
                name: 'Heading',
                horizontalAlign: HorizontalAlignEnum.left,
            },
            SourceName: {
                id: FieldId.SourceName,
                name: 'SourceName',
                horizontalAlign: HorizontalAlignEnum.left,
            },
            DefaultHeading: {
                id: FieldId.DefaultHeading,
                name: 'DefaultHeading',
                horizontalAlign: HorizontalAlignEnum.left,
            },
            DefaultTextAlign: {
                id: FieldId.DefaultTextAlign,
                name: 'DefaultTextAlign',
                horizontalAlign: HorizontalAlignEnum.left,
            },
            DefaultWidth: {
                id: FieldId.DefaultWidth,
                name: 'DefaultWidth',
                horizontalAlign: HorizontalAlignEnum.right,
            },
        } as const;

        const infos = Object.values(infosObject);
        export const idCount = infos.length;

        export function checkOrder() {
            for (let i = 0; i < idCount; i++) {
                const info = infos[i];
                if (info.id !== i as FieldId) {
                    throw new EnumInfoOutOfOrderError('RevField.FieldId', i, idToName(i));
                }
            }
        }

        checkOrder();

        export function idToName(id: Id) {
            return infos[id].name;
        }

        export function idToHorizontalAlign(id: Id) {
            return infos[id].horizontalAlign;
        }
    }

    export function generateHeading(customHeadingsService: RevSourcedFieldCustomHeadingsService, fieldDefinition: RevSourcedFieldDefinition) {
        const customHeading = customHeadingsService.tryGetFieldHeading(fieldDefinition.name, fieldDefinition.sourcelessName);
        if (customHeading !== undefined) {
            return customHeading;
        } else {
            return fieldDefinition.defaultHeading;
        }
    }
}