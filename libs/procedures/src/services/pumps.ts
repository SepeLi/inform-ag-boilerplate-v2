// In-memory mock data
let pumps = [
  {
    id: '1',
    name: 'Pump 1',
    type: 'Centrifugal',
    area: 'Area A',
    latitude: 34.0522,
    longitude: -118.2437,
    flowRate: 1000,
    offset: 5,
    currentPressure: 150,
    minPressure: 120,
    maxPressure: 180,
  },
  {
    id: '2',
    name: 'Pump 2',
    type: 'Submersible',
    area: 'Area B',
    latitude: 34.0522,
    longitude: -118.2437,
    flowRate: 800,
    offset: 3,
    currentPressure: 130,
    minPressure: 100,
    maxPressure: 160,
  },
];

export type PumpData = {
  name: string;
  type: string;
  area: string;
  latitude: number;
  longitude: number;
  flowRate: number;
  offset: number;
  currentPressure: number;
  minPressure: number;
  maxPressure: number;
};

export type Pump = PumpData & { id: string };

export const getAllPumps = () => pumps;

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
