console.log('code running')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message1');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    search.value ='';
    const location = search.value;
    message1.textContent ='Loading...'
    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if (data.error) {
            message1.textContent = data.error;
        }
        message1.textContent= data.forecast;
    })
})
    
})