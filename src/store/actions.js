import api from '@/store/resource/api';
import storage from '@/store/resource/storage';

import getRepoAcl from '@/utils/get-repo-acl';

export default {
  init({ commit, dispatch }) {
    let email = storage.get('email');
    let token = storage.get('token');
    let displayNames = storage.get('displayNames');

    if (!email || !token) return;

    if (displayNames) commit('SET_DISPLAY_NAMES', { names: displayNames });
    api.init({ email, token });
    commit('SET_CREDENTIALS', { email, token, persist: true });
    dispatch('fetchData');
  },

  enableLoading({ commit }) {
    commit('SET_LOADING', { loading: true });
  },

  disableLoading({ commit }) {
    commit('SET_LOADING', { loading: false });
  },

  async login({ commit }, { credentials, persist }) {
    let token = null;

    api.init(credentials);
    try {
      await api.whoami();
      token = api.getToken();
    } catch (e) {
      api.reset();
      return false;
    }
    commit('SET_CREDENTIALS', {
      email: credentials.email,
      token,
      persist
    });
    return true;
  },

  async logout({ commit }) {
    api.reset();
    commit('SET_CREDENTIALS', { email: null, token: null, persist: true });
  },

  setCustomDisplayName({ state, commit }, { name }) {
    let displayNames = state.displayNames;
    let index = displayNames.findIndex(item => item.email === state.email);

    if (index !== -1) {
      displayNames[index].name = name;
    } else {
      displayNames.push({ email: state.email, name });
    }

    commit('SET_DISPLAY_NAMES', {
      names: displayNames
    });
  },

  async fetchData({ commit }) {
    let repos = [];
    let keys = [];

    try {
      repos = api.listRepositories();
      keys = api.listKeys();

      [repos, keys] = await Promise.all([repos, keys]);
    } catch (e) {
      repos = [];
      keys = [];
      throw e;
    }
    commit('SET_REPOS', { repos });
    commit('SET_KEYS', { keys });
  },

  async getRepoInfo({ commit }, { name }) {
    void commit;
    let info;
    let acl;

    try {
      info = api.repositoryInfo(name);
      acl = api.getACL(name);
      [info, acl] = await Promise.all([info, acl]);
    } catch (e) {
      info = {};
      acl = [];
      throw e;
    }
    acl = acl.map(getRepoAcl);
    return { ...info, acl };
  },

  async createRepo({ commit }, { name }) {
    void commit;

    return api.createRepository(name);
  },

  async deleteRepo({ commit }, { name }) {
    void commit;
    return api.deleteRepository(name);
  },

  async setRepoAcl({ commit }, { name, acl }) {
    void commit;
    let strRights = acl.rights.reduce(
      (acc, item) => (item.enabled ? acc + item.name : acc),
      ''
    );
    await api.setACL(name, acl.name, strRights);
  },

  async uploadKey({ commit }, { key }) {
    void commit;
    return api.uploadKey(key);
  },

  async deleteKey({ commit }, { name }) {
    void commit;
    return api.deleteKey(name);
  }
};
