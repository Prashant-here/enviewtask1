
import React, { useState, useEffect } from 'react';
import './vehicle.css';

const VehicleComponent = () => {
  const mockAlerts = [
    {
      "id": "6049dbd2-45bc-4e34-9ea2-c82ced0279f1",
      "alert_type": "Unsafe driving",
      "vehicle_id": "cc70a7e5-8397-4914-bbbb-4d6bb521ec67",
      "driver_friendly_name": "Ramesh",
      "vehicle_friendly_name": "KA12A3456",
      "timestamp": "2023-01-03T04:25:45.424Z"
    },
    {
      "id": "5149dbd2-45bc-4e34-9ea2-c82ced0279f1",
      "alert_type": "Distracted driver",
      "vehicle_id": "dd70a7e5-8397-4914-bbbb-4d6bb521ec67",
      "driver_friendly_name": "Suresh",
      "vehicle_friendly_name": "MH12A3456",
      "timestamp": "2023-01-03T04:24:45.424Z"
    },
    {
      "id": "6049dbd2-45bc-4e34-9ea2-c82ced0279f2",
      "alert_type": "Speeding",
      "vehicle_id": "cc70a7e5-8397-4914-bbbb-4d6bb521ec68",
      "driver_friendly_name": "Nimesh",
      "vehicle_friendly_name": "KA12A3457",
      "timestamp": "2023-02-04T06:25:45.424Z"
    },
    {
      "id": "5149dbd2-45bc-4e34-9ea2-c82ced0279f9",
      "alert_type": "Parking violation",
      "vehicle_id": "dd70a7e5-8397-4914-bbbb-4d6bb521ec69",
      "driver_friendly_name": "Rajesh",
      "vehicle_friendly_name": "MH12A3459",
      "timestamp": "2023-01-05T06:24:45.424Z"
    }
    // Add more mock data as needed...
  ];

  const [alerts, setAlerts] = useState([]);
  const [showFull, setShowFull] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchByNumber, setSearchByNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredAlerts, setFilteredAlerts] = useState([]);

  useEffect(() => {

    // if (showFull) {
    //     setAlerts(mockAlerts);
    //   }
    // }, [showFull]);
    if (showFull) {
        setAlerts(mockAlerts);
      } else {
        setAlerts([]); // Clear the alerts when showFull is false
      }
    }, [showFull, mockAlerts])


//     setFilteredAlerts(alerts);
//   }, [alerts]);

  const handleSearch = () => {
    let filtered = alerts.filter(alert => {
      const isTextMatch =
        !searchText ||
        alert.alert_type.toLowerCase().includes(searchText.toLowerCase()) ||
        alert.driver_friendly_name.toLowerCase().includes(searchText.toLowerCase());

      const isNumberMatch =
        !searchByNumber ||
        alert.vehicle_friendly_name.toLowerCase().includes(searchByNumber.toLowerCase());

      const alertDate = new Date(alert.timestamp);
      const start = new Date(startDate);
      const end = new Date(endDate);
      const isDateMatch =
        !startDate || !endDate || (alertDate >= start && alertDate <= end);

      return isTextMatch && isNumberMatch && isDateMatch;
    });

    setFilteredAlerts(filtered);
  };

  const markFalseAlarm = (alertId) => {
    const updatedAlerts = filteredAlerts.filter(alert => alert.id !== alertId);
    setFilteredAlerts(updatedAlerts);
    console.log(`Marked alert with ID ${alertId} as false alarm.`);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      day: 'numeric',
      month: 'long', // Change 'long' to 'short' or 'numeric' for abbreviated or numeric month
      year: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };


  const showFullList = () => {
    setShowFull(true); // Show the full list of alerts
  };

  return (
    <div>
      <h2>Vehicle Alerts</h2>
      <div>
        <input
          type="text"
          class="form-control "
          className="search-alert"
          aria-label="Username"
          placeholder="Search by alert type"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <input
          type="text"
          class="form-control "
          className="search-vehicleno"
          aria-label="Username"
          placeholder="Search by vehicle-number"
          value={searchByNumber}
          onChange={(e) => setSearchByNumber(e.target.value)}
        />
        <input
          class="form-control "
          className="input-date"
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          class="form-control"
          className="input-date"
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button type="button" className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
        <button type="button" className="btn btn-secondary button-show" onClick={showFullList}>
          Show Full List
        </button>
      </div>

      {showFull && (

      <ul className="list-group">
        {filteredAlerts.map((alert) => (
          <li key={alert.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="output-container">
              <span><strong>Alert Type:</strong> {alert.alert_type}</span><br />
              <span><strong>Vehicle:</strong> {alert.vehicle_friendly_name}</span><br />
              <span><strong>Driver:</strong> {alert.driver_friendly_name}</span><br />
              <span><strong>Timestamp:</strong> {formatDate(alert.timestamp)}</span>
            </div>
            <button className="btn btn-danger" onClick={() => markFalseAlarm(alert.id)}>
              Mark as False Alarm
            </button>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

export default VehicleComponent;

