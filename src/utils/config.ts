const devBaseURL = 'http://www.limeichao.cn/n2'
const proBaseURL = 'http://www.limeichao.cn/n2'

const BASE_URL: string = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL
const TIME_OUT: string = process.env.VUE_APP_TIME_OUT || '5000'

export { BASE_URL, TIME_OUT }
