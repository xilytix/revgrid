// (c) 2024 Xilytix Pty Ltd / Paul Klink

import { RevSchemaField } from '../../../common/internal-api';

/** @public */
export interface RevSingleHeadingSchemaField extends RevSchemaField {
    heading: string;
}
