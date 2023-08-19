import toast from './src/Toast'
import { withInstallFunction } from '~/utils/install'

export const Toast = withInstallFunction(toast, '$toast')
export default Toast
