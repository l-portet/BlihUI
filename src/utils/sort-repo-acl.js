export default function(repo) {
  console.log({repo})
  repo.acl.sort((a, b) => {
    if (a.name === 'ramassage-tek')
      return -1;
    if (b.name === 'ramassage-tek')
      return 1;
    return 0;
  })
  return repo;
}
