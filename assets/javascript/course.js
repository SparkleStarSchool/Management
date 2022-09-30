$(document).ready(()=>{
    // show adding new course
    $('.adding-block').css('display', 'block')

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
            //get course infor
            db.ref("course").child(courseID).get().then((snapshot)=>{
                let courseInfor = snapshot.val()
                console.log(courseInfor)
                $('#course-code').val(courseInfor.code)
                $('#course-subject').val(courseInfor.subjectID)
                $('#course-grade').val(courseInfor.grade)
                $('#course-outline').val(courseInfor.outline)
            })
        }else{
            // show adding new course
            $('.adding-block').css('display', 'block')
            $('#course-code').val('')
            $('#course-subject').val('')
            $('#course-grade').val('')
            $('#course-outline').val('')
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
        let outline = $('#course-outline').val()
        db.ref("course").child(courseID).update({code: code, 
                                                 outline: outline, 
                                                 grade: grade, 
                                                 subjectID: subjectID})
        .then(()=>{
            // refresh page
            location.reload();
        })
    })

    // check if need to delete teaching before delete course

    // open the delete modal
    $('#course-delete').on('click', ()=>{
        let courseID = $('.name-dropdown').val()
        if(courseID!=''){
            $("#deleteModal").find(".modal-body").find("p").text("确定删除此课程吗?")
            $("#deleteModal").modal();
        }
    })
    
    // delete course
    $('#okButton').on('click',()=>{
        let courseID = $('.name-dropdown').val()
        db.ref("course").child(courseID).remove().then(()=>{
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