// 对请求发送前进行token的添加
// 对回复内容的拦截 鉴定http返回码 使用户跳转到404页面或无权限页面或登录页面
import axios from 'axios'

const myAxios = axios.create()
myAxios.interceptors.request.use(
    (config) => {

    }, (err) => {

    })
myAxios.interceptors.response.use(
    (res) => {

    },
    (err) => {

    })