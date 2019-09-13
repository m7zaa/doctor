import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { DoctorFinder } from './doctor';

$(document).ready(function () {
  $("#findADoc").submit(function() {
    event.preventDefault();
    let doctorFinder = new DoctorFinder();
    let promise = doctorFinder.findDoc();

    promise.then(function(response) {
      const body = JSON.parse(response);
      console.log(body);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });






  });
});
