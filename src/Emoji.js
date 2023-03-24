import {Button, Container, Form, Nav, Navbar,Row,Col ,Toast,Alert} from 'react-bootstrap'
import React from 'react';
import "./Emoji.css"
import copy from 'copy-to-clipboard'


function Emoji(props)
{
    const [cliked,setClicked] = React.useState(true);
    //const [showedEmoji, setShowedEmoji] = React.useState(props.emojiArray);

 
    /*function copyEmoji(){
        copy(props.char)
        const newArray = showedEmoji.map(el => {
            if(el == showedEmoji.find(checkElement))
            {
                return {...el,checked:true}
            }
            else
            {
                return {...el, checked:false}
            }
        })
        setShowedEmoji(newArray)
        }*/

    function returnCurrElement()
    {
         let currElement ;
        props.emojiArray.map(el => {
            if(el == props.emojiArray.find(checkElement))
            {
                currElement = el;
            }
          
        })    

        return currElement
    }

    function checkElement(element)
    {
        if(element.name == props.name)
       {
        return true
       }
    }


  


    return(

    <Container className=' shadow-sm my-4'>
        <Row className='EmojiRow' onClick={() => {props.handleClick(props)}}>
            <Col className='fs-4'>{props.char}</Col>
            <Col className=' text-start fs-4'><p>{props.name}</p></Col>
            <Col> <p className='text-muted copyText'><em >
                {returnCurrElement().checked == true ? "copied" : "Click to copy"}
                </em></p></Col>
        </Row>
    </Container>
    )

}

export default Emoji