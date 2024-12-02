import React from 'react';

const ProposalDetailsForm = ({ register }) => (
  <div>
    <h2>Detalhes da Proposta</h2>
    <label>Número da Proposta:</label>
    <input type="text" {...register('proposalNumber')} />

    <label>Valor Mensal (Plano):</label>
    <select {...register('monthlyPlan')}>
      <option value="199.90">Startup Company - R$ 199,90/mês</option>
      <option value="299.90">Medium Company - R$ 299,90/mês</option>
      <option value="399.90">Big Company - R$ 399,90/mês</option>
    </select>

    <label>Atividade Operacional:</label>
    <div>
      <input type="checkbox" {...register('dedicatedLink')} /> Link dedicado
      <input type="checkbox" {...register('validIP')} /> IP Válido
      <input type="checkbox" {...register('fixedIP')} /> IP Fixo
    </div>
  </div>
);

export default ProposalDetailsForm;
