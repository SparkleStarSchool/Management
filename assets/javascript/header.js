$(document).ready(()=>{
    if(localStorage.getItem('currentUserName')==null){
        window.location.href='index.html'
    }
    
    let userName = localStorage.getItem('currentUserName')
    $('.hello p').text('Hi, '+userName)
    // logout button
    $('.hello button').on('click',()=>{
        console.log("in logout....")
        auth.signOut().then(() => { 
            // remove from localStorage
            localStorage.removeItem('currentUserName')
            window.location.href='index.html'
            })
            .catch((err) => {
                console.log("Could not sign out");
            });
    })
})