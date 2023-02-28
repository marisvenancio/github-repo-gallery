// Selects the div where the profile information will appear
const overview = document.querySelector(".overview");
const username = "marisvenancio";
const repoList = document.querySelector(".repo-list");

const getUserData = async function () {
    const requestData = await fetch(`https://api.github.com/users/${username}`);
    const data = await requestData.json();
    console.log(data);
    displayInfo(data);
};

getUserData();

const displayInfo = function(data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = 
    `<figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`
    overview.append(div);
    getRepos();
};

const getRepos = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await fetchRepos.json();
    // console.log(repoData);
    displayRepos(repoData);
};

// getRepos();

const displayRepos = function(repos) {
    for (let repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(repoItem);
    }
};

