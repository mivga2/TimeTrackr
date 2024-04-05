import Card from "../components/Card";
import axios from 'axios';

const apiCall = () => {
  axios.get('http://localhost:3000').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}

const Overview = () => {

  return (
    <div>
      <button onClick={apiCall}>Make API Call</button>
      <Card title="Calendars" />
      <Card title="Events" />
      <Card title="Tasks" />
      <Card title="Friends" />
    </div>
  );
};

export default Overview;
