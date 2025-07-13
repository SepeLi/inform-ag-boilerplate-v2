'use client';
import { useParams } from 'next/navigation';
import {
  browserClient as trpc,
  Provider as TRPCProvider,
} from '@inform-ag-boilerplate-v2/server';
import { FC } from 'react';
// import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
// import Image from 'next/image';

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
            <span>
              <strong>Pump ID</strong>: {pump.id}
            </span>
          </div>
          <div>
            <span>
              <strong>Status</strong>: Operational
            </span>
          </div>
          <div>
            <span>
              <strong>Last Updated</strong>: 2024-01-20 14:30
            </span>
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
            <td>{pump.flowRate} GPM</td>
          </tr>
          <tr>
            <td>Offset</td>
            <td>{pump.offset} sec</td>
          </tr>
          <tr>
            <td>Pressure (Current | Min | Max)</td>
            <td>
              {pump.currentPressure} psi | {pump.minPressure} psi |{' '}
              {pump.maxPressure} psi
            </td>
          </tr>
        </tbody>
      </table>
      <h4>Map</h4>
      <div
        className="w-100 mb-4 rounded bg-info bg-opacity-10 d-flex align-items-center justify-content-center"
        style={{ height: 300 }}
      >
        {/* How to implement map with google maps api:
        https://visgl.github.io/react-google-maps/docs/get-started
        <AdvancedMarker position={pointToLatLng(point)}>
          <Image src={MapMarker} alt="Map marker" width={32} height={32} />
        </AdvancedMarker> */}
        <span>Map Placeholder</span>
      </div>
      <h4>Pressure Over Time</h4>
      <div className="mb-2">
        <span className="fw-semibold display-6">
          {pump.currentPressure} psi
        </span>{' '}
        <span>PSI</span>
        <div>
          Last 24 Hours <span className="text-success">+5%</span>
        </div>
      </div>
      <div
        className="w-100 rounded bg-light d-flex align-items-center justify-content-center"
        style={{ height: 180 }}
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
