import storage from '@/store/resource/storage';

export default {
  SET_LOADING(state, { loading }) {
    state.loading = loading;
  },
  SET_CREDENTIALS(state, { email, token, persist }) {
    if (typeof persist === 'undefined') persist = true;
    if (typeof token === 'undefined' || typeof email === 'undefined') return;
    state.token = token;
    state.email = email;
    console.log({ token, email, persist });
    if (persist) {
      storage.set('token', token);
      storage.set('email', email);
    } else {
      storage.delete('token');
      storage.delete('email');
    }
  },
  SET_DISPLAY_NAMES(state, { names }) {
    console.log({ names });
    storage.set('displayNames', names);
    state.displayNames = names || [];
  },
  SET_REPOS(state, { repos }) {
    state.repos = repos || [];
  },
  SET_KEYS(state, { keys }) {
    state.keys = keys || [];
  }
};
