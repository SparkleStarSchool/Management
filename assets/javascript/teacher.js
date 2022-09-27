$(document).ready(()=>{
    // show adding new teacher
    $('.adding-block').css('display', 'block')

    // get teacher name from db
    db.ref("teacher").get().then((snapshot)=>{
        for(let [key, value] of Object.entries(snapshot.val())){
            $option = $(`<option value=${key}>${value.name}</option>`)
            $('#teacher-name').append($option)
        }
    })

    // event for teacher name dropdown
    $('#teacher-name').on('change',()=>{
        let teacherID=$("#teacher-name").val()
        if(teacherID!=''){
            // hide adding new teacher
            $('.adding-block').css('display', 'none')
            //get teacher infor
            db.ref("teacher").child(teacherID).get().then((snapshot)=>{
                let teacherInfor = snapshot.val()
                console.log(teacherInfor)
                $('#teacher-outline').val(teacherInfor.outline)
                // set image urls and video urls
                console.log(teacherInfor.imageUrls)
                if(typeof teacherInfor.imageUrls != 'undefined'){
                    for(let i=0; i<teacherInfor.imageUrls.length; i++){
                        if(i==0){
                            $('.image-block').find('input').val(teacherInfor.imageUrls[i])
                        }
                        else{
                            let $url = createNewImageUrl()
                            $url.find('input').val(teacherInfor.imageUrls[i])
                        }
                    }
                }
                if(typeof teacherInfor.videoUrls != 'undefined'){
                    for(let i=0; i<teacherInfor.videoUrls.length; i++){
                        if(i==0){
                            $('.video-block').find('input').val(teacherInfor.videoUrls[i])
                        }
                        else{
                            let $url = createNewVideoUrl()
                            $url.find('input').val(teacherInfor.videoUrls[i])
                        }
                    }
                }
            })
        }else{
            // show adding new course
            $('.adding-block').css('display', 'block')
            $('#teacher-outline').val('')
        }
    })

    // add new teacher
    $('.add-btn').on('click',()=>{
        let teacherName = $('#teacher-add').val()
        if(teacherName != ''){
            let teacherID = getRandomKey()
            db.ref("teacher")
            .child(teacherID)
            .set({ name: teacherName})
            .then(() => {
                // refresh page
                location.reload();
            })
        }
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

    // save teacher infor
    $('#teacher-save').on('click',()=>{
        let teacherID = $('#teacher-name').val()
        let outline = $('#teacher-outline').val()
        // get image url
        let imageUrls = []
        let imageUrlsElements = $('.image-block').children()
        for(let i=1; i<=imageUrlsElements.length-2; i++){
            // imageUrlsElements is DOM element not jquery element
            let url = $(imageUrlsElements[i]).find('input').val()
            imageUrls.push(url)
        }
        // get video url
        let videoUrls = []
        let videoUrlsElements = $('.video-block').children()
        for(let i=1; i<=videoUrlsElements.length-2; i++){
            let url = $(videoUrlsElements[i]).find('input').val()
            videoUrls.push(url)
        }

        db.ref("teacher").child(teacherID).update({outline: outline, imageUrls:imageUrls, videoUrls: videoUrls})
        .then(()=>{
            // refresh page
            location.reload();
        })
    })

    // check if need to delete teaching before delete course

    // open the delete modal
    $('#teacher-delete').on('click', ()=>{
        let teacherID = $('#teacher-name').val()
        if(teacherID!=''){
            $("#deleteModal").find(".modal-body").find("p").text("确定删除吗?")
            $("#deleteModal").modal();
        }
    })
    
    // delete teacher
    $('#okButton').on('click',()=>{
        let teacherID = $('#teacher-name').val()
        db.ref("teacher").child(teacherID).remove().then(()=>{
            // refresh page
            location.reload();
        })
    })

})
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
        console.log('in delete')
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
    console.log('in delete')
    $url.remove()
    })
    $url.insertBefore($('.addVideo-block'));
    return $url
}
// generate random key
const getRandomKey = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 28;
    let randomStr = "";
    for (let i = 0; i < length; i++) {
      const randomNum = Math.floor(Math.random() * characters.length);
      randomStr += characters[randomNum];
    }
    return randomStr;
  };