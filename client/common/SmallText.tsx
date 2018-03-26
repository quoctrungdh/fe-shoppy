import * as React from 'react';

interface SmallTextProps {
  text: string,
  id?: number
}

export default function SmallText({ text, id }: SmallTextProps) {
  return (<h5>{text} {id}</h5>)
}