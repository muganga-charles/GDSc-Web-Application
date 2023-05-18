import { Card, Col, Text } from "@nextui-org/react";
import {useState,useEffect} from 'react';
import axios from 'axios';
import image from '../../../../Assets/4.jpg'
export const Eventcordinator = () => {
  const [dataTL,setData] = useState([]);
  const memberrole = "EVENT CO-ORDINATOR";
  const Role = {
    role: memberrole,
  };
    useEffect(() => {
        axios.post('http://localhost:3301/api/leader/welcomedata/role',Role)
        .then(response =>{
          setData(response.data.data[0])
          
    })
    .catch(error => {
        console.log(error)
    })
    
    }, [])
    return (
  <Card css={{ bg: "$black", w: "100%" }}>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
          {dataTL.firstname + " " + dataTL.lastname}
        </Text>
        <Text h4 color="white">
          {dataTL.notes}
        </Text>
      </Col>
    </Card.Header>
    <Card.Image
      src={image}
      width="100%"
      height={340}
      objectFit="cover"
      alt="Card image background"
    />

<Card.Body>
        
<Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
          {dataTL.role}
        </Text>
        
      </Card.Body>
  </Card>
);
  }



  //src="https://nextui.org/images/card-example-3.jpeg"