export const messageDialog = (message, callback, self) => {
  self
    .$confirm(message, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    .then(() => {
      self.$message({
        type: 'success',
        message: '删除成功!'
      })
      callback()
    })
    .catch(() => {
      self.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
}

export const fullScreen = (selector) => {
  const el = document.getElementById(selector)
  var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen
  var wscript

  if (typeof rfs !== 'undefined' && rfs) {
    rfs.call(el)
    return
  }

  if (typeof window.ActiveXObject !== 'undefined') {
    wscript = new ActiveXObject('WScript.Shell')
    if (wscript) {
      wscript.SendKeys('{F11}')
    }
  }
}

export const setUpWatchersUtils = (watchList, formList, unWatchlist, form, callback, self) => {
  for (const i in watchList) {
    const formItem = formList[i]
    const watchItem = watchList[i]
    const unWatch = self.$watch(watchItem, (newValue) => {
      const item = {}
      item[formItem] = newValue
      callback(watchItem, newValue, { ...form, ...item })
    })

    unWatchlist.push(unWatch)
  }
}

export const setFormDataUtils = (
  val,
  filterFormItem,
  form,
  initParametData,
  filter,
  difference,
  setallformItemData,
  getFormItemData,
  initForm,
  unWatchlist,
  mapKeys,
  keys,
  forEach,
  callback,
  self
) => {
  // 表单全部项
  const allformItemList = filterFormItem(val, form.format)
  // 表单高级选项
  const adformItemList = filter(allformItemList, (item) => {
    return item.advanced
  })
  // 表单基本项
  const formItemList = difference(allformItemList, adformItemList)

  // let data = this.realtime.initParametData;

  const allformItemData = setallformItemData(initParametData)

  const adformItemData = getFormItemData(adformItemList, allformItemData)

  // 初始化表单数据

  // console.log("//初始化表单数据");
  // console.log("form", form);
  // console.log("initParametData", initParametData);
  // console.log(
  //   "setallformItemData(initParametData)",
  //   setallformItemData(initParametData)
  // );
  initForm({
    ...form,
    ...setallformItemData(initParametData)
  })

  // add dynamic watched

  const formkeys = mapKeys(form, function(value, key) {
    return 'form.' + key
  })

  // 注销 watch
  // if (unWatchlist.length != 0) {
  //   console.log('if (unWatchlist.length != 0) {',unWatchlist);
  //   forEach(unWatchlist, unWatch => {
  //     unWatch();
  //   });
  //   unWatchlist = [];
  // }
  forEach(unWatchlist, (unWatch) => {
    unWatch()
  })
  unWatchlist = []
  // this.setUpWatchers(keys(formkeys), keys(this.form));

  setUpWatchersUtils(
    keys(formkeys),
    keys(form),
    unWatchlist,
    form,
    (watchItem, newValue, formData) => {
      callback(watchItem, newValue, formData)
    },
    self
  )

  return {
    formItemList: formItemList,
    adformItemList: adformItemList,
    adformItemData: adformItemData
  }
}

export const timeDifference = (startTime, endTime) => {
  const start = typeof startTime === 'number' ? startTime : new Date(startTime).getTime()
  const end = typeof endTime === 'number' ? endTime : new Date(endTime).getTime()
  const difference = end - start // 时间差的毫秒数
  const days = Math.floor(difference / (24 * 3600 * 1000)) // 计算出相差天数
  const leave1 = difference % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000)) // 计算相差分钟数
  const leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000)) // 计算相差秒数
  const leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000)
  return `运行${days}天${hours}小时${minutes}分钟${seconds}秒`
}

export const parseParams = (data) => {
  try {
    var tempArr = []
    for (var i in data) {
      var key = encodeURIComponent(i)
      var value = encodeURIComponent(data[i])
      tempArr.push(key + '=' + value)
    }
    var urlParamsStr = tempArr.join('&')
    return urlParamsStr
  } catch (err) {
    return ''
  }
}

export const deleteEmptyProperty = (object) => {
  for (var i in object) {
    var value = object[i]
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length == 0) {
          delete object[i]
          continue
        }
      }
      this.deleteEmptyProperty(value)
      if (isEmpty(value)) {
        delete object[i]
      }
    } else {
      if (value === '' || value === null || value === undefined) {
        delete object[i]
      } else {
      }
    }
  }

  return object
}

export const isEmpty = (object) => {
  for (var name in object) {
    return false
  }
  return true
}

export const getRequest = (urlStr) => {
  if (typeof urlStr === 'undefined') {
    var url = decodeURI(location.search) // 获取url中"?"符后的字符串
  } else {
    var url = '?' + urlStr.split('?')[1]
  }
  var theRequest = new Object()
  if (url.indexOf('?') != -1) {
    var str = url.substr(1)
    var strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
    }
  }
  return theRequest
}
