// Selects the div where the profile information will appear
const overview = document.querySelector(".overview");
const username = "marisvenancio";
// Selects the unordered list for the repos
const repoList = document.querySelector(".repo-list");
// Selects the section with class of repos
const reposSection = document.querySelector(".repos");
// Selects the section with class of repo-date
const reposDataSection = document.querySelector(".repo-data");
// Selects the back to repos button
const returnButton = document.querySelector(".view-repos");
// Selects the search input
const filterInput = document.querySelector(".filter-repos");

const getUserData = async function () {
    const requestData = await fetch(`https://api.github.com/users/${username}`);
    const data = await requestData.json();
    // console.log(data);
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
    filterInput.classList.remove("hide");

    for (let repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        let repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function(repoName) {
    const fetchInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);
    
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    // console.log(languageData);
    
    // Make a list of languages
    const languages = [];  
    for (let language in languageData) {
        languages.push(language);
    };
    // console.log(languages);
    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function(repoInfo, languages) {
    reposDataSection.innerHTML = "";
    reposDataSection.classList.remove("hide");
    reposSection.classList.add("hide");
    returnButton.classList.remove("hide");

    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(", ")}</p>
            <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on Github!</a>
        `;
    reposDataSection.append(div);
};

returnButton.addEventListener("click", function() {
    reposSection.classList.remove("hide");
    reposDataSection.classList.add("hide");
    returnButton.classList.add("hide");
});

filterInput.addEventListener("input", function(e) {
    const searchText = e.target.value
    // console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = e.target.value.toLowerCase();
    // console.log(searchLowerText);
    for (const repo of repos) {
        const repoLowerText = repo.innerText.toLowerCase();
        if (repoLowerText.includes(searchLowerText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});