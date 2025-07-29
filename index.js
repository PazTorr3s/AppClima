const contenedor = document.querySelector('.container');
const botonBuscar = document.querySelector('.search-box button');
const cajaClima = document.querySelector('.weather-box');
const detallesClima = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

botonBuscar.addEventListener('click', () => {

    const claveAPI = 'aeee9760ab867c8e2c77414c23ed4ebf';
    const ciudad = document.querySelector('.search-box input').value;

    if (ciudad === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${claveAPI}`)
        .then(response => response.json())
        .then(datos => {

            if (datos.cod === '404') {
                contenedor.style.height = '400px';
                cajaClima.style.display = 'none';
                detallesClima.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const imagen = document.querySelector('.weather-box img');
            const temperatura = document.querySelector('.weather-box .temperature');
            const descripcion = document.querySelector('.weather-box .description');
            const humedad = document.querySelector('.weather-details .humidity span');
            const viento = document.querySelector('.weather-details .wind span');

            switch (datos.weather[0].main) {
                case 'Clear':
                    imagen.src = 'images/clear.png';
                    break;

                case 'Rain':
                    imagen.src = 'images/rain.png';
                    break;

                case 'Snow':
                    imagen.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    imagen.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    imagen.src = 'images/mist.png';
                    break;

                default:
                    imagen.src = '';
            }

            temperatura.innerHTML = `${parseInt(datos.main.temp)}<span>°C</span>`;
            descripcion.innerHTML = `${datos.weather[0].description}`;
            humedad.innerHTML = `${datos.main.humidity}%`;
            viento.innerHTML = `${parseInt(datos.wind.speed)}Km/h`;

            cajaClima.style.display = '';
            detallesClima.style.display = '';
            cajaClima.classList.add('fadeIn');
            detallesClima.classList.add('fadeIn');
            contenedor.style.height = '590px';

        });

});
