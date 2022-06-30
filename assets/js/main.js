main();

function main() {
  apiGetUsers().then(function (result) {
    const users = result.data;
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      users[i] = new Users(
        user.id,
        user.account,
        user.name,
        user.password,
        user.email,
        user.type,
        user.language,
        user.describe,
        user.image
      );
    }
    display(users);
  });
}

function display(users) {
  let html = "";
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    html += `
        <tr>
        <td>${i + 1}</td>
        <td>${user.account}</td>
        <td>${user.password}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.language}</td>
        <td>${user.type}</td>
        <td>
        <button class="btn btn-danger" data-account="${
          user.account
        }"  data-type="delete" >Xóa</button>
        <button class="btn btn-success" data-type="update" data-account="${
          user.account
        }"  data-toggle="modal"
        data-target="#myModal">Cập Nhật</button> 
        </td>
        </tr>
        `;
  }
  document.getElementById("tblDanhSachNguoiDung").innerHTML = html;
}

function addUser() {
  let account = document.getElementById("TaiKhoan").value;
  let name = document.getElementById("HoTen").value;
  let password = document.getElementById("MatKhau").value;
  let email = document.getElementById("Email").value;
  let image = document.getElementById("HinhAnh").value;
  let type = document.getElementById("loaiNguoiDung").value;
  let language = document.getElementById("loaiNgonNgu").value;
  let describe = document.getElementById("MoTa").value;

  const newUsers = new Users(
    null,
    account,
    name,
    password,
    email,
    image,
    type,
    language,
    describe
  );
  apiAddUser(newUsers).then(function (result) {
    main();
  });
}
// Lắng nghe "Thêm mới"
document.getElementById("btnThemNguoiDung").addEventListener("click", () => {
  document.querySelector(".modal-header").innerHTML = "Thêm Người Dùng";
  document.querySelector(".modal-footer").innerHTML = `
      <button class="btn btn-success" data-type="add">Thêm</button>
      <button class="btn btn-danger" data-type="cancel" data-toggle="modal"
      data-target="#myModal">Hủy</button>
      
      `;
  $("#myModal").modal("hide");

  resetFormSpan();
  resetForm();
});
// Lắng nghe "Thêm" + "Hủy"
document.querySelector(".modal-footer").addEventListener("click", (event) => {
  const type = event.target.getAttribute("data-type");

  if (type === "add") {
    resetFormSpan();

    if (!validation()) {
      return;
    }
    addUser();
    resetForm();
    $("#myModal").modal("hide");
  }

  if (type === "update") {
    UpdateUsers();
    $("#myModal").modal("hide");
  }
});
// Lắng nghe "Xóa" + "Cập nhật"
document
  .getElementById("tblDanhSachNguoiDung")
  .addEventListener("click", (event) => {
    const btn = event.target.getAttribute("data-type");
    const btnAccount = event.target.getAttribute("data-account");

    if (btn === "delete") {
      deleteUser(btnAccount);
    }

    if (btn === "update") {
      showUpdateUser(btnAccount);
    }
  });

function UpdateUsers() {
  let account = document.getElementById("TaiKhoan").value;
  let name = document.getElementById("HoTen").value;
  let password = document.getElementById("MatKhau").value;
  let email = document.getElementById("Email").value;
  let image = document.getElementById("HinhAnh").value;
  let type = document.getElementById("loaiNguoiDung").value;
  let language = document.getElementById("loaiNgonNgu").value;
  let describe = document.getElementById("MoTa").value;

  const newUsers = new Users(
    null,
    account,
    name,
    password,
    email,
    image,
    type,
    language,
    describe
  );
  apiUpdateUsers(newUsers).then(function (result) {
    main();
    resetForm();
  });
}

function showUpdateUser(userAccount) {
  document.querySelector(".modal-header").innerHTML = "Cập Nhật Người Dùng";
  document.querySelector(".modal-footer").innerHTML = `
  <button class="btn btn-success"  data-type="update">Cập nhật</button>
  <button class="btn btn-danger" data-type="cancel" >Hủy</button>
  
  `;
  apiGetUserDetail(userAccount).then(function (result) {
    const user = result.data;
    document.getElementById("TaiKhoan").value = user.account;
    document.getElementById("HoTen").value = user.name;
    document.getElementById("MatKhau").value = user.password;
    document.getElementById("Email").value = user.email;
    document.getElementById("HinhAnh").value = user.image;
    document.getElementById("loaiNguoiDung").value = user.type;
    document.getElementById("loaiNgonNgu").value = user.language;
    document.getElementById("MoTa").value = user.describe;
  });
}

function validation() {
  let account = document.getElementById("TaiKhoan").value;
  let name = document.getElementById("HoTen").value;
  let password = document.getElementById("MatKhau").value;
  let email = document.getElementById("Email").value;
  let image = document.getElementById("HinhAnh").value;
  let type = document.getElementById("loaiNguoiDung").value;
  let language = document.getElementById("loaiNgonNgu").value;
  let describe = document.getElementById("MoTa").value;

  let isValid = true;

  if (!isRequire(account)) {
    isValid = false;
    document.getElementById("checkAccount").style.display = "block";
    document.getElementById("checkAccount").innerHTML =
      "Không được để trống mục này";
  }else if(!checkDuplicate(account)){
        document.getElementById("checkAccount").style.display = "block";
        console.log("aa");
        document.getElementById("checkAccount").innerHTML = "Đã tồn tại";
        isValid = false;
  }
  console.log("isvalid ",isValid);
  if (!isRequire(name)) {
    isValid = false;
    document.getElementById("checkName").style.display = "block";
    document.getElementById("checkName").innerHTML =
      "Không được để trống mục này";
  } else if (!checkName(name)) {
    isValid = false;
    document.getElementById("checkName").style.display = "block";
    document.getElementById("checkName").innerHTML = "Lỗi ký tự";
  }
  if (!isRequire(password)) {
    isValid = false;
    document.getElementById("checkPassword").style.display = "block";
    document.getElementById("checkPassword").innerHTML =
      "Không được để trống mục này";
  } else if (!checkPass(password)) {
    isValid = false;
    document.getElementById("checkPassword").style.display = "block";
    document.getElementById("checkPassword").innerHTML = "Lỗi ký tự";
  }
  if (!isRequire(image)) {
    isValid = false;
    document.getElementById("checkImage").style.display = "block";
    document.getElementById("checkImage").innerHTML =
      "Không được để trống mục này";
  }
  if (!isRequire(email)) {
    isValid = false;
    document.getElementById("checkEmail").style.display = "block";
    document.getElementById("checkEmail").innerHTML =
      "Không được để trống mục này";
  }
  if (!isRequire(type)) {
    isValid = false;
    document.getElementById("checkType").style.display = "block";
    document.getElementById("checkType").innerHTML =
      "Không được để trống mục này";
  }
  if (!isRequire(language)) {
    isValid = false;
    document.getElementById("checkLanguage").style.display = "block";
    document.getElementById("checkLanguage").innerHTML =
      "Không được để trống mục này";
  }
  if (!isRequire(describe)) {
    isValid = false;
    document.getElementById("checkDescribe").style.display = "block";
    document.getElementById("checkDescribe").innerHTML =
      "Không được để trống mục này";
  }
  return isValid;
}

function checkName(name) {
  const letterName = /^[A-Z a-z]+$/;
  if (!letterName.test(name)) {
    return false;
  }
  return true;
}
function checkPass(pass) {
  const letterPass =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,8}$/;
  if (!letterPass.test(pass)) {
    return false;
  }
  return true;
}

function isRequire(valueInput) {
  if (!valueInput) {
    return false;
  }
  return true;
}

function resetForm() {
  document.getElementById("TaiKhoan").value = "";
  document.getElementById("HoTen").value = "";
  document.getElementById("MatKhau").value = "";
  document.getElementById("Email").value = "";
  document.getElementById("HinhAnh").value = "";
  document.getElementById("loaiNguoiDung").value = "";
  document.getElementById("loaiNgonNgu").value = "";
  document.getElementById("MoTa").value = "";
}
function resetFormSpan() {
  document.getElementById("checkAccount").innerHTML = "";
  document.getElementById("checkName").innerHTML = "";
  document.getElementById("checkPassword").innerHTML = "";
  document.getElementById("checkEmail").innerHTML = "";
  document.getElementById("checkImage").innerHTML = "";
  document.getElementById("checkType").innerHTML = "";
  document.getElementById("checkLanguage").innerHTML = "";
  document.getElementById("checkDescribe").innerHTML = "";
}
function deleteUser(account) {
  apiDeleteUser(account).then(() => {
    main();
  });
}
function checkDuplicate(account) {
  console.log("1");
  const dupLi = apiGetUserDetail(account)
    .then((result) => {
      console.log("2");
      if (result.data) {
        console.log("3");
        return false
      }   
    })
    .catch((error) => {
      console.log("4");
      console.log(error);
      return true
     
    });
    console.log(dupLi)
    return dupLi;
    
}

