import { isNotEmpty } from '@primeuix/utils';
import * as React from 'react';

export const useId = (initialValue) => {
    const idx = React.useId();
    const [idState, setIdState] = React.useState(initialValue || `pr_id_${idx.replaceAll(':', '')}`);

    React.useEffect(() => {
        isNotEmpty(initialValue) && setIdState(initialValue);
    }, [initialValue]);

    return idState;
};
