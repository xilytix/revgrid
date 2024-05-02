import { RevRectangle, RevSchemaField } from '../../../common/internal-api';
import { RevBehavioredColumnSettings } from '../../settings/internal-api';
import { RevDatalessViewCell } from '../dataless/dataless-view-cell';
import { RevCellPainter } from './cell-painter';

/** @public */
export interface RevClickBoxCellPainter<BCS extends RevBehavioredColumnSettings, SF extends RevSchemaField> extends RevCellPainter<BCS, SF> {
    calculateClickBox(cell: RevDatalessViewCell<BCS, SF>): RevRectangle | undefined;
}
