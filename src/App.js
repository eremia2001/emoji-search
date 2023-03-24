import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Form, Nav, Navbar,Row,Col,Toast,ToastContainer } from 'react-bootstrap'
import React, { useEffect } from 'react';
import Emoji from './Emoji';
import copy from 'copy-to-clipboard'
import eremiaBild from './eremia.jpg'


function App() {
  var emoji = require('emoji.json')
  const myString = ` ${emoji[getRandonNumber()].char} Search for Emojis`
  //const [searchedEmoji, setSearchedEmoji] = React.useState("")
  const [filteredEmojis , setFilteredEmojis] = React.useState(fillArray(filterEmoji("",20)))
  const [randomLogo, setRandomLogo] = React.useState("");
  //console.log(emojis);
  const[showToast,setShowToast] = React.useState(false)
  const[selectedEmoji,setSelectedEmoji] = React.useState("");

 
  
    const myArray = filteredEmojis.map(emoji => <Emoji char={emoji.char} name={emoji.name} key={emoji.codes} emojiArray={filteredEmojis} handleClick={handleClick} />)

    
    useEffect(() => 
    {
     setRandomLogo(generateRandomLogo)
    },[])
   
    function generateRandomLogo()
    {
      return emoji[getRandonNumber()].char;
    }

    

    function fillArray(emojiArray)
    {
      const myArray = emojiArray.map(el =>({...el, checked:false}) )
      return myArray
    }

    function handleClick(element)
    {
      copy(element.char)
      const newArray = filteredEmojis.map(el => {
          if(el == filteredEmojis.find((e) => checkElement(e,element) ))
          {
              return {...el, checked:true}
          }
          else
          {
              return {...el, checked:false}
          }
      })
      setFilteredEmojis(newArray)
      setShowToast(true)
      setSelectedEmoji(element.char)
    }
    
 
    
    function checkElement(e,em)
    {
        if(e.name == em.name)
       {
        return true
       }
    }


  function handleChange(event)
  {
    //setSearchedEmoji();
    setFilteredEmojis(filterEmoji(event.target.value,20))

  }

  function filterEmoji(searchText,maxBound)
  {
     return emoji.filter(emoji => 
      {
        if(emoji.name.toLowerCase().includes(searchText.toLowerCase()))
        {
          return true;
        }
        if (emoji.name.includes(searchText)) {
          return true;
        }
        return false;
      })
      .slice(0,maxBound)
  }


  function getRandonNumber()
  {
    return Math.floor(Math.random() * emoji.length-1);
  }

  console.log(showToast)

  // TODO: jedes mal wenn gecklicked wird soll ein Toast anzeigen, bei mehreren ankliken mehrere Toast gestacked .
  // TODO: Idee ist alle Toast beim anklicken in UseState zu verwalten und dieses dann im Toast Container unten aufführen
  

  return (
    <Container fluid className="App bg-dark position-relative" >
      <ToastContainer  position="top-end" className='p-3 mx-4 '>
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Header>
        <strong className='me-auto'>Notification</strong>
        </Toast.Header>
        <Toast.Body>
          <p className='m-0'>succesfully copied ! {selectedEmoji}</p>
        </Toast.Body>
      </Toast>
      </ToastContainer>
      
      <Row>
        <Navbar variant="dark" bg="dark" className='shadow-lg'>
          <Navbar.Brand><p className='m-0 ms-4'>{randomLogo}</p></Navbar.Brand>
          <Navbar.Brand  > Emoji Search</Navbar.Brand>
          <Container>
            <Nav className='justify-content-center w-100'>
              <Nav.Item>
              <Form.Control placeholder = {myString} onChange={handleChange} ></Form.Control>
              </Nav.Item>
              <Nav.Item>
              </Nav.Item>
            </Nav>
          </Container>
      </Navbar>
      </Row>

    <Row>

      <Container className='text-white bodyContainer  '  >
           {myArray.length == 0 ? <p className='my-4 lead '>Es gibt keine Emoji, die so heißen</p>:myArray}
      </Container>
    </Row>
    </Container>
  );

 
}

export default App;
