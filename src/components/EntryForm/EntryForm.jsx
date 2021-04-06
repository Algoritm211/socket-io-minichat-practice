import React, {useState} from 'react';
import {Button, ButtonToolbar, ControlLabel, FlexboxGrid, Form, FormControl, FormGroup, Panel} from "rsuite";
import {socket} from "../../api/socket-config";
import {observer} from "mobx-react-lite";
import chatStore from "../../store/chatStore";

const EntryForm = () => {


  const [formValue, setFormValue] = useState({roomId: '', userName: ''})

  const onHandleSubmit = () => {
    // console.log(formValue)
    // socket.send(JSON.stringify(formValue))
    chatStore.login(formValue.roomId, formValue.userName)
  }

  return (
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={12}>
          <Panel header={<h3>Enter form</h3>} bordered>
            <Form
              formValue={formValue}
              onChange={(formValue) => setFormValue(formValue)}
              fluid
              >
              <FormGroup>
                <ControlLabel>Room Id</ControlLabel>
                <FormControl
                  name="roomId" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  name="userName"
                  type="text" />
              </FormGroup>
              <FormGroup>
                <ButtonToolbar>
                  <Button
                    onClick={onHandleSubmit}
                    appearance="primary">Enter chat</Button>
                </ButtonToolbar>
              </FormGroup>
            </Form>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
  );
};

export default observer(EntryForm);
