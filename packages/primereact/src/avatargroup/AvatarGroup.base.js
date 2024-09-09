import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/avatargroup';
import { defaultProps } from './AvatarGroup.props';

export const useAvatarGroup = createSafeComponent(defaultProps, style);
