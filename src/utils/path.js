const env = 'prop'
const upPath = env === 'dev' ? 'http://192.168.1.3:9999' : 'http://47.93.238.152:80'
const reqPath = env === 'dev' ? 'http://192.168.1.3:5001' : 'http://47.93.238.152:5001/'
export {
  upPath,
  reqPath
}
