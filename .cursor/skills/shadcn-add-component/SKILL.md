---
name: shadcn-add-component
description: Add a new shadcn/ui primitive to the project via the official CLI. Use whenever a UI primitive (Button, Input, Dialog, Select, Checkbox, Badge, Tabs, …) is needed but is not yet in `src/components/ui/`.
when_to_use:
  - The current task requires a UI primitive (button, input, dialog, etc.) that is not yet installed.
  - The user asks to "add a <component>" that matches a shadcn component name.
  - A file in `src/components/` imports from `@/components/ui/<name>` and that file does not exist.
---

# Add a shadcn Component

This project uses **shadcn/ui** primitives. Primitives are always added through the CLI, never hand-written and never copied from the web.

## Procedure

1. **Check whether the component already exists.**
   - Look in `src/components/ui/`. If a file for the requested component is already there, import it with `import { Foo } from "@/components/ui/foo"` and stop — nothing else to do.

2. **Run the shadcn CLI from the repo root.**
   - Single component: `npx shadcn@latest add <component>`
   - Multiple components in one call (space-separated): `npx shadcn@latest add button input card dialog`
   - The CLI writes files directly to `src/components/ui/<component>.tsx` and installs any required dependencies (e.g. Radix primitives). You do not need to edit the files after generation.

3. **Verify the new file appeared** at `src/components/ui/<component>.tsx`. If it did not, the CLI likely failed — check the output for errors before proceeding.

4. **Import and use the component** via the `@/components/ui/<component>` alias:
   ```tsx
   import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
   ```

## Rules

- **Never** fetch shadcn source code from the web and paste it in. The CLI is the only sanctioned path.
- **Never** hand-edit generated files in `src/components/ui/` except to add a new `variant` to an existing `cva(...)` block (with a one-line comment explaining why).
- If a component you need is not a shadcn primitive (it's a domain-specific composite like `ShopCard` or `FilterBar`), create a hand-written file in `src/components/` (outside `ui/`) that composes shadcn primitives.

## Commonly needed primitives

Quick reference of names you can pass to `npx shadcn@latest add <name>`:

| Need                         | Component           |
|------------------------------|---------------------|
| Primary / secondary actions  | `button`            |
| Text input                   | `input`             |
| Text input with label        | `input` + `label`   |
| Container / tile             | `card`              |
| Modal                        | `dialog`            |
| Dropdown picker              | `select`            |
| Boolean option               | `checkbox`          |
| Status / tag                 | `badge`             |
| Horizontal rule              | `separator`         |
| Slide-over panel             | `sheet`             |
| Tabbed interface             | `tabs`              |
| Action menu                  | `dropdown-menu`     |
| Helper text on hover         | `tooltip`           |
| Radio choices                | `radio-group`       |
| Toggle switch                | `switch`            |

If the list above does not cover your need, check the shadcn registry at `https://ui.shadcn.com/docs/components` for the exact CLI name, then pass it to `npx shadcn@latest add <name>`.
