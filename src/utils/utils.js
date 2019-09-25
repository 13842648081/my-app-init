import cookies from 'js-cookie'

export function logoutRemoveCookie () {
  removeCookie('ACCESS_TOKEN')
}

export function formatCurrency (num, positive) {
  if (!positive) {
    positive = ''
  }
  if (num) {
    let number = num.toString()

    if (number === '' || isNaN(number)) {
      return num
    }

    if (number.indexOf('-') > 0) {
      return num
    }

    let sign = number.indexOf('-') === 0 ? '-' : positive
    if (sign === '-') {
      number = number.substr(1)
    }

    let cents = number.indexOf('.') > 0 ? number.substr(number.indexOf('.')) : ''
    cents = cents.length > 1 ? cents : ''

    number = number.indexOf('.') > 0 ? number.substring(0, (number.indexOf('.'))) : number

    if (cents === '') {
      if (number.length > 1 && number.substr(0, 1) === '0') {
        return num
      }
    } else {
      if (number.length > 1 && number.substr(0, 1) === '0') {
        return num
      }
    }

    let tempNum = ''
    while (number.length > 3) {
      tempNum = ',' + number.slice(-3) + tempNum
      number = number.slice(0, number.length - 3)
    }
    if (number) {
      tempNum = number + tempNum
    }

    return (sign + tempNum + cents)
  } else {
    return num
  }
}

export function hasClass (elem, cls) {
  cls = cls || ''
  if (cls.replace(/\s/g, '').length === 0) return false
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ')
}

export function addClass (elem, cls) {
  if (!hasClass(elem, cls)) {
    elem.className = elem.className === '' ? cls : elem.className + ' ' + cls
  }
}

export function removeClass (elem, cls) {
  if (hasClass(elem, cls)) {
    let newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' '
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ')
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '')
  }
}

export function removeClassList (elem, classList) {
  if (classList && classList.length) {
    classList.forEach(cls => {
      removeClass(elem, cls)
    })
  }
}

export function getOffset (obj) {
  let top = 0
  let left = 0
  if (obj) {
    while (obj.offsetParent) {
      top += obj.offsetTop
      left += obj.offsetLeft
      obj = obj.offsetParent
    }
  }

  return {
    top,
    left
  }
}

export function scriptLoader (url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    script.async = true
    script.addEventListener('load', resolve)
    script.addEventListener('error', reject)
    document.body.appendChild(script)
  })
}

export function platform () {
  const u = navigator.userAgent
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  return isiOS ? 'IOS' : 'AOS'
}

export function logoutProcess () {
  logoutRemoveCookie()
  location.href = '/'
}

export function isLogin () {
  if (!cookies.get('ACCESS_TOKEN') || cookies.get('ACCESS_TOKEN').length === 0) {
    return false
  } else {
    return true
  }
}

export function getUrlParam (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2]); return null
}

export function loginAndBack (router, route) {
  if (!isLogin()) {
    router.push({
      path: '/member/login',
      query: {
        redirect: `${location.protocol}//${location.host}${route.fullPath}`
      }
    })
    return false
  }
  return true
}

export function isPC () {
  if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
    return false
  } else {
    return true
  }
}

export function randomRange (n1, n2) {
  return Math.floor((Math.random() * (n2 - n1 + 1)) + n1)
}

export function getBrowser () {
  const userAgent = navigator.userAgent
  if (userAgent.indexOf('OPR') > -1) {
    return 'Opera'
  }
  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF'
  }
  if (userAgent.indexOf('Trident') > -1) {
    return 'IE'
  }
  if (userAgent.indexOf('Edge') > -1) {
    return 'Edge'
  }
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome'
  }
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari'
  }
}

export function setSoldOut (options) {
  if (options.children && options.children.length) {
    let haveCnt = true
    options.children.forEach(item => {
      if (!setSoldOut(item)) {
        haveCnt = false
      }
    })
    options.soldOut = haveCnt
  } else {
    options.soldOut = options.stockCnt === 0
  }
  return options.soldOut
}

export function formatOptionTitle (optionUsed, optionType, optionName, optionValue, addPrice) {
  let optionTitle = ''
  if (optionUsed && optionType !== 'PRODUCT_ONLY') {
    let names = optionName.split('|')
    let values = optionValue.split('|')
    for (let i = 0; i < names.length; i++) {
      if (i > 0) {
        optionTitle += ' / '
      }
      optionTitle += names[i]
      optionTitle += ':'
      optionTitle += values[i]
    }
    if (addPrice && addPrice !== 0) {
      optionTitle += '('
      optionTitle += addPrice > 0 ? '+' : ''
      optionTitle += formatCurrency(addPrice)
      optionTitle += ')'
    }
  }
  return optionTitle
}

export function checkBanner (banner) {
  if (banner && banner[0] && banner[0].accounts && banner[0].accounts[0] && banner[0].accounts[0].banners) {
    return true
  } else {
    return false
  }
}

export function setOrderInfoInStorage (products, fromUrl) {
  deleteOrderInfoInStorage()
  const orderInfo = {
    option: JSON.stringify(products),
    fromUrl: fromUrl
  }
  window.localStorage.orderInfo = JSON.stringify(orderInfo)
}

export function deleteOrderInfoInStorage () {
  delete window.localStorage.orderInfo
}

export function popupfixBodyForShow () {
  let body = document.getElementsByTagName('body')[0]
  const currScroll = body.scrollTop | document.documentElement.scrollTop
  const bodyScrollTop = currScroll * -1
  body.style.top = bodyScrollTop + 'px'
  body.classList.add('no_scroll')
  window.scrollTo(0, bodyScrollTop * -1)
  return bodyScrollTop
}

export function popupReleaseBodyForClose (bodyScrollTop) {
  let body = document.getElementsByTagName('body')[0]
  body.classList.remove('no_scroll')
  body.style.top = '0px'
  window.scrollTo(0, bodyScrollTop * -1)
  return 0
}

export function popupReleaseBodyForNaviBack () {
  let body = document.getElementsByTagName('body')[0]
  body.classList.remove('no_scroll')
  return 0
}
/**
 * PC,MO 쿠기 공유
 * @param {*} name
 * @param {*} value
 * @param {*} maxAge(단위:s)
 */
export function setCookie (name, value, maxAge) {
  if (process.env.VUE_APP_BUILD_ENV !== 'dev') {
    cookies.set(name, value, { 'max-age': maxAge, 'secure ': true })
  } else {
    cookies.set(name, value, { 'max-age': maxAge })
  }
}
/**
 * romove 공유 쿠기
 * @param {*} name
 */
export function removeCookie (name) {
  cookies.remove(name)
}

export function uniqueArr (arr) {
  var x = new Set(arr)
  return [...x]
}
/** 将str中的转义字符还原成html字符 */
export function toHtml (str) {
  return str ? str.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, function (m) {
    return {
      '&lt;': '<',
      '&amp;': '&',
      '&quot;': '"',
      '&gt;': '>',
      '&#39;': "'",
      '&nbsp;': ' '
    }[m]
  }) : ''
}

export function unhtmlForUrl (str, reg) {
  return str ? str.replace(reg || /[<">']/g, function (a) {
    return {
      '<': '&lt;',
      '&': '&amp;',
      '"': '&quot;',
      '>': '&gt;',
      "'": '&#39;'
    }[a]
  }) : ''
}

const xss = require('xss')
function cssfilter (value) {
  /* eslint-disable */
  var REGEXP_DEFAULT_ON_TAG_ATTR_7 = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi
  var REGEXP_DEFAULT_ON_TAG_ATTR_4 = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi
  var REGEXP_DEFAULT_ON_TAG_ATTR_8 = /u\s*r\s*l\s*\(.*/gi
  // `expression()`
  REGEXP_DEFAULT_ON_TAG_ATTR_7.lastIndex = 0
  if (REGEXP_DEFAULT_ON_TAG_ATTR_7.test(value)) {
    return ''
  }
  // `url()`
  REGEXP_DEFAULT_ON_TAG_ATTR_8.lastIndex = 0
  if (REGEXP_DEFAULT_ON_TAG_ATTR_8.test(value)) {
    REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0
    if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
      return ''
    }
  }
  return value
}
export function onTagAttr (tag, name, value, isWhiteAttr) {
  if (name === 'style') {
    return `${name}="${cssfilter(value)}"`
  }
}
export function xssFilter (innerText) {
  // get a copy of default whiteList
  const whiteList = xss.getDefaultWhiteList()

  // allow style attribute for td tag
  whiteList.td.push('style')
  whiteList['strike'] = []
  // specified you custom whiteList
  const myxss = new xss.FilterXSS({
    whiteList,
    css: false,
    stripIgnoreTagBody: true,
    onTagAttr: onTagAttr
  })
  // do what you want
  return myxss.process(innerText)
}
export function isPCDevice () {
  return /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) === false
}