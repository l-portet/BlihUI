<template>
  <div class="page page-login">
    <the-logo class="logo" />
    <form class="login-form no-drag" @submit.prevent="login">
      <h1>Login</h1>
      <label>
        Username
        <input
          v-model="input.email"
          type="text"
          placeholder="john.doe"
        />
      </label>
      <label>
        Password
        <input
          v-model="input.password"
          type="password"
          placeholder="∙∙∙∙∙∙∙∙∙∙"
        />
      </label>
      <label class="label-remindme">
        <input v-model="input.remindMe" type="checkbox" />
        Remind me
      </label>
      <ui-button class="btn-signin" type="primary">
        Sign In
      </ui-button>
    </form>
  </div>
</template>

<script>
import TheLogo from '@/components/TheLogo';
import UiButton from '@/components/ui/UiButton';

export default {
  name: 'Login',
  components: {
    TheLogo,
    UiButton
  },
  data() {
    return {
      input: {
        email: '',
        password: '',
        remindMe: true
      }
    };
  },
  methods: {
    async login() {
      let res = null;
      let email = this.input.email;

      this.$store.dispatch('enableLoading');
      if (!email.length || !this.input.password.length) {
        window.alert('Email and password are required.');
        this.$store.dispatch('disableLoading');
        return;
      }

      if (!this.input.email.includes('@')) email += '@epitech.eu';
      try {
        res = await this.$store.dispatch('login', {
          credentials: {
            email,
            password: this.input.password
          },
          persist: this.input.remindMe
        });
      } catch (e) {
        res = false;
      }
      if (res) {
        this.$store.dispatch('disableLoading');
        this.$router.push({ name: 'Home' });
      } else {
        this.$store.dispatch('disableLoading');
        window.alert('Oops! Authentication failed.');
      }
    }
  }
};
</script>

<style lang="scss">
.page-login {
  padding: 30px 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  -webkit-app-region: drag;

  .logo {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 70px;
  }

  .login-form {
    width: 100%;
  }

  .label-remindme {
    float: left;
    font-weight: 500;
  }

  .btn-signin {
    display: block;
    float: right;
    clear: both;
  }
}
</style>
