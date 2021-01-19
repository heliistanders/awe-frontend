<template>
  <div class="admin">
    <h1>Admin</h1>
    <h2 v-if="status == 'error'">Something went wrong. Please try again</h2>
    <div v-if="status == 'loading'">
      <h2>Uploading</h2>
      <progress max="100" :value.prop="uploadPercentage"></progress>
    </div>
    <div v-if="status == 'creating'">
      <h2>Creating the machine</h2>
      <img src="/img/loader.svg" alt="loadig ...">
    </div>
    <div class="form" v-if="status == 'new'">
      <label for="password">Password: </label>
      <input type="text" name="password" id="password" v-model="password" />
      <div class="file-input">
        <label for="machine">
          <i class="icon-ic_fluent_arrow_upload_24_regular"></i>
           File: 
        {{fileName}}
        </label>
        <input
          type="file"
          name="machine"
          id="machine"
          ref="file"
          accept=".tar"
          v-on:change="handleFileUpload()"
          class="file"
        />
      </div>
      <button v-on:click="submitFile()" class="uploadBtn">Upload</button>
    </div>
    <div v-if="status == 'done'">
      <h1>Uploaded!</h1>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "Settings",
  computed: {
    ...mapState({
      searchQuery: "searchQuery",
    }),
  },
  data() {
    return {
      data: "",
      uploadPercentage: 0,
      password: "",
      fileName: '',
      status: "new"
    };
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      try {
        this.fileName = this.file.name
      } catch (err) {
        this.fileName = ""
      }
    },
    async submitFile() {
      this.status = "loading"
      /*
        Initialize the form data
      */
      let formData = new FormData();

      /*
        Add the form data we need to submit
      */
      formData.append("machine", this.file);
      formData.append("password", this.password);
      /*
        Make the request to the POST /single-file URL
      */
     try {
       let req = await axios
         .post("/add", formData, {
           headers: {
             "Content-Type": "multipart/form-data",
           },
           onUploadProgress: function (progressEvent) {
             let percentage = parseInt(
               Math.round((progressEvent.loaded / progressEvent.total) * 100)
             );
             if(percentage >= 99) {
               this.status = "creating"
             }
             this.uploadPercentage = percentage;
           }.bind(this),
         })
         console.log(req)
         console.log("Success")
         this.status = "done"

     } catch (err) {
       this.status = "error"
       console.log("Error: ", err)
     }
    },
  },
};
</script>

<style scoped>
.admin {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 500px;
}

#password {
  max-height: 50px;
  height: 50px;
  max-width: 200px;
  width: 200px;
  border-radius: 5px;
   padding: 5px 5px;
   border: 1px solid black;
  /* padding: 5px 10px; */
}


.file {
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
}

.icon-ic_fluent_arrow_upload_24_regular {
 color: #000;
 font-size: 20px;
}

.file-input label {
  margin: 10px 0px;
  display:block;
  width: 200px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid black;
  /* background: #42b983; */
  text-align: center;
  line-height: 50px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  transition: transform .2s ease-out;
  overflow: hidden;
  white-space:nowrap; 
  text-overflow:ellipsis;
}

label:hover,
label:focus {
  transform: scale(1.02);
  }

input:focus + label {
  outline: 1px solid #000;
  outline: -webkit-focus-ring-color auto 2px;
}

.file-name {
  position: absolute;
  bottom: -35px;
  left: 10px;
  font-size: 0.85rem;
  color: #555;
}

.uploadBtn {
  display: block;
  cursor: pointer;
  width: 200px;
  height: 50px;
  background: #42b983;
  border-radius: 5px;
  transition: transform .2s ease-out;
  border: none;
  color: #fff;
  font-weight: bold;
  padding: 5px 5px;
}

.uploadBtn:hover {
  transform: scale(1.02);

}
</style>