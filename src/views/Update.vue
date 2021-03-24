<template>
  <div>
    <form action="" enctype="multipart/form-data">
      <input type="text" v-model="name">
      <input type="file" accept="image/*" id="file">
      <input type="submit" @click="updatePhoto">
    </form>
  </div>
</template>

<script>
export default {
  name: 'Update',
  data () {
    return {
      token: localStorage.token,
      name: ''
    }
  },
  methods: {
    updatePhoto () {
      console.log(this.$route.params.id)
      var formData = new FormData()
      const fileField = document.getElementById('file')
      formData.append('_method', 'patch')
      formData.append('name', this.name)
      formData.append('photo', fileField.files[0])
      const requestOptions = {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.token}`
        },
        body: formData
      }
      console.log(localStorage.url + `photo/${this.$route.params.id}`)
      fetch(localStorage.url + 'photo/' + this.$route.params.id, requestOptions)
        .then(async response => {
          const data = await response.json()
          console.log(data, response)
          if (response.status === 200) {
            alert('Успешное обновление фото')
          } else if (response.status === 422) {
            console.log(data)
          } else if (response.status === 403) {
            alert('Не ваше фото')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
