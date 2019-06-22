<template>
<div class="content">
  <div class="flex-center">now</div>
  <div class="flex-center divider"> ----- or -----</div>
  <div class="flex-vcenter">
      <div
        class="checkbox"
        @click="active = !active"
        :class="{ 'active': active }"
      />  
    	 <div >
    	 	set time
    	 </div>

    	<select :disabled="!active" v-model="selectedHH" @change="update()">
    	    <option v-for="n in hoursYesterday()" :value="n">
    	        {{ n }}:00 - {{ (n+1 === 24) ? '00': n+1 }}:00
              {{ 'yesterday' }}
    	    </option>
          <option v-for="n in hoursToday()" :value="n">
              {{ n }}:00 - {{ (n+1 === 24) ? '00': n+1 }}:00
              {{ 'today' }}
          </option>
    	</select>
  </div>
</div>
</template>

<script>
import { generalMixin } from '../mixins/general'

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

    mixins: [generalMixin],

    methods: {
      update () {
        this.$emit('onChangeTime', 
          this.modTime()
        )
      },

      modTime () {
        var now = new Date()
        var modYesterday = new Date()
        modYesterday.setDate(modYesterday.getDate() - 1)
        modYesterday.setHours(this.selectedHH,0)

        var modToday = new Date()
        modToday.setHours(this.selectedHH,0)

        return modToday > now ? modYesterday.getTime() : modToday.getTime()
      },

      getTodayHour () {
        var now = new Date()
        return now.getHours()
      },

      hoursToday () {
        var h = []
        for (var i = 0; i <= this.getTodayHour(); i++) {
          h.push(i)
        }
        return h
      },

      hoursYesterday () {
        var h = []
        for (var i = this.getTodayHour() + 1; i < 24; i++) {
          h.push(i)
        }
        return h
      }
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

.checkbox {
  width: 20px;
  height: 20px;
  border: 1px solid grey;
  border-radius: 4px;
  opacity: 0.5;
  cursor: pointer;
}

.checkbox.active {
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkbox.active::after {
  content: 'v';
}


</style>
