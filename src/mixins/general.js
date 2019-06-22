export const generalMixin = {
  
    filters: {
        round (value) {
            return Math.round(value)
        },

        formatTime (date) {
            var time = new Date(date)
            var month = time.getMonth() + 1
            var day = time.getDate()
            var year = time.getFullYear()
            var hour = time.getHours()
            var minutes = time.getMinutes()

            const isToday = (someDate) => {
              let today = new Date()
              return someDate.getDate() == today.getDate() &&
                someDate.getMonth() == today.getMonth() &&
                someDate.getFullYear() == today.getFullYear()
            }

            return hour + ":" + minutes + " " + (isToday(time) ? 'today' : 'yesterday')
        }
    },

    methods: {
    	generateId () {
    		return 'eatSmarterList' + '_' + Math.random().toString(36).substr(2, 9)
    	}
    }
}