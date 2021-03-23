<template>
  <div class="container shadow-lg p-0 bg-white rounded mb-3">
    <form class="">
      <input type="text" placeholder="First name" v-model="first" required>
      <input type="text" placeholder="Surname name" v-model="sur" required>
      <input type="tel" placeholder="89999999999" v-model="tel" pattern="[0-9]{11}" required>
      <input type="password" v-model="pass" required>
      <input type="submit" @click="reg">
    </form>
  </div>
</template>

<script>
export default {
  name: 'Reg',
  data () {
    return {
      click: false,
      first: '',
      sur: '',
      tel: '78965412369',
      pass: '',
      data: ''
    }
  },
  methods: {
    async reg () {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: this.first,
          surname: this.sur,
          phone: this.tel,
          password: this.pass
        })
      }

      const response = await fetch('http://u104386.test-handyhost.ru/api/signup', requestOptions)
      // eslint-disable-next-line no-unused-vars
      const data = response.json()
      console.log(data)
    }
  }
}
</script>

<style scoped>

</style>
<!--https://jasonwatmore.com/post/2020/04/30/vue-fetch-http-post-request-examples-->
