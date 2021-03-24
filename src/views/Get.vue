<template>
  <div class="container shadow-lg p-0 bg-white rounded mb-3">
    <div class="row justify-content-sm-between">
      <div class="col-md-5 m-4 p-0" v-for="image in images" :key="image.id">
        <div class="card shadow-lg">
          <img :src="image.url" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ image.name || 'untitled' }}</h5>
            <button type="button" class="btn btn-warning m-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Редактировать
            </button>
            <button class="btn btn-primary m-1" @click="getOne(image.id)" data-bs-toggle="modal"
                    data-bs-target="#exampleModal2">
              Посмотреть
            </button>
          </div>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Редактирование</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
          <div class="modal-dialog">
            <div class="modal-content">
              <img :src="imageOne" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Get',
  data () {
    return {
      token: localStorage.token,
      images: [],
      imageOne: '',
      name: ''
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
    fetch(localStorage.url + 'photo', requestOptions)
      .then(async response => {
        const data = await response.json()
        this.images = data
        console.log(this.images)
      })
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
          Authorization: `Bearer ${this.token}`
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
    async getOne (id) {
      const requestOptions = {
        method: 'GET',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.token}`
        }
      }
      fetch(localStorage.url + 'photo/' + id, requestOptions)
        .then(async response => {
          const data = await response.json()
          this.imageOne = data.url
        })
    },
    del (id) {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`
        }
      }
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
