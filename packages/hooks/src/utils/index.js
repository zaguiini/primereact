export const addNonce = (styleElement, nonce) => {
    try {
        if (!nonce) {
            nonce = process?.env?.REACT_APP_CSS_NONCE;
        }
    } catch (error) {
        // NOOP
    }

    nonce && styleElement.setAttribute('nonce', nonce);
};
