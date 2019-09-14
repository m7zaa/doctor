import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { NameFinder, SymptomFinder } from './doctor';

$(document).ready(function () {
  $("#searchSymptom").submit(function() {
    event.preventDefault();
    $('.info').hide();
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
       $(".noDoctors").show()
       $(".noDoctors").html(`There are no doctors that meet your search perameters`);
      } else {
        for (var i = 0; i < body.data.length; i++) {
          docName.push(body.data[i].profile.first_name + " " + body.data[i].profile.last_name);
          newPatients.push(body.data[i].practices[0].accepts_new_patients);
          docPhone.push(body.data[i].practices[0].phones[0].number);
          docAddress.push(body.data[i].practices[0].visit_address.street + ", " +  body.data[i].practices[0].visit_address.street2 + ", " + body.data[i].practices[0].visit_address.city + ", " + body.data[i].practices[0].visit_address.state + ", " + body.data[i].practices[0].visit_address.zip);
           // $(".doctorList").html(`Here is a list of Doctors: ${docName}`);
        };
      };
      //I got this idea below from https://stackoverflow.com/questions/11499268/sort-two-arrays-the-same-way
      var list = [];
      for (var x = 0; x < docName.length; x++)
      list.push({'name': docName[x], 'phone': docPhone[x], "address": docAddress[x], 'availibility': newPatients[x]});
      //I got this from https://stackoverflow.com/questions/27266901/display-javascript-object-in-html
      var wrapper = $('.doctorList'), container;
      for (var key in list){
        container = $('<div class="container"></div>');
        wrapper.append(container);
        container.append('<div class="info">' + key +'</div>');
        container.append('<div class="info">' + 'Name: Dr. ' + list[key].name + '</div>');
        container.append('<div class="info">' + 'Phone Number: ' + list[key].phone + '</div>');
        container.append('<div class="info">' + 'Address: ' + list[key].address + '</div>');
        container.append('<div class="info">' + 'This office has open availibility: ' + list[key].availibility + '</div>');
    }
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
  $("#searchName").submit(function() {
    event.preventDefault();
    $('.info').hide();
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
        $(".noDoctors").show()
        $(".noDoctors").text(`There are no doctors that meet your search perameters`);
      } else {
        for (var i = 0; i < body2.data.length; i++) {
          docName.push(body2.data[i].profile.first_name + " " + body2.data[i].profile.last_name);
          newPatients.push(body2.data[i].practices[0].accepts_new_patients);
          docPhone.push(body2.data[i].practices[0].phones[0].number);
          docAddress.push(body2.data[i].practices[0].visit_address.street + ", " +  body2.data[i].practices[0].visit_address.street2 + ", " + body2.data[i].practices[0].visit_address.city + ", " + body2.data[i].practices[0].visit_address.state + ", " + body2.data[i].practices[0].visit_address.zip);
          // $(".doctorList").html(`Here is a list of Doctors: ${docName}`);
        };
      };
      var list = [];
      for (var x = 0; x < docName.length; x++)
      list.push({'name': docName[x], 'phone': docPhone[x], "address": docAddress[x], 'availibility': newPatients[x]});
      var wrapper = $('.doctorList'), container;
      for (var key in list){
        container = $('<div class="container"></div>');
        wrapper.append(container);
        container.append('<div class="info">' + key +'</div>');
        container.append('<div class="info">' + 'Name: Dr. ' + list[key].name + '</div>');
        container.append('<div class="info">' + 'Phone Number: ' + list[key].phone + '</div>');
        container.append('<div class="info">' + 'Address: ' + list[key].address + '</div>');
        container.append('<div class="info">' + 'This office has open availibility: ' + list[key].availibility + '</div>');
    }
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
