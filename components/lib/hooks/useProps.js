export const useProps = (props1 = {}, props2 = {}) => {
    return Object.keys(props1).reduce(
        (acc, key) => {
            if (props2.hasOwnProperty(key)) {
                acc.props[key] = props1[key];
            } else {
                acc.attrs[key] = props1[key];
            }

            return acc;
        },
        { props: props2, attrs: {} }
    );
};
