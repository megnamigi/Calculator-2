const toggleBtn = document.getElementById("mode-toggle");

toggleBtn.addEventListener("click", function() {
    
    // 3. body элементийн класс дотор "dark-mode" байгаа бол устгах
    document.body.classList.toggle("dark-mode");
    
    // Текстээ солих 
    if (document.body.classList.contains("dark-mode")) {
        toggleBtn.innerText = "Light mode";
    } else {
        toggleBtn.innerText = "Dark mode";
    }
});