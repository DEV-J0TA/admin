import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CompanyInfoForm from "./components/CompanyInfoForm";
import ProposalDetailsForm from "./components/ProposalDetailsForm";
import AdditionalDetailsForm from "./components/AdditionalDetailsForm";
import { Container, Typography, Button, Box } from "@mui/material";
import { Card, CardContent } from "@mui/material";
import axios from "axios"; // Instale o axios: npm install axios


const App = () => {
  const [formData, setFormData] = useState({}); // Estado para os dados do formulário
  const [proposals, setProposals] = useState([]); // Estado para armazenar propostas

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Gerar ID único para a nova proposta
    const newProposal = {
      ID_at: uuidv4(), // Gera um ID único
      companyName: formData.companyName || "", // Nome da empresa
      responsiblePerson: formData.responsiblePerson || "", // Nome do responsável
      proposalValidity: formData.proposalValidity || "", // Validade da proposta
      proposalNumber: formData.proposalNumber || "", // Número da proposta
      monthlyPlan: formData.monthlyPlan || "", // Plano mensal
      dedicatedLink: !!formData.dedicatedLink, // Link dedicado (booleano)
      validIP: !!formData.validIP, // IP válido (booleano)
      fixedIP: !!formData.fixedIP, // IP fixo (booleano)
      whatsappSupport: !!formData.whatsappSupport, // Suporte WhatsApp (booleano)
      dedicatedSupport: !!formData.dedicatedSupport, // Suporte dedicado (booleano)
      slaTechnical: formData.slaTechnical || "", // SLA técnico
      installationFee: parseFloat(formData.installationFee) || 0, // Taxa de instalação
      serviceDuration: formData.serviceDuration || " 6", // Valor inicial válido
      downloadSpeed: parseInt(formData.downloadSpeed, 10) || 0, // Velocidade de download
      uploadSpeed: parseInt(formData.uploadSpeed, 10) || 0, // Velocidade de upload
    };
  
    try {
      console.log("Proposta sendo enviada:", newProposal); // Log dos dados enviados

  
      // Enviar os dados ao NocoDB
      const response = await axios.post(
        "https://nocodb.nexusnerds.com.br/api/v2/tables/mkycb1xxk5x3ssv/records",
        newProposal,
        {
          headers: {
            "xc-token": "3219DNR4mQhCqrV4sw29IFuTbPOqfRS-xnvwXKpE",
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Resposta do servidor:", response.data); // Log da resposta bem-sucedida
  
      // Adicionar a nova proposta ao estado local
      setProposals((prevProposals) => [...prevProposals, newProposal]);
  
      alert(`Proposta gerada com sucesso! ID: ${newProposal.id}`);
    } catch (error) {
      console.error("Erro ao enviar proposta:", error); // Log do erro completo
  
      // Verificar se há detalhes na resposta do erro
      if (error.response) {
        console.error("Detalhes do erro:", error.response.data);
        alert(
          `Erro ao enviar proposta: ${error.response.data.message || "Erro desconhecido"}`
        );
      } else {
        alert("Erro ao enviar a proposta. Verifique sua conexão ou tente novamente.");
      }
    }
  };
  
  
  
  

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Gerador de Propostas Comerciais
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center">
        Total de Propostas Geradas: {proposals.length}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <CompanyInfoForm formData={formData} setFormData={setFormData} />
        <ProposalDetailsForm formData={formData} setFormData={setFormData} />
        <AdditionalDetailsForm formData={formData} setFormData={setFormData} />
        <Box textAlign="center" mt={3}>
          <Button type="submit" variant="contained" color="primary" size="large">
            Gerar Proposta
          </Button>
        </Box>
      </Box>
        <Box mt={4}>
            <Typography variant="h6">Propostas Geradas:</Typography>
            {proposals.map((proposal) => (
              <Card key={proposal.ID_at} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="body1">ID: {proposal.ID_at}</Typography>
                  <Typography variant="body1">
                    Empresa: {proposal.companyName || "Não Informado"}
                  </Typography>
                  <Typography variant="body1">
                    Plano Mensal: {proposal.monthlyPlan || "Não Informado"}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

    </Container>
  );
};

export default App;
