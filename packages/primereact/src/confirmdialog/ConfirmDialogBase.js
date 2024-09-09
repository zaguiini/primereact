import { ComponentBase } from '../componentbase/ComponentBase';
import { classNames } from '../utils/Utils';

const classes = {
    root: 'p-confirm-dialog',
    message: 'p-confirm-dialog-message',
    icon: 'p-confirm-dialog-icon',
    acceptButton: 'p-confirm-dialog-accept',
    rejectButton: ({ getPropValue }) =>
        classNames('p-confirm-dialog-reject', {
            'p-button-text': !getPropValue('rejectClassName')
        })
};

export const ConfirmDialogBase = ComponentBase.extend({
    defaultProps: {},
    css: {
        classes
    }
});
