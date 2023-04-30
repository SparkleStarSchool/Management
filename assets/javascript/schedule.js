$(document).ready(() => {
  // get the date of today
  let nowDate = getCurrentTime().split('T')[0]
  // get infor from database to create time table
  let result = []
  db.ref('teaching').get().then((snapshot) => {
    if (snapshot.val() != null) {
      for (let [key, value] of Object.entries(snapshot.val())) {
        // add coming class
        if (value.startDate == '') {
          $textForComing = $(`<li class='li-layout'>${value.name}</li>`)
          // $($($('.table-layout').find('.card-body')[7]).find('ul').find('li')[1]).append($textForComing)
          // let html = $($($('.table-layout').find('.card-body')[7]).find('ul').find('li')[1]).html()
          // html = html + `<br>${value.name}`
          // console.log(html)
          // $($($('.table-layout').find('.card-body')[7]).find('ul').find('li')[1]).html(html)
          // console.log($($($('.table-layout').find('.card-body')[7]).find('ul').find('li')[1]).html())
          $($('.table-layout').find('.card-body')[7]).find('ul').append($textForComing)
        }
        if (nowDate > value.startDate && nowDate < value.endDate) {
          let color = Number(value.studentCapacity) - Number(value.studentCount)
          value.courseTime.forEach(courseTime => {
            result.push({
              day: courseTime.day, startTime: courseTime.startTime,
              endTime: courseTime.endTime, startDate: value.startDate,
              endDate: value.endDate, name: value.name, color: color
            })
          })
        }
      }
      result.sort((a, b) => {
        return a.startTime > b.startTime ? 1 : -1
      })
      result.forEach((item) => {
        let dayTable = { 'Monday': 0, 'Tuesday': 1, 'Wednesday': 2, 'Thursday': 3, 'Friday': 4, 'Saturday': 5, 'Sunday': 6 }
        // let theDate = getTheDay(item.startDate)

        let $text = $(`<li>
                      ${item.startTime}-${item.endTime} ${item.name}
                    </li>`)
        // set color for not empty class
        if (item.color > 0) {
          $text.find('p').css('color', 'rgb(255, 132, 0)')
          $text.addClass('colorStyle')
          // $text.append("<style>li::marker{color:rgb(255, 132, 0)}</style>");
        }
        $($('.table-layout .card')[dayTable[item.day]]).find('ul').append($text)
      })
    }
  })
})

const formatTime = (time) => {
  return time < 10 ? "0" + time.toString() : time.toString();
};
const getCurrentTime = () => {
  let current = new Date();
  let year = current.getFullYear().toString();
  let month = formatTime(current.getMonth() + 1);
  let date = formatTime(current.getDate());
  let hour = formatTime(current.getHours());
  let minute = formatTime(current.getMinutes());
  let currentTime = year + "-" + month + "-" + date + "T" + hour + ":" + minute;
  return currentTime;
};
const getTheDay = (startDate) => {
  let parts = startDate.split('-')
  let year = parseInt(parts[0], 10)
  let month = parseInt(parts[1], 10) - 1
  let day = parseInt(parts[2], 10)
  let date = new Date(year, month, day)
  let theDate = date.getDay();
  if (theDate == 0) {
    theDate = 6
  } else {
    theDate = theDate - 1
  }
  return theDate
}
