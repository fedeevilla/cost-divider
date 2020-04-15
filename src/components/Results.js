import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Button, Modal, List } from "antd";

import { splitPayments } from "../store/actions/participants";
import styled from "styled-components";

const Container = styled.div`
  white-space: pre-wrap;

  .ant-list-item-meta-title {
    text-align: center;
  }
`;

const HappyEnd = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
`;

const Results = ({ splitPayments }) => {
  const [visible, setVisible] = useState(false);
  const results = splitPayments();

  return (
    <>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        style={{ width: 200, margin: "auto" }}
      >
        Calculate!
      </Button>
      {visible && (
        <Modal
          visible={visible}
          destroyOnClose={true}
          onCancel={() => setVisible(false)}
          maskClosable={false}
          title={"Results"}
          footer={[
            <Button
              key="close"
              type="default"
              onClick={() => setVisible(false)}
            >
              Close
            </Button>,
          ]}
        >
          <Container>
            {results.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={results}
                renderItem={(item, index) => (
                  <List.Item key={index}>
                    <List.Item.Meta
                      title={`${item.p1} should pay $${item.amount} to ${item.p2}`}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <HappyEnd>Happy end! Nobody owes anyone.</HappyEnd>
            )}
          </Container>
        </Modal>
      )}
    </>
  );
};

const enhancer = compose(connect(null, { splitPayments }));

export default enhancer(Results);
