<template>
  <v-layout
    row
    justify-center
    align-center
    nowrap
  >
    <v-flex xs12 sm6 md4 lg3 v-for="item in res.todo" :key="item._id" pa-2>
      <v-card>
        <v-card-title primary-title>
          {{item.title}}
        </v-card-title>
        <v-card-text>
          <v-checkbox v-for="(task, index) in item.list" :key="index" :label="task.text" v-model="task.checked" @click="checkThis(item._id, index, task.checked)"></v-checkbox>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 md4 lg3>
      <v-card>
        <v-card-title primary-title>
          <v-text-field
            name="title"
            v-model="newtodo.title"
            label="Title"
            outlined
            dense
          ></v-text-field>
        </v-card-title>
        <v-card-text v-if="newtodo.list.length != 0">
          <p v-for="item in newtodo.list">{{item.text}}</p>
        </v-card-text>
        <v-card-text>
          <v-flex xs12>
            <v-text-field
            name="addingElement"
            v-model="addingelement"
            label="Todo"
            outlined
            dense
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-btn block color="primary" @click="addElement">Add</v-btn>
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="saveTodo()">Save</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="yellow" @click="clearer">Clear</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-btn
    color="pink"
    dark
    small
    absolute
    right
    fab
    @click="logout()"
    >
    <v-icon >mdi-plus</v-icon>
  </v-btn>
  </v-layout>
</template>

<script>
export default {
  middleware: 'authed',
  async asyncData({$axios, store}){
    console.log(store.state);
    $axios.setToken(store.state.token);
    let res = await $axios.$get("http://localhost:8080/gettodo")
    return {res: res};
  },
  data(){
    return {
      newtodo: {
        title: "",
        list: []
      },
      addingelement: ""
    }
  },
  methods: {
    addElement(){
      // let res = await this.$axios.$post("http://localhost:8080/todo", )
      this.newtodo.list.push({text: this.addingelement, checked: false});
      this.addingelement = "";
    },
    clearer(){
      this.newtodo = {
        title: "",
        list: [],
      }
      this.addingelement = "";
    },
    async saveTodo(){
      this.$axios.setToken(this.$store.state.token);
      let wtf = await this.$axios.$post("http://localhost:8080/settodo", this.newtodo);
      this.clearer();
      let res = await this.$axios.$get("http://localhost:8080/gettodo");
      this.res = res;
    },
    async checkThis(id, index, status){
      status = !status
      this.$axios.setToken(this.$store.state.token);
      let wtf = await this.$axios.$post("http://localhost:8080/checktodo", {id: id, index: index, status: status});
      console.log(wtf);
      let res = await this.$axios.$get("http://localhost:8080/gettodo");
      this.res = res;
    },
    logout(){
      this.$cookies.remove('token');
      this.$cookies.remove('id');
      this.$store.dispatch("logout");
      this.$axios.setHeader('Authorization', null);
      this.$router.push("/login");
    }
  }
}
</script>
