import { uuid } from '@primeuix/utils/uuid';

const UniqueComponentId = (prefix = 'pr_id_') => {
    return uuid(prefix);
};

export default UniqueComponentId;
