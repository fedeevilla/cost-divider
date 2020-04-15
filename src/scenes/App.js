import React from "react";
import "antd/dist/antd.css";
import styled from "styled-components";
import { connect } from "react-redux";
import { compose } from "redux";

import AddParticipant from "../components/AddParticipant";
import ParticipantsList from "../components/ParticipantsList";
import Results from "../components/Results";

const Wrapper = styled.div`
  background: white;
  padding: 40px;
  width: 500px;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`;

const App = ({ list }) => {
  return (
    <Wrapper>
      <AddParticipant list={list} />
      <ParticipantsList list={list} />
      {list.length > 1 && <Results />}
    </Wrapper>
  );
};

const enhancer = compose(
  connect((state) => ({
    list: state.participants.list,
  }))
);

export default enhancer(App);
