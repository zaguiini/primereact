import { getOuterHeight, getOuterWidth, getViewport, getWindowScrollLeft, getWindowScrollTop, isFunction } from '@primeuix/utils';
import IconUtils from './IconUtils';
import { mask } from './Mask';
import ObjectUtils from './ObjectUtils';

export { IconUtils, mask, ObjectUtils };

// @todo: move to @primeuix/utils
export const omit = (obj, ...keys) => {
    const copy = { ...obj };
    keys.forEach((key) => delete copy[key]);
    return copy;
};

// @todo: Remove this function from here
export const flipfitCollision = (element, target, my = 'left top', at = 'left bottom', callback) => {
    if (element && target) {
        const targetOffset = target.getBoundingClientRect();
        const viewport = getViewport();
        const myArr = my.split(' ');
        const atArr = at.split(' ');
        const getPositionValue = (arr, isOffset) => (isOffset ? +arr.substring(arr.search(/(\+|-)/g)) || 0 : arr.substring(0, arr.search(/(\+|-)/g)) || arr);
        const position = {
            my: {
                x: getPositionValue(myArr[0]),
                y: getPositionValue(myArr[1] || myArr[0]),
                offsetX: getPositionValue(myArr[0], true),
                offsetY: getPositionValue(myArr[1] || myArr[0], true)
            },
            at: {
                x: getPositionValue(atArr[0]),
                y: getPositionValue(atArr[1] || atArr[0]),
                offsetX: getPositionValue(atArr[0], true),
                offsetY: getPositionValue(atArr[1] || atArr[0], true)
            }
        };
        const myOffset = {
            left: () => {
                const totalOffset = position.my.offsetX + position.at.offsetX;

                return totalOffset + targetOffset.left + (position.my.x === 'left' ? 0 : -1 * (position.my.x === 'center' ? getOuterWidth(element) / 2 : getOuterWidth(element)));
            },
            top: () => {
                const totalOffset = position.my.offsetY + position.at.offsetY;

                return totalOffset + targetOffset.top + (position.my.y === 'top' ? 0 : -1 * (position.my.y === 'center' ? getOuterHeight(element) / 2 : getOuterHeight(element)));
            }
        };
        const alignWithAt = {
            count: {
                x: 0,
                y: 0
            },
            left: function () {
                const left = myOffset.left();
                const scrollLeft = DomHandler.getWindowScrollLeft();

                element.style.left = left + scrollLeft + 'px';

                if (this.count.x === 2) {
                    element.style.left = scrollLeft + 'px';
                    this.count.x = 0;
                } else if (left < 0) {
                    this.count.x++;
                    position.my.x = 'left';
                    position.at.x = 'right';
                    position.my.offsetX *= -1;
                    position.at.offsetX *= -1;

                    this.right();
                }
            },
            right: function () {
                const left = myOffset.left() + getOuterWidth(target);
                const scrollLeft = getWindowScrollLeft();

                element.style.left = left + scrollLeft + 'px';

                if (this.count.x === 2) {
                    element.style.left = viewport.width - getOuterWidth(element) + scrollLeft + 'px';
                    this.count.x = 0;
                } else if (left + getOuterWidth(element) > viewport.width) {
                    this.count.x++;

                    position.my.x = 'right';
                    position.at.x = 'left';
                    position.my.offsetX *= -1;
                    position.at.offsetX *= -1;

                    this.left();
                }
            },
            top: function () {
                const top = myOffset.top();
                const scrollTop = getWindowScrollTop();

                element.style.top = top + scrollTop + 'px';

                if (this.count.y === 2) {
                    element.style.left = scrollTop + 'px';
                    this.count.y = 0;
                } else if (top < 0) {
                    this.count.y++;

                    position.my.y = 'top';
                    position.at.y = 'bottom';
                    position.my.offsetY *= -1;
                    position.at.offsetY *= -1;

                    this.bottom();
                }
            },
            bottom: function () {
                const top = myOffset.top() + getOuterHeight(target);
                const scrollTop = getWindowScrollTop();

                element.style.top = top + scrollTop + 'px';

                if (this.count.y === 2) {
                    element.style.left = viewport.height - getOuterHeight(element) + scrollTop + 'px';
                    this.count.y = 0;
                } else if (top + getOuterHeight(target) > viewport.height) {
                    this.count.y++;

                    position.my.y = 'bottom';
                    position.at.y = 'top';
                    position.my.offsetY *= -1;
                    position.at.offsetY *= -1;

                    this.top();
                }
            },
            center: function (axis) {
                if (axis === 'y') {
                    const top = myOffset.top() + getOuterHeight(target) / 2;

                    element.style.top = top + getWindowScrollTop() + 'px';

                    if (top < 0) {
                        this.bottom();
                    } else if (top + getOuterHeight(target) > viewport.height) {
                        this.top();
                    }
                } else {
                    const left = myOffset.left() + getOuterWidth(target) / 2;

                    element.style.left = left + getWindowScrollLeft() + 'px';

                    if (left < 0) {
                        this.left();
                    } else if (left + getOuterWidth(element) > viewport.width) {
                        this.right();
                    }
                }
            }
        };

        alignWithAt[position.at.x]('x');
        alignWithAt[position.at.y]('y');

        if (isFunction(callback)) {
            callback(position);
        }
    }
};

export const findCollisionPosition = (position) => {
    if (position) {
        const isAxisY = position === 'top' || position === 'bottom';
        const myXPosition = position === 'left' ? 'right' : 'left';
        const myYPosition = position === 'top' ? 'bottom' : 'top';

        if (isAxisY) {
            return {
                axis: 'y',
                my: `center ${myYPosition}`,
                at: `center ${position}`
            };
        }

        return {
            axis: 'x',
            my: `${myXPosition} center`,
            at: `${position} center`
        };
    }
};

export { default as UniqueComponentId } from './UniqueComponentId';
