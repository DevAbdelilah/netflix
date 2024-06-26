import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  return (
    <div className="h">
      <img src="/images/logo.png" alt=" hero" />
    </div>
  );
}
