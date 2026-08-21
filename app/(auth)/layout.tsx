export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F8F7F5] flex items-center justify-center py-12 px-4">
      {children}
    </div>
  );
}
