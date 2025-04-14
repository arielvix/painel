import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { FaTachometerAlt, FaRegWindowMaximize, FaChartBar, FaMap } from 'react-icons/fa';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="d-flex flex-column bg-dark text-white" style={{ height: '100vh', width: '250px' }}>
      <div className="p-3">
        <h4>Datta Able</h4>
      </div>
      <div className="flex-grow-1">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/dashboard">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" onClick={() => setOpen(!open)}>
              <FaRegWindowMaximize /> Page Layouts
            </Link>
            <Collapse in={open}>
              <ul className="list-unstyled ms-3">
                <li><Link className="nav-link text-white" to="/page-layouts/basic">Basic</Link></li>
                <li><Link className="nav-link text-white" to="/page-layouts/advanced">Advanced</Link></li>
              </ul>
            </Collapse>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/widgets">
              <FaChartBar /> Widgets
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/charts">
              <FaChartBar /> Charts
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/maps">
              <FaMap /> Maps
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
