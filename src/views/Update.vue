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
    async updatePhoto () {
      const getUrl = async (file) => {
        if (file) {
          const promise = new Promise(resolve => {
            const reader = new FileReader()

            reader.readAsDataURL(file)

            reader.onloadend = function () {
              resolve(reader.result)
            }
          })
          return await promise
        }
      }
      var formData = new FormData()
      const fileField = document.getElementById('file')
      formData.append('_method', 'patch')
      formData.append('name', this.name || 'untitled')
      formData.append('photo', await getUrl(fileField.files[0]))
      const requestOptions = {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.token}`
        },
        body: formData
      }
      fetch(localStorage.url + 'photo/' + this.$route.params.id, requestOptions)
        .then(async response => {
          const data = await response.json()
          console.log(data, response)
          if (response.status === 200) {
            alert('Успешное обновление фото')
          } else if (response.status === 422) {
            alert(data.photo)
            console.log(data)
          } else if (response.status === 403) {
            alert('Не ваше фото')
            console.log(data, response)
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
