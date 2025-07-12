'use client';
import { useParams } from 'next/navigation';
import {
  browserClient as trpc,
  Provider as TRPCProvider,
} from '@inform-ag-boilerplate-v2/server';
import { FC } from 'react';

const PumpDetailComponent: FC = () => {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  if (typeof id !== 'string')
    return <div className="alert alert-danger">Invalid pump ID.</div>;
  const {
    data: pump,
    isLoading,
    error,
  } = trpc.pumps.getPumpById.useQuery({ id });

  if (isLoading) return <div>Loading...</div>;
  if (error || !pump)
    return <div className="alert alert-danger">Pump not found.</div>;

  return (
    <div className="container mt-4">
      <h2>Pump {pump.id}</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <div>
            <strong>Pump ID</strong>: {pump.id}
          </div>
          <div>
            <strong>Status</strong>: Operational
          </div>
          <div>
            <strong>Last Updated</strong>: 2024-01-20 14:30
          </div>
        </div>
      </div>
      <h4>Attributes</h4>
      <table className="table w-auto">
        <tbody>
          <tr>
            <td>Type</td>
            <td>{pump.type}</td>
          </tr>
          <tr>
            <td>Area/Block</td>
            <td>{pump.area}</td>
          </tr>
          <tr>
            <td>Location (lat/lon)</td>
            <td>
              {pump.latitude}° N, {pump.longitude}° W
            </td>
          </tr>
          <tr>
            <td>Flow Rate</td>
            <td>{pump.flowRate}</td>
          </tr>
          <tr>
            <td>Offset</td>
            <td>{pump.offset}</td>
          </tr>
          <tr>
            <td>Pressure (Current | Min | Max)</td>
            <td>
              {pump.currentPressure} | {pump.minPressure} | {pump.maxPressure}
            </td>
          </tr>
        </tbody>
      </table>
      <h4>Map</h4>
      <div
        style={{
          width: '100%',
          height: 300,
          background: '#e6f0f7',
          borderRadius: 12,
          marginBottom: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span>Map Placeholder</span>
      </div>
      <h4>Pressure Over Time</h4>
      <div className="mb-2">
        <span style={{ fontSize: 32, fontWeight: 600 }}>
          {pump.currentPressure}
        </span>{' '}
        <span>PSI</span>
        <div>
          Last 24 Hours <span style={{ color: '#16a34a' }}>+5%</span>
        </div>
      </div>
      <div
        style={{
          width: '100%',
          height: 180,
          background: '#f8fafc',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span>Chart Placeholder</span>
      </div>
    </div>
  );
};

const PumpDetailPage: FC = () => (
  <TRPCProvider>
    <PumpDetailComponent />
  </TRPCProvider>
);

export default PumpDetailPage;
