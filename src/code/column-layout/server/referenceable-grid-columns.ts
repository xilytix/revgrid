// (c) 2024 Xilytix Pty Ltd / Paul Klink

import { LockItemByKeyList } from '@xilytix/sysutils';
import { RevReferenceableColumnLayoutDefinition } from './definition/internal-api';
import { RevReferenceableColumnLayout } from './referenceable-column-layout';

/** @public */
export interface RevReferenceableColumnLayouts extends LockItemByKeyList<RevReferenceableColumnLayout> {
    getOrNew(definition: RevReferenceableColumnLayoutDefinition): RevReferenceableColumnLayout;
}
