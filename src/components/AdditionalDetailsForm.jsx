import React from 'react';

const AdditionalDetailsForm = ({ register }) => (
  <div>
    <h2>Outros Detalhes</h2>
    <label>Taxa de Instalação:</label>
    <input type="number" {...register('installationFee')} />

    <label>Duração dos Serviços:</label>
    <select {...register('serviceDuration')}>
      <option value="6">6 Meses</option>
      <option value="12">12 Meses</option>
      <option value="indefinido">Sem Fidelidade</option>
    </select>

    <label>Velocidade de Download:</label>
    <input type="range" {...register('downloadSpeed')} min="50" max="1000" />

    <label>Velocidade de Upload:</label>
    <input type="range" {...register('uploadSpeed')} min="50" max="1000" />
  </div>
);

export default AdditionalDetailsForm;
