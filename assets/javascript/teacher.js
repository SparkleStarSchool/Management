$(document).ready(()=>{
    // show adding new teacher
    $('.adding-block').css('display', 'block')
    hideShowTeacher('none')
    
    // get teacher name from db
    db.ref("teacher").get().then((snapshot)=>{
        if(snapshot.val()!=null){
            for(let [key, value] of Object.entries(snapshot.val())){
                $option = $(`<option value=${key}>${value.name}</option>`)
                $('.name-dropdown').append($option)
            }
        }
    })

    // event for teacher name dropdown
    $('.name-dropdown').on('change',()=>{
        // empty urls
        $('.image-block').children('.url-input').remove()
        createNewImageUrl()
        $('.video-block').children('.url-input').remove()
        createNewVideoUrl()

        let teacherID=$(".name-dropdown").val()
        if(teacherID!=''){
            // hide adding new teacher
            $('.adding-block').css('display', 'none')
            // show some setting
            hideShowTeacher('block')
            //get teacher infor
            db.ref("teacher").child(teacherID).get().then((snapshot)=>{
                let teacherInfor = snapshot.val()
                console.log(teacherInfor)
                $('.outline-textarea').val(teacherInfor.introduction)

                // set image urls and video urls
                showUrls(teacherInfor.imageUrls, '.image-block', createNewImageUrl)
                showUrls(teacherInfor.videoUrls, '.video-block', createNewVideoUrl)
            })
        }else{
            // show adding new course
            $('.adding-block').css('display', 'block')
            // hide some setting
            hideShowTeaching('none')
        }
    })

    // add new teacher
    $('.add-btn').on('click',()=>{
        let teacherName = $('.adding-block').find('input').val()
        if(teacherName != ''){
            let teacherID = getRandomKey()
            db.ref("teacher")
            .child(teacherID)
            .set({ name: teacherName, introduction: '', imageUrls:[''], videoUrls: ['']})
            .then(() => {
                // refresh page
                location.reload();
            })
        }
    })

    // save teacher infor
    $('#save-btn').on('click',()=>{
        let teacherID = $('.name-dropdown').val()
        let outline = $('.outline-textarea').val()
        let imageUrls = getUrls('.image-block')
        let videoUrls = getUrls('.video-block')
        
        db.ref("teacher").child(teacherID).update({introduction: outline, imageUrls:imageUrls, videoUrls: videoUrls})
        .then(()=>{
            // refresh page
            location.reload();
        })
    })

    // delete teacher
    $('#ok-btn').on('click',()=>{
        let teacherID = $('.name-dropdown').val()
        // find if there is teaching attached this teacherID
        db.ref('teaching').orderByChild('teacherID').equalTo(teacherID).on('value', (snapshot)=>{
            console.log(snapshot.val())
            if(snapshot.val()==null){
                // delete 
                db.ref("teacher").child(teacherID).remove().then(()=>{
                    // refresh page
                    location.reload();
                })
            }else{
                // show another modal to tell can not delete
                $("#warningModal").find(".modal-body").find("p").text("请先删除此教师所开课程！")
                $("#warningModal").modal()
            }
        })
    })
})