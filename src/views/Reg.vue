<template>
    <div>
      1
    </div>
</template>

<script>
export default {
  name: 'Reg',
  data () {
    return { postId: 1 }
  },
  async created () {
    // eslint-disable-next-line no-unused-vars
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: 'Kerov1',
        surname: 'Eugene3',
        phone: '89119199741',
        password: '123321'
      })
    }
    const response = await fetch('http://u104386.test-handyhost.ru/api/signup', requestOptions)
    const data = await response.json()
    console.log(data)
  }
}
</script>

<style scoped>

</style>
<!--https://jasonwatmore.com/post/2020/04/30/vue-fetch-http-post-request-examples-->
