import mysqlLogo from "@/assets/images/mysql.svg";
import postgresLogo from "@/assets/images/postgresql.svg";

import { Field, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export type Engine = "postgresql" | "mysql";

const OPTIONS: { value: Engine; label: string; logoUrl: string }[] = [
  { value: "postgresql", label: "PostgreSQL", logoUrl: postgresLogo },
  { value: "mysql", label: "MySQL", logoUrl: mysqlLogo },
];

export const EngineSegmentedControl = ({
  value,
  onChange,
}: {
  value: Engine;
  onChange: (value: Engine) => void;
}) => {
  return (
    <Field>
      <FieldLabel>Engine</FieldLabel>
      <div className="inline-flex items-center gap-1 rounded-lg bg-gray-100 p-1">
        {OPTIONS.map((option) => {
          const isActive = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 font-inter font-medium text-sm transition-colors",
                isActive ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700",
              )}
            >
              <img className="size-6" src={option.logoUrl} alt={option.label} />
              {option.label}
            </button>
          );
        })}
      </div>
    </Field>
  );
};
