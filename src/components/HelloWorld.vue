<template>
  <div class="hello">
    <InputIngredient
        ref="input"
        v-if="state === 'add-element'"
    />
    <InputValue
        @add="add" 
        v-if="state === 'add-element'"
    />

    <ConsumedList
        :consumedList="consumedList"
        @remove="remove"
        v-if="state === 'show-list'"
    />

    <AddElement
        ref="addElement"
        @onClick="changeState('add-element')"
        v-if="state === 'show-list'"
    />

  </div>
</template>

<script>

import InputIngredient from './InputIngredient'
import InputValue from './InputValue'

import ConsumedList from './ConsumedList'
import AddElement from './AddElement'

import { store } from '../mixins/store'
export default {
    name: 'HelloWorld',
    data () {
        return {
            consumedList: [],
            state: 'show-list'
        }
    },

    components: {
        InputIngredient,
        InputValue,
        ConsumedList,
        AddElement
    },

    mixins: [
        store
    ],

    methods: {
        add (consumedVal, time) {
            if (!this.$refs.input.selectedItem) return
            if (!consumedVal) return

            const makeObj = (val) => { return {
                name: val.name,
                val: val.value / 100 * consumedVal,
                unit: val.unit 
            }}

            var item = {
                name: this.$refs.input.selectedItem.name,
                value: consumedVal,
                nutrients: this.$refs.input.selectedItemNutrients.map(n => makeObj(n)),
                key: this.generateId(),
                time: new Date().getTime()
            }
            this.consumedList.push(item)
            this.$_store_add({ key: item.key, value: item })
            
            this.state = 'show-list'
        },

        remove (item) {
            var index = this.consumedList.findIndex(r => r.name === item.name)
            this.consumedList.splice(index, 1)
            this.$_store_remove({ key: item.key })
        },

        changeState (val) {
            this.state = val
        }
    },

    mounted () {
        if (this.savedList.length > 0) {
            this.consumedList = this.savedList
        }  
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* >>> .flex {
    display: flex;
}

* >>> .flex-vcenter {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
