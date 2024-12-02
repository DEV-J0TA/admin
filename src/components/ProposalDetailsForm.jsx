import React, { useEffect, useState } from "react";
import { TextField, Box, Typography, MenuItem } from "@mui/material";

const ProposalDetailsForm = ({ formData, setFormData }) => {
  const [generatedNumber, setGeneratedNumber] = useState("");

  // Gera um número aleatório de 3 a 5 dígitos ao carregar o componente
  useEffect(() => {
    const generateRandomNumber = () => {
      const randomNum = Math.floor(100 + Math.random() * 90000); // Gera de 100 a 99999
      setGeneratedNumber(randomNum.toString());
      setFormData((prev) => ({ ...prev, proposalNumber: randomNum.toString() })); // Atualiza no estado
    };
    generateRandomNumber();
  }, [setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom>
        Detalhes da Proposta
      </Typography>
      {/* Número da Proposta (somente leitura) */}
      <TextField
        fullWidth
        label="Número da Proposta"
        name="proposalNumber"
        margin="normal"
        value={generatedNumber}
        InputProps={{
          readOnly: true, // Torna o campo somente leitura
        }}
      />
      {/* Campo para Validade da Proposta */}
      <TextField
        fullWidth
        select
        label="Validade da Proposta"
        name="proposalValidity"
        margin="normal"
        value={formData.proposalValidity || ""}
        onChange={handleChange}
      >
        <MenuItem value="5">5 dias</MenuItem>
        <MenuItem value="10">10 dias</MenuItem>
        <MenuItem value="20">20 dias</MenuItem>
        <MenuItem value="30">30 dias</MenuItem>
        <MenuItem value="indefinido">Indefinido</MenuItem>
      </TextField>
      {/* Campo para Valor Mensal */}
      <TextField
        fullWidth
        select
        label="Valor Mensal (Plano)"
        name="monthlyPlan"
        margin="normal"
        value={formData.monthlyPlan || ""}
        onChange={handleChange}
      >
        <MenuItem value="199.90">Startup Company - R$ 199,90 / mês</MenuItem>
        <MenuItem value="299.90">Medium Company - R$ 299,90 / mês</MenuItem>
        <MenuItem value="399.90">Big Company - R$ 399,90 / mês</MenuItem>
      </TextField>
    </Box>
  );
};

export default ProposalDetailsForm;
