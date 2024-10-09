import * as React from 'react';

export const Accordion = React.memo(
    React.forwardRef((inProps, inRef) => {
        return <div>TEST</div>;
    })
);

export const AccordionPanel = React.memo(React.forwardRef((inProps, inRef) => {}));

export const AccordionHeader = React.memo(React.forwardRef((inProps, inRef) => {}));

export const AccordionContent = React.memo(React.forwardRef((inProps, inRef) => {}));

// @deprecated
export const AccordionTab = () => {};

AccordionTab.displayName = 'AccordionTab';

Accordion.displayName = 'Accordion';
