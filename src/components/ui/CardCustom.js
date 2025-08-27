//src/components/ui/CardCustom.js
export default function CardCustom({ children, className = "" }) {
  return (
    <div
      className={`bg-white shadow-md rounded-2xl overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, actions }) {
  return (
    <div className="flex justify-between items-center px-4 py-3 border-b">
      <h2 className="text-lg font-semibold">{title}</h2>
      {actions && <div>{actions}</div>}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}

export function CardFooter({ children }) {
  return <div className="px-4 py-3 border-t">{children}</div>;
}
