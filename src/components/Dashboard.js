import React from 'react';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { vehicleManagementData, serviceManagementData } = useSelector(
    (state) => state.vehicleMangement
  );

  let countService = serviceManagementData?.filter(
    (data) => data.completed === true
  );
  let countPendind = serviceManagementData?.filter(
    (data) => data.completed === false
  );

  return (
    <div className="Dashboard-count-card ">
      <Card>
        <Card.Body>
          <Card.Title className="card-title-card">No. of Vehicles</Card.Title>
          <Card.Title className="card-text-card m-5">
            {vehicleManagementData.length}
          </Card.Title>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title className="card-title-card">No. of Services</Card.Title>
          <Card.Text className="card-text-card m-5">
            {countService.length}
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title className="card-title-card">Pending Services</Card.Title>
          <Card.Text className="card-text-card m-5">
            {countPendind.length}
          </Card.Text>
        </Card.Body>
      </Card>
      {/* <div style={{width: "50%"}}>
        <iframe
          width="100%"
          height="600"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Spericorn%20technology,trivandrum+()&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        >
          <a href="https://www.maps.ie/distance-area-calculator.html">
            area maps
          </a>
        </iframe>
      </div> */}
    </div>
  );
};

export default Dashboard;
