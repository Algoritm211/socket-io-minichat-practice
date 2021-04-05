import React, {useState} from 'react';
import {Button, ButtonToolbar, ControlLabel, FlexboxGrid, Form, FormControl, FormGroup, Panel} from "rsuite";
import {socket} from "../../socket/socket-config";

const EntryForm = () => {

  const [formValue, setFormValue] = useState({id: '', name: ''})

  const onHandleSubmit = () => {
    console.log(formValue)
    socket.send(JSON.stringify(formValue))
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
                  name="id" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  name="name"
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

export default EntryForm;
