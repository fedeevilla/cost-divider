import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Button, Modal, Input, Form, notification } from "antd";
import * as R from "ramda";

import { addParticipant } from "../store/actions/participants";

const AddParticipant = ({ form, addParticipant, list }) => {
  const [visible, setVisible] = useState(false);

  const addParticipantHandler = (ev) => {
    ev.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        const exist = R.find(R.propEq("name", values.name), list);

        if (!exist) {
          addParticipant({
            name: values.name,
            amount: parseFloat(values.amount),
          });
          setVisible(false);
        } else
          notification.error({
            message: "This person already exists",
            description: "You should edit it in the main list",
          });
      }
    });
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        style={{ width: 200, margin: "auto" }}
      >
        Add Participant
      </Button>
      <Modal
        visible={visible}
        destroyOnClose={true}
        onCancel={() => setVisible(false)}
        maskClosable={false}
        title={"Add Participant"}
        footer={[
          <Button key="close" type="default" onClick={() => setVisible(false)}>
            Close
          </Button>,
          <Button key="save" type="primary" onClick={addParticipantHandler}>
            Add
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Name:" name="name">
            {form.getFieldDecorator("name", {
              rules: [
                { required: true, message: "This field can not be empty" },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Amount:" name="amount">
            {form.getFieldDecorator("amount", {
              rules: [
                { required: true, message: "This field can not be empty" },
                {
                  pattern: new RegExp("^[0-9]*$"),
                  message: "Numbers only allow",
                },
              ],
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const enhancer = compose(Form.create(), connect(null, { addParticipant }));

export default enhancer(AddParticipant);
