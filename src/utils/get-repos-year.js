export default function(repos) {
  let regEx = /_[0-9]{4,4}$/g;

  for (let i = 0; i < repos.length; i++) {
    let repo = repos[i];
    let year;

    if ((year = repo.name.match(regEx))) {
      repo.year = year[0].slice(1);
    } else {
      repo.year = '—';
    }
  }

  return repos;
}
