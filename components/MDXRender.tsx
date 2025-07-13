"use client"

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote"

export function CustomMDX(props: MDXRemoteSerializeResult) {
  return <MDXRemote {...props} />
}
