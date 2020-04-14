import { remote } from 'electron';

const Blih = remote.app.Blih;

class Api {
  constructor() {
    this.blih = null;
  }

  init(credentials) {
    this.blih = new Blih(credentials);
  }

  reset() {
    this.blih = null;
  }

  getToken() {
    if (!this.blih) return null;
    return this.blih.token || null;
  }

  isLoggedIn() {
    if (!this.blih) return false;
    if (this.blih.token) return true;
    return false;
  }

  async whoami() {
    return this.blih.whoami();
  }

  async listRepositories() {
    return this.blih.listRepositories();
  }

  async createRepository(name) {
    // return this.blih.createRepository(name);
    const data = {
      name,
      type: 'git'
    };

    return (await this.blih.call('post', '/repositories', data)).data.message;
  }

  async repositoryInfo(name) {
    return this.blih.repositoryInfo(name);
  }

  async deleteRepository(name) {
    return this.blih.deleteRepository(name);
  }

  async getACL(name) {
    return this.blih.getACL(name);
  }


  async setACL(repository, user, acl) {
    console.log(repository, user, acl);
    return this.blih.setACL(repository, user, acl);
  }

  async listKeys() {
    return this.blih.listKeys();
  }

  async uploadKey(key) {
    return this.blih.uploadKey(key);
  }

  async deleteKey(key) {
    return this.blih.deleteKey(key);
  }
}

export default new Api();
