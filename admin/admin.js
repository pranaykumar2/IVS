document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("showUsersButton").addEventListener("click", function() {
        let table = document.getElementById("verificationRequests");
        table.style.display = "table";
        let button1 = document.getElementById("showUsersButton");
        let button2 = document.getElementById("refreshTableButton");
        button1.style.display = "none";
        button2.style.display = "block";
    });

    document.getElementById("refreshTableButton").addEventListener("click", function() {
        displayVerificationRequests();
    });

    displayVerificationRequests();

    displayVerificationRequests();
});

function displayVerificationRequests() {
    let tableBody = document.querySelector("#verificationRequests tbody");
    tableBody.innerHTML = "";
    let userData = JSON.parse(localStorage.getItem('userData')) || [];
    for (let user of userData) {
        let row = document.createElement("tr");
        let accountCell = document.createElement("td");
        let nameCell = document.createElement("td");
        let emailCell = document.createElement("td");
        let actionCell = document.createElement("td");
        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener("click", function() {
            let index = userData.indexOf(user);
            if (index !== -1) {
                userData.splice(index, 1);
                localStorage.setItem('userData', JSON.stringify(userData));
                row.remove();
            }
        });
        accountCell.textContent = user.accountAddress;
        nameCell.textContent = user.name;
        emailCell.textContent = user.email;
        actionCell.appendChild(removeButton);
        row.appendChild(accountCell);
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
    }
}
