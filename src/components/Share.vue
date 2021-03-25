<template>
  <div>
    <div class="modal fade" id="share" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Поделиться</h5>
            <button type="button" class="btn p-0" data-bs-dismiss="modal" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x"
                   viewBox="0 0 16 16">
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <table class="table table-striped">
              <tr v-for="user in users" :key="user.id">
                <th scope="row">{{ user.id }}</th>
                <td>
                  {{ user.first_name }}
                </td>
                <td class="text-right">
                  <button class="btn btn-success" @click="sharing(user.id)"
                          :disabled="imageId.users.indexOf(String(user.id)) !== -1">Поделиться
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Share',
  props: {
    imageId: Object
  },
  data () {
    return {
      users: [],
      myLogin: localStorage.log
    }
  },
  created () {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    }
    fetch(localStorage.url + 'user?search=', requestOptions)
      .then(async response => {
        const data = await response.json()
        this.users = data
      })
  },
  methods: {
    async sharing (id) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify(
          {
            photos: [this.imageId.id]
          }
        )
      }
      console.log(requestOptions)
      fetch(localStorage.url + 'user/' + id + '/share', requestOptions)
        .then(async response => {
          const data = await response.json()
          console.log(data, response)
          location.reload()
        })
    }
  }
}
</script>

<style scoped>

</style>
