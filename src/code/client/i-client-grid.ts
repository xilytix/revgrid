// (c) 2024 Xilytix Pty Ltd / Paul Klink

import { RevClientGrid } from './client-grid';
import { RevSchemaField } from './interfaces/schema/schema-field';
import { RevBehavioredColumnSettings, RevBehavioredGridSettings } from './settings/internal-api';

/** @public */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RevIClientGrid<BGS extends RevBehavioredGridSettings, BCS extends RevBehavioredColumnSettings, SF extends RevSchemaField> extends RevClientGrid<BGS, BCS, SF> {

}
