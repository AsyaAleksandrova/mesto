
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup');
const closePopup = editPopup.querySelector('.popup__close');
const UserName = document.querySelector('.profile__name');
const UserDesc = document.querySelector('.profile__description');
const InputName = document.querySelector('.popup__input-name');
const InputDesc = document.querySelector('.popup__input-desc');
const SaveButton = document.querySelector('.popup__button');
const LikeTag = document.querySelectorAll('.foto__heart')


const OpenPopup = function () {
   InputName.value = UserName.textContent;
   InputDesc.value = UserDesc.textContent;
   editPopup.classList.add('popup_open');
}

const ClosePopup = function () {
   editPopup.classList.remove('popup_open');
}

editButton.addEventListener('click', OpenPopup);
closePopup.addEventListener('click', ClosePopup);

SaveButton.addEventListener('click', function() {
   UserName.textContent = InputName.value;
   UserDesc.textContent = InputDesc.value;
   ClosePopup();
})