import React from 'react';

function MakeExchange(props) {

    const{amountProp, rateProp} = props;

  function makeExchange(amount, rate){
    return amount * rate
  }

  return (
    <div>
      <p>Convertion rate: {rateProp}</p>
      <p>Total: {makeExchange(amountProp, rateProp)}</p>
    </div>
  );
}

export {MakeExchange};
