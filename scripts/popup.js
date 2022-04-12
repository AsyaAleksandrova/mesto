const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const buttonCloseProfile = popupProfile.querySelector('.popup__close');
const userName = document.querySelector('.profile__name');
const userDesc = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_value_name');
const inputDesc = document.querySelector('.popup__input_value_desc');
const formProfile = popupProfile.querySelector('.popup__form');
const popupFotoAdd = document.querySelector('.popup_type_foto-add');
const buttonCloseFotoAdd = popupFotoAdd.querySelector('.popup__close');
const inputFotoName = document.querySelector('.popup__input_foto_name');
const inputFotoLink = document.querySelector('.popup__input_foto_src');
const formFotoAdd = popupFotoAdd.querySelector('.popup__form');
const popupPreview = document.querySelector('.popup_type_foto-preview');
const buttonClosePreview = popupPreview.querySelector('.popup__close');
const namePreviewFoto = popupPreview.querySelector('.popup__description');
const picturePreviewFoto = popupPreview.querySelector('.popup__picture')
const fotoList = document.querySelector('.foto');
const fotoTemplate = document.querySelector('#card').content;
const buttonFotoAdd = document.querySelector('.profile__add-button');


const openPopup = function (popOp) { 
   popOp.classList.add('popup_open'); 
} 

const closePopup = function (popCl) { 
   popCl.classList.remove('popup_open'); 
} 

const savePopup = function (ev) {
   ev.preventDefault();
   userName.textContent = inputName.value;
   userDesc.textContent = inputDesc.value;
   closePopup(popupProfile);
}

const likeFunc = function (check) {
   check.target.classList.toggle('foto__like-button_active');
}

const deleteCard = function (card) {
   card.target.closest('.foto__item').remove();
}

const previewFunc = function (ev) {
   const pic = ev.target;
   namePreviewFoto.textContent = pic.alt;
   picturePreviewFoto.src = pic.src;
   console.log(namePreviewFoto.textContent);
   openPopup(popupPreview);
}

const createFoto = function (name, link) {
   const userCard = fotoTemplate.querySelector('.foto__item').cloneNode(true);  
   userCard.querySelector('.foto__picture').src = link;
   userCard.querySelector('.foto__picture').alt = name;
   userCard.querySelector('.foto__picture').addEventListener('click', previewFunc);
   userCard.querySelector('.foto__name').textContent = name;
   userCard.querySelector('.foto__like-button').addEventListener('click', likeFunc);
   userCard.querySelector('.foto__delete-button').addEventListener('click', deleteCard);
   return (userCard);
}

const saveFoto = function (card) {
   const userCard = createFoto(card.name, card.link);
   fotoList.prepend(userCard);
}

const preloadCards = function (preloadCards) {
   preloadCards.forEach(element => {
      saveFoto(element);
   });
}

preloadCards(initialCards);

buttonEditProfile.addEventListener('click', function(){
   inputName.value = userName.textContent;
   inputDesc.value = userDesc.textContent;
   openPopup(popupProfile);
});
buttonCloseProfile.addEventListener('click', function () {
   closePopup(popupProfile);
});
formProfile.addEventListener('submit', savePopup);

buttonFotoAdd.addEventListener('click', function () {
   inputFotoName.value = '';
   inputFotoLink.value = '';
   openPopup(popupFotoAdd);
});

buttonCloseFotoAdd.addEventListener('click', function () {
   closePopup(popupFotoAdd);
});

buttonClosePreview.addEventListener('click', function () {
   closePopup(popupPreview);
})

formFotoAdd.addEventListener('submit', function (ev) {
   ev.preventDefault();

   const newCard = {
         name: inputFotoName.value,
         link: inputFotoLink.value
      }
   saveFoto(newCard);
   closePopup(popupFotoAdd);
})


//Если не сложно, поясните, пожалуйста, какие функции лишние (что понимается под "функциями-обертками")
//Из замечаний: Присутствует большое количество функций-обёрток, без которых вполне можно обойтись.

