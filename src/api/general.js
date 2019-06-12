import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

export class GeneralApi {
	constructor () {
		// to do to replace to .env
		this.key = process.env.API_KEY
		// this.url = process.env.VUE_APP_API_URL
		// this.access_token = container.get('services.oauth').getToken()
	}

	search (params) {
		if (!params) var params = {}

		params.api_key = this.key
		params.format = 'json'
		params.max = '25'
		params.offser = '0'

		return Vue.http.get('https://api.nal.usda.gov/ndb/search/?' + this.parseParams(params))
	}

	getNutrition (params) {
		if (!params) var params = {}

		params.api_key = this.key
		params.format = 'json'
		params.type = 'b'

		return Vue.http.get('https://api.nal.usda.gov/ndb/reports/?' + this.parseParams(params))
	}

	parseParams (params) {
		var keysArray = Object.keys(params)
		return keysArray.map(key => `${key}=${params[key]}`).join('&')
	}
}
