const URI = "https://reqres.in/api/users?page=2";

async function getUsers(){

    const response = await fetch(URI);
    const users = await response.json();
    return users.data;
}

async function renderListView(users){
  const card_container = document.querySelector(".card-container") 
  if(users.length == 0){
     card_container.innerHTML=`<h3 class="card__error">Employee doesn't exist</h3>`
     console.log("Not found");
     return;
  }
    const template = users.map((user)=>{
        return `<div class="card">
        <div class="card__header">
          <img
            src=${user.avatar}
            alt="avatar"
            class="card__img"
          />
        </div>
        <div class="card__body">
          <h2 class="card__name">${user.first_name} ${user.last_name}</h2>
          <p class="card__email">${user.email}</p>
        </div>
      </div>`

    })

    card_container.innerHTML=(template.join(""));
}

async function getUser(){

  const users = await getUsers();
  const search_bar = document.getElementById("search_bar");
  search_bar.addEventListener("input", ((e)=>{
    const value = e.target.value
    const filteredUsers = users.filter((user)=>{
      return user.first_name.toLowerCase().includes(value);
    })
    console.log(filteredUsers);
    renderListView(filteredUsers);
  }));
}



getUsers().then(users => {
  renderListView(users);
});
getUser();
