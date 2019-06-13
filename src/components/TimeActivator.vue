<template>

<div class="content flex-vcenter">
    
	 <div @click="active = !active">
	 	{{ active ? 'set time' : 'now' }}
	 </div>

	<select :disabled="!active" v-model="selectedHH">
	    <option v-for="n in 23" :value="n">
	        {{ n }}:00 - {{ n+1}}:00
	    </option>
	</select>

	{{ selectedHH }}

</div>
</template>

<script>

export default {
    name: 'InputValue',
    data () {
        return {
           active: false,
           selectedHH: null
        }
    },

    watch: {
    	'active' () {
    		if (!this.active) this.selectedHH = null
    	}
    },

    methods: {
      // onChange(val) {
      // 	this.selectedHH = $event.target.value
      // }  
    },

    mounted () {
       
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

select {
	font-size: 20px;
}

</style>
