import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { DoctorFinder } from './doctor';

$(document).ready(function () {
  $("#findADoc").submit(function() {
    event.preventDefault();
    const symptom = $("#symptomInput").val();
    const lastName = $("#nameInput").val();
    let doctorFinder = new DoctorFinder(lastName, symptom);
    let promise = doctorFinder.findDoc(lastName, symptom);


    promise.then(function(response) {
      const body = JSON.parse(response);
      console.log(body.data[0].profile.first_name);
      console.log(body);
      $(".doctorList").text(`Here is a list of Doctors that can help with your ${symptom} : ${body.data[0].profile.first_name}`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });


// ${body.data[2].profile.first_name}
// console.log(body.data.profile);



  });
});
