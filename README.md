# vue-clipboard-pack

> A Vue.js directive to Copy or Cut

## Install
```
$ npm install vue-clipboard-pack
```

## Usage
```javascript
import Vue from 'vue'
import vueClipboard from 'vue-clipboard-pack'

Vue.use(vueClipboard)
```

or

```html
<script src="vue.min.js"></script>
<!-- must place this line after vue.js -->
<script src="vue-clipboard-pack.min.js"></script>
```

## Example
```html
<template>
    <div id="example">
        <!-- directive -->
        <input type="text" v-model="directiveCopy">
        <button type="button" v-clipboard:copy="directiveCopy" v-clipboard:success="onSuccess" v-clipboard:error="onError">Copy!</button>

        <input type="text" v-model="directiveCut">
        <button type="button" v-clipboard:cut="directiveCut" v-clipboard:success="onSuccess" v-clipboard:error="onError">Cut!</button>

        <!-- direct -->
        <input type="text" v-model="directCopy">
        <button type="button" @click="onCopy(directCopy)">Copy!</button>

        <input id="cutInput" type="text" v-model="directCut">
        <button type="button" @click="onCut">Cut!</button>
    </div>
</template>

<script>
export default {
    name: 'example',
    data() {
        return {
            directiveCopy: 'directiveCopy text',
            directiveCut: 'directiveCut text',
            directCopy: 'directCopy text',
            directCut: 'directCut text'
        }
    },
    methods: {
        onSuccess(e) {
            console.log(e)
        },
        onError(err) {
            console.log(err)
        },
        onCopy(val) {
            this.$copyText(val)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        },
        onCut() {
            // Only for input and textarea
            let element = this.$el.querySelector('#cutInput')
            this.$cutText(element)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
```


## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present，uncleLian