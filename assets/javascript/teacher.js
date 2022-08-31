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

    // add event for teacher name dropdown
    $('#teacher-name').on('change',()=>{
        let teacherID=$("#teacher-name").val()
        if(teacherID!=''){
            // hide adding new teacher
            $('.adding-block').css('display', 'none')
            //get course infor
            db.ref("teacher").child(teacherID).get().then((snapshot)=>{
                let teacherInfor = snapshot.val()
                console.log(teacherInfor)
                $('#teacher-outline').val(teacherInfor.outline)
            })
        }else{
            // show adding new course
            $('.adding-block').css('display', 'block')
            $('#teacher-outline').val('')
        }
    })

    // add new course
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

    // save teacher infor
    $('#teacher-save').on('click',()=>{
        let teacherID = $('#teacher-name').val()
        let outline = $('#teacher-outline').val()
        db.ref("teacher").child(teacherID).update({outline: outline})
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