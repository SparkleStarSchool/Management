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
    for(let i=1; i<=UrlsElements.length-2; i++){
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