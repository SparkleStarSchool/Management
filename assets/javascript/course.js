$(document).ready(()=>{
    // show adding new course
    $('.adding-block').css('display', 'block')
    // hide some setting
    hideShowCourse('none')
    // get subject from db
    db.ref('subject').get().then((snapshot)=>{
        if(snapshot.val()!=null){
            for(let [key, value] of Object.entries(snapshot.val())){
                // console.log(key)
                // console.log(value.name)
                $option = $(`<option value=${key}>${value.name}</option>`)
                $('#course-subject').append($option)
            }
        }
    })

    // get course name from db
    db.ref("course").get().then((snapshot)=>{
        if(snapshot.val()!=null){
            for(let [key, value] of Object.entries(snapshot.val())){
                $option = $(`<option value=${key}>${value.name}</option>`)
                $('.name-dropdown').append($option)
            }
        }
    })

    // add event for course name dropdown
    $('.name-dropdown').on('change',()=>{
        let courseID=$(".name-dropdown").val()
        if(courseID!=''){
            // hide adding new course
            $('.adding-block').css('display', 'none')
            // show some setting
            hideShowCourse('block')
            //get course infor
            db.ref("course").child(courseID).get().then((snapshot)=>{
                let courseInfor = snapshot.val()
                console.log(courseInfor)
                $('#course-code').val(courseInfor.code)
                $('#course-subject').val(courseInfor.subjectID)
                $('#course-grade').val(courseInfor.grade)
                $('.outline-textarea').val(courseInfor.outline)
            })
        }else{
            // show adding new course
            $('.adding-block').css('display', 'block')
            // hide some setting
            hideShowCourse('none')
        }
    })

    // add new course
    $('.add-btn').on('click',()=>{
        let courseName = $('.adding-block').find('input').val()
        if(courseName != ''){
            let courseID = getRandomKey()
            db.ref("course")
            .child(courseID)
            .set({ name: courseName})
            .then(() => {
                // refresh page
                location.reload();
            })
        }
    })

    // save course infor
    $('#course-save').on('click',()=>{
        let courseID = $('.name-dropdown').val()
        let code = $('#course-code').val()
        let subjectID = $('#course-subject').val()
        let grade = $('#course-grade').val()
        let outline = $('.outline-textarea').val()
        db.ref("course").child(courseID).update({code: code, 
                                                 outline: outline, 
                                                 grade: grade, 
                                                 subjectID: subjectID})
        .then(()=>{
            // refresh page
            location.reload();
        })
    })
    
    // delete teacher
    $('#ok-btn').on('click',()=>{
        let courseID = $('.name-dropdown').val()
        // find if there is teaching attached this teacherID
        db.ref('teaching').orderByChild('courseID').equalTo(courseID).on('value', (snapshot)=>{
            console.log(snapshot.val())
            if(snapshot.val()==null){
                // delete 
                db.ref("course").child(courseID).remove().then(()=>{
                    // refresh page
                    location.reload();
                })
            }else{
                // show another modal to tell can not delete
                $("#warningModal").find(".modal-body").find("p").text("请先删除与此课程相关的开课！")
                $("#warningModal").modal()
            }
        })
    })
})