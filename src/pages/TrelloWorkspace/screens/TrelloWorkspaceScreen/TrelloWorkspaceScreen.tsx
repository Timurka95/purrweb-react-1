import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Card, EditCardModal } from "../../components";
import { MainAppRowArray } from "../../../../assets/types";

interface TrelloWorkspaceScreenProps {
  onNameClick: () => JSX.Element;
  changeNameModalFlag: boolean;
  setChangeNameModalFlag: (value: boolean) => void;
}

const TrelloWorkspaceScreen = ({
  onNameClick,
  changeNameModalFlag,
  setChangeNameModalFlag,
}: TrelloWorkspaceScreenProps) => {
  const [cardModalFlag, setCardModalFlag] = useState(false);
  const [deleteCardFlag, setDeleteCardFlag] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const [deleteComment, setDeleteComment] = useState("");
  const [descriptionContain, setDescriptionContain] = useState("");
  const [rowTitles, setRowTitles] = useState<MainAppRowArray[]>([]);
  const [commentsList, setCommentsList] = useState<string[]>([]);
  const [rowName, setRowName] = useState<string>();
  const [editCardTitle, setEditCardTitle] = useState("");
  const currentName = localStorage.getItem("userName");

  const handleClickCard = (
    title: string,
    flag: boolean,
    rowTitle: string
  ) => {
    setCardTitle(title);
    setCardModalFlag(flag);
    setRowName(rowTitle);
  };

  const handleDeleteCard = (value: boolean) => {
    setDeleteCardFlag(value);
    setCardModalFlag(false);
  };

  useEffect(() => {
    setDeleteComment("");
  }, [deleteComment]);

  const showEditCardModal = () => {
    return (
      <EditCardModal
        rowName={rowName}
        onDeleteComment={setDeleteComment}
        onEditCardTitle={setEditCardTitle}
        getDescription={setDescriptionContain}
        getCommentsList={setCommentsList}
        rowTitlesArray={rowTitles}
        onDeleteCard={handleDeleteCard}
        hideEditCardModal={setCardModalFlag}
        cardTitle={cardTitle}
      />
    );
  };

  const showCard = () => {
    return (
      <Card
        onSetCardTitle={setCardTitle}
        newCardTitle={editCardTitle}
        deleteCommentName={deleteComment}
        descriptionContain={descriptionContain}
        commentsList={commentsList}
        setRowTitles={setRowTitles}
        onDeleteCard={handleDeleteCard}
        cardTitle={cardTitle}
        deleteCardButtonFlag={deleteCardFlag}
        onClickCardTitle={handleClickCard}
      />
    );
  };

  const showChangeNameModalFlag = () => {
    setChangeNameModalFlag(true);
  };

  return (
    <Wrapper>
      {cardModalFlag === false ? null : showEditCardModal()}
      {changeNameModalFlag === false ? null : onNameClick()}
      <MainHeader>
        <MainHeaderLogoText>PURR-TRELLO</MainHeaderLogoText>
        <UserNameInMainHeader onClick={showChangeNameModalFlag}>
          {currentName}
        </UserNameInMainHeader>
      </MainHeader>
      <MainBody>{showCard()}</MainBody>
    </Wrapper>
  );
};

const MainHeader = styled.div`
  height: 60px;
  display: flex;
  width: 100%;
  position: fixed;
  justify-content: space-between;
  background-color: #1f5353;
`;

const MainHeaderLogoText = styled.h1`
  color: white;
  font-size: 25px;
  text-transform: uppercase;
  padding: 10px 0px 0px 20px;
`;

const UserNameInMainHeader = styled.p`
  color: white;
  padding: 20px 20px 0px 0px;
  text-transform: uppercase;
  font-size: 14px;
  cursor: pointer
`;

const MainBody = styled.div`
  background-color: white;
  padding-top: 60px;
`;

const Wrapper = styled.div``;

export default TrelloWorkspaceScreen;
