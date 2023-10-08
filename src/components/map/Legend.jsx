import React from 'react';

const Legend = () => {
  return (
    <div style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: 'white', padding: '10px' }}>
      <h3>Leyenda</h3>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: 'blue', marginRight: '10px' }}></div>
          <div>Marcador Azul</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: 'green', marginRight: '10px' }}></div>
          <div>Marcador Verde</div>
        </div>
        {/* Agrega más leyendas según tus necesidades */}
      </div>
    </div>
  );
};

export default Legend;
