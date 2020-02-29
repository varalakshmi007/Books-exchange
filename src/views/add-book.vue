<template>
  <v-container fluid class="fill-height">
    <v-row no-gutters class="mb-4">
      <v-col xs="12" offset-md="2" md="8">
        <h3 class="text-center mb-10">Add a book</h3>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :counter="30"
            :rules="nameRules"
            label="Book Name"
            outlined
            required
          ></v-text-field>

          <v-textarea
            v-model="description"
            label="Book description"
            :rules="desRules"
            outlined
            required
          ></v-textarea>

          <v-select
            v-model="type"
            :items="items"
            :rules="[v => !!v || 'Genre is required']"
            label="Genre"
            outlined
            required
          ></v-select>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
            :loading="loadingAdd"
          >
            Submit
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const firebase = require("firebase/app");
require("firebase/firestore");
const db = firebase.firestore();

export default {
  name: "add-book",
  data: () => ({
    loadingAdd: false,
    valid: "",
    name: "",
    description: "",
    type: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 30) || "Name must be less than 30 characters"
    ],
    desRules: [v => !!v || "Description is required"],
    items: ["Fiction", "Non-fiction", "Academics", "Auto-biography", "History"]
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.loadingAdd = true;
        let self = this;

        const currentUser = firebase.auth().currentUser;

        db.collection("books")
          .add({
            name: this.name,
            description: this.description,
            type: this.type,
            email: currentUser.email,
            user: currentUser.displayName,
            uid: currentUser.uid,
            done: false
          })
          .then(function(docRef) {
            // Reset form
            self.$refs.form.reset();
            self.loadingAdd = false;
          })
          .catch(function(error) {
            // console.error("Error adding document: ", error);
          });
      }
    }
  }
};
</script>
