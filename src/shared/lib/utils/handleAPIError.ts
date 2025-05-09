export default function handleAPIError({ title, description }: { title: string; description: string }) {
  throw new Error(`${title}|${description}`)
}