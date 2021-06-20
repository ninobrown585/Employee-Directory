import axios from "axios";
const BASEURL = "https://randomuser.me/";

export default {
  search: function() {
    return axios.get(BASEURL);
  }
};