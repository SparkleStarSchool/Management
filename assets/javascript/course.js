$(document).ready(()=>{
    // show adding new course
    $('.adding-block').css('display', 'block')
    // hide some setting
    hideShowCourse('none')
    // get subject from db
    db.ref('subject').get().then((snapshot)=>{
        if(snapshot.val()!=null){
            for(let [key, value] of Object.entries(snapshot.val())){
                let $option = $(`<option value=${key}>${value.name}</option>`)
                $('#course-subject').append($option)
            }
        }
    })

    // get course name from db
    db.ref("course").get().then((snapshot)=>{
        if(snapshot.val()!=null){
            for(let [key, value] of Object.entries(snapshot.val())){
                let $option = $(`<option value=${key}>${value.name}</option>`)
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
            // empty check box
            $('.grade-style').find('input').each(function(element){
                // console.log(element)
                $(this).prop('checked', false)
            })

            // show some setting
            hideShowCourse('block')
            //get course infor
            db.ref("course").child(courseID).get().then((snapshot)=>{
                let courseInfor = snapshot.val()
                $('#course-code').val(courseInfor.code)
                $('#course-subject').val(courseInfor.subjectID)
                // get the grade
                $('input[type=checkbox]').each(function(){
                    if(courseInfor.grade.includes($(this).val())){
                        $(this).prop('checked', true)
                    }
                })
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
            .set({ name: courseName, code:'', subjectID:'', grade:['']})
            .then(() => {
                // refresh page
                location.reload();
            })
        }
    })

    // save course infor
    $('#save-btn').on('click',()=>{
        let courseID = $('.name-dropdown').val()
        let data = getDataFromDOM()
        if(data.code==''||data.subjectID==''||data.grade[0] == ''){
            // show modal
            $("#saveModal").modal();
        }else{
            db.ref("course").child(courseID).update(data)
            .then(()=>{
                // refresh page
                location.reload();
            })
        }   
    })
    // save modal (save data even if some infor is missing)
    $('#saveModal #ok-btn').on('click',()=>{
        let courseID = $('.name-dropdown').val()
        let data = getDataFromDOM()
        db.ref("course").child(courseID).update(data)
        .then(()=>{
            // refresh page
            location.reload();
        })
    })
    // delete course
    $('#deleteModal #ok-btn').on('click',()=>{
        let courseID = $('.name-dropdown').val()
        // find if there is teaching attached this teacherID
        db.ref('teaching').orderByChild('courseID').equalTo(courseID).on('value', (snapshot)=>{
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

const getDataFromDOM = ()=>{
    let code = $('#course-code').val()
    let subjectID = $('#course-subject').val()
    let grade = []
    $('input[type=checkbox]').each(function(){
        if($(this).is(":checked")){
            grade.push($(this).val())
        }
    })
    if(grade.length == 0){
        grade = ['']
    }
    return {code: code, 
            grade: grade, 
            subjectID: subjectID}
}