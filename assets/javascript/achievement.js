$(document).ready(()=>{
    // show adding new course
    $('.adding-block').css('display', 'block')
    // hide some setting
    hideShowAchievement('none')

    // get achievement name from db
    db.ref("achievement").get().then((snapshot)=>{
        if(snapshot.val()!=null){
            for(let [key, value] of Object.entries(snapshot.val())){
                $option = $(`<option value=${key}>${value.name}</option>`)
                $('.achievement-name').find('.name-dropdown').append($option)
            }
        }
    })
    // get teaching name from db
    db.ref("teaching").get().then((snapshot)=>{
        if(snapshot.val()!=null){
            for(let [key, value] of Object.entries(snapshot.val())){
                $option = $(`<option value=${key}>${value.name}</option>`)
                $('.teaching-name').find('.name-dropdown').append($option)
            }
        }
    })
    
    // add event for achievement name dropdown
    $('.achievement-name').find('.name-dropdown').on('change',(event)=>{
        // empty urls
        $('.image-block').children('.url-input').remove()
        createNewImageUrl()
        $('.video-block').children('.url-input').remove()
        createNewVideoUrl()

        let achievementID=$(event.target).val()
        if(achievementID!=''){
            // hide adding new achievement
            $('.adding-block').css('display', 'none')
            // show some setting
            hideShowAchievement('block')
            //get achievement infor
            db.ref("achievement").child(achievementID).get().then((snapshot)=>{
                let achievementInfor = snapshot.val()
                console.log(achievementInfor)
                // show information on page
                $('.teaching-name').find('.name-dropdown').val(achievementInfor.teachingID)
                $('.outline-textarea').val(achievementInfor.content)
                showUrls(achievementInfor.imageUrls, '.image-block', createNewImageUrl)
                showUrls(achievementInfor.videoUrls, '.video-block', createNewVideoUrl)
            })
        }else{
            // show adding new course
            $('.adding-block').css('display', 'block')
            // hide some setting
            hideShowAchievement('none')
        }
    })
    // add new achievement
    $('.add-btn').on('click',()=>{
        let achievementName = $('.adding-block').find('input').val()
        let teachingID = $('.teaching-name').find('.name-dropdown').val()
        $('.adding-block').find('input').removeClass('border border-danger')
        $('.teaching-name').find('.name-dropdown').removeClass('border border-danger')
        if(achievementName == ''){
            $('.adding-block').find('input').addClass('border border-danger')
        }else{
            if(teachingID==''){
                $('.teaching-name').find('.name-dropdown').addClass('border border-danger')
            }else{
                // save into database
                let achievementID = getRandomKey()
                db.ref("achievement")
                .child(achievementID)
                .set({ name: achievementName, teachingID: teachingID, 
                        content: '', imageUrls:[''], videoUrls:['']})
                .then(() => {
                    // refresh page
                    location.reload();
                })
            }
        }
    })
    // save achievement infor
    $('#save-btn').on('click',()=>{
        let achievementID = $('.achievement-name').find('.name-dropdown').val()
        let teachingID = $('.teaching-name').find('.name-dropdown').val()
        let content = $('.outline-textarea').val()
        let imageUrls = getUrls('.image-block')
        let videoUrls = getUrls('.video-block')

        db.ref("achievement").child(achievementID)
        .update({teachingID:teachingID, content:content, imageUrls:imageUrls, videoUrls:videoUrls})
        .then(()=>{
            // refresh page
            location.reload();
        })
    })

    // delete
    $('#deleteModal #ok-btn').on('click',()=>{
        let achievementID = $('.achievement-name').find('.name-dropdown').val()
        db.ref("achievement").child(achievementID).remove().then(()=>{
            // refresh page
            location.reload();
        })
    })
})