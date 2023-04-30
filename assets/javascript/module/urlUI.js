// event for delete first post url
$('.deletePost').on('click', ()=>{
    $('.deletePost').parent().remove()
})

// event for add image url
$('.addPost').on('click',()=>{
    createNewPostUrl()
})

// event for delete first image url
$('.deleteImage').on('click', ()=>{
    $('.deleteImage').parent().remove()
})

// event for add image url
$('.addImage').on('click',()=>{
    createNewImageUrl()
})

// event for delete first video url
$('.deleteVideo').on('click', ()=>{
    $('.deleteVideo').parent().remove()
})

// event for add video url
$('.addVideo').on('click',()=>{
    createNewVideoUrl()
})

// event for delete time
$('.deleteTime').on('click', ()=>{
    $('.deleteTime').closest(".time-input").remove()
})

// event for add time
$('.addTime').on('click',()=>{
    console.log('aaa')
    createNewTimeSection()
})

const createNewPostUrl = ()=>{
    let $url = $(`<div class="url-input">
                    <input type="text" class="form-control style-input">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-trash deletePost" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </div>`)
    $url.find('.deletePost').on('click',()=>{
        $url.remove()
    })
    $url.insertBefore($('.addPost-block'));
    return $url
}

// create new input box to input image url
const createNewImageUrl = ()=>{
    let $url = $(`<div class="url-input">
                    <input type="text" class="form-control style-input">
                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-trash deleteImage" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </div>`)
    $url.find('.deleteImage').on('click',()=>{
        $url.remove()
    })
    $url.insertBefore($('.addImage-block'));
    return $url
}

const createNewVideoUrl = ()=>{
    let $url = $(`<div class="url-input">
        <input type="text" class="form-control style-input">
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-trash deleteVideo" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
    </div>`)
    $url.find('.deleteVideo').on('click',()=>{
        $url.remove()
    })
    $url.insertBefore($('.addVideo-block'));
    return $url
}

const getUrls = (element)=>{
    // get image url
    let Urls = []
    let UrlsElements = $(element).children()
    for(let i=1; i<= UrlsElements.length-2; i++){
        // UrlsElements is DOM element not jquery element
        let url = $(UrlsElements[i]).find('input').val()
        Urls.push(url)
    }
    return Urls
}

const showUrls = (urls, element, createNewUrl)=>{
    for(let i=0; i<urls.length; i++){
        if(i==0){
            $(element).find('input').val(urls[i])
        }
        else{
            let $url = createNewUrl()
            $url.find('input').val(urls[i])
        }
    }
}

const getTime = ()=>{
    let courseTimeList = []
    let timeElements = $('.time-block').children()
    for(let i=1; i<= timeElements.length-2; i++){
        // UrlsElements is DOM element not jquery element
        // let url = $(UrlsElements[i]).find('input').val()
        // Urls.push(url)
        let courseTime = {}
        courseTime['day'] = $(timeElements[i]).find('select').val()
        courseTime['startTime'] = $($(timeElements[i]).find('input')[0]).val()
        courseTime['endTime'] = $($(timeElements[i]).find('input')[1]).val()
        courseTimeList.push(courseTime)
    }
    return courseTimeList
}

const showTime = (courseTimeList)=>{
    console.log(courseTimeList.length)
    for(let i=0; i<courseTimeList.length-2; i++){
        if (i==0){
            $('.time-block').find('select').val(courseTimeList[i].day)
            $($('.time-block').find('input')[0]).val(courseTimeList[i].startTime)
            $($('.time-block').find('input')[1]).val(courseTimeList[i].endTime)
        }
        else{
            let timeElement = createNewTimeSection()
            timeElement.find('select').val(courseTimeList[i].day)
            $(timeElement.find('input')[0]).val(courseTimeList[i].startTime)
            $(timeElement.find('input')[1]).val(courseTimeList[i].endTime)
        }
    }
}

const createNewTimeSection = ()=>{
    let $time = $(`<div class="time-input">
                    <div class="row">
                    <div class="col-lg-6">
                        <label for="">选择: </label>
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-trash deleteTime" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </div>
                    </div>
                    <div class="row">
                    <div class="col-lg-6">
                        <label for="day">星期:</label>
                        <select class="form-control">
                        <option value="">选择</option>
                        <option value="Monday">星期一</option>
                        <option value="Tuesday">星期二</option>
                        <option value="Wednesday">星期三</option>
                        <option value="Thursday">星期四</option>
                        <option value="Friday">星期五</option>
                        <option value="Saturday">星期六</option>
                        <option value="Sunday">星期日</option>
                        </select>
                    </div>
                    </div>
                    
                    <div class="row" style="margin-top: 0.5em;">
                    <div class="col-lg-6">
                        <label for="">上课: </label>
                        <input type="time" class="form-control">
                    </div>
                    <div class="col-lg-6">
                        <label for="">下课: </label>
                        <input type="time" class="form-control">
                    </div>
                    </div>
                </div>`)
    $time.find('.deleteTime').on('click',()=>{
        $time.find('.deleteTime').closest(".time-input").remove()
    })
    $time.insertBefore($('.addTime-block'));
    return $time
}