export const generalMixin = {
  
    filters: {
        round (value) {
            return Math.round(value)
        }
    },

    methods: {

    	generateId () {
    		return 'eatSmarterList' + '_' + Math.random().toString(36).substr(2, 9)
    	}
    }
}