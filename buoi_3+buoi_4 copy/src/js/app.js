
// Lấy DOM của các ô input
const studentName = document.querySelector(".student-name")
const studentAddress = document.querySelector(".student-address")
// Khai báo DOM cho form add-student
const addStudentForm = document.querySelector(".add-student")

// Tạo hàm thêm học sinh
function addStudent() {
    // Lấy dữ liệu từ ô input


    // Gọi hàm db.collection ... -> Để thêm dữ liệu vào Firebase


}


// Hàm hiển thị danh sách học sinh vừa nhập

// Bắt sự kiện submit của form add-student để gọi hàm addStudent()
addStudentForm.addEventListener("submit", function () {
    addStudent()
})