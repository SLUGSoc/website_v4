import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const committees = defineCollection({
    loader: glob({ pattern: "**/*.md", base:"./committees/"})
})
const esports = defineCollection({
    loader: glob({ pattern: "**/*.md", base:"./esports/"})
})

export const collections = { committees, esports }