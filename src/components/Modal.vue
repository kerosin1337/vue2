<template>
  <div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Редактирование</h5>
            <button type="button" class="btn p-0" data-bs-dismiss="modal" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x"
                   viewBox="0 0 16 16">
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="name" class="form-label">Название</label>
              <input type="text" class="form-control" id="name" placeholder="untitled" v-model="name">
            </div>
            <div class="mb-3">
              <label for="file" class="form-label">Изображение</label>
              <input class="form-control" type="file" id="file" accept="image/*">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="del(image.id)">Удалить</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
            <button type="button" class="btn btn-primary" @click="updatePhoto(image.id)">Обновить</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <img :src="imageOne" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    image: Object,
    imageOne: String
  },
  data () {
    return {
      name: ''
    }
  },
  methods: {
    async updatePhoto (id) {
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
      if (fileField.files[0]) {
        formData.append('photo', await getUrl(fileField.files[0]))
      }
      const requestOptions = {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.token}`
        },
        body: formData
      }
      fetch(localStorage.url + 'photo/' + id, requestOptions)
        .then(async response => {
          const data = await response.json()
          console.log(data, response)
          if (response.status === 200) {
            location.reload()
          } else if (response.status === 422) {
            alert(data.photo)
            console.log(data)
          } else if (response.status === 403) {
            alert('Не ваше фото')
            console.log(data, response)
          }
        })
    },
    del (id) {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.token}`
        }
      }
      console.log(localStorage.url + 'photo/' + id)
      fetch(localStorage.url + 'photo/' + id, requestOptions)
        .then(response => {
          const data = response.json()
          console.log(response, data)
          if (response.status === 204) {
            location.reload()
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
