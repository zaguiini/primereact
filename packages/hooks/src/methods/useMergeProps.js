import { PrimeReactContext } from '@primereact/core/config';
import { mergeProps } from '@primeuix/utils';
import * as React from 'react';

/**
 * Hook to merge properties including custom merge function for things like Tailwind merge.
 */
export const useMergeProps = () => {
    const context = React.useContext(PrimeReactContext);

    return (...props) => {
        return mergeProps(props, context?.ptOptions);
    };
};
