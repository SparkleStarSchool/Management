$(document).ready(()=>{
    if(localStorage.getItem('currentUserName')==null){
        window.location.href='index.html'
    }
    
    let userName = localStorage.getItem('currentUserName')
    $('.hello p').text('Hi, '+userName)
    // home page
    $('.hello #home').on('click',()=>{
        window.location.href='dashboard.html'
    })
    // logout button
    $('.hello #logout').on('click',()=>{
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