import React from 'react';

const CompanyInfoForm = ({ register }) => (
  <div>
    <h2>Dados da Empresa</h2>
    <label>Nome da Empresa:</label>
    <input type="text" {...register('companyName')} />

    <label>Responsável da Empresa:</label>
    <input type="text" {...register('responsiblePerson')} />

    <label>Validade da Proposta:</label>
    <select {...register('proposalValidity')}>
      <option value="5">5 dias</option>
      <option value="10">10 dias</option>
      <option value="20">20 dias</option>
      <option value="30">30 dias</option>
      <option value="indefinido">Indefinido</option>
    </select>
  </div>
);

export default CompanyInfoForm;
