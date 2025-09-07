import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const committees = defineCollection({
    loader: glob({ pattern: "**/*.md", base:"./committee/"})
})

export const collections = { committees }