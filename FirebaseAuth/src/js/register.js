
const registerForm = document.querySelector("#register-form")
const inpFullname = document.querySelector("#fullname")
const inpEmail = document.querySelector("#email")
const inpDob = document.querySelector("#dob")
const inpPassword = document.querySelector("#password")
const inpRepeatPassword = document.querySelector("#repeat-password")

function handleRegister(event) {
    event.preventDefault() // Ngăn chặn hành vi mặc định của form

    let fullname = inpFullname.value
    let email = inpEmail.value
    let dob = inpDob.value
    let password = inpPassword.value
    let repeatPassword = inpRepeatPassword.value

    // check fields empty
    if ( !fullname || !email || !dob || !password || !repeatPassword) {
        alert("Vui lòng điền đủ các trường");
        return;
    }
    if (password != repeatPassword) {
        alert("Mật khẩu không khớp");
        return;
    }

    // Tạo tài khoản với Firebase Auth
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // Thông tin người dùng
            let userData = {
                fullname,
                email,
                dob,
                password,
                repeatPassword,
            }

            // Thêm user vào Firestore
            db.collection("users").add(userData)
                .then((docRef) => {
                    alert("Đăng ký thành công");
                    window.location.href = "./login.html";
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    alert("Đăng ký thất bại");
                    console.error("Error adding document: ", error);
                });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            alert(`Lỗi: ${errorMessage}`);
            console.log(errorMessage);
        });
}

registerForm.addEventListener("submit", handleRegister);
