import Card from "../components/Card.js";
import UserCard from "../components/UserCard.js";
import {cardList} from "../constants/constants.js";
import {
    api,
    userInfo,
    popupDelete,
    popupWithImage
} from "../../pages/index.js";


export function addNewCard (data) {
    cardList.prepend(createElCard(data))
  };
export function createElCard(data) {
    const idUser = userInfo.getIdUser();
    if (data.owner._id === idUser){
      const newCard = new UserCard (
        data,
        idUser,
        () => popupWithImage.open(data),//handleCardClick
        (data) => {
          api.likeCard(data)
          .then((res) => {
            newCard.chengeDataLikeCounter(res);
            newCard.checkLikeCounter(res);
          })
          .catch((err) => console.log(err))
        },                              //colbackLikeActive
        (data) => {
          api.deleteLike(data)
          .then((res) => {
            newCard.chengeDataLikeCounter(res);
            newCard.checkLikeCounter(res);
          })
          .catch((err) => console.log(err))
        },                              //colbackLikeDelete
        (data) => {
          popupDelete.open(data)
        }                               //colbackDeleteCard
      );
      newCard.checkLikeStatus();
      newCard.checkLikeCounter(data);
      const cardElement = newCard.createCard() ;
      return cardElement
    }else{
      const newCard = new Card (
        data,
        idUser,
        () => popupWithImage.open(data),//handleCardClick
        (data) => {
          api.likeCard(data)
          .then((res) => {
            newCard.chengeDataLikeCounter(res);
            newCard.checkLikeCounter(res);
          })
          .catch((err) => console.log(err))
        },                              //colbackLikeActive
        (data) => {
          api.deleteLike(data)
          .then((res) => {
            newCard.chengeDataLikeCounter(res);
            newCard.checkLikeCounter(res);
          })
          .catch((err) => console.log(err))
        },                              //colbackLikeDelete
      );
      newCard.checkLikeStatus();
      newCard.checkLikeCounter(data);
      const cardElement = newCard.createCard();
      return cardElement
    }
  };