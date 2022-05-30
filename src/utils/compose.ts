import React from 'react';

export const compose = (...func: any) => (component: React.FC) => {
  return func.reduceRight((prevValue: any, currentFunction: any) => {
    return currentFunction(prevValue);
  }, component);
};

