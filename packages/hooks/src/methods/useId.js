import * as React from 'react';

export const useId = (initialValue) => {
    const idx = React.useId();

    return initialValue || `pr_id_${idx.replaceAll(':', '')}`;
};
