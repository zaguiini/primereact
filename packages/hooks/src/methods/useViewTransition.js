export const useViewTransition = (callback) => {
    if (document?.startViewTransition) {
        document?.startViewTransition(callback);

        return;
    }

    callback();
};
