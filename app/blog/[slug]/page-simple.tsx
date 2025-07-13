export async function generateStaticParams() {
  return [{ slug: "declarative-mac-config" }]
}

export const dynamicParams = false

export default function Page() {
  return <div>Test</div>
}
