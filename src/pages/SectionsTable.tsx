import React, { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import SectionsBar from "../components/SectionsBar";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchSections } from "../http/sectionsApi";
import "../css/SectionsPage.css";
const Forum: React.FC = observer(() => {
  const question_store = useContext(Context)?.question_store;

  useEffect(() => {
    try {
      fetchSections().then((data) => question_store?.setSections(data));
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <Container className="forum-body mt-5">
      <SectionsBar />
    </Container>
  );
});

export default Forum;
