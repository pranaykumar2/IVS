const form = document.querySelector("form"),
  fileInput = document.querySelector(".file-input"),
  progressArea = document.querySelector(".progress-area"),
  uploadedArea = document.querySelector(".uploaded-area");

(function ($) {
  $.fn.FlowupLabels = function (options) {
    var defaults = {
        feature_onLoadInit: false,
        class_focused: "focused",
        class_populated: "populated",
      },
      settings = $.extend({}, defaults, options);
    return this.each(function () {
      var $scope = $(this);

      $scope
        .on("focus.flowupLabelsEvt", ".fl_input", function () {
          $(this).parent().addClass(settings.class_focused);
        })
        .on("blur.flowupLabelsEvt", ".fl_input", function () {
          var $this = $(this);
          $this.val().length
            ? $this
                .parent()
                .addClass(settings.class_populated)
                .removeClass(settings.class_focused)
            : $this
                .parent()
                .removeClass(
                  settings.class_populated + " " + settings.class_focused
                );
        });

      if (settings.feature_onLoadInit) {
        $scope.find(".fl_input").trigger("blur.flowupLabelsEvt");
      }
    });
  };
})(jQuery);

(function () {
  $(".FlowupLabels").FlowupLabels({
    feature_onInitLoad: false,

    class_focused: "focused",
    class_populated: "populated",
  });
})();

form.addEventListener("click", () => {
  fileInput.click();
});

fileInput.onchange = ({ target }) => {
  let file = target.files[0];
  if (file) {
    let fileName = file.name;
    if (fileName.length >= 12) {
      let splitName = fileName.split(".");
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
    uploadFile(fileName);
  }
};

function uploadFile(name) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "upload.php");
  xhr.upload.addEventListener("progress", ({ loaded, total }) => {
    let fileLoaded = Math.floor((loaded / total) * 100);
    let fileTotal = Math.floor(total / 1000);
    let fileSize;
    fileTotal < 1024
      ? (fileSize = fileTotal + " KB")
      : (fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB");
    let progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;
    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;
    if (loaded == total) {
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
															<span class="name">${name}</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>

                          </li>`;
      uploadedArea.classList.remove("onprogress");
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
    }
  });
  let data = new FormData(form);
  xhr.send(data);
}

const uploadButton = document.getElementById("upload-button");

uploadButton.addEventListener("click", async () => {
  let name = document.getElementById("rf_name").value;
  let email = document.getElementById("rf_email").value;
  let accountAddress = document.getElementById("account-address").textContent;
  let userData = JSON.parse(localStorage.getItem('userData')) || [];
  userData.push({
      name,
      email,
      accountAddress
  });
  localStorage.setItem('userData', JSON.stringify(userData));

  if (typeof window.ethereum === "undefined") {
    console.log(
      "MetaMask is not installed. Please install it from metamask.io"
    );
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    console.log(accounts)

    const transactionParameters = {
      from: accounts[0],
      to: "0x5592923199F200212C3890B02785a88F238a2f0b",
      value: "0",
      gasLimit: "1000000",
    }

    const transactionHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })

    const checkTransaction = async (transactionHash) => {
      var receipt = null;
      receipt = window.ethereum.request({
        method: "eth_getTransactionReceipt",
        params: [transactionHash],
      })
      return receipt;
    }

    const receipt = await checkTransaction(transactionHash);

    if (receipt.status === "0x1"){
      console.log("File Uploaded Successfully")
    }

    else {
      console.log("Failed to upload the file...Try again!!")
    }

  } catch (error) {
    console.log("Error uploading the file:", error)
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const connectButton = document.querySelector(".button1");
  const accountDetails = document.querySelector(".account-details");

  connectButton.addEventListener("click", async function () {
    if (typeof window.ethereum === "undefined") {
      console.log(
        "MetaMask is not installed. Please install it from metamask.io"
      );
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("MetaMask connected successfully!");
      console.log("Selected account:", accounts[0]);

      connectButton.textContent = "Connected!!";
      connectButton.disabled = true;
      displayAccountDetails(accounts[0]);
    } catch (error) {
      console.log("Error connecting to MetaMask:", error);
    }
  });

  async function displayAccountDetails(account) {
    const connectionTime = new Date().toLocaleString();

    const accountAddressElement = document.getElementById("account-address");
    const connectionTimeElement = document.getElementById("connection-time");

    accountAddressElement.textContent = account;
    connectionTimeElement.textContent = connectionTime;

    accountDetails.style.display = "block";
  }
});


//FOR SENDING DATA TO ADMIN IN TABULAR FORM
