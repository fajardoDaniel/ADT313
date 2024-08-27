import logo from './logo.svg';
import './App.css';

import  Name from './Component/Name/Name'
import Section  from './Component/Section/Section';
import Description from './Component/Description/Description';

function App() {
  const userInformation = {
    firstName: 'Daniel',
    lastName: 'Fajardo',
    section: 'IT-3A',
    description: 'CODM Player and Coffee Addict'
  }
  return (
    <div className='App'>
      <Name firstName={userInformation.firstName} lastName={userInformation.lastName} />
      <Section  section={userInformation.section} />
      <Description description={userInformation.description} />
    </div>
  );
}

export default App;
