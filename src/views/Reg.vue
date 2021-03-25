<template>
  <!--    <form class="" @submit.prevent="reg">-->
  <!--      <input type="text" placeholder="First name" v-model="first" required>-->
  <!--      <input type="text" placeholder="Surname name" v-model="sur" required>-->
  <!--      <input type="tel" placeholder="89999999999" v-model="tel" pattern="[0-9]{11}" required>-->
  <!--      <input type="password" v-model="pass" required>-->
  <!--      <input type="submit" >-->
  <!--    </form>-->
  <div class="container w-25 shadow-lg p-0 bg-white rounded mb-3">
    <form class="p-2" @submit.prevent="reg">
      <div class="mb-3">
        <label for="exampleInputFirst" class="form-label">FirstName</label>
        <input type="text" class="form-control" id="exampleInputFirst" v-model="first" required>
      </div>
      <div class="mb-3">
        <label for="exampleInputSur" class="form-label">Surname</label>
        <input type="text" class="form-control" id="exampleInputSur" v-model="sur" required>
      </div>
      <div class="mb-3">
        <label for="exampleInputTel" class="form-label">Phone</label>
        <input type="tel" class="form-control" id="exampleInputTel" v-model="tel" placeholder="9-(999)-999-99-99"
               required pattern="[0-9]{11}">
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" v-model="pass" required>
      </div>
      <input type="submit" class="btn btn-primary" value="Регистрация">
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
      tel: '',
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
      fetch(localStorage.url + 'signup', requestOptions)
        .then(async response => {
          const data = await response.json()
          if (response.status === 201) {
            alert('Регестрация прошла успешно')
            console.log(data.id, response)
            localStorage.setItem('myName', this.first)
            localStorage.setItem('log', this.tel)
            localStorage.setItem('pass', this.pass)
            window.location = ''
          } else {
            console.log(data)
            const pass = data.password || ' '
            console.log(pass)
            alert(data.phone + ' ' + pass)
          }
        })
    }
  }
}
</script>
<!--<script >-->
<!--$(document).ready(function () {-->
<!--  $('#exampleInputTel').mask('+9 (999) 999 99 99')-->
<!--})-->
<!--</script>-->
<style scoped>

</style>
<!--https://jasonwatmore.com/post/2020/04/30/vue-fetch-http-post-request-examples-->
