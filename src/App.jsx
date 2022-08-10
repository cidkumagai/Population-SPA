import React from 'react';
import { Reset } from 'styled-reset';
import { Center } from '@chakra-ui/react';
import { CheckBox } from './components/CheckBox/CheckBox';
import { CreateChart } from './components/CreateChart/CreateChart';

function App() {
  return (
    <React.Fragment>
      <Reset  />
      <Center
      as='h1'
      bg='#a7a4a4'
      color='#464646'
      height='70px'
      width='100%'
      fontSize='60px'
      fontWeight='500'
      >
        都道府県別人口推移
      </Center>
      <CheckBox  />
      <CreateChart  />
    </React.Fragment>
  );
}

export default App;