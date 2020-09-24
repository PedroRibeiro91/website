const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(user) {
    // store the profile in a variable
    const prof = await fetch(APIURL + user);
    const profData = await prof.json();

    createUserCard(profData);

    getRepos(user)
}


async function getRepos(user){
    const repo = await fetch(APIURL + user + '/repos');
    const repoData = await repo.json();

    addRepoToCard(repoData);
}


function createUserCard(user){
    const cardHTML = `´
        <div class="card">
            <div>
                <img class="avatar" 
                    src="${user.avatar_url}" 
                    alt = "${user.name}"
                />
            </div>

            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul>
                    <li>${user.followers} followers</li>
                    <li>Follows ${user.following} users</li>
                    <li>Has ${user.public_repos} repositories</li>
                </ul>
                <h4>Repositories</h4>
                <div id="repos"></div>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML;

}

function addRepoToCard(repos){
    const reposElement = document.getElementById("repos");
    repos.forEach(repo =>{
        const repoElement = document.createElement('a');
        repoElement.classList.add("repo");
        repoElement.href = repo.html_url;
        repoElement.terget = "_blank";
        repoElement.innerText = repo.name;
        
        
        reposElement.appendChild(repoElement);

    });
}


form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);

        search.value = "";
    }
});











