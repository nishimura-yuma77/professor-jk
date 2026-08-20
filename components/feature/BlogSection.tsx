import BlogSectionContent, {
  type HomeBlogArticle,
} from "@/components/feature/BlogSectionContent"
import { getBlogArticles } from "@/const/blog"

const HOME_BLOG_ARTICLE_LIMIT = 3

export default function BlogSection() {
  const articles: HomeBlogArticle[] = getBlogArticles()
    .slice(0, HOME_BLOG_ARTICLE_LIMIT)
    .map((article) => ({
      article: {
        slug: article.slug,
        title: article.title,
        publishedAt: article.publishedAt,
        coverImage: article.coverImage,
      },
      logNumber: article.logNumber,
    }))

  return <BlogSectionContent articles={articles} />
}
