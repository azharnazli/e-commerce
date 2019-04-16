<template>
  <v-container>
    <h1>Register</h1>
    <errorAlert v-if="isError" v-bind:msg="errMessage">
    </errorAlert>
    <v-form class="border" ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="first_name" :counter="20" :rules="firstNameRules" label="firstName" required>
      </v-text-field>
      <v-text-field v-model="last_name" :counter="20" :rules="lastNameRules" label="lastName" required></v-text-field>

      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

      <v-text-field v-model="password" :append-icon="show1 ? 'visibility' : 'visibility_off'"
        :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
        label="Normal with hint text" hint="At least 8 characters" counter @click:append="show1 = !show1">
      </v-text-field>

      <v-btn :disabled="!valid" color="success" @click="register">
        register
      </v-btn>

      <v-btn color="error" @click="reset">
        clear
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
  import errorAlert from '../components/error'
  export default {
    components: {
      errorAlert
    },
    data: () => ({
      isError: false,
      errMessage: '',
      show1: '',
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match')
      },
      valid: true,
      first_name: '',
      firstNameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters'
      ],
      last_name: '',
      lastNameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Name must be less than 20 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
    }),

    methods: {
      register() {
        this.axios.post('users/register', {
            first_name: this.first_name,
            last_name: this.last_name,
            password: this.password,
            email: this.email,
          })
          .then(user => {
            this.$router.push('/')
          })
          .catch(err => {
            if (err.response.data) {
              this.errMessage = err.response.data.error
              this.isError = true
            }
          })
      },
      reset() {
        this.errMessage = false
        this.isError = false
      }
    }
  }

</script>
<style scoped>
  .container {
    margin-top: 20%;
    max-width: 50%;
    border: 1px solid gray;
  }

</style>
