import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { deleteServiceManagement } from '../actions';

import { DataGrid } from '@mui/x-data-grid';

const ServiceManagement = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { serviceManagementData } = useSelector(
    (state) => state.vehicleMangement
  );

  const handleClick = (event, cellValues) => {
    history(`/editservicemanagement/${cellValues.id}`);
  };

  const handleDeleteClick = (event, cellValues) => {
    dispatch(deleteServiceManagement(`postServiceManagement/${cellValues.id}`));
  };
  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'vehicle', headerName: 'Vehicle', width: 120 },
    { field: 'kms', headerName: 'Kilometers', width: 120 },
    { field: 'mode', headerName: 'Mode', width: 120 },
    { field: 'serviceCenter', headerName: 'Service Center', width: 120 },
    { field: 'driver', headerName: 'Driver', width: 120 },
    { field: 'type', headerName: 'type', width: 120 },
    { field: 'serviceNo', headerName: 'service No', width: 120 },
    { field: 'comments', headerName: 'Comments', width: 120 },
    {
      field: 'edit',
      renderCell: (cellValues) => {
        return (
          <button
            className="btn btn-primary"
            onClick={(event) => {
              handleClick(event, cellValues);
            }}
          >
            Edit
          </button>
        );
      },
    },

    {
      field: 'delete',
      renderCell: (cellValues) => {
        return (
          <button
            className="btn btn-danger"
            onClick={(event) => {
              handleDeleteClick(event, cellValues);
            }}
          >
            Delete
          </button>
        );
      },
    },
  ];

  const rows = serviceManagementData.map((data) => ({
    id: data.id,
    date: data.date,
    vehicle: data.vehicle,
    kms: data.kms,
    mode: data.mode,
    serviceCenter: data.serviceCenter,
    driver: data.driver,
    type: data.type,

    serviceNo: data.serviceNo,
    comments: data.comments,
  }));

  return (
    <div>
      <h2 className="text-center">Service Management</h2>

      <button
        className="btn btn-primary "
        onClick={() => history('/addservicemanagement')}
      >
        Add
      </button>
      <div className="mt-3">
        <div style={{ height: 400, width: '120%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onCellClick={handleCellClick}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceManagement;
