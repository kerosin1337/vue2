<template>
  <div>
    <div class="modal fade" id="upload" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Загрузка</h5>
            <button type="button" class="btn p-0" data-bs-dismiss="modal" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x"
                   viewBox="0 0 16 16">
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>
          <form @submit.prevent="uploadPhoto" enctype="multipart/form-data">
            <div class="modal-body">
              <input type="file" class="" accept="image/*" id="file" required>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Загрузить</button>
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
