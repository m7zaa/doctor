// Back-end

export class SymptomFinder {
  findSymptom(symptom) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url =`https://api.betterdoctor.com/2016-03-01/doctors?query=${symptom}&location=45.505%2C-122.675%2C25&user_location=45.505%2C-122.675&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}

export class NameFinder {
  findName(lastName) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url =`https://api.betterdoctor.com/2016-03-01/doctors?last_name=${lastName}&location=45.505%2C-122.675%2C25&user_location=45.505%2C-122.675&skip=0&limit=100&user_key=${process.env.exports.apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}







export class Doctors {

  constructor() {

  }
}
