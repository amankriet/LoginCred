window.onload = function() {
  document.getElementById("get_cred").addEventListener('click', main_obj.get_credentials);
};

var main_obj = function() {

  function get_credentials() {
    let state = document.getElementById('state').value;
    let district = document.getElementById('district').value;
    let udise_code = document.getElementById('school_code').value;
    let data_node = document.getElementById('data');
    let no_data_node = document.getElementById('no_data');
    console.log(state +" - "+district+" - "+udise_code);

    var school_code = db.collection("school_code").doc(udise_code);

    var getOptions = {
      source: 'server'
    };

    school_code.get(getOptions).then(function(doc) {
      if(doc.data() == undefined) {
        no_data_node.style.display = "block";
        data_node.style.display = "none";
        console.log("No Server document data");
      } else {
        data_node.style.display = "block";
        no_data_node.style.display = "none";
        console.log("Server document data:", doc.data());
        document.getElementById('username').innerText = doc.data()["User name"];
        document.getElementById('password').innerText = doc.data().Password;
      }
    }).catch(function(error) {
      console.log("Error getting cached document:", error);
    });
  }

  return {
    get_credentials:get_credentials
  };
}();