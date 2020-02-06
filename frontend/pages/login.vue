<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-card>
      <v-card-title primary-title>
        Login
      </v-card-title>
      <v-card-text>
        <v-text-field
          outlined
          dense
          name="email"
          label="Email"
          color="purple"
          v-model="user.email"
        ></v-text-field>
        <v-text-field
          outlined
          dense
          name="password"
          label="Password"
          type="password"
          color="purple"
          v-model="user.password"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="purple" width="100" small @click="login">Login</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text to="/signup">Signup</v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  middleware: 'notauthed',
  data(){
    return {
      user: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    async login(){
      let res = await this.$axios.$post("http://localhost:8080/login", this.user);
      console.log(res);
      this.$cookies.set('_id', res.data._id, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
      this.$cookies.set('token', res.data.token, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7
      })
      this.$store.dispatch("login", {_id: res.data._id, token: res.data.token})
      this.$router.push("/");
    }

  }
}
</script>
