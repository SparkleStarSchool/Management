$(document).ready(()=>{
    // get subject from db
    db.ref('subject').get().then((snapshot)=>{
        for(let [key, value] of Object.entries(snapshot.val())){
            // console.log(key)
            // console.log(value.name)
            $option = $(`<option value=${key}>${value.name}</option>`)
            $('#course-subject').append($option)
        }
    })

    // add new course
    
})