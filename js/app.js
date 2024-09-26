 
        let newdata = new Date();
        let year = newdata.getFullYear();
        let month = newdata.getMonth() + 1;
        let day = newdata.getDate();
        let Fajr = document.getElementById('Fajr');
        let Dhuhr = document.getElementById('Dhuhr');
        let Asr = document.getElementById('Asr');
        let Maghrib = document.getElementById('Maghrib');
        let Isha = document.getElementById('Isha');
        let hostory = document.getElementById('hostory');
        let optionCity = document.getElementById('optionCity');
   
        let City = "Dakahlia";

        function fetchPrayerTimes() {
            axios.get(`https://api.aladhan.com/v1/calendarByCity?city=${City}&country=egypt&method=5&month=${month}&year=${year}`)
                .then((response) => {
                    hostory.innerHTML = `${day} ${month} ${year}`;
                    let time = response.data.data[day - 1].timings;
                    Fajr.innerHTML = convertTo12HourFormat(time.Fajr);
                    Dhuhr.innerHTML = convertTo12HourFormat(time.Dhuhr);
                    Asr.innerHTML = convertTo12HourFormat(time.Asr);
                    Maghrib.innerHTML = convertTo12HourFormat(time.Maghrib);
                    Isha.innerHTML = convertTo12HourFormat(time.Isha);
                    document.querySelector('.contry').innerHTML=City;
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        function convertTo12HourFormat(time) {
            let [hours, minutes] = time.split(':');
            hours = parseInt(hours);
            minutes = parseInt(minutes);

            let period = 'AM';
            if (hours >= 12) {
                period = 'PM';
                if (hours > 12) {
                    hours -= 12;
                }
            } else if (hours === 0) {
                hours = 12;
            }

            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
        }

        optionCity.addEventListener('change', (event) => {
            City = event.target.value;
            stroge();
            fetchPrayerTimes();
        });

        function stroge() {
            localStorage.setItem('dataCity', City);
            City = localStorage.getItem('dataCity');
        }

  
        function getDatatoLocal() {
          if (localStorage !== null) {
              let dataStored = localStorage.getItem('dataCity');
              if (dataStored !== null) {
                  City = dataStored;

              } else {
                  console.log('No data found for dataCity in localStorage.');
              }
          } else {
              console.log('localStorage is not available.');
          }
      }
      
      getDatatoLocal()
      fetchPrayerTimes();
