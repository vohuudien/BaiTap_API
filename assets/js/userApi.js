const baseUrl = "https://62b6eabe6999cce2e80a17ba.mockapi.io/api/users";

function apiGetUsers() {
  return axios({
    url: baseUrl,
    method: "GET",
  });
}

function apiAddUser(user) {
  return axios({
    url: baseUrl,
    method: "POST",
    data: user,
  });
}

function apiDeleteUser(account) {
  return axios({
    url: `${baseUrl}/${account}`,
    method: "DELETE",
  });
}
function apiGetUserDetail(account) {
  return axios({
    url: `${baseUrl}/${account}`,
    method: "GET",
  });
}

function apiUpdateUsers(users) {
  return axios({
    url: `${baseUrl}/${users.account}`,
    data: users,
    method: "PUT",
  });
}
