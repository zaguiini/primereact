import * as React from 'react';

export const DevelopmentSection = React.memo((props) => {
    return (
        <>
            <div className="flex items-center leading-normal bg-primary-600 text-white p-4 text-lg rounded-border">
                <i className="pi pi-info-circle text-lg text-white mr-2" />
                Accessibility guide documents the specification of this component based on WCAG guidelines, the implementation is in progress.
            </div>
            {props.children}
        </>
    );
});
