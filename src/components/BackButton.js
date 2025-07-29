import React from 'https://esm.sh/react@18';

export default function BackButton({ onBack }) {
  return React.createElement('button', { onClick: onBack }, 'Back');
}
