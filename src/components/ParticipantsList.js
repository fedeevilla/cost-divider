import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { List, Button } from "antd";

import { deleteParticipant } from "../store/actions/participants";
import styled from "styled-components";

const ListStyled = styled(List)`
  padding: 10px 25px;
  border: 1px solid #e8e8e8;
  margin: 20px 10px;
  min-height: 200px;
`;

const Name = styled.div`
  font-weight: bold;
`;

const ParticipantsList = ({ list, deleteParticipant }) => {
  return (
    <ListStyled
      itemLayout="horizontal"
      dataSource={list}
      renderItem={(item, index) => (
        <List.Item
          key={index}
          actions={[
            <Button
              icon="delete"
              shape="circle"
              type="danger"
              onClick={() => deleteParticipant(item.name)}
            />,
          ]}
        >
          <List.Item.Meta title={<Name>{item.name}</Name>} />
          <div>$ {item.amount}</div>
        </List.Item>
      )}
    />
  );
};

const enhancer = compose(connect(null, { deleteParticipant }));

export default enhancer(ParticipantsList);
