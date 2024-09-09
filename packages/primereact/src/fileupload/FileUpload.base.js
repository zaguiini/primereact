import { createSafeComponent } from '@primereact/core/utils';
import { style } from '@primereact/styles/fileupload';
import { defaultProps } from './FileUpload.props';

export const useFileUpload = createSafeComponent(defaultProps, style);
