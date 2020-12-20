 const endpoint = 'https://digimon-api.vercel.app/api/digimon';
 const digimons = [];

 fetch(endpoint)
  .then(blob => blob.json())
  .then(data => digimons.push(...data));

function firstLetterUpperCase (string) {
  return string.charAt(0).toUpperCase().concat(string.substring(1, string.length));
}
function findMatches(wordMatch, digimons) {
  return digimons.filter(digimon => {
    const newWordMatch = firstLetterUpperCase(wordMatch);
    return digimon.name.match(newWordMatch) || digimon.level.match(newWordMatch);
  })
}

function displayMatches(e){
  e.preventDefault();
  const matchArray = findMatches(this.children[0].children[1].value, digimons);
  const html = matchArray.map(({name,img, level}) => {
    return `
      <article class="list-group-item d-flex flex-wrap">
        <figure>
          <img src="${img}" alt="${name}">
        </figure>
        <div class="d-flex justify-content-center container-text flex-wrap">
        <h2 class="w-100 text-center">"${name}"</h2><br>
        <h3 class="w-100 text-center">"${level}"</h3>
        </div>
      </article>
    `;
  }).join('');

  result.innerHTML = html;
}

const result = document.querySelector("#result");
const form = document.querySelector("#form");

form.addEventListener('submit', displayMatches)
