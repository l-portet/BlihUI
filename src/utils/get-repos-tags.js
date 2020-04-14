const colors = [
  '#7A00FF',
  '#F17B0B',
  '#0083FF',
  '#FF4DFA',
  '#59AC0F',
  '#f10b0b'
];

export default function(repos) {
  let tagsColor = {};
  let regEx = /^((([A-Z]|[a-z]){0,3}_)|([A-Z]|[a-z])([0-9]))/g;

  for (let i = 0; i < repos.length; i++) {
    let repo = repos[i];
    let tag;

    if ((tag = repo.name.match(regEx))) {
      repo.tag = tag[0];
      if (repo.tag[repo.tag.length - 1] === '_')
        repo.tag = repo.tag.slice(0, repo.tag.length - 1).toUpperCase();
      if (!tagsColor[repo.tag])
        tagsColor[repo.tag] =
          colors[Object.values(tagsColor).length % colors.length];
      repo.color = tagsColor[repo.tag];
    } else {
      repo.tag = '—';
    }
  }

  return repos;
}
