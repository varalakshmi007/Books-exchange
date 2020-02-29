<template>
  <v-container fluid class="fill-height">
    <v-row no-gutters class="mb-4">
      <v-col xs="12" offset-md="2" md="8">
        <h3 class="text-center mb-10">Profile</h3>
        <v-form ref="form1" v-model="valid1" lazy-validation>
          <v-text-field
            v-model="name"
            :rules="[rules.required]"
            label="Name"
            outlined
            required
            dense
          ></v-text-field>

          <v-btn
            :disabled="!valid1"
            color="success"
            class="mr-4"
            @click="changeName"
            :loading="loadingAdd1"
          >
            Submit
          </v-btn>
        </v-form>
      </v-col>
    </v-row>

    <v-row no-gutters class="mb-4">
      <v-col xs="12" offset-md="2" md="8">
        <hr class="my-8" />
        <h3 class="text-center mb-10">Password Change</h3>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="newPassword"
            :rules="[rules.required, rules.min]"
            label="New password"
            outlined
            required
            dense
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show1 = !show1"
            :type="show1 ? 'text' : 'password'"
          ></v-text-field>

          <v-text-field
            v-model="confirmPassword"
            :rules="[rules.required, rules.min, passwordConfirmationRule]"
            label="Confirm password"
            outlined
            required
            dense
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show2 = !show2"
            :type="show2 ? 'text' : 'password'"
          ></v-text-field>

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
    <v-snackbar
      v-model="snackbar.display"
      :color="snackbar.color"
      :timeout="3000"
      top
    >
      {{ snackbar.text }}
    </v-snackbar>
  </v-container>
</template>

<script>
const firebase = require("firebase/app");
require("firebase/firestore");

export default {
  name: "add-book",
  data: () => ({
    name: "",
    valid1: "",
    loadingAdd1: false,

    show1: false,
    show2: false,
    loadingAdd: false,
    valid: "",
    newPassword: "",
    confirmPassword: "",
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 6 || "Min 6 characters"
    },
    snackbar: {
      display: false,
      color: "",
      text: ""
    }
  }),
  mounted() {
    this.name = firebase.auth().currentUser.displayName;
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.newPassword === this.confirmPassword || "Password must match";
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.loadingAdd = true;
        let self = this;

        const currentUser = firebase.auth().currentUser;

        currentUser
          .updatePassword(this.newPassword)
          .then(function() {
            // Update successful.
            self.$refs.form.reset();
            self.loadingAdd = false;

            self.snackbar.color = "success";
            self.snackbar.text = "Password successfully changed";
            self.snackbar.display = true;
          })
          .catch(function(error) {
            // An error happened.
            self.snackbar.color = "error";
            self.snackbar.text = "Current password is incorrect";
            self.snackbar.display = true;
            self.loadingAdd = false;
            // console.log(error);
          });
      }
    },

    changeName() {
      if (this.$refs.form1.validate()) {
        this.loadingAdd1 = true;
        let self = this;

        const currentUser = firebase.auth().currentUser;

        currentUser
          .updateProfile({
            displayName: this.name
          })
          .then(function() {
            // Update successful.
            self.loadingAdd1 = false;

            self.snackbar.color = "success";
            self.snackbar.text = "Name successfully changed";
            self.snackbar.display = true;
          })
          .catch(function(error) {
            // An error happened.
            self.snackbar.color = "error";
            self.snackbar.text = "Error occured.";
            self.snackbar.display = true;
            self.loadingAdd1 = false;
          });
      }
    }
  }
};
</script>
