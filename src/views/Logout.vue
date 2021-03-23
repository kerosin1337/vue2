<template>
<div></div>
</template>

<script>
export default {
  name: 'Logout',
  data () {
    return {
      token: localStorage.token
    }
  },
  created () {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    }
    console.log(requestOptions.headers)
    fetch(localStorage.url + 'logout', requestOptions)
      .then(async response => {
        if (response.status === 200) {
          alert('Успешный выход')
          localStorage.token = ''
        } else if (response.status === 403) {
          alert('You need authorization')
        }
      })
  }
}
</script>

<style scoped>

</style>
