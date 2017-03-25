import axios from 'axios'
import marked from 'marked'

var baseUrl = 'http://localhost:3000'

export default function (context, next) {
  var route = context.route
  if (route.name) {
    var url = baseUrl

    if (route.name === 'log') url += '/posts/'
    else url += '/pages/'

    url += `${route.name}.md`

    axios.get(url)
      .then((res) => {
        context.html = marked(res.data)
        next()
      })
      .catch((e) => {
        next()
      })
  } else next()
}
