import { RevHorizontalAlignId, RevTextTruncateTypeId } from '../../../cell-content/client/internal-api';
import { RevStandardOnlyGridSettings } from '../../settings/internal-api';

/** @public */
export const revStandardDefaultOnlyGridSettings: RevStandardOnlyGridSettings = {
    cellPadding: 5,
    font: '13px Tahoma, Geneva, sans-serif',
    horizontalAlignId: RevHorizontalAlignId.Center,
    horizontalAlign: 'center',
    verticalOffset: 0,
    textTruncateTypeId: RevTextTruncateTypeId.WithEllipsis,
    textTruncateType: 'withEllipsis',
    textStrikeThrough: false,

    // When the following settings are undefined, typically a cell painter will fallback to another setting (if it supports that setting)
    cellFocusedBorderColor: undefined,
    cellHoverBackgroundColor: undefined,

    columnHoverBackgroundColor: undefined,

    columnHeaderFont: undefined,
    columnHeaderHorizontalAlignId: undefined,
    columnHeaderHorizontalAlign: undefined,
    columnHeaderBackgroundColor: undefined,
    columnHeaderForegroundColor: undefined,

    columnHeaderSelectionFont: undefined,
    columnHeaderSelectionForegroundColor: undefined,
    columnHeaderSelectionBackgroundColor: undefined,

    rowHoverBackgroundColor: undefined,

    selectionFont: undefined,
    selectionBackgroundColor: undefined,
    selectionForegroundColor: undefined,
} as const;
