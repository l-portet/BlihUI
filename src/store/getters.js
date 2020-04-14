import getReposTags from '@/utils/get-repos-tags';
import getReposYear from '@/utils/get-repos-year';
import sortByName from '@/utils/sort-by-name';

export default {
  isAuthenticated(state) {
    return !!state.email && !!state.token;
  },
  displayName(state) {
    let displayName;

    if (!state.email) return '';

    if (
      (displayName = state.displayNames.find(
        item => item.email === state.email
      ))
    )
      return displayName.name;

    displayName = state.email.split('@')[0];
    displayName = displayName.split('.').join(' ');
    displayName = displayName.split('-').join(' ');
    displayName = displayName.split(/[0-9]/g).join('');

    displayName = displayName.split(' ');
    displayName = displayName.map(str => str[0].toUpperCase() + str.slice(1));

    return displayName.join(' ');
  },
  repos(state) {
    let repos = state.repos;

    repos.sort(sortByName);
    repos = getReposTags(repos);
    repos = getReposYear(repos);

    return repos || [];
  }
};
