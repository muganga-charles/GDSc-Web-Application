import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Card, Col, Text } from "@nextui-org/react";
import image from '../../../../Assets/photo-1563118490-a6fbac646b50.png'

function Marketinglead(){
  const [dataTL,setData] = useState([]);

  const memberrole = "MARKETING LEAD";
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

export default Marketinglead;