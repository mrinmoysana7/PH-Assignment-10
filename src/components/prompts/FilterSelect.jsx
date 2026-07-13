"use client";

import { ChevronDown } from "@gravity-ui/icons";
import { Select, ListBox } from "@heroui/react";

export default function FilterSelect({
  label,
  icon,
  value,
  onChange,
  options,
  placeholder,
  color = "violet",
}) {
  const colors = {
    violet: {
      bg: "bg-violet-100",
      text: "text-violet-600",
      hover: "hover:border-violet-300",
      focus:
        "focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20",
    },
    sky: {
      bg: "bg-sky-100",
      text: "text-sky-600",
      hover: "hover:border-sky-300",
      focus:
        "focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20",
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      hover: "hover:border-orange-300",
      focus:
        "focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20",
    },
    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      hover: "hover:border-emerald-300",
      focus:
        "focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20",
    },
  };

  const c = colors[color];

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-default-500">
        {label}
      </p>

      <Select selectedKey={value} onSelectionChange={onChange}>
        <Select.Trigger
          className={`
            group
            hover:cursor-pointer
            hover:shadow-xl
            h-14
            w-full
            rounded-2xl
            bg-white
            px-4
            shadow-md
            transition-all
            duration-300
            ${c.hover}
            ${c.focus}
            data-[slot='indicator']:hidden
          `}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.bg}`}
              >
                <span className={c.text}>{icon}</span>
              </div>

              <div className="">
                <Select.Value placeholder={placeholder} />
              </div>
            </div>
            <ChevronDown></ChevronDown>
          </div>
        </Select.Trigger>

        <Select.Popover className="rounded-2xl border border-default-200 bg-white p-2 shadow-xl">
          {/* <ListBox>
            {options.map((item) => (
              <ListBox.Item
                key={item}
                id={item}
                className="rounded-xl px-3 py-2 hover:bg-violet-50"
              >
                {item === "all"
                  ? placeholder
                  : item.charAt(0).toUpperCase() + item.slice(1)}
              </ListBox.Item>
            ))}
          </ListBox> */}

          <ListBox>
            {options.map((item) => (
              <ListBox.Item
                key={typeof item === "string" ? item : item.value}
                id={typeof item === "string" ? item : item.value}
                textValue={typeof item === "string" ? item : item.label}
                className="rounded-xl px-3 py-2 hover:bg-violet-50"
              >
                {typeof item === "string"
                  ? item === "all"
                    ? placeholder
                    : item
                  : item.label}
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  );
}
