import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Add, Delete, ExpandMore } from '@mui/icons-material';


import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useQuery } from '@apollo/client';
import type { EmissionSector } from './interfaces/EmissionSector';
import { recoverEmissionsSectors, calculations } from './api/graphql/queries';
import type Consumption from './interfaces/Consumption';
import type Calculation from './interfaces/Calculations';

type FormField = "emissionSector" | "consumptionType" | "usage";

function App() {
  const [forms, setForms] = useState([{ emissionSector: "", consumptionType: "", usage: "" }]);

  const { loading: sectorsLoading, error: sectorsError, data: sectorsData } =
    useQuery<{ emissionSectors: EmissionSector[] }>(recoverEmissionsSectors, {});

  const [runCalculationQuery, {
    data: calculationData,
    loading: calculationLoading,
    error: calculationError
  }] = useLazyQuery<{ calculations: Calculation[] }>(calculations);

  const handleChange = (index: number, field: FormField, value: string) => {
    const newForms = [...forms];

    newForms[index][field] = value;

    if (field === "emissionSector") {
      newForms[index].consumptionType = "";
    }

    setForms(newForms);
  };

  const addForm = () => {
    setForms([...forms, { emissionSector: "", consumptionType: "", usage: "" }]);
  };

  const removeForm = (index: number) => {
    const newForms = forms.filter((_, i) => i !== index);
    setForms(newForms);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const calculations = forms.map(form => ({
        emissionSector: form.emissionSector,
        consumptionType: form.consumptionType,
        usage: parseFloat(form.usage)
      }));

      await runCalculationQuery({
        variables: {
          calculationsInput: calculations
        }
      });
    } catch (err) {
      console.error(err);
      alert("Error submitting data");
    }
  };

  if (sectorsLoading) return <p>Loading...</p>;
  if (sectorsError) return <p>Error fetching user: {sectorsError.message}</p>;

  return (
    <Container maxWidth="lg">
      <h1 className='funnel-display-regular text-[96px] mt-12 mb-12'>Carbon Calculator</h1>
      <form onSubmit={handleSubmit} className='mb-8'>
        <div className='max-w-[1000px] m-auto'>
          {forms.map((form, index) => {
            const selectedSector = sectorsData?.emissionSectors.find(sector => sector.id === form.emissionSector);
            const consumptionTypes = selectedSector?.consumptions ?? [];
            const selectedConsumption = consumptionTypes.find(
              (consumption) => consumption.id === form.consumptionType
            );

            return (
              <div key={index} className='flex gap-8 mb-8'>
                <Box sx={{ minWidth: 250 }}>
                  <FormControl fullWidth>
                    <InputLabel id={`emission-sector-label-${index}`}>Emission Sector</InputLabel>
                    <Select
                      labelId={`emission-sector-label-${index}`}
                      id={`emission-sector-select-${index}`}
                      value={form.emissionSector}
                      label="Emission Sector"
                      onChange={(e) => handleChange(index, "emissionSector", e.target.value)}
                      required
                    >
                      {sectorsData?.emissionSectors.map(emission => (
                        <MenuItem key={emission.id} value={emission.id}>
                          {emission.id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ minWidth: 250 }}>
                  <FormControl fullWidth>
                    <InputLabel id={`consumption-type-label-${index}`}>Consumption Type</InputLabel>
                    <Select
                      labelId={`consumption-type-label-${index}`}
                      id={`consumption-type-select-${index}`}
                      value={form.consumptionType}
                      label="Consumption Type"
                      onChange={(e) => handleChange(index, "consumptionType", e.target.value)}
                      disabled={!form.emissionSector}
                      required
                    >
                      {consumptionTypes.map((type: Consumption) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ minWidth: 250 }}>
                  <TextField
                    label={selectedConsumption ? `Usage (${selectedConsumption.usageMeasureUnit})` : "Usage"}
                    variant="outlined"
                    fullWidth
                    value={form.usage}
                    onChange={(e) => handleChange(index, "usage", e.target.value)}
                    required
                  />
                </Box>

                {forms.length > 1 && (
                  <IconButton aria-label="delete" size="large" type="button" onClick={() => removeForm(index)}>
                    <Delete fontSize="inherit" />
                  </IconButton>
                )}

                {index === forms.length - 1 && (
                  <IconButton type="button" aria-label="add" size="large" onClick={addForm}>
                    <Add fontSize="inherit" />
                  </IconButton>
                )}
              </div>
            );
          })}
        </div>

        <Button type="submit" variant="contained">Calculate</Button>
      </form>

      {calculationData?.calculations && calculationData?.calculations.length > 0 && (
        calculationData.calculations.map((calculation: Calculation, index: number) => (
          <div>
            <Accordion classes='mb-4'>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span" className=''>{`Calculation Result ${index + 1}`}</Typography>
              </AccordionSummary>
              <AccordionDetails className='flex flex-col'>
                <span>Emission Sector: {forms.at(index)?.emissionSector}</span>
                <span>Consumption Type: {forms.at(index)?.consumptionType}</span>

                <h2 className='calculation-result-span'>Emissions: {calculation.formattedValue}</h2>
              </AccordionDetails>
            </Accordion>
          </div>
        ))
      )}
    </Container>
  );
}

export default App;
