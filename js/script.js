async function searchRepositories(substring) {
	const apiUrl = `https://api.github.com/search/repositories?q=${substring}&sort=stars&order=desc&per_page=10`;
	const response = await fetch(apiUrl);
	const data = await response.json();
	const repositories = data.items.map(item => ({
		name: item.name,
		url: item.html_url,
		description: item.description,
		stars: item.stargazers_count,
		forks: item.forks_count
	}));
	return repositories;
	}

	const searchButton = document.querySelector("#search-button");
	const searchInput = document.querySelector("#search-input");
	const repositoryList = document.querySelector("#repository-list");

	searchButton.addEventListener("click", async () => {
	const substring = searchInput.value.trim();
	if (substring.length >= 2) {
	const repositories = await searchRepositories(substring);
	repositoryList.innerHTML = "";
	if (repositories.length > 0) { 
		repositories.forEach(repository => {
		const li = document.createElement("li");
		const a = document.createElement("a");
		a.href = repository.url;
		a.textContent = repository.name;
		li.appendChild(a);
		li.appendChild(document.createTextNode(` (${repository.stars} звезд, ${repository.forks} форков) - ${repository.description}`));
		repositoryList.appendChild(li);
		});
	} else {
		repositoryList.innerHTML = "По данной подстроке ничего не найдено"; 
	}
	} else {
	alert("Подстрока должна быть не меньше двух символов!");
	}
});
	searchInput.addEventListener("keydown", async (event) => {
	if (event.key === "Enter") {
		const substring = searchInput.value.trim();
		if (substring.length >= 2) {
		const repositories = await searchRepositories(substring);
		repositoryList.innerHTML = "";
		if (repositories.length > 0) { 
			repositories.forEach(repository => {
			const li = document.createElement("li");
			const a = document.createElement("a");
			a.href = repository.url;
			a.textContent = repository.name;
			li.appendChild(a);
			li.appendChild(document.createTextNode(` (${repository.stars} звезд, ${repository.forks} форков) - ${repository.description}`));
			repositoryList.appendChild(li);
			});
		} else {
			repositoryList.innerHTML = "По данной подстроке ничего не найдено"; 
		}
		} else {
		alert("Подстрока должна быть не меньше двух символов!");
		}
	}
	});