import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { DoctorFinder } from './doctor';

$(document).ready(function () {
  $("#findADoc").submit(function() {
    event.preventDefault();
    const symptom = $("#symptomInput").val();
    let doctorFinder = new DoctorFinder(symptom);
    let promise = doctorFinder.findDoc(symptom);


    promise.then(function(response) {
      const body = JSON.parse(response);
      console.log(body.data.profile);
      $(".doctorList").text(`Here is a list of Doctors that can help with your ${symptom} : ${body.data[2].profile.first_name}`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });






  });
});
