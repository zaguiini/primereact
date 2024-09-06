import * as React from 'react';

export const useAttrSelector = (prefix = '') => {
    const idx = React.useId();

    return `${prefix}${idx.replaceAll(':', '')}`;
};
