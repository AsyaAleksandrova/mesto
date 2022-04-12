
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('#profile__popup');
const closeButton = editPopup.querySelector('.popup__close');
const userName = document.querySelector('.profile__name');
const userDesc = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_value_name');
const inputDesc = document.querySelector('.popup__input_value_desc');
const saveForm = editPopup.querySelector('.popup__form');
const fotoPopup = document.querySelector('#foto__popup');
const closeFotoPopup = fotoPopup.querySelector('.popup__close');
const inputFotoName = document.querySelector('.popup__input_foto_name');
const inputFotoLink = document.querySelector('.popup__input_foto_src');
const saveNewFoto = fotoPopup.querySelector('.popup__form');
const previewFoto = document.querySelector('#fotoPreview__popup');
const closePreviewFoto = previewFoto.querySelector('.popup__close');
const namePreviewFoto = previewFoto.querySelector('.popup__description');
const picturePreviewFoto = previewFoto.querySelector('.popup__picture')
const fotoList = document.querySelector('.foto');
const fotoTemplate = document.querySelector('#card').content;
const fotoAddButton = document.querySelector('.profile__add-button');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
   closePopup(editPopup);
}

const likeFunc = function (check) {
   check.classList.toggle('foto__like-button_active');
}

const deleteCard = function (card) {
   card.closest('.foto__item').remove();
}

const previewFunc = function (pic) {
   namePreviewFoto.textContent = pic.alt;
   picturePreviewFoto.src = pic.src;
   console.log(namePreviewFoto.textContent);
   openPopup(previewFoto);
}

const saveFoto = function (card) {
   card.forEach(function (item) {
      const userCard = fotoTemplate.querySelector('.foto__item').cloneNode(true);
      userCard.querySelector('.foto__picture').src = item.link;
      userCard.querySelector('.foto__picture').alt = item.name;
      userCard.querySelector('.foto__picture').addEventListener('click', p => previewFunc(p.target));
      userCard.querySelector('.foto__name').textContent = item.name;
      userCard.querySelector('.foto__like-button').addEventListener('click', e => likeFunc(e.target));
      userCard.querySelector('.foto__delete-button').addEventListener('click', d => deleteCard(d.target));
      fotoList.prepend(userCard);
   })
}

window.onload = saveFoto(initialCards);

editButton.addEventListener('click', function(){
   inputName.value = userName.textContent;
   inputDesc.value = userDesc.textContent;
   openPopup(editPopup);
});
closeButton.addEventListener('click', function () {
   closePopup(editPopup);
});
saveForm.addEventListener('submit', savePopup);

fotoAddButton.addEventListener('click', function () {
   openPopup(fotoPopup);
});

closeFotoPopup.addEventListener('click', function () {
   closePopup(fotoPopup);
});

closePreviewFoto.addEventListener('click', function () {
   closePopup(previewFoto);
})

saveNewFoto.addEventListener('submit', function (ev) {
   ev.preventDefault();
   const newCard = [
      {
         name: inputFotoName.value,
         link: inputFotoLink.value
      }]
   saveFoto(newCard);
   closePopup(fotoPopup);
})



