<template>
  <form action="">
    <input type="tel" placeholder="89999999999" v-model="tel" pattern="[0-9]{11}">
    <input type="password" v-model="pass">
    <input type="submit" @click="login">
  </form>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      click: false,
      tel: localStorage.log,
      pass: localStorage.pass
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
            alert('Успешная авторизация')
            console.log(data.token)
            localStorage.setItem('token', data.token)
            console.log(localStorage.token)
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
