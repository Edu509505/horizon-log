import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({ component: App });

export default function App() {
  return <>oi</>;
}
