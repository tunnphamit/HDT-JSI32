
// Lấy DOM của các ô input
const addFoodForm = document.querySelector(".add-food")
const foodName = document.querySelector(".food-name")
const foodText = document.querySelector(".food-text")
const foodPrice = document.querySelector(".food-price")
const foodImg = document.querySelector(".food-img")
const foodList = document.querySelector(".food-list")

// Viết hàm xử lý thêm dữ liệu
function addFood(event){
    event.preventDefault()

    // Lấy dữ liệu từ ô input
    let foodData = {
        name: foodName.value,
        text: foodText.value,
        price: foodPrice.value,
        img: foodImg.value
    }

    // Đẩy dữ liệu lên Firestore
    // Add a new document with a generated id.
    db.collection("foods").add(foodData)
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            console.log("Thêm dữ liệu thành công!");
            
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            console.log("Thêm dữ liệu thất bại!");
        });
}

// Hàm hiển thị danh sách các món ăn đã thêm
function renderFoodUI() {
    let htmls = ""

    db.collection("foods").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            let foodData = doc.data()
            console.log(foodData.name);
            
            htmls += `
                <div class="food-item">
                    <h3 class="name">${foodData.name}</h3>
                    <img src="${foodData.img}">
                </div>
            `
            console.log(htmls);
            
            
        });

        // Đẩy chuỗi htmls vafp foodList DOM
        foodList.innerHTML = htmls

    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

}
renderFoodUI()

addFoodForm.addEventListener("submit", function(event) {
    addFood(event)
})