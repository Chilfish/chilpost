import toast from './src/method'
import { withInstallFunction } from '~/utils/install'

/**
 * Toast function
 * @example
 * $toast('message') // use the vue globalProperties
 *
 * import { Toast } from '~/appCp/Toast'
 * Toast({ message: 'message', type: 'success' })
 */
export const Toast = withInstallFunction(toast, '$toast')
export default Toast
