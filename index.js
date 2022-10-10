let films = [];
const allFilmsCount = document.querySelector(".allFilms");
let filmsWrapper = document.querySelector(".filmsList");


// Call films

async function callFilms() {
    await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2021&month=JANUARY', {
        method: 'GET',
        headers: {
            'X-API-KEY': '68e95368-8a09-4bec-ae70-accef71b09da',
            'Content-Type': 'application/json',
        },
    }).then(function (response) {
        return response.json()
    }).then(function (response) {
        films = response.items
        allFilmsCount.textContent = allFilmsCount.textContent + `(${response.total})`;
        createFilmlist(films)
    })


    /////

    /// pagination create

    let pagination = document.querySelector(".pagination");

    let pageNumbers = Math.round(films.length / 8);

    let paginationContext = ''

    for (let i = 0; i < pageNumbers; i++) {

        paginationContext = paginationContext + `
        <input ${i === 0 ? "checked" : ""} class = "pageRadios ${i}" name = "selectPage" id = "${i}" type = "radio" > 
        <label class = "paginationStyle" for = "${i}" >${i + 1}</label>
    `
    };

    pagination.innerHTML = paginationContext

    // create films list

    function createFilmlist(arr, number = 8) {

        const need = [];

        for (let i = number - 8; i < number; i++) {

            if (!arr[i]) return filmsWrapper.innerHTML = need;

            need.push(`

                <div class = "film">
                    <img class = "cover" src ="${arr[i].posterUrlPreview}">
                    <span class = "filmName">${arr[i].nameRu}</span>
                </div>

            `)

        }

        filmsWrapper.innerHTML = need

    };



    pagination.addEventListener("click", function (event) {
        let showPagesCount = 8;
        let all = document.querySelectorAll(".film");
        const checkedElements = document.querySelectorAll("input[name=selectPage]");
        all.forEach(function (item, index) {
            item.remove()
        })


        checkedElements.forEach(function (item, index) {
            if (item.checked === true) {
                let y = +item.id + 1;
                let filmContext = ''

                createFilmlist(films, showPagesCount * y)
            }
        })


    })


};


callFilms();

///// user interface
const limiter = document.querySelector(".limiter");
const user = document.querySelector(".userWrapper");
const userLogoImg = document.querySelector(".userLogoImg");
const loginLink = document.querySelector(".login_link");
const loginWrapper = document.querySelector(".loginWrapper");
const registrationBtn = document.querySelector(".registerBtn");
const registrationWrapper = document.querySelector(".registrationWrapper");


loginLink.addEventListener("click", function (event) {
    loginWrapper.style.display = "flex";
    limiter.style.opacity = "0.1"
});

limiter.addEventListener("click", function (event) {
    console.log(event.target)
    if (event.target !== loginLink) {
        loginWrapper.style.display = "none";
        registrationWrapper.style.display = "none"
        limiter.style.opacity = "1"
    }
});


registrationBtn.addEventListener("click", function () {
    loginWrapper.style.display = "none"
    registrationWrapper.style.display = "flex"
});

let userLogin = document.querySelector(".userLogin");
let userPassword = document.querySelector(".userPassword");
let userLastName = document.querySelector(".userLastName");
let userGender = document.querySelector(".userGender");
const register = document.querySelector(".register");



register.addEventListener("click", function () {
    const login = userLogin.value;
    const password = userPassword.value;
    const lastName = userLastName.value;
    const gender = userGender.value
    if (userLogin.value === "" || userPassword.value === "" || userLastName === "" || userGender.value === "empty") {
        alert("Пожалуйста заполните все поля")
    } else {
        setUserData({login, password, lastName, gender})
        userLogin.value = ""
        userPassword.value = ""
        userLastName.value = ""
        userGender.value = ""
    }
});




function setUserData(obj) {
    const sendUser = JSON.stringify(obj);
    localStorage.setItem(`user${localStorage.length}`, sendUser)
};


const loginBtn = document.querySelector(".loginBtn");
const enterLogin = document.querySelector(".enterLogin");
const enterPassword = document.querySelector(".enterPassword");


loginBtn.addEventListener("click", function () {
    let allUsers = [];

    for (let i = 0; i < localStorage.length; i++) {
        allUsers.push(JSON.parse(localStorage.getItem(`user${i}`)));
        console.log(enterLogin.value === allUsers[i].login, enterPassword.value === allUsers[i].password)
        if(allUsers[i].login === enterLogin.value && allUsers[i].password === enterPassword.value){
            alert("HEllo" + enterLogin.value)
            break;
        } else{
            alert("invalid login or password")
        }

    };



});





