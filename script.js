document.querySelectorAll(".item").forEach((item) => {
  item.addEventListener("mouseover", function () {
    this.classList.add("active");
  });

  item.addEventListener("mouseout", function () {
    this.classList.remove("active");
  });
});
// JavaScript cho modal
var modal = document.getElementById("myModal");
var btn = document.querySelector(".watch-video");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
// JavaScript cho Scroll
document.addEventListener("DOMContentLoaded", function () {
  const courseList = document.querySelector(".course-list");
  const prevBtn = document.querySelectorAll(".control-btn")[0];
  const nextBtn = document.querySelectorAll(".control-btn")[1];

  // Tính toán bước cuộn
  const scrollStep = courseList.offsetWidth; // Bước cuộn bằng chiều rộng của danh sách

  // Sự kiện nút Prev
  prevBtn.addEventListener("click", () => {
    courseList.scrollBy({
      left: -scrollStep,
      behavior: "smooth",
    });
  });

  // Sự kiện nút Next
  nextBtn.addEventListener("click", () => {
    courseList.scrollBy({
      left: scrollStep,
      behavior: "smooth",
    });
  });
});
