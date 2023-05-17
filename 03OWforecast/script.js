function getWeatherForecast() {
  const apiKey = "1b0d4e056d91c25a4fe8658fd55f3f06";
  const cityInput = document.getElementById("cityInput");
  const cityName = cityInput.value;

  if (cityName === "") {
    alert("Please enter a city name!");
  }

  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

  //FAILED "PRESS ENTER"
  // const cityInput = document.getElementById('cityInput');
  // cityInput.addEventListener('keydown', (event) => {
  //   if (event.key === 'Enter') {
  //     event.preventDefault();
  //     searchBtn.click();
  //   }
  // });

  axios
    .get(url)
    .then((response) => {
      const forecastData = response.data;
      // console.log(forecastData);
      displayWeatherForecast(forecastData);
      displayChart(forecastData);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}
function displayWeatherForecast(data) {
  console.log(data);
  const forecastContainer = document.getElementById("forecastContainer");
  forecastContainer.innerHTML = "";
  // displayChart();
  for (let i = 0; i < 6; i += 1) {
    const weatherData = data.list[i];
    const date = new Date(weatherData.dt_txt);
    // console.log(date);
    const time = date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    // const day = date.toLocaleDateString(undefined, {weekday: "long"})

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
         <p><strong>${time}</strong></p>
            <p>Temperature: ${weatherData.main.temp} °C </p>
            <p>Humidity: ${weatherData.main.humidity} % </p>
            <p>Pressure: ${weatherData.main.pressure} hPa</p>
            <p>Description: ${weatherData.weather[0].description}</p>
    
            `;

    forecastContainer.appendChild(card);
  }
}

function displayChart(forecastData) {
  // console.log(forecastData);
  const temptoday = `${forecastData.list[6].main.temp_max}`;
  const tempday2 = `${forecastData.list[14].main.temp_max}`;
  const tempday3 = `${forecastData.list[22].main.temp_max}`;
  const tempday4 = `${forecastData.list[30].main.temp_max}`;
  const tempday5 = `${forecastData.list[38].main.temp_max}`;
  const today = `${forecastData.list[6].dt_txt}`;
  const day2 = `${forecastData.list[14].dt_txt}`;
  const day3 = `${forecastData.list[22].dt_txt}`;
  const day4 = `${forecastData.list[30].dt_txt}`;
  const day5 = `${forecastData.list[38].dt_txt}`;

  // const date = new Date(weatherData.dt_txt);
  // const day = date.toLocaleDateString(undefined, { weekday: "long" });
  // console.log(day);
  const date = new Date();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDayIndex = weekdays.indexOf(
    date.toLocaleDateString(undefined, { weekday: "short" })
  );
  const nextDayIndex = (currentDayIndex + 1) % 7;
  const nextDayIndex2 = (currentDayIndex + 2) % 7;
  const nextDayIndex3 = (currentDayIndex + 3) % 7;
  const nextDayIndex4 = (currentDayIndex + 4) % 7;
  const incrementedDay = weekdays[nextDayIndex];
  const incrementedDay2 = weekdays[nextDayIndex2];
  const incrementedDay3 = weekdays[nextDayIndex3];
  const incrementedDay4 = weekdays[nextDayIndex4];
  // console.log(incrementedDay);
  // const day = date.toLocaleDateString(undefined, { weekday: "short" });
  // console.log(day);

  var xValues = [
    "Today",
    incrementedDay,
    incrementedDay2,
    incrementedDay3,
    incrementedDay4,
  ];
  var yValues = [temptoday, tempday2, tempday3, tempday4, tempday5];
  var barColors = [
    "turquoise",
    "turquoise",
    "turquoise",
    "turquoise",
    "turquoise",
  ];

  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Temperature (°C)",
      },
    },
  });
}

//FAILED CHART
//   const barChart = document.getElementById('barChart');
//   barChart.innerHTML = '<canvas id="chart"></canvas>';

//   new Chart(document.getElementById("chart"), {
//     type: 'bar',
//     data: {
//       labels: labels,
//       datasets: [{
//         label: 'Temperature',
//         data: temperatures,
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1
//       }]
//     },
//     options: {
//       responsive: true,
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });
