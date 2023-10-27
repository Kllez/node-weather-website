const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1') // # for id, . for class, nothing for simple tag name like form
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'from javascript!'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+encodeURIComponent(location)).then((response) => {
        response.json().then( (data) => {
            if(data.error){
                // console.log(data.error)
                messageOne.textContent = data.error
            }
            else{
                // console.log(data.location)
                // console.log(data.forecastData)
                messageOne.textContent = data.location
                const mes = JSON.stringify(data.forecastData)
                messageTwo.textContent = mes
            }
        })
    })
    // console.log(location)
})

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then( (data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=boston').then( (error, response) => {
//     if(error){
//         return error.json().then((error) => {
//             console.log(error)
//         })
//     }
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//    response.json().then((data) => {
//        if(data.error){
//            console.log(data.error)
//        }
//        else{
//            console.log(data.location)
//            console.log(data.forecastData)
//        }
//    })
// })
