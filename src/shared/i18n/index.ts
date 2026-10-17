import fa from "@/shared/i18n/fa.json";

export type Messages = typeof fa;

type NestedValue = string | { [key: string]: NestedValue };

function getByPath(messages: NestedValue, path: string): string | undefined {
  const parts = path.split(".");
  let current: NestedValue | undefined = messages;

  for (const part of parts) {
    if (current === undefined || typeof current === "string") {
      return undefined;
    }

    current = current[part];
  }

  return typeof current === "string" ? current : undefined;
}

export function t(
  key: string,
  params?: Record<string, string | number>,
  messages: Messages = fa,
): string {
  const template = getByPath(messages as NestedValue, key) ?? key;

  if (!params) {
    return template;
  }

  return Object.entries(params).reduce(
    (result, [name, value]) => result.replaceAll(`{${name}}`, String(value)),
    template,
  );
}

export { fa };
