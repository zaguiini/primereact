import { ComponentBase } from '../componentbase/ComponentBase';
import { classNames } from '../utils/Utils';

const classes = {
    root: 'p-picklist p-component',
    buttons: 'p-picklist-buttons p-picklist-transfer-buttons',
    header: 'p-picklist-header',
    filterIcon: 'p-picklist-filter-icon',
    filter: 'p-picklist-filter',
    filterInput: 'p-picklist-filter-input p-inputtext p-component',
    filterContainer: 'p-picklist-filter-container',
    list: 'p-picklist-list',
    listWrapper: 'p-picklist-list-wrapper',
    listSourceWrapper: 'p-picklist-list-wrapper p-picklist-source-wrapper',
    listTargetWrapper: 'p-picklist-list-wrapper p-picklist-target-wrapper',
    listSource: 'p-picklist-list p-picklist-source',
    listTarget: 'p-picklist-list p-picklist-target',
    item: ({ selected, focused }) =>
        classNames('p-picklist-item', {
            'p-highlight': selected,
            'p-focus': focused
        }),
    sourceControls: 'p-picklist-source-controls p-picklist-buttons',
    targetControls: 'p-picklist-target-controls p-picklist-buttons'
};

const styles = `
@layer primereact {
    .p-picklist {
        display: flex;
    }

    .p-picklist-buttons {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .p-picklist-list-wrapper {
        flex: 1 1 50%;
    }

    .p-picklist-list {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: auto;
        min-height: 12rem;
        max-height: 24rem;
    }

    .p-picklist-item {
        cursor: pointer;
        overflow: hidden;
        position: relative;
    }

    .p-picklist-filter {
        position: relative;
    }

    .p-picklist-filter-icon {
        position: absolute;
        top: 50%;
        margin-top: -.5rem;
    }

    .p-picklist-filter-input {
        width: 100%;
    }
}
`;

export const PickListBase = ComponentBase.extend({
    defaultProps: {},
    css: {
        classes,
        styles
    }
});
