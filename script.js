document.addEventListener("DOMContentLoaded", function () {
  openModal();
});

const modal = document.getElementById("myModal");

function openModal() {
  setTimeout(() => {
    modal.style.display = "block";
    setTimeout(() => modal.classList.add("show"), 50);
  }, 1000); // 5000 milliseconds = 5 seconds
}

function closeModal() {
  modal.classList.remove("show");
  setTimeout(() => modal.style.display = "none", 300);
}

// Function to handle 'Continue' button click
function continueToPage() {
  // Add your logic to grant access or navigate to the desired page
  closeModal(); // Close the modal
}

// Function to handle 'Leave' button click
function leavePage() {
  window.location.href = "assets/pagenotfound.html"; // Redirect to custom 404 page
}

window.onclick = function (event) {
  // if (event.target === modal) {
  //   closeModal();
  // }
};

const toggleBtn = document.querySelector('.toggle_btn')
const toggleBtnIcon = document.querySelector('.toggle_btn i')
const dropDownMenu = document.querySelector('.dropdown-menu')

toggleBtn.onclick = function() {
  dropDownMenu.classList.toggle('open')
  const isOpen = dropDownMenu.classList.contains('open')

  toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
};
