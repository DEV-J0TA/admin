import React from "react";
import { TextField, MenuItem, Box, Typography } from "@mui/material";

const CompanyInfoForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom>
        Dados da Empresa
      </Typography>
      <TextField
        fullWidth
        label="Nome da Empresa"
        name="companyName"
        margin="normal"
        required
        value={formData.companyName || ""}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Responsável da Empresa"
        name="responsiblePerson"
        margin="normal"
        required
        value={formData.responsiblePerson || ""}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        select
        label="Validade da Proposta"
        name="proposalValidity"
        margin="normal"
        value={formData.proposalValidity || "5"}
        onChange={handleChange}
      >
        <MenuItem value="5">5 dias</MenuItem>
        <MenuItem value="10">10 dias</MenuItem>
        <MenuItem value="20">20 dias</MenuItem>
        <MenuItem value="30">30 dias</MenuItem>
        <MenuItem value="indefinido">Indefinido</MenuItem>
      </TextField>
    </Box>
  );
};

export default CompanyInfoForm;
