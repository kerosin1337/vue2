<template>
  <div>
    <div class="modal fade" id="upload" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Загрузка</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form @submit.prevent="uploadPhoto" enctype="multipart/form-data">
            <div class="modal-body">
              <input type="file" class="" accept="image/*" id="file" required>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
              <button type="submit" class="btn btn-primary">Заугрузить</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  data () {
    return {
      token: localStorage.token
    }
  },
  methods: {
    uploadPhoto () {
      var formData = new FormData()
      const fileField = document.getElementById('file')
      console.log(fileField)
      formData.append('photo', fileField.files[0])
      const requestOptions = {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.token}`
        },
        body: formData
      }
      fetch(localStorage.url + 'photo', requestOptions)
        .then(async response => {
          const data = await response.json()
          if (response.status === 201) {
            console.log(data)
            localStorage.setItem('photoId', data.id)
            location.reload()
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
