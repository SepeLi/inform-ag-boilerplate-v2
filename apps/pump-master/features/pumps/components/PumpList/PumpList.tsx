'use client';

import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  browserClient as trpc,
  Provider as TRPCProvider,
} from '@inform-ag-boilerplate-v2/server';
import { RootState } from '../../../../store';
import { setPumps, setPumpLoading, setPumpError } from '../../state/pumpSlice';
import { Input, Button, Modal } from '@inform-ag-boilerplate-v2/ui';
import { useRouter } from 'next/navigation';
import { Pump } from '@inform-ag-boilerplate-v2/procedures';

const PumpListComponent = () => {
  const dispatch = useDispatch();
  const { pumps, loading, error } = useSelector(
    (state: RootState) => state.pump
  );
  const [search, setSearch] = useState('');
  const [editPump, setEditPump] = useState<Pump | null>(null);
  const [editName, setEditName] = useState('');
  const [editType, setEditType] = useState('');
  const [editArea, setEditArea] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterArea, setFilterArea] = useState('');
  const [filterFlowRate, setFilterFlowRate] = useState('');
  const [filterCurrentPressure, setFilterCurrentPressure] = useState('');

  const uniqueTypes: string[] = Array.from(
    new Set(pumps.map((p: Pump) => p.type))
  );
  const uniqueAreas: string[] = Array.from(
    new Set(pumps.map((p: Pump) => p.area))
  );

  const getAllPumps = trpc.pumps.getAllPumps.useQuery(undefined, {
    enabled: false,
  });
  const updatePumpMutation = trpc.pumps.updatePump.useMutation();
  const router = useRouter();

  useEffect(() => {
    dispatch(setPumpLoading(true));
    getAllPumps
      .refetch()
      .then((res) => {
        if (res.data) {
          dispatch(setPumps(res.data));
        } else if (res.error) {
          dispatch(setPumpError(res.error.message));
        }
      })
      .catch((err) => {
        dispatch(setPumpError(err.message));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredPumps: Pump[] = pumps.filter((pump: Pump) => {
    const matchesSearch =
      pump.name.toLowerCase().includes(search.toLowerCase()) ||
      pump.type.toLowerCase().includes(search.toLowerCase()) ||
      pump.area.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType ? pump.type === filterType : true;
    const matchesArea = filterArea ? pump.area === filterArea : true;
    const matchesFlowRate =
      filterFlowRate && !isNaN(Number(filterFlowRate))
        ? Number(pump.flowRate) >= Number(filterFlowRate)
        : true;
    const matchesCurrentPressure = filterCurrentPressure
      ? Number(pump.currentPressure) === Number(filterCurrentPressure)
      : true;
    return (
      matchesSearch &&
      matchesType &&
      matchesArea &&
      matchesFlowRate &&
      matchesCurrentPressure
    );
  });

  const handleEdit = (pump: Pump) => {
    setEditPump(pump);
    setEditName(pump.name);
    setEditType(pump.type);
    setEditArea(pump.area);
  };

  const handleSave = async () => {
    if (!editPump) return;
    const updatedPump: Pump = {
      ...editPump,
      name: editName,
      type: editType,
      area: editArea,
    };
    try {
      await updatePumpMutation.mutateAsync(updatedPump);
      // Refetch pumps after update
      const res = await getAllPumps.refetch();
      if (res.data) {
        dispatch(setPumps(res.data));
      }
      setEditPump(null);
    } catch (err: any) {
      dispatch(setPumpError(err.message || 'Failed to update pump'));
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex mb-3 align-items-end flex-wrap gap-2">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search pumps by name, type, or area"
          className="me-2"
        />
        <Button onClick={() => setSearch('')} variant="outline">
          Clear
        </Button>
        <select
          className="form-select w-auto ms-2"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          {uniqueTypes.map((type: string) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select
          className="form-select w-auto ms-2"
          value={filterArea}
          onChange={(e) => setFilterArea(e.target.value)}
        >
          <option value="">All Areas</option>
          {uniqueAreas.map((area: string) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
        <Input
          value={filterFlowRate}
          onChange={(e) => setFilterFlowRate(e.target.value)}
          placeholder="Flow Rate Greater Than..."
          className="ms-2"
        />
        <Input
          value={filterCurrentPressure}
          onChange={(e) => setFilterCurrentPressure(e.target.value)}
          placeholder="Current Pressure"
          className="ms-2"
        />
      </div>
      {loading && <div>Loading pumps...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Area</th>
            <th>Flow Rate</th>
            <th>Current Pressure</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPumps.map((pump: Pump) => (
            <tr key={pump.id}>
              <td>{pump.name}</td>
              <td>{pump.type}</td>
              <td>{pump.area}</td>
              <td>{pump.flowRate} GPM</td>
              <td>{pump.currentPressure} psi</td>
              <td>
                <Button
                  size="sm"
                  variant="primary"
                  className="me-2"
                  onClick={() => router.push(`/pumps/${pump.id}`)}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="me-2"
                  onClick={() => handleEdit(pump)}
                >
                  Edit
                </Button>
                <Button size="sm" variant="danger">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {filteredPumps.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">
                No pumps found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal
        open={!!editPump}
        onClose={() => setEditPump(null)}
        title="Edit Pump"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <Input
            label="Name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="mb-2"
          />
          <Input
            label="Type"
            value={editType}
            onChange={(e) => setEditType(e.target.value)}
            className="mb-2"
          />
          <Input
            label="Area"
            value={editArea}
            onChange={(e) => setEditArea(e.target.value)}
            className="mb-2"
          />
          <div className="d-flex justify-content-end mt-3">
            <Button
              type="button"
              variant="outline"
              className="me-2"
              onClick={() => setEditPump(null)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export const PumpList: FC = (props) => (
  <TRPCProvider>
    <PumpListComponent {...props} />
  </TRPCProvider>
);
