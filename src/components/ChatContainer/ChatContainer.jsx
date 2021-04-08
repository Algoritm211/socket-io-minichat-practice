import React, {useState, useRef, useEffect, createRef} from 'react';
import {Button, Container, Content, Footer, Header, Icon, IconButton, Input, List, Sidebar} from "rsuite";
import Message from "./Message/Message";
import {observer} from "mobx-react-lite";
import chatStore from "../../store/chatStore";
import classes from './ChatContainer.module.css'

const ChatContainer = () => {
  const [messageText, setMessageText] = useState('')
  const [isScrollDownMessageButton, setIsScrollDownMessageButton] = useState(false)
  const [isAutoScrollMessagesDown, setIsAutoScrollMessagesDown] = useState(true)
  const messageBlockEnd = useRef(null)
  const messageBlock = useRef(null)
  const {usersList, messages} = chatStore

  useEffect(() => {
    if (isAutoScrollMessagesDown) {
      scrollMessageDown()
    }
  }, [messages])

  const onScroll = () => {
    if (messageBlock.current !== null) {
      // console.log(messageBlock.current.scrollHeight, messageBlock.current.scrollTop, messageBlock.current.offsetHeight)
      const numberOfPixelsWasScrolled = (messageBlock.current.scrollHeight - messageBlock.current.scrollTop) - messageBlock.current.offsetHeight
      if (numberOfPixelsWasScrolled > 100) {
        setIsAutoScrollMessagesDown(false)
        setIsScrollDownMessageButton(true)
      } else {
        setIsAutoScrollMessagesDown(true)
        setIsScrollDownMessageButton(false)
      }
    }
  }

  const scrollMessageDown = () => {
    messageBlockEnd.current.scrollIntoView({behavior: 'smooth'})
  }

  const onSendMessage = () => {
    chatStore.sendMessage(messageText)
    setMessageText('')
  }

  const usersBlock = usersList.map((user, index) => {
    return (
      <List.Item key={index}>{user}</List.Item>
    )
  })

  const messagesBlock = messages.map((message, index) => {
    return (
      <Message key={index} message={message}/>
    )
  })
  return (
    <Container style={{padding: '30px 10px'}}>
      <Sidebar width={300} style={{textAlign: 'center', padding: '20px'}}>
        <h3>Online ({usersList.length})</h3>
        <List bordered>
          {usersBlock}
        </List>
      </Sidebar>
      <Container>
        <Header><h2>Messages</h2></Header>
        <Content
          className={classes.messages}>
          <div ref={messageBlock} onScroll={onScroll} style={{overflowY: 'scroll', height: '100%'}}>
            {messagesBlock}
            <div ref={messageBlockEnd}/>
          </div>
        </Content>
        {
          isScrollDownMessageButton
          && (
            <div className={classes.scrollToBottom}>
              <IconButton
                onClick={scrollMessageDown}
                icon={<Icon icon="down"/>}
                color="blue"
                circle/>
            </div>
          )
        }

        <Footer>
          <Input
            value={messageText}
            onChange={(value) => setMessageText(value)}
            componentClass="textarea"
            rows={3}
            placeholder="Enter your message"/>
        </Footer>
        <Button
          onClick={onSendMessage}
          color="blue"
          style={{maxWidth: '100px', marginTop: '7px'}}>
          <Icon icon="send"/> Send
        </Button>
      </Container>
    </Container>
  );
};

export default observer(ChatContainer);
