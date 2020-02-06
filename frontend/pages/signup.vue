<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-card>
      <v-card-title primary-title>
        Signup
      </v-card-title>
      <v-card-text>
        <v-text-field
          outlined
          dense
          name="firstname"
          label="Firstname"
          color="purple"
          v-model="user.firstname"
        ></v-text-field>
        <v-text-field
          outlined
          dense
          name="lastname"
          label="Lastname"
          color="purple"
          v-model="user.lastname"
        ></v-text-field>
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
        <v-btn color="purple" width="100" small @click="signup">Signup</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" small text to="/login">Login</v-btn>
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
        firstname: "",
        lastname: "",
        email: "",
        password: ""
      }
    }
  },
  methods: {
    async signup(){
      let res = await this.$axios.$post("http://localhost:8080/signup", this.user);
      console.log(res);
    }
  }
}
</script>
