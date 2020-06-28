module.exports={
  email: /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/i,
  username: /^[A-Za-z0-9_-]+$/,
  name: /^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,
  phone: /0?(13|14|15|18)[0-9]{9}/,
  password: /^[A-Za-z0-9_-]+$/,
  number: /^([+-]?)\d*\.?\d+$/,
  QQ: /^[1-9]*[1-9][0-9]*$/
}
