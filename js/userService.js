'use strict'

'use strict'

var STORAGE_KEY = 'userSettings'
var gFormDetails =
{
    // email,
    // age,
    // backgroundColor,
    // color,
    // date
}

function submitBtn(ev) {
    ev.preventDefault()
    loadFromStorage()
    getBgColor()
    getTextColor()
    getEmail()
    getUserDate()
    getHoursTillBday()
    console.log('gFormDetails : ', gFormDetails);
}

function getBgColor() {
    let elColor = document.querySelector('.bgc').value
    document.querySelector('body').style.backgroundColor = elColor
    gFormDetails.backgroundColor = elColor
    _saveFormToStorage()
}

function getTextColor() {
    var elColor = document.querySelector('.text-color').value
    let elDivs = document.querySelectorAll('div')
    elDivs.forEach(div => div.style.color = elColor)
    _saveFormToStorage()
}

function userAge(newVal) {
    document.getElementById('sAge').innerHTML = newVal
    gFormDetails.age = newVal
}

function getEmail() {
    var elEmail = document.querySelector('.email').value
    gFormDetails.email = elEmail
    document.querySelector('.email').value = ''
    _saveFormToStorage()
}

function getUserDate() {
    var elDate = document.querySelector('.birth-date').value
    gFormDetails.userDOB = elDate
    _saveFormToStorage()
}

function getHoursTillBday() {
    const user = loadFromStorage(STORAGE_KEY)
    let nextBirthday = new Date(user.userDOB).setFullYear(2023)
    console.log(nextBirthday)
    const currDate = new Date()
    if (new Date(user.userDOB).getMonth() + 1 > currDate.getMonth() + 1 ||
        (new Date(user.userDOB).getMonth() + 1 === currDate.getMonth() + 1) &&
        new Date(user.userDOB).getDate() > currDate.getDate()) {
        nextBirthday = new Date(user.userDOB).setFullYear(2022)
    }
    console.log('now', currDate.getTime());
    var Difference_In_Time = nextBirthday - currDate.getTime()
    console.log(Difference_In_Time);
    var Difference_In_Days = parseInt(Difference_In_Time / (1000 * 60 * 60 * 24))
    var Difference_In_Hours = parseInt(Difference_In_Time / (1000 * 60 * 60))
    console.log('Your BirthDay in Days!', Difference_In_Days)
    console.log('Your BirthDay in Hours!', Difference_In_Hours)
    gFormDetails.nextBD = Difference_In_Hours
    _saveFormToStorage()
}

function _saveFormToStorage() {
    saveToStorage(STORAGE_KEY, gFormDetails)
}