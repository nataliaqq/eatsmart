<template>

<div class="content">
    <div class="flex-vcenter">
        <div>
            Consumed value:
        </div>
        <div class="flex-vcenter">
            <input
                class="small"
                v-model="consumedValue"
            />
            <div>
                g
            </div>
        </div>
    </div>
    <button @click="add()">
        Add to daily list
    </button>

    <TimeActivator ref="timeActivator" @onChangeTime="changeTime"/>
   
</div>
</template>

<script>

import TimeActivator from './TimeActivator'
export default {
    name: 'InputValue',
    data () {
        return {
           consumedValue: 100,
           selectedTime: null
        }
    },

    components: {
        TimeActivator
    },

    methods: {
        add () {
            if (isNaN(this.consumedValue)) return
            this.$emit('add', this.consumedValue, this.selectedTime)
            this.clearValue()
        },
        clearValue () {
            this.consumedValue = 100
        },

        changeTime (value) {
            this.selectedTime = value
        }
    },

    mounted () {
       
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
    margin: 10px 0;
}
input {
    padding: 10px;
    font-size: 20px;
    width: 100%;
    max-width: 200px;
    margin: 0 10px;
}

input.small {
    width: auto;
}

button {
    font-size: 20px;
    width: 100%;
    padding: 10px;
    margin: 10px 0;
}

</style>
