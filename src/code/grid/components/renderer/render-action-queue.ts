import { AssertError } from '../../types-utils/revgrid-error';
import { ViewLayout } from '../view/view-layout';
import { RenderAction, RepaintViewAction } from './render-action';

/** @internal */
export class RenderActionQueue {
    private _queuedActions: RenderAction[] = [];
    private _actionsQueuedEvented = false;
    private _beginChangeCount = 0;

    constructor(private readonly _actionsQueuedEventer: RenderActioner.ActionsQueuedEventer) {

    }

    get actionsQueued() { return this._queuedActions.length > 0; }

    beginChange() {
        this._beginChangeCount++;
    }

    endChange() {
        this._beginChangeCount--;
        if (this._beginChangeCount === 0) {
            if (this._queuedActions.length > 0 && !this._actionsQueuedEvented) {
                this._actionsQueuedEventer();
                this._actionsQueuedEvented = true;
            }
        } else {
            if (this._beginChangeCount < 0) {
                throw new AssertError('RAEC91004', 'Mismatched RenderActioner begin/endChange callback');
            }
        }
    }

    takeActions() {
        const actions = this._queuedActions;
        this._queuedActions = [];
        this._actionsQueuedEvented = false;
        return actions;
    }

    processViewLayoutInvalidateAction(_invalidateAction: ViewLayout.InvalidateAction) {
        this.beginChange();
        try {
        // currently only support PaintAll
            this.queuePaintAllAction();
        } finally {
            this.endChange();
        }
    }

    invalidateView() {
        this.beginChange();
        try {
            this.queuePaintAllAction();
        } finally {
            this.endChange();
        }
    }

    invalidateViewRows(_viewRowIndex: number, _count: number) {
        this.beginChange();
        try {
            this.queuePaintAllAction();
        } finally {
            this.endChange();
        }
    }

    invalidateViewRow(_viewRowIndex: number) {
        this.beginChange();
        try {
            this.queuePaintAllAction();
        } finally {
            this.endChange();
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    invalidateViewRowCells(_viewRowIndex: number, _viewColumnIndices: number[]) {
        this.beginChange();
        try {
            this.queuePaintAllAction();
        } finally {
            this.endChange();
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    invalidateViewCell(_viewColumnIndex: number, _viewRowIndex: number) {
        this.beginChange();
        try {
            this.queuePaintAllAction();
        } finally {
            this.endChange();
        }
    }

    private queuePaintAllAction() {
        if (this._queuedActions.length === 0) {
            // currently only support paint all
            const action: RepaintViewAction = {
                type: RenderAction.Type.PaintAll,
            };
            this._queuedActions.push(action);
        }
    }
}

/** @internal */
export namespace RenderActioner {
    export type ActionsQueuedEventer = (this: void) => void;
}
