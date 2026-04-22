import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function App() {
  return (
    <div className="min-h-screen bg-surface text-ink">
      <header className="bg-brand px-6 py-4 text-white shadow-sm">
        <h1 className="text-lg font-semibold tracking-tight">
          Workshop Starter
        </h1>
      </header>

      <main className="mx-auto max-w-2xl p-6">
        <Card className="border-l-4 border-l-highlight">
          <CardHeader>
            <CardTitle>Scaffold bereit.</CardTitle>
            <CardDescription>
              Öffne den Cursor-Chat (Cmd+L) und beschreib, was du bauen willst.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled>Noch nichts zu sehen</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default App
