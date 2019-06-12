export const store = {
	data () {
		return {
			store: null,
			savedList: []
		}
	},
      methods: {
        $_store_add (params) {
        	if (!this.store) return
        	if (!params) return
        	if (!params.value) return
        	if (!params.key) return

        	var object = {
        		value: params.value,
        		timestamp: new Date().getTime(),
        	}
			this.store.setItem(params.key, JSON.stringify(object))
        },

        $_store_remove (params) {
        	if (!this.store) return
        	if (!params) return
        	if (!params.key) return
        	this.store.removeItem(params.key)
        },

        $_store_checkTimestamp (params) {
        	if (!this.store) return
        	if (!params) return
        	if (!params.key) return

        	var object = JSON.parse(this.store.getItem(params.key))
			var dateString = object.timestamp
			var now = new Date().getTime().toString()

			const compareTime = (date1, date2) => {
				// the following is to handle cases where the times are on the opposite side of
				// midnight e.g. when you want to get the difference between 9:00 PM and 5:00 AM

				if (date2 < date1) {
				    date2.setDate(date2.getDate() + 1)
				}

				var diff = date2 - date1
				var msec = diff
				var hh = Math.floor(msec / 1000 / 60 / 60)
				msec -= hh * 1000 * 60 * 60;
				var mm = Math.floor(msec / 1000 / 60);
				msec -= mm * 1000 * 60;
				var ss = Math.floor(msec / 1000);
				msec -= ss * 1000;

				return hh >= 24
			}
			
        	return compareTime(dateString, now)
        },

        $_store_restoreList () {
        	if (!this.store) return
        	for (var i = 0; i < this.store.length; i++) {
	    		var key = this.store.key(i)
	    		if (key.includes('eatSmarterList')) {
	    			if (this.$_store_checkTimestamp({ key: key })) {
	    				this.$_store_remove({ key: key })
	    			} else {
	    				this.savedList.push(JSON.parse(this.store.getItem(key)).value)
	    			}
	    		}
			}
        }
    },

    mounted () {
    	this.store = window.localStorage
   		this.$_store_restoreList()
    }
}