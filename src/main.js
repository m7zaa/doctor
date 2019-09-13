import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { NameFinder, SymptomFinder } from './doctor';

$(document).ready(function () {
  $("#searchSymptom").submit(function() {
    event.preventDefault();
    const symptom = $("#symptomInput").val();
    let symptomFinder = new SymptomFinder(symptom);
    let promise = symptomFinder.findSymptom(symptom);


    promise.then(function(response) {
      const body = JSON.parse(response);
      // console.log(body.data[0].profile.first_name);
      console.log(body);
      // $(".doctorList").text(`Here is a list of Doctors: ${body.data[0]}`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
      // ${body.data[2].profile.first_name}
      // console.log(body.data.profile);
    });
  });



  $("#searchName").submit(function() {
    event.preventDefault();
    const lastName = $("#nameInput").val();
    let nameFinder = new NameFinder(lastName);
    let promise2 = nameFinder.findName(lastName);


    promise2.then(function(response) {
      const body2 = JSON.parse(response);
      // console.log(body.data[0].profile.first_name);
      console.log(body2);
      console.log(body2.data[0].practices[1]);
      console.log(body2.data[0].practices[1,2,3,4,5,6,7,8,9,10]);
      $(".doctorList").text(`Here is a list of Doctors: ${body2.data.practices}`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
      // ${body.data[2].profile.first_name}
      // console.log(body.data.profile);
    });
  });





});
