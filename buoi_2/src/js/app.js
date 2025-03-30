
// DOM
// In chữ "Lập trình web" vào thẻ h1
const title = document.querySelector(".title")
title.innerHTML = "<i>Lập trình web</i>"

// Localstorage
// Kiểu dữ liệu đối tượng(Object)
let userInfo = {
    name: "Phạm Anh Tuấn",
    email: "tuan@gmail.com",
    dob: "19/09/1999",
    address: "Mỹ Đình, Hà Nội"
}
// Hiển thị thông tin người dùng ra giao diện
const nameElement = document.querySelector("#name")
const email = document.querySelector(".email")
const dob = document.querySelector(".dob")
const address = document.querySelector(".address")

nameElement.innerHTML = userInfo.name
email.innerHTML = userInfo.email
dob.innerHTML = userInfo.dob
address.innerHTML = userInfo.address

// fetch api
const POST_API = "https://jsonplaceholder.typicode.com/posts"
const postContainer = document.querySelector(".post-container")

// render dữ liệu ra giao diện
async function getPostData() {
    // await: chờ hàm fetch chạy xong thì mới chạy tiếp
    //  các câu lệnh bên dưới
    let response = await fetch(POST_API)
    let postData = await response.json()
    console.log(postData);
    
    // Hiển thị dữ liệu postData ra màn hình 
    // Dùng vòng lặp for
    let htmls = ""
    for (let i = 0; i < postData.length; i++) {
        htmls += `
            <div class="post-item">
                <h3>${postData[i].title}</h3>
                <p>${postData[i].body}</p>
            </div>
        `
    }

    console.log(htmls);
    
    postContainer.innerHTML = htmls
}

// Gọi hàm
getPostData()

let number_list = [1, 4, 2, 6, 8]
console.log(number_list[0]);
console.log(number_list[1]);
console.log(number_list[2]);
console.log(number_list[3]);


// Vòng lặp: map, filter