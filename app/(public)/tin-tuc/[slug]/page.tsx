/**
 * Blog detail page — server component with dynamic metadata and JSON-LD.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
import { getBlogBySlug } from '@/services/blog.service';
import { generatePageMetadata, generateArticleJsonLd } from '@/utils/seo';
import Breadcrumb from '@/components/common/Breadcrumb';
import { formatDate } from '@/utils/format';
import DOMPurify from 'isomorphic-dompurify';
import { ROUTES } from '@/constants/routes';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return {};

  return generatePageMetadata({
    title: blog.seoTitle ?? blog.title,
    description: blog.seoDescription ?? blog.excerpt,
    image: blog.thumbnail,
    canonical: `/tin-tuc/${blog.slug}`,
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  const jsonLd = generateArticleJsonLd(blog);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-muted/30 border-b border-border">
        <div className="container py-6">
          <Breadcrumb
            items={[
              { label: 'Tin tức', href: ROUTES.BLOG },
              { label: blog.title },
            ]}
          />
        </div>
      </div>

      <div className="container py-10">
        <article className="max-w-3xl mx-auto">
          {/* Thumbnail */}
          {blog.thumbnail && (
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-card">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(blog.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {blog.author}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
            {blog.title}
          </h1>

          {/* Gold divider */}
          <div className="h-[2px] w-16 bg-gradient-gold rounded-full mb-8" />

          {/* Content */}
          <div
            className="prose prose-base md:prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
          />
        </article>
      </div>
    </>
  );
}
