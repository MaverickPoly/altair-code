import type { ChangeEvent, ReactElement } from "react";

interface InputProps {
  type: "text" | "url" | "password" | "email";
  placeholder: string;
  icon: ReactElement;
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function Input(props: InputProps) {
  return (
    <div className="rounded-xl px-4 py-2 flex border border-neutral-800 focus-within:border-neutral-600 gap-4">
      {props.icon}
      <input
        type={props.type}
        value={props.value}
        name={props.name}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className={`outline-none flex-1 ${props.className}`}
      />
    </div>
  );
}
