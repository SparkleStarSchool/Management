$(document).ready(()=>{
    if(localStorage.getItem('currentUserName')==null){
        window.location.href='index.html'
    }
    let userName = localStorage.getItem('currentUserName')
    let $header = $(`<div class="row">
                        <div class="col-md-4"></div>
                        <div class="col-md-4">
                            <img id="titleImage" src="assets/images/logo.png" alt="">
                            <p id="title">启明国际教育</p>
                            <div class="row hello">
                                <p>Hi, ${userName}</p>
                                <div>
                                <button id="home">主页</button>
                                <button id="logout">退出</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4"></div>
                    </div>`)
    $('.layout').prepend($header)
    // home button
    $header.find('#home').on('click',()=>{
        window.location.href='dashboard.html'
    })
    // logout button
    $header.find('#logout').on('click',()=>{
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