const hideShowTeaching = (hideShow)=>{
    $('#student-count').parent().css('display', hideShow)
    $('#student-capacity').parent().css('display', hideShow)
    $('#start-date').parent().css('display', hideShow)
    $('#end-date').parent().css('display', hideShow)
    $('#start-time').parent().css('display', hideShow)
    $('#end-time').parent().css('display', hideShow)
    $('.outline-textarea').parent().css('display', hideShow)
    $('.post-block').css('display', hideShow)
    $('.image-block').css('display', hideShow)
    $('.video-block').css('display', hideShow)
    $('#save-btn').css('display', hideShow)
    $('#delete-btn').css('display', hideShow)
}

const hideShowTeacher = (hideShow)=>{
    $('.outline-textarea').parent().css('display', hideShow)
    $('.image-block').css('display', hideShow)
    $('.video-block').css('display', hideShow)
    $('#save-btn').css('display', hideShow)
    $('#delete-btn').css('display', hideShow)
}

const hideShowAchievement = (hideShow)=>{
    $('.outline-textarea').parent().css('display', hideShow)
    $('.image-block').css('display', hideShow)
    $('.video-block').css('display', hideShow)
    $('#save-btn').css('display', hideShow)
    $('#delete-btn').css('display', hideShow)
}

const hideShowCourse = (hideShow)=>{
    $('#course-code').parent().css('display', hideShow)
    $('#course-grade').parent().css('display', hideShow)
    $('#course-subject').parent().css('display', hideShow)
    $('.outline-textarea').parent().css('display', hideShow)
    $('#save-btn').css('display', hideShow)
    $('#delete-btn').css('display', hideShow)
}


