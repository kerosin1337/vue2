<template>
  <div>
    <input type="text" v-model="search">
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">Firstname</th>
        <th scope="col">Surname</th>
        <th scope="col">Phone</th>
      </tr>
      </thead>
      <tr v-for="user in arr" :key="user.id">
        <th scope="row">{{ user.id }}</th>
        <td>
          {{ user.first_name }}
        </td>
        <td>
          {{ user.surname }}
        </td>
        <td>
          {{ user.phone }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'GetUsers',
  data () {
    return {
      token: localStorage.token,
      search: '',
      arr: []
    }
  },
  created () {
    const requestOptions = {
      method: 'GET',
      headers: {
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${this.token}`
      }
    }
    fetch(localStorage.url + 'user?search=', requestOptions)
      .then(async response => {
        const data = await response.json()
        this.arr = data
      })
  },
  watch: {
    search (q) {
      const requestOptions = {
        method: 'GET',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.token}`
        }
      }
      fetch(localStorage.url + 'user?search=' + q || '', requestOptions)
        .then(async response => {
          const data = await response.json()
          this.arr = data
        })
    }
  }
}
</script>

<style scoped>
</style>
