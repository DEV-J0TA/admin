import React from "react";
import {
  TextField,
  MenuItem,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Slider,
} from "@mui/material";

const AdditionalDetailsForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSliderChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom>
        Outros Detalhes
      </Typography>
      {/* Campo para Taxa de Instalação */}
      <TextField
        fullWidth
        type="number"
        label="Taxa de Instalação"
        name="installationFee"
        margin="normal"
        required
        value={formData.installationFee || ""}
        onChange={handleChange}
      />
      {/* Campo para Duração dos Serviços */}
      <TextField
        fullWidth
        select
        label="Duração dos Serviços"
        name="serviceDuration"
        margin="normal"
        value={formData.serviceDuration || " 6"}
        onChange={handleChange}
      >
        <MenuItem value=" 6">6 Meses</MenuItem>
        <MenuItem value=" 12">12 Meses</MenuItem>
        <MenuItem value="indefinido">Sem Fidelidade</MenuItem>
      </TextField>
      {/* Checkbox para Suporte via WhatsApp */}
      <FormControlLabel
        control={
          <Checkbox
            name="whatsappSupport"
            checked={formData.whatsappSupport || false}
            onChange={handleChange}
          />
        }
        label="Atendimento 24h via WhatsApp"
      />
      {/* Checkbox para Suporte Dedicado */}
      <FormControlLabel
        control={
          <Checkbox
            name="dedicatedSupport"
            checked={formData.dedicatedSupport || false}
            onChange={handleChange}
          />
        }
        label="Suporte Dedicado à Empresa"
      />
      {/* Seleção de SLA Técnico */}
      <TextField
        fullWidth
        select
        label="SLA Técnico"
        name="slaTechnical"
        margin="normal"
        value={formData.slaTechnical || ""}
        onChange={handleChange}
      >
        <MenuItem value="4">4 horas</MenuItem>
        <MenuItem value="8">8 horas</MenuItem>
        <MenuItem value="24">24 horas</MenuItem>
      </TextField>
      {/* Controle deslizante para Velocidade de Download */}
      <Typography variant="subtitle1" gutterBottom>
        Velocidade de Download (Mbps)
      </Typography>
      <Slider
        name="downloadSpeed"
        value={formData.downloadSpeed || 100}
        min={50}
        max={1000}
        step={50}
        valueLabelDisplay="auto"
        onChange={(e, value) => handleSliderChange("downloadSpeed", value)}
      />
      {/* Controle deslizante para Velocidade de Upload */}
      <Typography variant="subtitle1" gutterBottom>
        Velocidade de Upload (Mbps)
      </Typography>
      <Slider
        name="uploadSpeed"
        value={formData.uploadSpeed || 100}
        min={50}
        max={1000}
        step={50}
        valueLabelDisplay="auto"
        onChange={(e, value) => handleSliderChange("uploadSpeed", value)}
      />
    </Box>
  );
};

export default AdditionalDetailsForm;
