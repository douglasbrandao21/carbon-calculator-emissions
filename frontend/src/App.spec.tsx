import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { MockedProvider } from '@apollo/client/testing';
import { calculations, recoverEmissionsSectors } from './api/graphql/queries';

const mockSectors = [
  {
    id: 'HOUSING',
    consumptions: [
      { id: 'ELECTRICITY', emissionFactor: 0.5, usageMeasureUnit: 'kWh' },
      { id: 'WATER', emissionFactor: 0.2, usageMeasureUnit: 'liters' },
    ]
  }
];

const mockCalculations = [
  {
    rawValue: 123.45,
    formattedValue: '123.45kg CO₂e'
  }
];

const mocks = [
  {
    request: {
      query: recoverEmissionsSectors,
    },
    result: {
      data: {
        emissionSectors: [
          {
            id: 'HOUSING',
            consumptions: [
              {
                id: 'ELECTRICITY',
                emissionFactor: 0.12345,
                usageMeasureUnit: 'kWh',
              },
            ],
          },
        ],
      },
    },
  },
  {
    request: {
      query: calculations,
      variables: {
        calculationsInput: [
          {
            emissionSector: 'HOUSING',
            consumptionType: 'ELECTRICITY',
            usage: 123.45,
          },
        ],
      },
    },
    result: {
      data: {
        calculations: [
          {
            rawValue: 15.2,
            formattedValue: '15.2 kg CO₂e',
          },
        ],
      },
    },
  },
];

describe('App', () => {
  it('renders initial form correctly', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    expect(await screen.findByText('Carbon Calculator')).toBeInTheDocument();
    expect(await screen.findByLabelText('Emission Sector')).toBeInTheDocument();
  });

  it('adds and removes form rows', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    const addButton = await screen.findByLabelText('add');
    fireEvent.click(addButton);

    const allEmissionSectorFields = await screen.findAllByLabelText('Emission Sector');
    expect(allEmissionSectorFields.length).toBe(2);

    const deleteButtons = await screen.findAllByLabelText('delete');
    fireEvent.click(deleteButtons[0]);

    const updatedEmissionSectorFields = await screen.findAllByLabelText('Emission Sector');
    expect(updatedEmissionSectorFields.length).toBe(1);
  });

  it('fills in the form and submits successfully', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <App />
      </MockedProvider>
    );

    // Wait for initial sectors to load
    await waitFor(() => screen.getByLabelText(/Emission Sector/i));

    fireEvent.mouseDown(screen.getByLabelText(/Emission Sector/i));
    fireEvent.click(await screen.findByText('HOUSING'));

    fireEvent.mouseDown(screen.getByLabelText(/Consumption Type/i));
    fireEvent.click(await screen.findByText('ELECTRICITY'));

    fireEvent.change(screen.getByLabelText(/Usage/i), {
      target: { value: '123.45' },
    });

    fireEvent.click(screen.getByRole('button', { name: /calculate/i }));

    // Wait for calculation result to appear
    await waitFor(() => {
      expect(screen.getByText(/Calculation Result 1/i)).toBeInTheDocument();
      expect(screen.getByText(/15.2 kg CO₂e/i)).toBeInTheDocument();
    });
  });
});
