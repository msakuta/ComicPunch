import * as esbuild from "https://deno.land/x/esbuild@v0.20.1/mod.js";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader@0.9";

esbuild.build({
  plugins: [...denoPlugins()],
  entryPoints: ["script/SketchCanvas.js"],
  outdir: "bundle",
  bundle: true,
  platform: "browser",
  format: "iife",
  globalName: "SketchCanvas",
  target: "esnext",
  minify: true,
  sourcemap: true,
  treeShaking: true,
});
await esbuild.stop();