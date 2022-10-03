$(document).ready(()=>{
    // show adding new course
    $('.adding-block').css('display', 'block')
    // hide some setting
    hideShowTeaching('none')

    // get teaching name from db
    db.ref("teaching").get().then((snapshot)=>{
        if(snapshot.val()!=null){
            for(let [key, value] of Object.entries(snapshot.val())){
                $option = $(`<option value=${key}>${value.name}</option>`)
                $('.name-dropdown').append($option)
            }
        }
    })
    // get course name from db
    db.ref("course").get().then((snapshot)=>{
        if(snapshot.val()!=null){
            for(let [key, value] of Object.entries(snapshot.val())){
                $option = $(`<option value=${key}>${value.name}</option>`)
                $('#course-name').append($option)
            }
        }
    })
    // get teacher name from db
    db.ref("teacher").get().then((snapshot)=>{
        if(snapshot.val()!=null){
            for(let [key, value] of Object.entries(snapshot.val())){
                $option = $(`<option value=${key}>${value.name}</option>`)
                $('#teacher-name').append($option)
            }
        }
    })
    // add event for teaching name dropdown
    $('.name-dropdown').on('change',(event)=>{
        // empty urls
        $('.post-block').children('.url-input').remove()
        createNewPostUrl()
        $('.image-block').children('.url-input').remove()
        createNewImageUrl()
        $('.video-block').children('.url-input').remove()
        createNewVideoUrl()

        let teachingID=$(event.target).val()
        if(teachingID!=''){
            // hide adding new teaching
            $('.adding-block').css('display', 'none')
            // show some setting
            hideShowTeaching('block')

            //get teaching infor
            db.ref("teaching").child(teachingID).get().then((snapshot)=>{
                let teachingInfor = snapshot.val()
                console.log(teachingInfor)
                // show information on page
                $('#course-name').val(teachingInfor.courseID)
                $('#teacher-name').val(teachingInfor.teacherID)
                $('#student-count').val(teachingInfor.studentCount)
                $('#student-capacity').val(teachingInfor.studentCapacity)
                $("#start-date").val(teachingInfor.startDate)
                $("#end-date").val(teachingInfor.endDate)
                $("#start-time").val(teachingInfor.startTime)
                $("#end-time").val(teachingInfor.endTime)
                $('.outline-textarea').val(teachingInfor.resourcesInfor)
                showUrls(teachingInfor.postImageUrls, '.post-block', createNewPostUrl)
                showUrls(teachingInfor.imageUrls, '.image-block', createNewImageUrl)
                showUrls(teachingInfor.videoUrls, '.video-block', createNewVideoUrl)
            })
        }else{
            // show adding new teaching
            $('.adding-block').css('display', 'block')
            // hide some setting
            hideShowTeaching('none')
        }
    })
    // add new teaching
    $('.add-btn').on('click',()=>{
        let teachingName = $('.adding-block').find('input').val()
        let courseID = $('#course-name').val()
        let teacherID = $('#teacher-name').val()
        $('.adding-block').find('input').removeClass('border border-danger')
        $('#course-name').removeClass('border border-danger')
        $('#teacher-name').removeClass('border border-danger')
        if(teachingName == ''){
            $('.adding-block').find('input').addClass('border border-danger')
        }else{
            if(courseID==''){
                $('#course-name').addClass('border border-danger')
            }else{
                if(teacherID==''){
                    $('#teacher-name').addClass('border border-danger')
                }else{
                    // save all information into database
                    let teachingID = getRandomKey()
                    db.ref("teaching")
                    .child(teachingID)
                    .set({ name: teachingName, courseID: courseID, teacherID: teacherID,
                        studentCount: '', studentCapacity: '', 
                        startDate: '', endDate: '', startTime: '', endTime: '',
                        postImageUrls: [''], resourcesInfor: '', imageUrls: [''], videoUrls: ['']})
                    .then(() => {
                        // refresh page
                        location.reload();
                    })
                }
            }
        }
    })

    // save teaching infor
    $('#save-btn').on('click',()=>{
        let teachingID = $('.name-dropdown').val()
        let courseID = $('#course-name').val()
        let teacherID = $('#teacher-name').val()
        let outline = $('.outline-textarea').val()
        let studentCount = $('#student-count').val()
        let studentCapacity = $('#student-capacity').val()
        let startDate = $('#start-date').val()
        let endDate = $('#end-date').val()
        let startTime = $('#start-time').val()
        let endTime = $('#end-time').val()

        let postImageUrls = getUrls('.post-block')
        let imageUrls = getUrls('.image-block')
        let videoUrls = getUrls('.video-block')

        db.ref("teaching").child(teachingID)
        .update({courseID: courseID, teacherID: teacherID, studentCount: studentCount, studentCapacity: studentCapacity, 
                startDate: startDate, endDate: endDate, startTime: startTime, endTime: endTime,
                postImageUrls: postImageUrls, resourcesInfor: outline, imageUrls:imageUrls, videoUrls: videoUrls})
        .then(()=>{
            // refresh page
            location.reload();
        })
    })
    
    // delete
    $('#ok-btn').on('click',()=>{
        let teachingID = $('.name-dropdown').val()
        // find if there is achievement attached this teachingID
        db.ref('achievement').orderByChild('teachingID').equalTo(teachingID).on('value', (snapshot)=>{
            console.log(snapshot.val())
            if(snapshot.val()==null){
                // delete 
                db.ref("teaching").child(teachingID).remove().then(()=>{
                    // refresh page
                    location.reload();
                })
            }else{
                // show another modal to tell can not delete
                $("#warningModal").find(".modal-body").find("p").text("请先删除成果！")
                $("#warningModal").modal()
            }
        })
    })
})