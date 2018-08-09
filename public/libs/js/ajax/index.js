/**
 * @desc          异步方法
 * @author        ranguangyu
 * @date          2018-08-08
 */
import Vue from 'vue'
import Axios from 'axios'
import jsonp from './jsonp'

// 只有本地 才会走接口平台 mock
if (process.env.NODE_ENV === 'development') {
  Axios.interceptors.request.use(function (config) {
    // 如果不是直接的 ajax 那么走代理
    // 默认本地接口均走代理
    if (!config.directAjax) {
      // 判断是否是本地
      config.url = 'https://www.easy-mock.com/mock/5a9100c69d9af46407651509/mock' + config.url;
    }
    return config
  });
}
// Add a response interceptor
Axios.interceptors.response.use(function (response) {
  // 数据处理
  if(typeof response.data == 'object') {
    return response.data
  }else{
    return { success: false, data: response.data }
  }
});

Vue.prototype.$ajax = Axios

Vue.prototype.$jsonp = jsonp
