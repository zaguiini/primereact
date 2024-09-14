import * as React from 'react';

export const StepperPanel = React.memo(
    React.forwardRef((inProps, ref) => {
        return <span ref={ref}>{props.children}</span>;
    })
);

StepperPanel.displayName = 'StepperPanel';
