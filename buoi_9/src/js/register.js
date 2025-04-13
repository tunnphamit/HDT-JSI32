
// Khai báo DOM
const registerForm = document.querySelector("#register-form")
const inpFullname = document.querySelector("#fullname")
const inpEmail = document.querySelector("#email")
const inpDob = document.querySelector("#dob")
const inpPassword = document.querySelector("#password")
const inpRepeatPassword = document.querySelector("#repeat-password");

// Hàm xử lý đăng ký
function handleRegister(event) {
    event.preventDefault()

    // Lấy dữ liệu từ người dùng nhập vào Form
    let fullname = inpFullname.value
    let email = inpEmail.value
    let dob = inpDob.value
    let password = inpPassword.value
    let repeatPassword = inpRepeatPassword.value

    // Kiểm tra: Nếu có 1 ô input nào đó chưa điển thì báo lỗi
    if (!fullname || !email || !dob || !password || !repeatPassword) {
        alert("Vui lòng nhập đủ các trường!")
        return // Dừng hàm
    }

    // Kiểm tra xem mật khẩu có đủ 8 ký tự hay không
    if (password.length < 8) {
        alert("Mật khẩu phải chứa ít nhất 8 ký tự!")
        return // Dừng hàm
    }

    // Kiểm tra mật khẩu và xác nhận mật khẩu đã giống nhau chưa
    if (password != repeatPassword) {
        alert("Xác nhận mật khẩu không khớp!")
        return // Dừng hàm
    }

    // Lưu tài khoản người dùng vào Firestore
    // Dùng Firebase Authentication
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // ...

            // Lưu dữ liệu người vào Firestore
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

            alert("Đăng ký thất bại!")
        });
    
}

registerForm.addEventListener("submit", function(event) {
    handleRegister(event)
})