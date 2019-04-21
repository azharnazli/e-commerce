<template>
  <v-container>
    <h1>Login</h1>
    <errorAlert v-if="isError" v-bind:msg="errMessage">
    </errorAlert>
    <v-form class="border" ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

      <v-text-field v-model="password" :append-icon="show1 ? 'visibility' : 'visibility_off'"
        :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="password"
        hint="At least 8 characters" counter @click:append="show1 = !show1">
      </v-text-field>

      <v-btn :disabled="!valid" color="success" @click="login">
        login
      </v-btn>

      <v-btn color="error" @click="reset">
        clear
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
  import errorAlert from '../components/error.vue'
  export default {
    props: ['changeRoles','isLogin'],
    components: {
      errorAlert
    },
    data() {
      return {
        loginUser: false,
        show1: false,
        isError: false,
        errMessage: '',
        password: '',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match')
        },
        valid: true,
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        roles: ''
      }
    },
    methods: {
      login() {
        this.axios.post('users/login', {
            email: this.email,
            password: this.password
          })
          .then(({
            data
          }) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('roles', data.roles)
            this.roles = localStorage.getItem('roles')
            this.$refs.form.reset()
            this.$emit('successLogin')
            this.$emit('changeRoles')
            this.$router.push('/')
          })
          .catch(err => {
            this.isError = true
            this.errMessage = err.response.data.err

          })
      },
      reset() {
        this.password = ''
        this.email = ''
        this.isError = false
      },
      checkLoginuser() {
        if(localStorage.getItem('token')){
          this.$router.push('/')
        }
      }
    },
    created(){
      this.checkLoginuser()
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
