<template>
  <div>
    <form @submit.prevent="uploadPhoto" enctype="multipart/form-data">
      <input type="file" accept="image/*" id="file">
      <input type="submit">
    </form>
    <a @click="photoUpdate" v-if="seen">Photo Update</a>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  data () {
    return {
      token: localStorage.token,
      seen: false
    }
  },
  methods: {
    photoUpdate () {
      window.location.href = '/?#/update/' + localStorage.photoId
    },
    uploadPhoto () {
      var formData = new FormData()
      const fileField = document.getElementById('file')
      console.log(fileField)
      formData.append('photo', fileField.files[0])
      const requestOptions = {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.token}`
        },
        body: formData
      }
      fetch(localStorage.url + 'photo', requestOptions)
        .then(async response => {
          const data = await response.json()
          if (response.status === 201) {
            console.log(data)
            localStorage.setItem('photoId', data.id)
            this.seen = true
            alert('Успешная загрузка')
          } else if (response.status === 422) {
            alert(data.photo)
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
