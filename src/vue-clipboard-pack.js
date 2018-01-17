import Clipboard from 'clipboard'

if (!Clipboard) {
    throw new Error('you shold npm install `clipboard` --save at first ')
}

var vueClipboard = {
    install: function(Vue) {
        // directive
        Vue.directive('clipboard', directiveClipboard)
        // direct
        Vue.prototype.$copyText = copyText
        Vue.prototype.$cutText = cutText
    }
}

// directive
/*
 * @driective
 * :copy       string        copy
 * :cut        string        cut
 * :success    function      success CallBack
 * :error      function      error CallBack
 */
let directiveClipboard = {
    bind: function(el, binding, vnode) {
        let vm = vnode.context
        if (binding.arg === 'success') {
            el.v_clipboard_success = binding.value
        } else if (binding.arg === 'error') {
            el.v_clipboard_error = binding.value
        } else if (binding.arg === 'copy' || binding.arg === 'cut') {
            const clipboard = new Clipboard(el, {
                text: () => binding.value
            })
            clipboard.on('success', e => {
                if (binding.arg === 'cut') {
                    vm[binding.expression] = ''
                    e.action = 'cut'
                }
                const callback = el.v_clipboard_success
                callback && callback(e)
            })
            clipboard.on('error', e => {
                if (binding.arg === 'cut') {
                    e.action = 'cut'
                }
                const callback = el.v_clipboard_error
                callback && callback(e)
            })
            el.v_clipboard = clipboard
        }
    },
    update: function(el, binding) {
        if (binding.arg === 'success') {
            el.v_clipboard_success = binding.value
        } else if (binding.arg === 'error') {
            el.v_clipboard_error = binding.value
        } else if (binding.arg === 'copy' || binding.arg === 'cut') {
            el.v_clipboard.text = () => binding.value
        }
    },
    unbind: function(el, binding) {
        if (binding.arg === 'success') {
            delete el.v_clipboard_success
        } else if (binding.arg === 'error') {
            delete el.v_clipboard_error
        } else {
            el.v_clipboard.destroy()
            delete el.v_clipboard
        }
    }
}

// direct
/*
 * @params
 * text:       string     copy text
 *
 * @callback
 * success:    function
 * error:      function
 */
let copyText = (text) => {
    let el = document.createElement('button')
    return new Promise((resolve, reject) => {
        const clipboard = new Clipboard(el, {
            action: () => 'copy',
            text: () => text
        })
        clipboard.on('success', (e) => {
            resolve(e)
            clipboard.destroy()
        })
        clipboard.on('error', (e) => {
            reject(e)
            clipboard.destroy()
        })
        el.click()
    })
}

/*
 * @params
 * target:      dom        Only for input and textarea
 *
 * @callback
 * success:     function
 * error:       function
 */
let cutText = (target) => {
    let el = document.createElement('button')
    return new Promise((resolve, reject) => {
        const clipboard = new Clipboard(el, {
            action: () => 'cut',
            target: () => target
        })
        clipboard.on('success', (e) => {
            resolve(e)
            clipboard.destroy()
        })
        clipboard.on('error', (e) => {
            reject(e)
            clipboard.destroy()
        })
        el.click()
    })
}

export default vueClipboard
