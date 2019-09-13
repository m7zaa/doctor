import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { NameFinder, SymptomFinder, Doctors } from './doctor';

$(document).ready(function () {
  $("#searchSymptom").submit(function() {
    event.preventDefault();
    const symptom = $("#symptomInput").val();
    let symptomFinder = new SymptomFinder(symptom);
    let promise = symptomFinder.findSymptom(symptom);
    promise.then(function(response) {
      const body = JSON.parse(response);
      let docName = [];
      let newPatients = [];
      let docPhone = [];
      let docAddress = [];

      if (body.meta.total === 0) {
       console.log("if undefined");
       $(".doctorList").html(`There are no doctors that meet your search perameters`);
      } else {
        for (var i = 0; i < body.data[0].practices.length; i++) {

          docName.push(body.data[0].profile.first_name + " " + body.data[0].profile.last_name);
          newPatients.push(body.data[0].practices[i].accepts_new_patients);
          docPhone.push(body.data[0].practices[i].phones[0].number);
          docAddress.push(body.data[0].practices[i].visit_address.street + ", " +  body.data[0].practices[i].visit_address.street2 + ", " + body.data[0].practices[i].visit_address.city + ", " + body.data[0].practices[i].visit_address.state + ", " + body.data[0].practices[i].visit_address.zip);
          $(".doctorList").html(`Here is a list of Doctors: ${docName}`);
        };
      };
      let fullList = docName.concat(docPhone, docAddress, newPatients);
      console.log(fullList);

      //1) combine the arrays:
      var list = [];
      for (var j = 0; j < docName.length; j++)
          list.push({'name': docName[j], 'phone': docPhone[j], "address": docAddress[j], 'accepting new patients': newPatients});
          console.log(list);
      // //2) sort:
      // list.sort(function(a, b) {
      //     return ((a.name < b.name) ? -1 : ((a.name == b.name) ? 0 : 1));
      //     //Sort could be modified to, for example, sort on the age
      //     // if the name is the same.
      // });
      //
      // //3) separate them back out:
      // for (var k = 0; k < list.length; k++) {
      //     names[k] = list[k].name;
      //     ages[k] = list[k].age;
      // }







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
      let newPatients = [];
      let docPhone = [];
      let docAddress = [];

      if (body2.meta.total === 0) {
        $(".doctorList").text(`There are no doctors that meet your search perameters`);
       console.log("if undefined");
      } else {
        for (var i = 0; i < body2.data[0].practices.length; i++) {
          docName.push(body2.data[0].profile.first_name + " " + body2.data[0].profile.last_name);
          newPatients.push(body2.data[0].practices[i].accepts_new_patients);
          docPhone.push(body2.data[0].practices[i].phones[0].number);
          docAddress.push(body2.data[0].practices[i].visit_address.street + ", " +  body2.data[0].practices[i].visit_address.street2 + ", " + body2.data[0].practices[i].visit_address.city + ", " + body2.data[0].practices[i].visit_address.state + ", " + body2.data[0].practices[i].visit_address.zip);
          $(".doctorList").html(`Here is a list of Doctors: ${docName}`);
        };
      };
      console.log(docAddress);
      console.log(docName);
      console.log(docPhone);
      console.log(newPatients);

    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });





});
