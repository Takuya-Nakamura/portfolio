$(function () {
  parseQuery = function () {
    query = location.search.slice(1)
    if (!query) return []

    arrQuery = query.split('&')
    res = {}
    arrQuery.forEach((item) => {
      arrItem = item.split('=')
      res[arrItem[0]] = decodeURIComponent(arrItem[1])
    })
    return res
  }

  setParamToForm = function (query, key, formSelector, fieldSelector) {
    val = query[key]
    if (!val) {
      console.log('no key', key)
      return
    }
    $(formSelector).val(val)
    $(fieldSelector).hide(0)
  }

  //main
  query = parseQuery()
  if (query == false) {
    console.log('exit: no query')
    return
  }
  setParamToForm(query, 'email', 'input#request_anonymous_requester_email', 'div.request_anonymous_requester_email')
  setParamToForm(query, 'app_ver', 'input#request_custom_fields_900013622183', 'div.request_custom_fields_900013622183')

})
