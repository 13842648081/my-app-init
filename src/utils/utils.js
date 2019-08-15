import cookies from 'js-cookie'
// import { deleteOrderInfoInStorage } from '@/utils/orderUtils'
// import { getToday, addDay } from '@/utils/dateUtils'

export function logoutRemoveCookie () {
  cookies.remove('NCP_CLIENT_ACCESS_TOKEN')
  cookies.remove('CREAS_MEMBER_NAME')
  cookies.remove('creasMallMainPop')
  cookies.remove('guestToken')
  cookies.remove('RECENT_GOODS')
  // deleteOrderInfoInStorage()
  delete window.localStorage.recentWords
  delete window.localStorage.cartInfo
  delete window.localStorage.oauthInfo
  delete window.localStorage.oauthLoginInfo
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
  if (!cookies.get('NCP_CLIENT_ACCESS_TOKEN') || cookies.get('NCP_CLIENT_ACCESS_TOKEN').length === 0) {
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
