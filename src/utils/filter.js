import Vue from 'vue'

import { Time } from './tool'
Vue.filter('formatTime', function (tempData) {
  return Time(tempData, 1)
})

Vue.filter('formatTimeHour', function (tempData) {
  return Time(tempData, 2)
})
