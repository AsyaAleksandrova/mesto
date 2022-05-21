export const popupPreview = document.querySelector('.popup_type_foto-preview');
export const namePreviewFoto = popupPreview.querySelector('.popup__description');
export const picturePreviewFoto = popupPreview.querySelector('.popup__picture');
export const buttonClosePreview = popupPreview.querySelector('.popup__close');


const closeByEsc = (ev) => {
   if (ev.key === "Escape") {
      const popOpened = document.querySelector('.popup_open');
      closePopup(popOpened);
   }
}

export const openPopup = function (popOp) { 
   popOp.classList.add('popup_open');
   document.addEventListener('keydown', closeByEsc);
} 

export const closePopup = function (popCl) { 
   popCl.classList.remove('popup_open');
   document.removeEventListener('keydown', closeByEsc);
} 
