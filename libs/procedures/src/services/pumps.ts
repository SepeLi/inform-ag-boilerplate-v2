// In-memory mock data
let pumps = [
  {
    id: '1',
    name: 'Pump 1',
    type: 'Centrifugal',
    area: 'Area A',
    latitude: 34.0522,
    longitude: -118.2437,
    flowRate: '1000 GPM',
    offset: '5 sec',
    currentPressure: '150 psi',
    minPressure: '120 psi',
    maxPressure: '180 psi',
  },
  {
    id: '2',
    name: 'Pump 2',
    type: 'Submersible',
    area: 'Area B',
    latitude: 34.0522,
    longitude: -118.2437,
    flowRate: '800 GPM',
    offset: '3 sec',
    currentPressure: '130 psi',
    minPressure: '100 psi',
    maxPressure: '160 psi',
  },
];

export type PumpData = {
  name: string;
  type: string;
  area: string;
  latitude: number;
  longitude: number;
  flowRate: string;
  offset: string;
  currentPressure: string;
  minPressure: string;
  maxPressure: string;
};

export type Pump = PumpData & { id: string };

export const getPumps = () => pumps;

export const createPump = (input: PumpData) => {
  const newPump = { ...input, id: (Date.now() + Math.random()).toString() };
  pumps.push(newPump);
  return newPump;
};

export const updatePump = ({ input }: { input: Pump }) => {
  pumps = pumps.map((p) => (p.id === input.id ? input : p));
  return input;
};

export const deletePump = ({ input }: { input: { id: string } }) => {
  pumps = pumps.filter((p) => p.id !== input.id);
  return { success: true };
};

export const getPumpById = ({ input }: { input: { id: string } }) => {
  return pumps.find((p) => p.id === input.id) || null;
};
