<template>
  <div class="container w-25 shadow-lg p-0 bg-white rounded mb-3">
    <form action="" class="p-2" @submit.prevent="login">
      <div class="mb-3">
        <label for="Login" class="form-label">Phone</label>
        <input type="tel" placeholder="89999999999" v-model="tel" pattern="[0-9]{11}" class="form-control" id="Login"
               required>
      </div>
      <div class="mb-3">
        <label for="Pass" class="form-label">Password</label>
        <input type="password" v-model="pass" id="Pass" class="form-control" required>
      </div>
      <div>
        <input type="submit" class="btn btn-primary" value="Авторизоваться">
        <router-link to="/reg" class="text-blue">Нет аккаунта?</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      click: false,
      tel: localStorage.log,
      pass: ''
    }
  },
  methods: {
    async login () {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: this.tel,
          password: this.pass
        })
      }
      fetch(localStorage.url + 'login', requestOptions)
        .then(async response => {
          const data = await response.json()
          if (response.status === 200) {
            console.log(data, response)
            localStorage.setItem('token', data.token)
            localStorage.setItem('myName', this.first)
            localStorage.setItem('log', this.tel)
            localStorage.setItem('pass', this.pass)
            window.location = ''
          } else if (response.status === 422) {
            console.log(data)
            const pass = data.password || ' '
            const login = data.login || ' '
            alert(login + ' ' + pass)
          } else if (response.status === 404) {
            alert('Неправильный логин или пароль')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
