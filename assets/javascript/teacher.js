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

    // check if need to delete teaching before delete course

    // open the delete modal
    $('#delete-btn').on('click', ()=>{
        let teacherID = $('.name-dropdown').val()
        if(teacherID!=''){
            $("#deleteModal").find(".modal-body").find("p").text("确定删除吗?")
            $("#deleteModal").modal();
        }
    })
    
    // delete teacher
    $('#okButton').on('click',()=>{
        let teacherID = $('.name-dropdown').val()
        db.ref("teacher").child(teacherID).remove().then(()=>{
            // refresh page
            location.reload();
        })
    })

})

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