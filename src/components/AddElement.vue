<template>
    <div class="bottom-bar" v-if="active" @click="$emit('onClick')">
        <div>Add food</div>
    </div>
</template>

<script>

export default {
    name: 'AddElement',
    data () {
        return {
           active: true
        }
    },

    methods: {
        hide () {
            this.active = false
        },
        show () {
            this.active = true
        }

    },

    mounted () {
       
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom-bar {
    cursor: pointer;
    background-color: #ededed;
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100px;
    width: 100px;
    border: 1px solid #ededed;
    border-radius: 50%;

    box-shadow: 2px grey grey;

    display: flex;
    justify-content: center;
    align-items: center;

    margin: 10px;
}

</style>
