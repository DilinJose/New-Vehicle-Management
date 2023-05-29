import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { deleteVehicleManagement } from '../actions';

const VehicleManagement = () => {
  const dispatch = useDispatch();
  const { vehicleManagementData } = useSelector(
    (state) => state.vehicleMangement
  );

  const history = useNavigate();

  const handleDelete = (id) => {
    console.log('id', id);

    dispatch(deleteVehicleManagement(`postVehicleManagement/${id}`));
  };

  const columns = [
    {
      name: 'Id',
      selector: (row) => row.id,
    },
    {
      name: 'Vehicle Number',
      selector: (row) => row.vehicleNo,
    },
    {
      name: 'Model',
      selector: (row) => row.model,
    },
    {
      name: 'Variant',
      selector: (row) => row.variant,
    },
    {
      name: 'VIN Number',
      selector: (row) => row.vinNumber,
    },
    {
      name: 'RC Number',
      selector: (row) => row.rcNumber,
    },
    {
      name: 'Purchase Date',
      selector: (row) => row.purchaseDate,
    },

    {
      name: 'edit',
      selector: (row) => (
        <Link
          to={`/addvehiclemanagement/${row.id}`}
          type="submit"
          className="btn btn-success btn-sm"
        >
          Edit
        </Link>
      ),
    },
    {
      name: 'delete',
      selector: (row) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-center">Vehicle Management</h2>

      <button
        className="btn btn-primary m-2"
        onClick={() => history('/addvehiclemanagement')}
      >
        Add
      </button>

      <div className="mt-3">
        <DataTable columns={columns} data={vehicleManagementData} pagination />
      </div>
    </div>
  );
};

export default VehicleManagement;
