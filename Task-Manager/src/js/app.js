
// Lấy thông tin của task để thêm task đó vào 
// Firestore

// 1. Lấy DOM của các ô input và form để
// lấy dữ liệu
const taskName = document.querySelector(".task-name")
const taskDesc = document.querySelector(".task-desc")
const taskDeadline = document.querySelector(".task-deadline")
const taskForm = document.querySelector(".task-form")
const taskContainer = document.querySelector(".task-container");
// const USER_ID = localStorage.getItem("user_id_login")

// 2. Viết hàm xử lý thêm task vào Firestore
function addTask(event) {
    event.preventDefault()

    // Lấy dữ liệu từ ô input
    let taskInfo = {
        name: taskName.value,
        desc: taskDesc.value,
        deadline: taskDeadline.value,
        status: "Chưa hoàn thành",
        // userId: USER_ID
    }

    // Dùng hàm của Firebase để thêm task mới
    // vào Firestore
    db.collection("tasks").add(taskInfo)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            alert("Thêm dữ liệu thành công")
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            alert("Thêm dữ liệu thất bại!")
        });
    
    // Gọi lại hàm render để cập nhật giao diện
    renderTaskList()
}

// CRUD: CREATE, READ, UPDATE, DELETE

function renderTaskList() {
    // Tạo ra chuỗi html chứa các phần tử HTML đã chứa dữ liệu
    let htmls =""

    // Lấy dữ liệu trong Firestore cho vào chuỗi htmls
    db.collection("tasks")
    .get()
    // .where("user_id", "==", USER_ID)
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            let task = doc.data();

            htmls += `
            <div class="task-item">
                <div class="content">
                    <h3>${task.name}</h3>
                    <p>${task.desc}</p>
                    <i>${task.deadline}</i>
                </div>
                <div class="action">
                    <button class="btn btn-warning btn-edit" data-id="${doc.id}">Sửa</button>
                    <button class="btn btn-danger btn-delete" data-id="${doc.id}">Xóa</button>
                </div>
            </div>
            `
        });

        // Hiển thị danh sách dữ liệu ra màn hình
        taskContainer.innerHTML = htmls

        // Lắng nghe sự kiện ấn vào nút xóa thì gọi hàm deleteTaskById
        let btnDeleteList = document.querySelectorAll(".btn-delete")
        btnDeleteList.forEach(btnDelete => {
            btnDelete.addEventListener('click', () => {
                const taskId = btnDelete.getAttribute('data-id');
                deleteTaskById(taskId);
                renderTaskList()
            });
        })
        

    });
}
renderTaskList()

// Hàm xử lý xóa 
function deleteTaskById(taskId) {
    db.collection("tasks").doc(taskId).delete().then(() => {
        console.log("Document successfully deleted!");
        alert("Xóa task thành công")
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

taskForm.addEventListener('submit', function (event) {
    addTask(event)
})