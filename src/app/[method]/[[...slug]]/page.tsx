'use client';

import { notFound, useParams } from 'next/navigation';
import { Methods } from "@/rest/constants";
import { RestView } from "@/rest/views/RestView";

export default function Rest() {
  const { method, slug } = useParams() as {
    method: string;
    slug: string[];
  };

  if (!Object.values(Methods).includes(method)) return notFound();

  return (
    <main>
      <RestView method={method} slug={slug} />
    </main>
  );
}
