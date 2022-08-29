$(document).ready(()=>{
    
    // Log in
    $('.login-btn button').on('click',()=>{
        // e.preventDefault();
        const emailInput = $("#emailAdress").val();
        const passwordInput = $("#password").val();
        console.log(emailInput)
        console.log(passwordInput)
        if(emailInput==''||passwordInput==''){
            $('form').find('p').text('Please input email address and password!')
        }else{
            auth.signInWithEmailAndPassword(emailInput, passwordInput)
            .then(() => {
                console.log(auth.currentUser.uid)
                let userID = auth.currentUser.uid
                db.ref('user').child(userID).get().then((snapshot)=>{
                    localStorage.setItem('currentUserName', snapshot.val().name)
                    console.log(snapshot.val().name)
                    window.location.href='dashboard.html'
                })
            })
            .catch(() => {
                alert("Could not log in, please input again");
            });
        }
      });
    })