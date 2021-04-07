import React, {useState} from 'react';
import {Button, Container, Content, Footer, Header, Icon, Input, List, Sidebar} from "rsuite";
import Message from "./Message/Message";
import {observer} from "mobx-react-lite";
import chatStore from "../../store/chatStore";

const ChatContainer = () => {
  const [messageText, setMessageText] = useState('')
  const {usersList} = chatStore
  const usersBlock = usersList.map((user, index) => {
    return (
      <List.Item key={index}>{user}</List.Item>
    )
  })

  return (
    <Container style={{padding: '30px 10px'}}>
      <Sidebar width={300} style={{ textAlign: 'center', padding: '20px'}}>
        <h3>Online ({usersList.length})</h3>
        <List bordered>
          {usersBlock}
        </List>
      </Sidebar>
      <Container>
        <Header><h2>Messages</h2></Header>
        <Content style={{maxHeight: '60vh', overflowY: 'scroll', marginBottom: '3px'}}>
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </Content>
        <Footer>
          <Input
            value={messageText}
            onChange={(value) => setMessageText(value)}
            componentClass="textarea"
            rows={3}
            placeholder="Enter your message" />
        </Footer>
        <Button color="blue" style={{maxWidth: '100px', marginTop: '7px'}}>
          <Icon icon="send"  /> Send
        </Button>
      </Container>
    </Container>
  );
};

export default observer(ChatContainer);
