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
      console.log(body);
      let docName = [];
      let newPatients = [];
      let docPhone = [];
      let docAddress = [];
      for (var i = 0; i < body.data[0].practices.length; i++) {
        docName.push(body.data[0].practices[i].name);
        newPatients.push(body.data[0].practices[i].accepts_new_patients);
        docPhone.push(body.data[0].practices[i].phones[0].number);
        docAddress.push(body.data[0].practices[i].visit_address.street + ", " +  body.data[0].practices[i].visit_address.street2 + ", " + body.data[0].practices[i].visit_address.city + ", " + body.data[0].practices[i].visit_address.state + ", " + body.data[0].practices[i].visit_address.zip);

      };

      console.log(docAddress);
      console.log(docName);
      console.log(docPhone);
      console.log(newPatients);
      console.log(body.data[0].practices[0].accepts_new_patients);
      $(".doctorList").html(`Here is a list of Doctors: ${docName}`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });



  $("#searchName").submit(function() {
    event.preventDefault();
    const lastName = $("#nameInput").val();
    let nameFinder = new NameFinder(lastName);
    let promise2 = nameFinder.findName(lastName);

    promise2.then(function(response) {
      const body2 = JSON.parse(response);
      let docName = [];
      for (var i = 0; i < body2.data[0].practices.length; i++) {
        docName.push(body2.data[0].practices[i].name);
      };
      $(".doctorList").html(`Here is a list of Doctors: ${docName}`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });





});
