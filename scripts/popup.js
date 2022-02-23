
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup');
const contentPopup = document.querySelector('.popup__content')
const closeButton = editPopup.querySelector('.popup__close');
const userName = document.querySelector('.profile__name');
const userDesc = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_value_name');
const inputDesc = document.querySelector('.popup__input_value_desc');
const saveForm = document.querySelector('.popup__form');
// const likeCheck = document.querySelectorAll('.foto__like-button');


const openPopup = function () {
   inputName.value = userName.textContent;
   inputDesc.value = userDesc.textContent;
   editPopup.classList.add('popup_open');
   contentPopup.classList.add('popup_open');
}

const closePopup = function () {
   editPopup.classList.remove('popup_open');
   contentPopup.classList.remove('popup_open');
}

const savePopup = function (ev) {
   ev.preventDefault();
   userName.textContent = inputName.value;
   userDesc.textContent = inputDesc.value;
   closePopup();
}

// const likeFunc = function (check) {
//    check.classList.toggle('foto__like-button_active')
// }


editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
saveForm.addEventListener('submit', savePopup)


// likeCheck.forEach(check => {
//     check.addEventListener('click', e => likeFunc(e.target))
//     });

