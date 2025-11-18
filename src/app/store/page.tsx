import Link from 'next/link'
import { Breadcrumb } from '@/components/Breadcrumb'
import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

interface Article {
  slug: string
  title: string
  description: string
  priority?: number
  date?: string
}

async function getStoreArticles(): Promise<Article[]> {
  const contentDir = path.join(process.cwd(), 'src/content/store')
  const articles: Article[] = []

  async function readDirectory(dir: string, basePath: string[] = []): Promise<void> {
    const entries = await fs.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        await readDirectory(fullPath, [...basePath, entry.name])
      } else if (entry.name.endsWith('.mdx')) {
        const fileContent = await fs.readFile(fullPath, 'utf8')
        const { data } = matter(fileContent)

        const fileName = entry.name.replace('.mdx', '')
        const slug = [...basePath, fileName].join('/')

        articles.push({
          slug,
          title: data.title || fileName,
          description: data.description || '',
          priority: data.priority,
          date: data.date
        })
      }
    }
  }

  await readDirectory(contentDir)

  return articles.sort((a, b) => {
    if (a.priority && b.priority) return a.priority - b.priority
    if (a.priority) return -1
    if (b.priority) return 1
    return a.title.localeCompare(b.title)
  })
}

export default async function StorePage() {
  const articles = await getStoreArticles()

  return (
    <div className="container mx-auto py-12">
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Store' }
      ]} />

      <div className="flex flex-col justify-between items-center mb-6">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold lg:text-5xl tracking-tight text-white drop-shadow-lg">
          <span className="pt-10">Store & Editions</span>
        </h1>
        <h2 className="mx-auto max-w-[700px] md:text-xl my-6 text-gray-200 drop-shadow-md">
          Game editions, DLC, pre-order bonuses, and store information for Where Winds Meet
        </h2>
      </div>

      <section>
        <div className="space-y-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="rounded-lg border text-card-foreground shadow-sm bg-black/50 backdrop-blur-md border-gray-700 hover:border-[#F4B860] hover:shadow-2xl hover:shadow-[#F4B860]/20 transition-all"
            >
              <div className="flex flex-col space-y-1.5 p-6">
                <Link
                  href={`/store/${article.slug}`}
                  className="text-[#F4B860] hover:text-[#D99B3C] transition-colors inline-flex items-center gap-1"
                >
                  <h3 className="text-2xl font-semibold leading-none tracking-tight mr-1 text-gray-100">
                    {article.title}
                  </h3>
                  →
                </Link>
                <div className="text-sm text-gray-300">
                  {article.description}
                </div>
                {article.date && (
                  <div className="text-xs text-gray-500 mt-2">
                    Updated: {article.date}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
